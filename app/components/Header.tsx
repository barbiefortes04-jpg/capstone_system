'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      if (typeof window === 'undefined') return 'dark';
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored as 'light' | 'dark';
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-400">Digital Twin RAG</Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
              <Link href="/monitoring" className="text-gray-300 hover:text-white transition">Monitoring</Link>
              <Link href="/scalability" className="text-gray-300 hover:text-white transition">Scalability</Link>
              <Link href="/operations" className="text-gray-300 hover:text-white transition">Operations</Link>
              <Link href="/testing" className="text-gray-300 hover:text-white transition">Testing</Link>
              <Link href="/github" className="text-gray-300 hover:text-white transition">GitHub</Link>
            </nav>

            <button
              onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


