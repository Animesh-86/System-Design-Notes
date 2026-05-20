"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { createHighlight, getHighlights, deleteHighlight } from '@/lib/actions/highlights';
import { createNote } from '@/lib/actions/notes';
import { HighlightingToolbar } from './HighlightingToolbar';
import { toast } from 'sonner';

interface InteractiveReaderProps {
  slug: string;
  children: React.ReactNode;
}

export function InteractiveReader({ slug, children }: InteractiveReaderProps) {
  const { highlights, setHighlights, addHighlight, removeHighlight, addNote } = useAppStore();
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load existing highlights on mount
  useEffect(() => {
    async function loadHighlights() {
      const res = await getHighlights(slug);
      if (res.data) {
        setHighlights(slug, res.data);
      }
    }
    loadHighlights();
  }, [slug, setHighlights]);

  // Listen for text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !containerRef.current) {
        setToolbarPosition(null);
        return;
      }

      // Ensure selection is inside the reader container
      const range = selection.getRangeAt(0);
      if (!containerRef.current.contains(range.commonAncestorContainer)) {
        setToolbarPosition(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length > 0) {
        const rect = range.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setSelectedText(text);
        setSelectionRange(range);
        
        // Calculate position relative to local relatively positioned parent container
        setToolbarPosition({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top - 48,
        });
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [slug]);

  const handleHighlight = async (color: string) => {
    if (!selectedText || !selectionRange) return;

    // Generate anchor path / offset (simplified for robust plain text matching or offset)
    const startOffset = selectionRange.startOffset;
    const endOffset = selectionRange.endOffset;
    
    // Clear selection visually
    window.getSelection()?.removeAllRanges();
    setToolbarPosition(null);

    const result = await createHighlight({
      slug,
      highlighted_text: selectedText,
      color,
      start_offset: startOffset,
      end_offset: endOffset,
      anchor_node_path: 'p',
    });

    if (result.data) {
      addHighlight(slug, result.data);
      toast.success('Highlighted!');
      
      // Force a re-render/decoration if needed
      highlightDOM(selectedText, color, result.data.id);
    } else {
      toast.error('Failed to save highlight');
    }
  };

  const handleAnnotate = async (noteContent: string) => {
    if (!selectedText || !selectionRange) return;

    window.getSelection()?.removeAllRanges();
    setToolbarPosition(null);

    const result = await createNote({
      slug,
      content: noteContent,
      note_type: 'annotation',
      referenced_text: selectedText,
    });

    if (result.data) {
      addNote(slug, result.data);
      toast.success('Annotation saved!');
    } else {
      toast.error('Failed to save annotation');
    }
  };

  // Helper to visually highlight newly selected text dynamically in the current session
  const highlightDOM = (text: string, color: string, id: string) => {
    // Basic dynamic highlight wrapper (best effort client-side style injection)
    const selection = window.getSelection();
    if (!selectionRange) return;

    const span = document.createElement('span');
    span.className = `highlight-${color} bg-${color}-500/25 border-b border-${color}-500 cursor-pointer transition-all duration-200`;
    span.setAttribute('data-highlight-id', id);
    span.onclick = async () => {
      if (confirm('Delete this highlight?')) {
        const res = await deleteHighlight(id);
        if (res.success) {
          span.replaceWith(...Array.from(span.childNodes));
          removeHighlight(slug, id);
          toast.success('Highlight deleted');
        }
      }
    };

    try {
      selectionRange.surroundContents(span);
    } catch (e) {
      // Fallback if range spans multiple elements
      console.warn("Could not perfectly surround elements, highlight is saved to DB.", e);
    }
  };

  return (
    <div ref={containerRef} className="relative selection:bg-blue-500/30">
      {children}
      
      {toolbarPosition && (
        <HighlightingToolbar
          x={toolbarPosition.x}
          y={toolbarPosition.y}
          onHighlight={handleHighlight}
          onAnnotate={handleAnnotate}
        />
      )}
    </div>
  );
}
