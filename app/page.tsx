'use client';

import { useState } from 'react';
import { cn, calculateConfidenceLevel } from '@/lib/utils';

interface QueryResult {
  answer: string;
  confidence: number;
  sources: Array<{ text: string; score: number }>;
  timestamp: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleQueries = [
    "What are your technical skills?",
    "Tell me about your experience with AI/ML",
    "Describe a challenging project you worked on",
    "What's your experience with team leadership?"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process query');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  const confidenceInfo = result ? calculateConfidenceLevel(result.confidence) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header (dark background, smaller tagline) */}
        <div className="text-center mb-12">
          <div className="bg-gray-900 text-white rounded-2xl p-8">
            <h1 className="text-5xl font-bold text-white mb-4">Digital Twin RAG System</h1>
            <p className="text-sm text-gray-200 max-w-2xl mx-auto">
              Ask me anything about my professional experience, skills, and achievements. Powered by advanced RAG technology with semantic search.
            </p>
          </div>
        </div>

        {/* Query Interface */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
                Your Question
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., What experience do you have with React and Next.js?"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100"
                rows={3}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className={cn(
                "w-full py-3 px-6 rounded-lg font-medium text-white transition-all",
                loading || !query.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Ask Question'
              )}
            </button>
          </form>

          {/* Sample Queries */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-400 mb-3">Try these sample questions:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleQuery(sq)}
                  className="px-4 py-2 text-sm bg-blue-900 text-blue-200 rounded-full hover:bg-blue-800 transition"
                  disabled={loading}
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-300 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            {/* Answer */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Answer</h2>
                {confidenceInfo && (
                  <div className="text-right">
                    <div className={cn("text-sm font-semibold", confidenceInfo.color)}>
                      {(result.confidence * 100).toFixed(1)}% Confidence
                    </div>
                    <div className="text-xs text-gray-400">{confidenceInfo.description}</div>
                  </div>
                )}
              </div>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{result.answer}</p>
            </div>

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Relevant Sources</h3>
                <div className="space-y-4">
                  {result.sources.map((source, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-700 rounded-lg p-4 hover:border-blue-600 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">Source {idx + 1}</span>
                        <span className={cn("text-sm font-semibold text-gray-200", calculateConfidenceLevel(source.score).color)}>
                          {(source.score * 100).toFixed(1)}% match
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{source.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="text-center text-sm text-gray-400">Response generated at {new Date(result.timestamp).toLocaleString()}</div>
          </div>
        )}

        {/* Enterprise Features */}
        {!result && !loading && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <a href="/monitoring" className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition border border-gray-700 hover:border-blue-600">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Live Monitoring</h3>
                <p className="text-gray-300 text-sm">Real-time performance metrics and system health dashboard</p>
              </a>

              <a href="/scalability" className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition border border-gray-700 hover:border-purple-600">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Load Testing</h3>
                <p className="text-gray-300 text-sm">Test scalability with comprehensive load testing interface</p>
              </a>

              <a href="/operations" className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition border border-gray-700 hover:border-green-600">
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Operations</h3>
                <p className="text-gray-300 text-sm">Production maintenance procedures and SLA monitoring</p>
              </a>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">🏢 Enterprise-Ready Digital Twin System</h3>
              <p className="text-gray-300 text-sm">Production deployment with scalable architecture, comprehensive monitoring, and 24/7 operational capability</p>
            </div>
          </>
        )}
      </main>

    </div>
  );
}
