import { NextRequest, NextResponse } from 'next/server';
import { getRAGSystem } from '@/lib/rag-system';

export async function GET() {
  try {
    console.log('🧪 Running setup test...');
    
    // Check environment variables
    const envCheck = {
      upstashUrl: !!process.env.UPSTASH_VECTOR_REST_URL,
      upstashToken: !!process.env.UPSTASH_VECTOR_REST_TOKEN,
      groqKey: !!process.env.GROQ_API_KEY,
    };
    
    // Initialize RAG system
    const rag = getRAGSystem();
    await rag.initialize();
    
    // Add a test document
    await rag.addDocuments([
      {
        id: 'setup_test',
        text: 'This is a test document to verify the Upstash Vector + Groq AI integration is working correctly.',
        metadata: { category: 'test', source: 'setup_verification' }
      }
    ]);
    
    // Test query
    const result = await rag.query('Is the setup working?');
    const stats = rag.getStats();
    
    return NextResponse.json({
      success: true,
      message: '🎉 Setup verification successful!',
      environment: envCheck,
      test_result: {
        answer: result.answer,
        confidence: Math.round(result.confidence * 100),
        sources: result.sources.length
      },
      system_stats: stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Setup test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        upstashUrl: !!process.env.UPSTASH_VECTOR_REST_URL,
        upstashToken: !!process.env.UPSTASH_VECTOR_REST_TOKEN,
        groqKey: !!process.env.GROQ_API_KEY,
      },
      troubleshooting: {
        upstash: 'Check Upstash Vector database credentials and status',
        groq: 'Verify Groq API key and account status',
        fallback: 'System will use rule-based responses if services unavailable'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }
    
    const rag = getRAGSystem();
    const result = await rag.query(question);
    
    return NextResponse.json({
      success: true,
      question,
      answer: result.answer,
      confidence: Math.round(result.confidence * 100),
      sources: result.sources,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}