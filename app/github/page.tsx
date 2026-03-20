'use client';

export default function GitHubPage() {
  // Repository and deployment URLs
  const githubRepoUrl = "https://github.com/barbiefortes04-jpg/digital-twin-rag";
  const deploymentUrl = "https://digital-twin-rag-gamma.vercel.app";
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-6">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">GitHub Repository</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Complete implementation source code and documentation</p>
        </div>

        {/* Repository Info */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Repository Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Project Name</h3>
              <p className="text-gray-300">Digital Twin RAG System</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300">A local Retrieval-Augmented Generation (RAG) system for professional profile queries. Features semantic search, STAR methodology implementation, and real-time response generation with quality assessment.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Repository URL</h3>
              <p className="text-sm text-gray-400 mb-3 break-all">{githubRepoUrl}</p>
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Deployment URL</h3>
              <p className="text-sm text-gray-400 mb-3 break-all">{deploymentUrl}</p>
              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                View Deployment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Repository Contents */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Repository Contents</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📁 /app</h3>
              <p className="text-gray-300 text-sm">Next.js application pages and API routes including main query interface, about page, testing suite, profile data display, and GitHub information.</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📁 /lib</h3>
              <p className="text-gray-300 text-sm">Core RAG system implementation, professional profile data with STAR examples, utility functions, and helper modules.</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📄 README.md</h3>
              <p className="text-gray-300 text-sm">Comprehensive documentation including setup instructions, architecture overview, usage examples, and deployment guide.</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📄 package.json</h3>
              <p className="text-gray-300 text-sm">Project dependencies and scripts including Next.js, Transformers.js, TailwindCSS, and TypeScript configurations.</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📄 tsconfig.json</h3>
              <p className="text-gray-300 text-sm">TypeScript configuration for type checking and compilation settings.</p>
            </div>
          </div>
        </div>

        {/* Implementation Steps */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Steps 3-4 Implementation</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-2">Step 3: Professional Profile Optimization</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Structured 10+ STAR examples covering technical, leadership, and problem-solving competencies</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Organized technical skills by category (Frontend, Backend, AI/ML, DevOps, Cloud)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Documented work experience with quantified achievements</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Added keywords and metadata for enhanced retrieval</span></li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-2">Step 4: RAG System Implementation</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Implemented vector embeddings using Transformers.js (all-MiniLM-L6-v2)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Built custom vector store with cosine similarity search</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Created query processing with confidence scoring</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Developed interactive UI with real-time response generation</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-1">✓</span><span>Added comprehensive testing suite with 25+ sample queries</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Next.js 16</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS</li>
              </ul>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">AI/ML</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Transformers.js</li>
                <li>• ONNX Runtime</li>
                <li>• Vector Embeddings</li>
                <li>• Semantic Search</li>
              </ul>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Git Version Control</li>
                <li>• npm Package Manager</li>
                <li>• ESLint</li>
                <li>• PostCSS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Setup</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">1. Clone Repository</h3>
              <code className="text-sm bg-gray-900 text-green-400 px-4 py-2 rounded block overflow-x-auto">git clone {githubRepoUrl}</code>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">2. Install Dependencies</h3>
              <code className="text-sm bg-gray-900 text-green-400 px-4 py-2 rounded block overflow-x-auto">npm install</code>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">3. Run Development Server</h3>
              <code className="text-sm bg-gray-900 text-green-400 px-4 py-2 rounded block overflow-x-auto">npm run dev</code>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">4. Open in Browser</h3>
              <code className="text-sm bg-gray-900 text-green-400 px-4 py-2 rounded block overflow-x-auto">http://localhost:3000</code>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
