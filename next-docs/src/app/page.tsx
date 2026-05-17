import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, LayoutTemplate } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in zoom-in duration-500 p-6">
      <div className="inline-flex items-center rounded-full border border-blue-500/20 dark:border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-300">
        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
        Interactive Learning Hub
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl text-gray-900 dark:text-white">
        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">System Design</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
        Your ultimate workspace for High Level Design (HLD), Low Level Design (LLD), Object-Oriented Programming, and architectural patterns.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm hover:bg-black/[0.04] dark:hover:bg-white/10 transition-all duration-200">
          <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">LLD Crash Course</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">73 detailed lessons covering OOP, SOLID, and Design Patterns.</p>
        </div>
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm hover:bg-black/[0.04] dark:hover:bg-white/10 transition-all duration-200">
          <Layers className="w-8 h-8 text-purple-500 dark:text-purple-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">HLD Architecture</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Deep dive into scalable system architectures and design documents.</p>
        </div>
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm hover:bg-black/[0.04] dark:hover:bg-white/10 transition-all duration-200">
          <LayoutTemplate className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Interview Resources</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Roadmaps, top 20 questions, and ultimate interview prep guides.</p>
        </div>
      </div>
    </div>
  );
}
