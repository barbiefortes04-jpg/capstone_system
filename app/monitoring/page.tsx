'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SystemMetrics {
  uptime: number;
  totalRequests: number;
  avgLatencyMs: number;
  lastRequestMs: number;
  cacheHitRate: number;
  errorRate: number;
  documentsIndexed: number;
  memoryUsage: number;
  timestamp: string;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  checks: {
    api: boolean;
    embeddings: boolean;
    vectorStore: boolean;
    cache: boolean;
  };
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchMetrics = async () => {
    try {
      const [metricsRes, healthRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/health')
      ]);

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics({
          uptime: data.stats?.uptime || 0,
          totalRequests: data.stats?.metrics?.requestCount || 0,
          avgLatencyMs: data.stats?.metrics?.avgLatencyMs || 0,
          lastRequestMs: data.stats?.metrics?.lastRequestMs || 0,
          cacheHitRate: data.stats?.cacheHitRate || 0,
          errorRate: data.stats?.errorRate || 0,
          documentsIndexed: data.stats?.totalDocuments || 0,
          memoryUsage: data.stats?.memoryUsage || 0,
          timestamp: data.timestamp
        });
      }

      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setHealth(healthData);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status?: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-900/20 border-green-700';
      case 'degraded': return 'bg-yellow-900/20 border-yellow-700';
      case 'down': return 'bg-red-900/20 border-red-700';
      default: return 'bg-gray-900/20 border-gray-700';
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">System Monitoring</h1>
              <p className="text-gray-400">Real-time performance metrics and health status</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition",
                  autoRefresh
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                )}
              >
                {autoRefresh ? '🔄 Auto-Refresh ON' : '⏸️ Auto-Refresh OFF'}
              </button>
              <button
                onClick={fetchMetrics}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                🔄 Refresh Now
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Loading metrics...</p>
          </div>
        ) : (
          <>
            {/* Health Status */}
            <div className={cn("rounded-xl p-6 mb-8 border-2", getStatusBg(health?.status))}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">System Health</h2>
                  <p className={cn("text-xl font-semibold", getStatusColor(health?.status))}>
                    {health?.status?.toUpperCase() || 'UNKNOWN'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {health?.checks && Object.entries(health.checks).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className={cn("text-2xl", value ? "text-green-500" : "text-red-500")}>
                        {value ? '✓' : '✗'}
                      </span>
                      <span className="text-sm text-gray-300 capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Requests"
                value={metrics?.totalRequests.toLocaleString() || '0'}
                icon="📊"
                color="blue"
              />
              <MetricCard
                title="Avg Latency"
                value={`${metrics?.avgLatencyMs || 0}ms`}
                icon="⚡"
                color="green"
                subtitle={metrics?.avgLatencyMs && metrics.avgLatencyMs < 100 ? 'Excellent' : 'Good'}
              />
              <MetricCard
                title="Documents Indexed"
                value={metrics?.documentsIndexed.toString() || '0'}
                icon="📚"
                color="purple"
              />
              <MetricCard
                title="System Uptime"
                value={formatUptime(metrics?.uptime || 0)}
                icon="⏱️"
                color="yellow"
              />
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🎯</span> Performance Metrics
                </h3>
                <div className="space-y-4">
                  <MetricRow label="Cache Hit Rate" value={`${(metrics?.cacheHitRate || 0).toFixed(1)}%`} />
                  <MetricRow label="Error Rate" value={`${(metrics?.errorRate || 0).toFixed(2)}%`} />
                  <MetricRow label="Last Request" value={`${metrics?.lastRequestMs || 0}ms`} />
                  <MetricRow label="Memory Usage" value={`${(metrics?.memoryUsage || 0).toFixed(1)} MB`} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> System Status
                </h3>
                <div className="space-y-4">
                  <StatusIndicator label="API Endpoint" status={health?.checks?.api} />
                  <StatusIndicator label="Embeddings Model" status={health?.checks?.embeddings} />
                  <StatusIndicator label="Vector Store" status={health?.checks?.vectorStore} />
                  <StatusIndicator label="Cache System" status={health?.checks?.cache} />
                </div>
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🔴</span> Live Activity Monitor
              </h3>
              <div className="space-y-3">
                <ActivityLog
                  timestamp={metrics?.timestamp || new Date().toISOString()}
                  event="System metrics updated"
                  status="success"
                />
                <ActivityLog
                  timestamp={metrics?.timestamp || new Date().toISOString()}
                  event={`Processed ${metrics?.totalRequests || 0} total requests`}
                  status="info"
                />
                <ActivityLog
                  timestamp={metrics?.timestamp || new Date().toISOString()}
                  event={`Average response time: ${metrics?.avgLatencyMs || 0}ms`}
                  status={metrics && metrics.avgLatencyMs < 100 ? 'success' : 'warning'}
                />
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Last updated: {metrics?.timestamp ? new Date(metrics.timestamp).toLocaleString() : 'Never'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, subtitle }: { title: string; value: string; icon: string; color: string; subtitle?: string }) {
  const colorClasses = {
    blue: 'bg-blue-900/20 border-blue-700',
    green: 'bg-green-900/20 border-green-700',
    purple: 'bg-purple-900/20 border-purple-700',
    yellow: 'bg-yellow-900/20 border-yellow-700'
  };

  return (
    <div className={cn("rounded-xl p-6 border-2", colorClasses[color as keyof typeof colorClasses])}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

function StatusIndicator({ label, status }: { label: string; status?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={cn("font-semibold", status ? "text-green-500" : "text-red-500")}>
        {status ? '✓ Operational' : '✗ Down'}
      </span>
    </div>
  );
}

function ActivityLog({ timestamp, event, status }: { timestamp: string; event: string; status: 'success' | 'warning' | 'info' | 'error' }) {
  const statusColors = {
    success: 'text-green-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
    error: 'text-red-500'
  };

  const statusIcons = {
    success: '✓',
    warning: '⚠',
    info: 'ℹ',
    error: '✗'
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
      <span className={cn("text-xl", statusColors[status])}>
        {statusIcons[status]}
      </span>
      <div className="flex-1">
        <p className="text-gray-300">{event}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
