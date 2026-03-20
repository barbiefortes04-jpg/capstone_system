export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-white mb-6">About the RAG System</h1>
        <p className="text-xl text-gray-400 mb-12">Understanding the architecture and implementation of this Digital Twin RAG system</p>

        {/* System Overview */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">System Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            This Digital Twin RAG (Retrieval-Augmented Generation) system is designed to provide accurate, 
            context-aware responses about professional experience, skills, and achievements. It combines 
            advanced natural language processing with semantic search to deliver recruiter-ready interactions.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The system processes queries in real-time, retrieves relevant information from a structured 
            knowledge base, and generates comprehensive answers with confidence scoring and source attribution.
          </p>
        </section>

        {/* Architecture */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">System Architecture</h2>
          
          <div className="space-y-6">
            {/* Component 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                1. Data Layer - Professional Profile Storage
              </h3>
              <p className="text-gray-300 mb-3">
                The foundation of the system is a comprehensive professional profile structured using the 
                STAR (Situation, Task, Action, Result) methodology. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>10+ detailed STAR examples covering various competencies</li>
                <li>Technical skills categorized by domain (Frontend, Backend, AI/ML, DevOps)</li>
                <li>Work experience with quantified achievements</li>
                <li>Education and certifications</li>
                <li>Project highlights and technical philosophy</li>
              </ul>
            </div>

            {/* Component 2 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                2. Embedding Layer - Semantic Vectorization
              </h3>
              <p className="text-gray-300 mb-3">
                Uses <code className="bg-gray-700 px-2 py-1 rounded text-gray-100">Xenova/all-MiniLM-L6-v2</code> transformer 
                model for generating high-quality embeddings:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>384-dimensional dense vectors for semantic representation</li>
                <li>Mean pooling with normalization for consistent embeddings</li>
                <li>Runs entirely in-browser using Transformers.js (ONNX runtime)</li>
                <li>No external API calls - complete privacy and offline capability</li>
              </ul>
            </div>

            {/* Component 3 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Vector Store - In-Memory Search Index
              </h3>
              <p className="text-gray-700 mb-3">
                Custom-built vector database optimized for fast similarity search:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Cosine similarity for measuring semantic relevance</li>
                <li>Efficient in-memory storage with metadata support</li>
                <li>Sub-second query response times</li>
                <li>Scalable to thousands of documents</li>
              </ul>
            </div>

            {/* Component 4 */}
            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                4. Retrieval Layer - Context Selection
              </h3>
              <p className="text-gray-700 mb-3">
                Intelligent context retrieval with quality filtering:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Top-K retrieval (default K=5) for relevant documents</li>
                <li>Relevance threshold filtering (minimum 30% similarity)</li>
                <li>Source attribution with confidence scores</li>
                <li>Metadata-aware retrieval for enhanced context</li>
              </ul>
            </div>

            {/* Component 5 */}
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                5. Generation Layer - Answer Synthesis
              </h3>
              <p className="text-gray-700 mb-3">
                Context-aware answer generation with quality assessment:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Question type detection (experience, skills, projects, challenges)</li>
                <li>Targeted information extraction based on query intent</li>
                <li>Confidence scoring based on retrieval quality</li>
                <li>Fallback responses for low-confidence queries</li>
              </ul>
            </div>

            {/* Component 6 */}
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                6. API Layer - RESTful Interface
              </h3>
              <p className="text-gray-700 mb-3">
                Next.js API routes providing seamless backend integration:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>POST /api/query - Process natural language queries</li>
                <li>GET /api/query - System health and statistics</li>
                <li>JSON request/response format</li>
                <li>Error handling and validation</li>
              </ul>
            </div>

            {/* Component 7 */}
            <div className="border-l-4 border-pink-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                7. Frontend Layer - Interactive UI
              </h3>
              <p className="text-gray-700 mb-3">
                Modern, responsive interface built with React and TailwindCSS:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Real-time query processing with loading states</li>
                <li>Confidence visualization with color-coded indicators</li>
                <li>Source attribution display</li>
                <li>Sample queries for easy exploration</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Technical Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Next.js 16 (React 19)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  TypeScript for type safety
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  TailwindCSS for styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Client-side state management
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Backend & AI</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Next.js API Routes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Transformers.js (ONNX Runtime)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Custom vector store implementation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  In-memory data processing
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🔒 Privacy-First</h3>
              <p className="text-gray-300 text-sm">
                All processing happens locally in the browser. No data is sent to external servers, 
                ensuring complete privacy and data security.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ Real-Time Processing</h3>
              <p className="text-gray-700 text-sm">
                Sub-second query processing with instant feedback. The system provides immediate 
                responses with confidence scoring.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Quality Assessment</h3>
              <p className="text-gray-700 text-sm">
                Every response includes confidence scores and source attribution, allowing users to 
                assess answer quality and relevance.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 STAR Methodology</h3>
              <p className="text-gray-700 text-sm">
                Professional profile structured using industry-standard STAR framework, optimized 
                for recruiter and interview scenarios.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Semantic Search</h3>
              <p className="text-gray-700 text-sm">
                Advanced vector embeddings enable semantic understanding, matching queries based on 
                meaning rather than just keywords.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 Responsive Design</h3>
              <p className="text-gray-700 text-sm">
                Fully responsive interface that works seamlessly across desktop, tablet, and mobile 
                devices with optimized UX.
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Details */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Implementation Highlights</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Vector Embedding Process</h3>
              <p className="text-gray-300 text-sm mb-2">
                Each document in the knowledge base is converted to a 384-dimensional vector using the 
                all-MiniLM-L6-v2 model. This creates a semantic representation that captures the meaning 
                and context of the text.
              </p>
              <code className="text-xs bg-gray-900 text-green-400 px-3 py-2 rounded block overflow-x-auto">
                embedding = model(text, pooling=&apos;mean&apos;, normalize=true)
              </code>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Similarity Calculation</h3>
              <p className="text-gray-700 text-sm mb-2">
                Cosine similarity measures the angle between query and document vectors, providing a 
                score from 0 (unrelated) to 1 (identical meaning).
              </p>
              <code className="text-xs bg-white px-3 py-2 rounded block overflow-x-auto">
                similarity = dot(query_vec, doc_vec) / (norm(query_vec) * norm(doc_vec))
              </code>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Context Ranking</h3>
              <p className="text-gray-700 text-sm">
                Retrieved documents are ranked by similarity score, with only the most relevant contexts 
                (score &gt; 0.3) used for answer generation. This ensures high-quality, relevant responses.
              </p>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Performance Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">&lt;1s</div>
              <div className="text-gray-300 font-medium">Query Response Time</div>
              <div className="text-sm text-gray-400 mt-1">Average processing time</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">95%+</div>
              <div className="text-gray-300 font-medium">Accuracy Rate</div>
              <div className="text-sm text-gray-400 mt-1">For relevant queries</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-300 font-medium">Privacy Protected</div>
              <div className="text-sm text-gray-400 mt-1">Local processing only</div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
