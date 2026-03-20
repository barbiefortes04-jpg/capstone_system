'use client';

import { useState } from 'react';
import { cn, calculateConfidenceLevel } from '@/lib/utils';

interface TestQuery {
  id: number;
  category: string;
  query: string;
  expectedTopics: string[];
  result?: {
    answer: string;
    confidence: number;
    passed: boolean;
  };
}

const testQueries: TestQuery[] = [
  // Technical Skills
  {
    id: 1,
    category: "Technical Skills",
    query: "What programming languages do you know?",
    expectedTopics: ["JavaScript", "TypeScript", "Python", "Java"]
  },
  {
    id: 2,
    category: "Technical Skills",
    query: "What experience do you have with React and Next.js?",
    expectedTopics: ["React", "Next.js", "frontend", "web development"]
  },
  {
    id: 3,
    category: "Technical Skills",
    query: "Tell me about your backend development skills",
    expectedTopics: ["Node.js", "API", "backend", "database"]
  },
  {
    id: 4,
    category: "Technical Skills",
    query: "What databases have you worked with?",
    expectedTopics: ["PostgreSQL", "MongoDB", "Redis", "database"]
  },
  {
    id: 5,
    category: "Technical Skills",
    query: "Do you have experience with cloud platforms?",
    expectedTopics: ["AWS", "cloud", "deployment", "infrastructure"]
  },
  
  // AI/ML Experience
  {
    id: 6,
    category: "AI/ML",
    query: "What's your experience with AI and machine learning?",
    expectedTopics: ["AI", "machine learning", "RAG", "embeddings"]
  },
  {
    id: 7,
    category: "AI/ML",
    query: "Have you built any RAG systems before?",
    expectedTopics: ["RAG", "retrieval", "embeddings", "vector"]
  },
  {
    id: 8,
    category: "AI/ML",
    query: "Tell me about your AI integration projects",
    expectedTopics: ["AI", "integration", "customer support", "automation"]
  },
  
  // Problem Solving
  {
    id: 9,
    category: "Problem Solving",
    query: "Describe a challenging technical problem you solved",
    expectedTopics: ["performance", "optimization", "problem", "solution"]
  },
  {
    id: 10,
    category: "Problem Solving",
    query: "Tell me about a time you improved system performance",
    expectedTopics: ["performance", "optimization", "improvement", "metrics"]
  },
  {
    id: 11,
    category: "Problem Solving",
    query: "How do you approach debugging complex issues?",
    expectedTopics: ["debugging", "problem solving", "approach", "technical"]
  },
  
  // Leadership & Teamwork
  {
    id: 12,
    category: "Leadership",
    query: "What's your experience with team leadership?",
    expectedTopics: ["leadership", "team", "mentoring", "management"]
  },
  {
    id: 13,
    category: "Leadership",
    query: "Have you mentored junior developers?",
    expectedTopics: ["mentoring", "junior", "developers", "teaching"]
  },
  {
    id: 14,
    category: "Leadership",
    query: "How do you handle code reviews?",
    expectedTopics: ["code review", "quality", "feedback", "team"]
  },
  
  // Projects & Achievements
  {
    id: 15,
    category: "Projects",
    query: "What's your most impressive project?",
    expectedTopics: ["project", "achievement", "impact", "results"]
  },
  {
    id: 16,
    category: "Projects",
    query: "Tell me about a project where you used microservices",
    expectedTopics: ["microservices", "architecture", "system design", "scalability"]
  },
  {
    id: 17,
    category: "Projects",
    query: "Have you worked on real-time data processing?",
    expectedTopics: ["real-time", "data", "streaming", "analytics"]
  },
  
  // DevOps & Infrastructure
  {
    id: 18,
    category: "DevOps",
    query: "What's your experience with CI/CD?",
    expectedTopics: ["CI/CD", "deployment", "automation", "pipeline"]
  },
  {
    id: 19,
    category: "DevOps",
    query: "Have you worked with Docker and Kubernetes?",
    expectedTopics: ["Docker", "Kubernetes", "containers", "orchestration"]
  },
  {
    id: 20,
    category: "DevOps",
    query: "Tell me about your DevOps practices",
    expectedTopics: ["DevOps", "automation", "infrastructure", "deployment"]
  },
  
  // Security
  {
    id: 21,
    category: "Security",
    query: "What experience do you have with application security?",
    expectedTopics: ["security", "authentication", "vulnerabilities", "best practices"]
  },
  {
    id: 22,
    category: "Security",
    query: "How do you handle API security?",
    expectedTopics: ["API", "security", "authentication", "authorization"]
  },
  
  // Soft Skills
  {
    id: 23,
    category: "Soft Skills",
    query: "How do you approach collaboration with team members?",
    expectedTopics: ["collaboration", "team", "communication", "working"]
  },
  {
    id: 24,
    category: "Soft Skills",
    query: "What's your learning approach for new technologies?",
    expectedTopics: ["learning", "technology", "growth", "development"]
  },
  
  // General
  {
    id: 25,
    category: "General",
    query: "What are your key strengths as a developer?",
    expectedTopics: ["skills", "strengths", "experience", "expertise"]
  }
];

export default function TestingPage() {
  const [results, setResults] = useState<Map<number, unknown>>(new Map());
  const [testing, setTesting] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  const [mode, setMode] = useState<'sequential' | 'batched' | 'both'>('both');
  const [platform, setPlatform] = useState<'web' | 'slack' | 'teams' | 'mobile'>('web');
  const [metrics, setMetrics] = useState<Record<string, unknown> | null>(null);

  const runSingleTest = async (query: TestQuery, platformTag = 'web') => {
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.query, platform: platformTag })
      });

      const data = await response.json();
      // Simple quality check: confidence > 0.5 is considered passing
      const passed = (data.confidence ?? 0) > 0.5;

      return {
        answer: data.answer ?? String(data.results?.[0]?.answer ?? ''),
        confidence: data.confidence ?? data.results?.[0]?.confidence ?? 0,
        passed,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        answer: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        confidence: 0,
        passed: false,
        timestamp: new Date().toISOString()
      };
    }
  };

  const runSequentialAll = async (platformTag = 'web') => {
    setTesting(true);
    setResults(new Map());
    setCurrentTest(0);
    const start = Date.now();

    for (let i = 0; i < testQueries.length; i++) {
      setCurrentTest(i + 1);
      const result = await runSingleTest(testQueries[i], platformTag);
      setResults(prev => new Map(prev).set(testQueries[i].id, result));
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    const duration = Date.now() - start;
    setTesting(false);
    setCurrentTest(0);
    return { mode: 'sequential', totalMs: duration };
  };

  const runBatchedAll = async (platformTag = 'web') => {
    setTesting(true);
    setResults(new Map());
    setCurrentTest(0);
    const queries = testQueries.map(q => q.query);
    const start = Date.now();

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queries, platform: platformTag })
      });

      const data = await response.json();
      const duration = Date.now() - start;

      if (Array.isArray(data.results)) {
        data.results.forEach((res: { confidence?: number; answer?: string }, idx: number) => {
          const q = testQueries[idx];
          const passed = (res.confidence ?? 0) > 0.5;
          setResults(prev => new Map(prev).set(q.id, { answer: res.answer ?? '', confidence: res.confidence ?? 0, passed, timestamp: new Date().toISOString() }));
        });
      }

      setTesting(false);
      return { mode: 'batched', totalMs: duration };
    } catch (err) {
      setTesting(false);
      return { mode: 'batched', totalMs: 0, error: String(err) };
    }
  };

  const runCategoryTests = async (category: string) => {
    setTesting(true);
    const categoryQueries = testQueries.filter(q => q.category === category);

    for (const query of categoryQueries) {
      const result = await runSingleTest(query, platform);
      setResults(prev => new Map(prev).set(query.id, result));
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    setTesting(false);
  };

  const categories = Array.from(new Set(testQueries.map(q => q.category)));
  const passedTests = Array.from(results.values()).filter(r => (r as { passed?: boolean })?.passed).length;
  const totalTested = results.size;
  const passRate = totalTested > 0 ? (passedTests / totalTested * 100).toFixed(1) : '0';

  // Run tests according to selected mode
  const runAllTests = async () => {
    setMetrics(null);
    if (mode === 'sequential') {
      const res = await runSequentialAll(platform);
      setMetrics({ sequential: res });
      return;
    }

    if (mode === 'batched') {
      const res = await runBatchedAll(platform);
      setMetrics({ batched: res });
      return;
    }

    // both: run sequential (baseline) then batched (optimized)
    const baseline = await runSequentialAll(platform);
    // small cooldown
    await new Promise(r => setTimeout(r, 500));
    const optimized = await runBatchedAll(platform);
    setMetrics({ sequential: baseline, batched: optimized });
  };

  // Export test results as JSON or CSV
  const exportResults = (format: 'json' | 'csv') => {
    const records = Array.from(results.entries()).map(([id, r]) => {
      const result = r as { answer?: string; confidence?: number; passed?: boolean; timestamp?: string };
      return { 
        id, 
        query: testQueries.find(q => q.id === id)?.query ?? '', 
        answer: result.answer ?? '', 
        confidence: result.confidence ?? 0, 
        passed: result.passed ?? false, 
        timestamp: result.timestamp ?? '' 
      };
    });
    if (format === 'json') {
      const blob = new Blob([JSON.stringify({ metrics, passRate, totalTested, records }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-results-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    // CSV
    const header = ['id', 'query', 'answer', 'confidence', 'passed', 'timestamp'];
    const lines = [header.join(',')];
    for (const rec of records) {
      const escaped = header.map(h => {
        const v = String((rec as Record<string, unknown>)[h] ?? '');
        return `"${v.replace(/"/g, '""')}"`;
      }).join(',');
      lines.push(escaped);
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-white mb-6">System Testing & Quality Assessment</h1>
        <p className="text-xl text-gray-400 mb-12">Comprehensive test suite with 25+ sample queries across multiple categories</p>

        {/* Test Controls */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Test Suite</h2>
              <p className="text-gray-400 mt-1">{testQueries.length} queries across {categories.length} categories</p>
            </div>

            <div className="flex items-center gap-3">
              <select value={mode} onChange={e => setMode(e.target.value as 'sequential' | 'batched' | 'both')} className="bg-gray-700 text-gray-200 px-3 py-2 rounded">
                <option value="both">Both (sequential + batched)</option>
                <option value="sequential">Sequential (baseline)</option>
                <option value="batched">Batched (optimized)</option>
              </select>

              <select value={platform} onChange={e => setPlatform(e.target.value as 'web' | 'slack' | 'teams' | 'mobile')} className="bg-gray-700 text-gray-200 px-3 py-2 rounded">
                <option value="web">Web</option>
                <option value="slack">Slack</option>
                <option value="teams">Teams</option>
                <option value="mobile">Mobile</option>
              </select>

              <button
                onClick={runAllTests}
                disabled={testing}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-white transition-all",
                  testing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                )}
              >
                {testing ? `Testing ${currentTest}/${testQueries.length}...` : 'Run All Tests'}
              </button>

              <button onClick={() => exportResults('json')} className="px-3 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600">Export JSON</button>
              <button onClick={() => exportResults('csv')} className="px-3 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600">Export CSV</button>
            </div>
          </div>

          {/* Test Statistics */}
          {totalTested > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-900 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-200">{totalTested}</div>
                <div className="text-sm text-gray-400 mt-1">Tests Run</div>
              </div>
              <div className="bg-green-900 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-200">{passedTests}</div>
                <div className="text-sm text-gray-400 mt-1">Passed</div>
              </div>
              <div className="bg-purple-900 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-200">{passRate}%</div>
                <div className="text-sm text-gray-400 mt-1">Pass Rate</div>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const categoryResults = testQueries
                .filter(q => q.category === category)
                .map(q => results.get(q.id))
                .filter(r => r !== undefined);
              const categoryPassed = categoryResults.filter(r => (r as { passed?: boolean })?.passed).length;
              const categoryTotal = categoryResults.length;

              return (
                <button
                  key={category}
                  onClick={() => runCategoryTests(category)}
                  disabled={testing}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-200 transition disabled:opacity-50"
                >
                  {category}
                  {categoryTotal > 0 && (
                    <span className="ml-2 text-xs">
                      ({categoryPassed}/{categoryTotal})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {testQueries.map(query => {
            const result = results.get(query.id) as { answer?: string; confidence?: number; passed?: boolean; timestamp?: string } | undefined;
            const confidenceInfo = result ? calculateConfidenceLevel(result.confidence ?? 0) : null;

            return (
              <div
                key={query.id}
              className={cn(
                  "bg-gray-800 rounded-xl shadow-lg p-6 transition-all",
                  result?.passed ? "border-l-4 border-green-500" : "border-l-4 border-yellow-500"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">{query.category}</span>
                      <span className="text-sm text-gray-400">Query #{query.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{query.query}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {query.expectedTopics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{topic}</span>
                      ))}
                    </div>
                  </div>
                  
                  {result && confidenceInfo && (
                    <div className="text-right ml-4">
                      <div className={cn("text-lg font-bold", confidenceInfo.color)}>
                        {((result.confidence ?? 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">{confidenceInfo.level}</div>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        result?.passed ? "bg-green-900 text-green-200" : "bg-yellow-900 text-yellow-200"
                      )}>
                        {result?.passed ? "✓ PASSED" : "⚠ LOW CONFIDENCE"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(result.timestamp ?? '').toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {(result.answer ?? '').slice(0, 300)}
                      {(result.answer ?? '').length > 300 && '...'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quality Criteria + Performance Comparison */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quality Assessment Criteria</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <div>
                <strong>High Confidence (70%+):</strong> Answer is highly relevant and accurate, with strong semantic match to query intent.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">⚠</span>
              <div>
                <strong>Medium Confidence (50-70%):</strong> Answer is moderately relevant but may lack some specificity or context.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 font-bold">✗</span>
              <div>
                <strong>Low Confidence (&lt;50%):</strong> Answer may not be relevant or system lacks sufficient information to respond accurately.
              </div>
            </div>

            <div className="bg-gray-700 rounded-2xl shadow-inner p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Performance Comparison (Before vs After)</h3>
              <p className="text-gray-400 mb-4">Example synthetic comparison showcasing measurable gains after applying Step 5-7 optimizations.</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400">Avg Latency</div>
                  <div className="text-2xl font-bold text-blue-400">820ms → 210ms</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400">Avg Confidence</div>
                  <div className="text-2xl font-bold text-green-400">62% → 75%</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400">Cost / Request</div>
                  <div className="text-2xl font-bold text-purple-400">$0.014 → $0.006</div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-4">These metrics are example outcomes from applying caching, batching, re-ranking, and prompt-budget controls. Use the Optimization page for full details and reproducible tests.</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
