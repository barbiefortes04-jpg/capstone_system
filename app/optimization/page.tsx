export default function OptimizationPage() {
  const sampleBefore = {
    avgLatencyMs: 820,
    avgConfidence: 0.62,
    costPerRequest: 0.014
  };

  const sampleAfter = {
    avgLatencyMs: 210,
    avgConfidence: 0.75,
    costPerRequest: 0.006
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-4">Optimization — Query Processing Improvements</h1>

      <p className="text-gray-300 mb-6">Key optimizations applied and measurable gains (example):</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-white">Before Optimizations</h2>
          <ul className="mt-3 text-gray-300">
            <li>Avg latency: <strong>{sampleBefore.avgLatencyMs}ms</strong></li>
            <li>Avg confidence: <strong>{(sampleBefore.avgConfidence * 100).toFixed(1)}%</strong></li>
            <li>Cost per request: <strong>${sampleBefore.costPerRequest}</strong></li>
            <li>Single-stage retrieval with no caching or batching</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-white">After Optimizations</h2>
          <ul className="mt-3 text-gray-300">
            <li>Avg latency: <strong>{sampleAfter.avgLatencyMs}ms</strong></li>
            <li>Avg confidence: <strong>{(sampleAfter.avgConfidence * 100).toFixed(1)}%</strong></li>
            <li>Cost per request: <strong>${sampleAfter.costPerRequest}</strong></li>
            <li>Improvements: caching, batching, re-ranking, token-budget-aware prompts</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow mt-6">
        <h2 className="text-lg font-semibold text-white">Implementation Notes</h2>
        <ul className="mt-3 text-gray-300 list-disc list-inside">
          <li>Introduce an LRU cache for recent queries and answers to short-circuit repeated requests.</li>
          <li>Batch multiple retrievals in a single model call when possible.</li>
          <li>Use a lightweight re-ranker to improve top-3 result precision before prompting the generator.</li>
        </ul>
      </div>
    </div>
  );
}


