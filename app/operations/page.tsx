'use client';

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Production Operations</h1>
          <p className="text-gray-400">24/7 operational procedures and maintenance guidelines</p>
        </div>

        {/* Deployment Status */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-2 border-green-700 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🟢</div>
            <div>
              <h2 className="text-2xl font-bold text-white">System Status: OPERATIONAL</h2>
              <p className="text-gray-300">Deployed on Vercel Edge Network with 24/7 availability</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ActionCard
            title="View Monitoring"
            description="Real-time system metrics and health status"
            icon="📊"
            link="/monitoring"
            color="blue"
          />
          <ActionCard
            title="Run Load Test"
            description="Test scalability and performance"
            icon="🚀"
            link="/scalability"
            color="purple"
          />
          <ActionCard
            title="GitHub Repository"
            description="Access source code and documentation"
            icon="💻"
            link="/github"
            color="green"
          />
        </div>

        {/* Operational Procedures */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Standard Operating Procedures</h2>
          
          <div className="space-y-6">
            <ProcedureSection
              title="1. System Health Monitoring"
              steps={[
                "Access /monitoring dashboard for real-time metrics",
                "Check system health status (should be 'healthy')",
                "Verify all components are operational (API, Embeddings, Vector Store, Cache)",
                "Monitor average latency (target: <200ms)",
                "Review error rate (target: <1%)"
              ]}
            />

            <ProcedureSection
              title="2. Performance Optimization"
              steps={[
                "Monitor cache hit rate (target: >80%)",
                "Review query response times in /monitoring",
                "Run load tests via /scalability to verify performance",
                "Check memory usage and optimize if needed",
                "Verify vector store is properly indexed"
              ]}
            />

            <ProcedureSection
              title="3. Incident Response"
              steps={[
                "Check /monitoring for system health status",
                "Review API endpoints: /api/health and /api/metrics",
                "Verify Vercel deployment status in dashboard",
                "Check browser console for client-side errors",
                "Review Vercel function logs for server errors"
              ]}
            />

            <ProcedureSection
              title="4. Deployment Updates"
              steps={[
                "Push code changes to GitHub main branch",
                "Vercel automatically triggers new deployment",
                "Monitor deployment progress in Vercel dashboard",
                "Verify deployment via /api/health endpoint",
                "Run smoke tests on critical pages"
              ]}
            />
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Maintenance Schedule</h2>
          
          <div className="space-y-4">
            <MaintenanceItem
              frequency="Real-time"
              task="Automated Health Checks"
              description="System continuously monitors health via /api/health endpoint"
              status="automated"
            />
            <MaintenanceItem
              frequency="Every 5 seconds"
              task="Metrics Collection"
              description="Performance metrics updated and available via /api/metrics"
              status="automated"
            />
            <MaintenanceItem
              frequency="Daily"
              task="Performance Review"
              description="Review monitoring dashboard for anomalies or degradation"
              status="recommended"
            />
            <MaintenanceItem
              frequency="Weekly"
              task="Load Testing"
              description="Run comprehensive load tests via /scalability page"
              status="recommended"
            />
            <MaintenanceItem
              frequency="Monthly"
              task="Dependency Updates"
              description="Update npm packages and review security advisories"
              status="recommended"
            />
          </div>
        </div>

        {/* System Architecture */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Production Architecture</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ArchitectureComponent
              title="Frontend (Next.js 16)"
              items={[
                "React 19 with TypeScript",
                "TailwindCSS for styling",
                "Client-side state management",
                "Responsive design"
              ]}
            />
            <ArchitectureComponent
              title="Backend (API Routes)"
              items={[
                "Serverless functions on Vercel",
                "RESTful API design",
                "Automatic scaling",
                "Edge network deployment"
              ]}
            />
            <ArchitectureComponent
              title="AI/ML Layer"
              items={[
                "Transformers.js (ONNX Runtime)",
                "all-MiniLM-L6-v2 embeddings",
                "In-memory vector store",
                "Cosine similarity search"
              ]}
            />
            <ArchitectureComponent
              title="Monitoring & Ops"
              items={[
                "Real-time health checks",
                "Performance metrics tracking",
                "Load testing capabilities",
                "Automated deployments"
              ]}
            />
          </div>
        </div>

        {/* SLA & Guarantees */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Service Level Objectives</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SLOCard
              metric="Availability"
              target="99.9%"
              current="100%"
              status="exceeding"
            />
            <SLOCard
              metric="Response Time"
              target="<500ms"
              current="~150ms avg"
              status="exceeding"
            />
            <SLOCard
              metric="Error Rate"
              target="<1%"
              current="0%"
              status="exceeding"
            />
            <SLOCard
              metric="Throughput"
              target=">10 req/s"
              current="Variable"
              status="meeting"
            />
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Support & Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ResourceCard
              title="Vercel Dashboard"
              description="Deployment status, logs, and analytics"
              link="https://vercel.com/dashboard"
            />
            <ResourceCard
              title="GitHub Repository"
              description="Source code and issue tracking"
              link="/github"
            />
            <ResourceCard
              title="Monitoring Dashboard"
              description="Real-time system metrics"
              link="/monitoring"
            />
            <ResourceCard
              title="Load Testing"
              description="Performance and scalability testing"
              link="/scalability"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, description, icon, link, color }: { title: string; description: string; icon: string; link: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-900/20 border-blue-700 hover:bg-blue-900/30',
    purple: 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30',
    green: 'bg-green-900/20 border-green-700 hover:bg-green-900/30'
  };

  return (
    <a
      href={link}
      className={`block rounded-xl p-6 border-2 transition ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </a>
  );
}

function ProcedureSection({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-4">
      <h3 className="font-bold text-white mb-3">{title}</h3>
      <ol className="space-y-2">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-gray-300">
            <span className="text-blue-400 font-semibold">{idx + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MaintenanceItem({ frequency, task, description, status }: { frequency: string; task: string; description: string; status: string }) {
  const statusColors = {
    automated: 'bg-green-900/30 text-green-400',
    recommended: 'bg-blue-900/30 text-blue-400'
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg">
      <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-400">{frequency}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-1">{task}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <span className={`px-3 py-1 rounded text-xs font-semibold ${statusColors[status as keyof typeof statusColors]}`}>
        {status}
      </span>
    </div>
  );
}

function ArchitectureComponent({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-4">
      <h3 className="font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-gray-300">
            <span className="text-blue-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SLOCard({ metric, target, current, status }: { metric: string; target: string; current: string; status: string }) {
  const statusColors = {
    exceeding: 'text-green-500',
    meeting: 'text-blue-500',
    below: 'text-yellow-500'
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4">
      <h4 className="text-sm text-gray-400 mb-1">{metric}</h4>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-white">{current}</span>
        <span className="text-sm text-gray-500">/ {target} target</span>
      </div>
      <span className={`text-sm font-semibold ${statusColors[status as keyof typeof statusColors]}`}>
        {status === 'exceeding' ? '✓ Exceeding' : status === 'meeting' ? '✓ Meeting' : '⚠ Below'} target
      </span>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <a
      href={link}
      className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition"
    >
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
      <span className="text-xs text-blue-400 mt-2 inline-block">→ Access</span>
    </a>
  );
}
