"use client";

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

// Extract plain text from React nodes for copying
const getRawText = (node: any): string => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getRawText).join('');
  if (node && node.props && node.props.children !== undefined) {
    return getRawText(node.props.children);
  }
  return '';
};

export function CodeBlock({ children, language = 'code' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const rawText = getRawText(children);
    try {
      await navigator.clipboard.writeText(rawText.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getLanguageLabel = (lang: string) => {
    const cleanLang = lang.replace('language-', '').toLowerCase();
    switch (cleanLang) {
      case 'java': return 'JAVA';
      case 'javascript':
      case 'js': return 'JAVASCRIPT';
      case 'html': return 'HTML';
      case 'css': return 'CSS';
      case 'python':
      case 'py': return 'PYTHON';
      case 'sql': return 'SQL';
      default: return cleanLang.toUpperCase();
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-[#0e0e11] dark:bg-black/60 transition-all duration-200">
      {/* Editor Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-black/10 dark:border-white/5 select-none">
        {/* macOS Style Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-rose-500/90 block hover:scale-105 transition-transform" />
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500/90 block hover:scale-105 transition-transform" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/90 block hover:scale-105 transition-transform" />
        </div>
        
        {/* Language Badge */}
        <div className="text-[10px] font-bold font-mono tracking-widest text-gray-500 px-2 py-0.5 rounded bg-white/5 border border-white/5 uppercase">
          {getLanguageLabel(language)}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold font-sans rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-gray-200 active:scale-95 transition-all cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed bg-[#0e0e11] custom-scrollbar">
        <pre className="m-0 p-0 bg-transparent border-0 rounded-none overflow-visible">
          <code className={`${language} hljs bg-transparent p-0 border-0 font-mono`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
