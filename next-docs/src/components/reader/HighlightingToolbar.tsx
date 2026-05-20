"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Highlighter, MessageSquarePlus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HighlightingToolbarProps {
  x: number;
  y: number;
  onHighlight: (color: string) => void;
  onAnnotate: (text: string) => void;
}

const colors = [
  { name: 'yellow', class: 'bg-yellow-400 hover:bg-yellow-300 ring-yellow-400/30' },
  { name: 'green', class: 'bg-emerald-400 hover:bg-emerald-300 ring-emerald-400/30' },
  { name: 'blue', class: 'bg-blue-400 hover:bg-blue-300 ring-blue-400/30' },
  { name: 'pink', class: 'bg-pink-400 hover:bg-pink-300 ring-pink-400/30' },
  { name: 'purple', class: 'bg-purple-400 hover:bg-purple-300 ring-purple-400/30' },
];

export function HighlightingToolbar({ x, y, onHighlight, onAnnotate }: HighlightingToolbarProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Position toolbar relative to viewport/scrolling offset
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translateX(-50%)',
  };

  useEffect(() => {
    if (showNoteInput && containerRef.current) {
      const textarea = containerRef.current.querySelector('textarea');
      textarea?.focus();
    }
  }, [showNoteInput]);

  const handleAnnotateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAnnotate(noteText.trim());
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={style}
      className="z-50 bg-gray-900/95 dark:bg-[#141417]/95 border border-white/10 rounded-2xl shadow-2xl p-1.5 flex flex-col gap-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 max-w-[280px]"
      onMouseDown={(e) => {
        // Prevent selection collapse unless the user is clicking on an input or textarea
        const target = e.target as HTMLElement;
        if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') {
          e.preventDefault();
        }
        e.stopPropagation();
      }}
    >
      {!showNoteInput ? (
        <div className="flex items-center gap-1.5">
          {/* Highlighter Colors */}
          <div className="flex items-center gap-1 px-1 border-r border-white/10 pr-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onHighlight(color.name)}
                className={`w-5 h-5 rounded-full ${color.class} hover:scale-110 active:scale-95 transition-all ring-2 ring-transparent hover:ring-offset-2 hover:ring-offset-gray-900 cursor-pointer`}
                title={`Highlight in ${color.name}`}
              />
            ))}
          </div>

          {/* Add Annotation Button */}
          <button
            onClick={() => setShowNoteInput(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
            title="Add Inline Note/Annotation"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            Annotate
          </button>
        </div>
      ) : (
        <form onSubmit={handleAnnotateSubmit} className="flex flex-col gap-1.5 p-1 w-[240px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-[10px] text-gray-400 font-semibold">Inline Annotation</span>
            <button
              type="button"
              onClick={() => setShowNoteInput(false)}
              className="p-0.5 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write annotation for selected text..."
            className="w-full text-xs p-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none h-16"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleAnnotateSubmit(e);
              }
            }}
          />
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Ctrl+Enter to save</span>
            <button
              type="submit"
              disabled={!noteText.trim()}
              className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-md text-[10px] text-white font-semibold transition-all cursor-pointer"
            >
              <Check className="w-3 h-3" />
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
