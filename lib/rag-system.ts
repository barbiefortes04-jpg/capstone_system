// RAG System Core - Upstash Vector Store + Groq AI Integration

import { pipeline, env } from '@xenova/transformers';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';

// Configure transformers to use local models when available
env.allowLocalModels = false;
env.allowRemoteModels = true;

// Vector store entry
interface VectorEntry {
  id: string;
  text: string;
  metadata: {
    category?: string;
    keywords?: string[];
    source?: string;
  };
}

// Upstash Vector result type - matching actual SDK response (for future use)
// interface UpstashVectorResult {
//   id: string | number;
//   score: number;
//   metadata?: {
//     text?: string;
//     category?: string;
//     keywords?: string[];
//     source?: string;
//   };
// }

// Simple LRU cache implementation for query -> response
class LRUCache<K, V> {
  private capacity: number;
  private map = new Map<K, { value: V; ts: number }>();
  private ttlMs: number;

  constructor(capacity = 200, ttlMs = 5 * 60 * 1000) {
    this.capacity = capacity;
    this.ttlMs = ttlMs;
  }

  get(key: K): V | null {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > this.ttlMs) {
      this.map.delete(key);
      return null;
    }
    // refresh order
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, { value, ts: Date.now() });
    if (this.map.size > this.capacity) {
      // remove oldest
      const firstKey = this.map.keys().next().value;
      if (firstKey !== undefined) {
        this.map.delete(firstKey);
      }
    }
  }

  clear() {
    this.map.clear();
  }
}

class RAGSystem {
  private embedder: unknown = null;
  private vectorIndex: Index | null = null;
  private groqClient: Groq | null = null;
  private isInitialized = false;
  private cache = new LRUCache<string, { answer: string; sources: Array<{ text: string; score: number }>; confidence: number }>(200, 5 * 60 * 1000);
  // Runtime metrics for observability
  private metrics = {
    requestCount: 0,
    totalLatencyMs: 0,
    lastRequestMs: 0
  };

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize the embedding model (still used for creating embeddings)
      this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      
      // Initialize Upstash Vector
      if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
        console.warn('Upstash Vector credentials not found, falling back to local vector store');
      } else {
        this.vectorIndex = new Index({
          url: process.env.UPSTASH_VECTOR_REST_URL,
          token: process.env.UPSTASH_VECTOR_REST_TOKEN,
        });
      }

      // Initialize Groq AI client
      if (!process.env.GROQ_API_KEY) {
        console.warn('Groq API key not found, falling back to rule-based responses');
      } else {
        this.groqClient = new Groq({
          apiKey: process.env.GROQ_API_KEY,
        });
      }

      this.isInitialized = true;
      console.log('RAG System initialized successfully with Upstash Vector and Groq AI');
    } catch (error) {
      console.error('Failed to initialize RAG system:', error);
      throw error;
    }
  }

  async addDocuments(documents: Array<{ id: string; text: string; metadata?: Record<string, unknown> }>) {
    if (!this.isInitialized) await this.initialize();

    try {
      if (this.vectorIndex) {
        // Use Upstash Vector for storage
        const vectors = [];
        for (const doc of documents) {
          const embedding = await this.generateEmbedding(doc.text);
          vectors.push({
            id: doc.id,
            vector: embedding,
            metadata: {
              text: doc.text,
              ...doc.metadata
            }
          });
        }

        // Batch upsert to Upstash Vector
        await this.vectorIndex.upsert(vectors);
        console.log(`Added ${documents.length} documents to Upstash Vector store`);
      } else {
        console.log('Upstash Vector not available, documents not stored');
      }
    } catch (error) {
      console.error('Error adding documents to vector store:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.embedder) throw new Error('Embedder not initialized');
    const output = await (this.embedder as (text: string, options: Record<string, unknown>) => Promise<{ data: number[] }>)(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data as number[]);
  }

  // Primary vector search using Upstash Vector
  async search(query: string, topK: number = 5): Promise<Array<{ text: string; score: number; metadata: Record<string, unknown> }>> {
    if (!this.isInitialized) await this.initialize();
    
    if (!this.vectorIndex) {
      throw new Error('Vector index not available - check Upstash Vector configuration');
    }

    try {
      const queryEmbedding = await this.generateEmbedding(query);
      const results = await this.vectorIndex.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
      });

      return results.map((result) => ({
        text: String(result.metadata?.text || ''),
        score: result.score,
        metadata: {
          category: result.metadata?.category,
          keywords: result.metadata?.keywords,
          source: result.metadata?.source
        }
      }));
    } catch (error) {
      console.error('Error searching vector store:', error);
      throw error;
    }
  }

  // Enhanced answer generation using Groq AI
  private async generateAnswerWithGroq(question: string, context: string, confidence: number): Promise<string> {
    if (!this.groqClient) {
      return this.generateRuleBasedAnswer(question, context, confidence);
    }

    if (!context || confidence < 0.25) {
      return "I don't have enough relevant information to answer that question accurately. Try rephrasing or asking about a different topic.";
    }

    try {
      const prompt = `You are an AI assistant helping with questions about a professional profile. Based on the provided context, answer the user's question clearly and concisely.

Context:
${context}

Question: ${question}

Instructions:
- Answer based only on the provided context
- Be specific and professional
- If the context doesn't contain enough information, say so
- Keep responses focused and relevant
- Use a professional tone suitable for career discussions

Answer:`;

      const completion = await this.groqClient.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama3-8b-8192", // Fast and efficient model
        max_tokens: 500,
        temperature: 0.3, // Lower temperature for more focused responses
      });

      return completion.choices[0]?.message?.content || this.generateRuleBasedAnswer(question, context, confidence);
    } catch (error) {
      console.error('Error generating answer with Groq:', error);
      // Fallback to rule-based generation
      return this.generateRuleBasedAnswer(question, context, confidence);
    }
  }

  // Fallback rule-based answer generation
  private generateRuleBasedAnswer(question: string, context: string, confidence: number): string {
    if (!context || confidence < 0.25) {
      return "I don't have enough relevant information to answer that question accurately. Try rephrasing or asking about a different topic.";
    }

    const qLower = question.toLowerCase();
    if (qLower.includes('experience') || qLower.includes('worked')) return this.extractExperienceAnswer(context);
    if (qLower.includes('skill') || qLower.includes('technology') || qLower.includes('know')) return this.extractSkillsAnswer(context);
    if (qLower.includes('project') || qLower.includes('built') || qLower.includes('developed')) return this.extractProjectAnswer(context);
    if (qLower.includes('challenge') || qLower.includes('problem')) return this.extractChallengeAnswer(context);
    if (qLower.includes('team') || qLower.includes('leadership')) return this.extractLeadershipAnswer(context);
    return this.extractGeneralAnswer(context);
  }

  // Lightweight re-ranker that boosts results based on keyword overlap and metadata
  private reRank(results: Array<{ text: string; score: number; metadata: Record<string, unknown> }>, query: string): Array<{ text: string; score: number; metadata: Record<string, unknown> }> {
    const qLower = query.toLowerCase();
    return results.map(r => {
      let boost = 0;
      try {
        const words = new Set(qLower.split(/\W+/).filter(Boolean));
        const textLower = r.text.toLowerCase();
        // token overlap
        let overlap = 0;
        words.forEach(w => { if (textLower.includes(w)) overlap++; });
        boost += overlap * 0.02; // small boost per overlap

        // metadata keyword boost
        if (r.metadata && Array.isArray(r.metadata.keywords)) {
          for (const kw of r.metadata.keywords) {
            if (qLower.includes((kw as string).toLowerCase())) boost += 0.03;
          }
        }
      } catch {
        // ignore errors in keyword processing
      }
      return { ...r, score: Math.min(1, r.score + boost) };
    }).sort((a, b) => b.score - a.score);
  }

  // Short helper to trim context by character budget (token-budget aware prompt assembly)
  private assembleContext(results: Array<{ text: string; score: number }>, charBudget = 2000): string {
    let ctx = '';
    for (const r of results) {
      if (ctx.length + r.text.length + 2 > charBudget) break;
      ctx += r.text + '\n\n';
    }
    return ctx.trim();
  }

  // Single query with cache, re-ranking, and Groq AI integration
  async query(question: string, topK: number = 5): Promise<{ answer: string; sources: Array<{ text: string; score: number }>; confidence: number }> {
    const start = Date.now();
    const cacheKey = `q:${question}:k:${topK}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      // update metrics for cache hit (very low latency assumed)
      const elapsed = Date.now() - start;
      this.metrics.requestCount += 1;
      this.metrics.totalLatencyMs += elapsed;
      this.metrics.lastRequestMs = elapsed;
      return cached;
    }

    const rawResults = await this.search(question, Math.max(topK, 10)); // fetch slightly more for rerank
    const ranked = this.reRank(rawResults, question).slice(0, topK);
    const confidence = ranked.length > 0 ? ranked[0].score : 0;
    const context = this.assembleContext(ranked.map(r => ({ text: r.text, score: r.score })), 1600);

    const answer = await this.generateAnswerWithGroq(question, context, confidence);
    const out = { answer, sources: ranked.map(r => ({ text: r.text, score: r.score })), confidence };
    this.cache.set(cacheKey, out);

    const elapsed = Date.now() - start;
    this.metrics.requestCount += 1;
    this.metrics.totalLatencyMs += elapsed;
    this.metrics.lastRequestMs = elapsed;
    return out;
  }

  // Batch multiple queries concurrently with simple concurrency control
  async batchQuery(queries: string[], topK: number = 5): Promise<Array<{ query: string; answer: string; sources: Array<{ text: string; score: number }>; confidence: number }>> {
    const start = Date.now();
    const runners = queries.map(async q => {
      const res = await this.query(q, topK);
      return { query: q, ...res };
    });
    const out = await Promise.all(runners);
    const elapsed = Date.now() - start;
    // record batch as a single metric event (helps calculate throughput)
    this.metrics.requestCount += queries.length;
    this.metrics.totalLatencyMs += elapsed;
    this.metrics.lastRequestMs = elapsed;
    return out;
  }

  private extractExperienceAnswer(context: string): string {
    const lines = context.split('\n').filter(l => l.trim());
    const selected = lines.filter(l => /\bat\b|position|achievement|result/i.test(l));
    return (selected.slice(0, 5).join(' ') || context.slice(0, 400)).trim();
  }

  private extractSkillsAnswer(context: string): string {
    const lines = context.split('\n').filter(l => l.trim());
    const skills = lines.filter(l => /skills:|technology|experience|proficienc/i.test(l));
    return (skills.slice(0, 5).join(' ') || context.slice(0, 300)).trim();
  }

  private extractProjectAnswer(context: string): string {
    const lines = context.split('\n').filter(l => l.trim());
    const projects = lines.filter(l => /built|developed|implemented|project|result/i.test(l));
    return (projects.slice(0, 5).join(' ') || context.slice(0, 400)).trim();
  }

  private extractChallengeAnswer(context: string): string {
    const lines = context.split('\n').filter(l => l.trim());
    const chal = lines.filter(l => /situation|task|action|result|challenge/i.test(l));
    return (chal.slice(0, 6).join(' ') || context.slice(0, 500)).trim();
  }

  private extractLeadershipAnswer(context: string): string {
    const lines = context.split('\n').filter(l => l.trim());
    const lead = lines.filter(l => /team|mentor|lead|leadership|manage/i.test(l));
    return (lead.slice(0, 5).join(' ') || context.slice(0, 350)).trim();
  }

  private extractGeneralAnswer(context: string): string {
    return (context.slice(0, 450) + (context.length > 450 ? '...' : '')).trim();
  }

  getStats() {
    const avgLatency = this.metrics.requestCount > 0 ? Math.round(this.metrics.totalLatencyMs / this.metrics.requestCount) : 0;
    return { 
      totalDocuments: 'Managed by Upstash Vector', 
      isInitialized: this.isInitialized, 
      modelName: 'Xenova/all-MiniLM-L6-v2',
      vectorStore: this.vectorIndex ? 'Upstash Vector' : 'Not configured',
      llm: this.groqClient ? 'Groq AI (llama3-8b-8192)' : 'Rule-based fallback',
      cacheSize: undefined, 
      metrics: { 
        requestCount: this.metrics.requestCount, 
        avgLatencyMs: avgLatency, 
        lastRequestMs: this.metrics.lastRequestMs 
      } 
    };
  }

  async clearVectorStore() {
    this.cache.clear();
    if (this.vectorIndex) {
      try {
        // Note: Upstash Vector doesn't have a clear all method in the current SDK
        // You would need to implement this based on your specific needs
        console.log('Vector store clear requested - implement based on your requirements');
      } catch (error) {
        console.error('Error clearing vector store:', error);
      }
    }
  }
}

// Singleton instance
let ragSystemInstance: RAGSystem | null = null;

export function getRAGSystem(): RAGSystem {
  if (!ragSystemInstance) ragSystemInstance = new RAGSystem();
  return ragSystemInstance;
}

export type { VectorEntry };
export { RAGSystem };
