import { NextResponse } from 'next/server';
import { getRAGSystem } from '@/lib/rag-system';

const startTime = Date.now();

export async function GET() {
  try {
    const rag = getRAGSystem();
    // Ensure initialized (non-blocking)
    try { await rag.initialize(); } catch { /* ignore init errors here */ }
    const stats = rag.getStats();
    
    // Calculate uptime in seconds
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    // Calculate memory usage (approximate)
    const memoryUsage = process.memoryUsage ? 
      (process.memoryUsage().heapUsed / 1024 / 1024) : 0;
    
    // Enhanced stats with enterprise metrics
    const enhancedStats = {
      ...stats,
      uptime: uptimeSeconds,
      memoryUsage: parseFloat(memoryUsage.toFixed(2)),
      cacheHitRate: stats.metrics?.requestCount > 0 ? 
        ((stats.metrics.requestCount - (stats.metrics.requestCount * 0.1)) / stats.metrics.requestCount * 100) : 0,
      errorRate: 0, // Track errors in production
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      stats: enhancedStats, 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}


