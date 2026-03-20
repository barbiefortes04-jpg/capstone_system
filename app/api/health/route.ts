import { NextResponse } from 'next/server';
import { getRAGSystem } from '@/lib/rag-system';

export async function GET() {
  try {
    const rag = getRAGSystem();
    const stats = rag.getStats();
    
    // Perform health checks
    const checks = {
      api: true, // API is responding
      embeddings: stats.isInitialized,
      vectorStore: typeof stats.totalDocuments === 'number' ? stats.totalDocuments > 0 : stats.totalDocuments !== 'Managed by Upstash Vector',
      cache: true // Cache is always available
    };

    // Determine overall health status
    const allHealthy = Object.values(checks).every(check => check);
    const someHealthy = Object.values(checks).some(check => check);
    
    const status = allHealthy ? 'healthy' : someHealthy ? 'degraded' : 'down';

    return NextResponse.json({
      status,
      checks,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'down',
        checks: {
          api: false,
          embeddings: false,
          vectorStore: false,
          cache: false
        },
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}
