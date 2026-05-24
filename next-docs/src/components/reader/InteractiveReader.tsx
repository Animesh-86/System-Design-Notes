"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { createHighlight, getHighlights, deleteHighlight } from '@/lib/actions/highlights';
import { createNote } from '@/lib/actions/notes';
import { HighlightingToolbar } from './HighlightingToolbar';
import { toast } from 'sonner';
import { Trash2, X, Loader2 } from 'lucide-react';

const COLOR_MAP: Record<string, string> = {
  yellow: 'rgba(250, 204, 21, 0.3)',
  green: 'rgba(52, 211, 153, 0.3)',
  blue: 'rgba(96, 165, 250, 0.3)',
  pink: 'rgba(244, 114, 182, 0.3)',
  purple: 'rgba(192, 132, 252, 0.3)',
};

interface DeleteTooltipInfo {
  highlightId: string;
  spanElement: HTMLSpanElement;
  x: number;
  y: number;
}

interface InteractiveReaderProps {
  slug: string;
  children: React.ReactNode;
}

export function InteractiveReader({ slug, children }: InteractiveReaderProps) {
  const { setHighlights, addHighlight, removeHighlight, addNote } = useAppStore();
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number } | null>(null);
  const [deleteTooltip, setDeleteTooltip] = useState<DeleteTooltipInfo | null>(null);
  const [deleting, setDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const deleteTooltipRef = useRef<HTMLDivElement>(null);

  // Use refs so toolbar button clicks can access these values even after
  // the browser selection has been cleared / collapsed.
  const selectedTextRef = useRef('');
  const selectionRangeRef = useRef<Range | null>(null);
  // Track whether user is interacting with the toolbar so we don't dismiss it
  const toolbarActiveRef = useRef(false);

  // Load existing highlights on mount
  useEffect(() => {
    async function loadHighlights() {
      const res = await getHighlights(slug);
      if (res.data) {
        setHighlights(slug, res.data);
        // Visually display all loaded highlights
        renderHighlights(res.data);
      }
    }
    loadHighlights();
  }, [slug, setHighlights]);

  // Close delete tooltip when clicking outside
  useEffect(() => {
    if (!deleteTooltip) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (deleteTooltipRef.current && !deleteTooltipRef.current.contains(e.target as Node)) {
        setDeleteTooltip(null);
      }
    };

    // Delay listener so the click that opened the tooltip doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteTooltip]);

  /** Attach a click handler to a highlight span that shows the inline delete tooltip */
  const attachDeleteHandler = (span: HTMLSpanElement, highlightId: string) => {
    span.onclick = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();

      const rect = span.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      setDeleteTooltip({
        highlightId,
        spanElement: span,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 8,
      });
    };
  };

  /** Create a styled highlight span element */
  const createHighlightSpan = (color: string, highlightId: string, text: string) => {
    const span = document.createElement('span');
    span.style.backgroundColor = COLOR_MAP[color] || COLOR_MAP.yellow;
    span.style.borderBottom = `2px solid ${COLOR_MAP[color]?.replace('0.3', '0.8') || 'rgba(250, 204, 21, 0.8)'}`;
    span.style.cursor = 'pointer';
    span.style.transition = 'all 0.2s';
    span.style.borderRadius = '2px';
    span.setAttribute('data-highlight-id', highlightId);
    span.appendChild(document.createTextNode(text));
    attachDeleteHandler(span, highlightId);
    return span;
  };

  // Render highlights visually on the page
  const renderHighlights = (highlights: any[]) => {
    const container = containerRef.current;
    if (!container) return;

    highlights.forEach((highlight) => {
      try {
        // Find and wrap the highlighted text
        const walker = document.createTreeWalker(
          container as Node,
          NodeFilter.SHOW_TEXT,
          null
        );

        const textToFind = highlight.highlighted_text;
        const nodesToProcess: Node[] = [];
        let node;

        // Collect all text nodes
        while ((node = walker.nextNode())) {
          nodesToProcess.push(node);
        }

        // Process nodes to find and wrap the highlighted text
        nodesToProcess.forEach((textNode) => {
          const content = textNode.textContent || '';
          if (content.includes(textToFind)) {
            const parts = content.split(textToFind);
            const fragment = document.createDocumentFragment();

            parts.forEach((part, index) => {
              if (part) {
                fragment.appendChild(document.createTextNode(part));
              }

              // Add highlighted span between parts (except after last part)
              if (index < parts.length - 1) {
                const span = createHighlightSpan(highlight.color, highlight.id, textToFind);
                fragment.appendChild(span);
              }
            });

            textNode.parentNode?.replaceChild(fragment, textNode);
          }
        });
      } catch (err) {
        console.error('Error rendering highlight:', err);
      }
    });
  };

  /** Handle deleting a highlight via the inline tooltip */
  const handleDeleteHighlight = async () => {
    if (!deleteTooltip || deleting) return;

    setDeleting(true);
    try {
      const res = await deleteHighlight(deleteTooltip.highlightId);
      if (res.success) {
        // Remove the visual span
        const span = deleteTooltip.spanElement;
        span.replaceWith(...Array.from(span.childNodes));
        removeHighlight(slug, deleteTooltip.highlightId);
        toast.success('Highlight deleted');
      } else {
        toast.error('Failed to delete highlight');
      }
    } catch {
      toast.error('Network error');
    }
    setDeleting(false);
    setDeleteTooltip(null);
  };

  // Use mouseup on the container to detect text selection instead of
  // selectionchange, which fires too aggressively and causes race conditions.
  const handleMouseUp = useCallback(() => {
    // Small delay to let the browser finish updating the selection
    setTimeout(() => {
      if (toolbarActiveRef.current) return; // Don't dismiss while user is on toolbar

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !containerRef.current) {
        setToolbarPosition(null);
        return;
      }

      const range = selection.getRangeAt(0);
      if (!containerRef.current.contains(range.commonAncestorContainer)) {
        setToolbarPosition(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length > 0) {
        const rect = range.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Store in refs so they survive selection clearing
        selectedTextRef.current = text;
        selectionRangeRef.current = range.cloneRange();

        setToolbarPosition({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top - 52,
        });
      }
    }, 10);
  }, []);

  // Dismiss toolbar when clicking outside (but not on the toolbar itself)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolbarActiveRef.current) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setToolbarPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHighlight = async (color: string) => {
    const text = selectedTextRef.current;
    const range = selectionRangeRef.current;

    if (!text || !range) {
      toast.error('No text selected');
      return;
    }

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    // Clear selection & toolbar
    window.getSelection()?.removeAllRanges();
    setToolbarPosition(null);
    toolbarActiveRef.current = false;

    toast.loading('Saving highlight...', { id: 'highlight-save' });

    try {
      const result = await createHighlight({
        slug,
        highlighted_text: text,
        color,
        start_offset: startOffset,
        end_offset: endOffset,
        anchor_node_path: 'p',
      });

      if (result.data) {
        addHighlight(slug, result.data);
        toast.success('Highlighted!', { id: 'highlight-save' });

        // Visually wrap the text in a colored span
        try {
          const span = createHighlightSpan(color, result.data.id, text);
          // Remove text node contents of the range and insert the span
          range.surroundContents(span);
        } catch {
          // If surround fails (multi-element selection), the DB save still succeeded
        }
      } else {
        toast.error(result.error || 'Failed to save highlight', { id: 'highlight-save' });
      }
    } catch (err) {
      console.error('[handleHighlight] error:', err);
      toast.error('Network error saving highlight', { id: 'highlight-save' });
    }
  };

  const handleAnnotate = async (noteContent: string) => {
    const text = selectedTextRef.current;

    if (!text) {
      toast.error('No text selected');
      return;
    }

    window.getSelection()?.removeAllRanges();
    setToolbarPosition(null);
    toolbarActiveRef.current = false;

    toast.loading('Saving annotation...', { id: 'annotation-save' });

    try {
      const result = await createNote({
        slug,
        content: noteContent,
        note_type: 'annotation',
        referenced_text: text,
      });

      if (result.data) {
        addNote(slug, result.data);
        toast.success('Annotation saved!', { id: 'annotation-save' });
      } else {
        toast.error(result.error || 'Failed to save annotation', { id: 'annotation-save' });
      }
    } catch (err) {
      console.error('[handleAnnotate] error:', err);
      toast.error('Network error saving annotation', { id: 'annotation-save' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative selection:bg-blue-500/30"
      onMouseUp={handleMouseUp}
    >
      {children}

      {toolbarPosition && (
        <HighlightingToolbar
          x={toolbarPosition.x}
          y={toolbarPosition.y}
          onHighlight={handleHighlight}
          onAnnotate={handleAnnotate}
          onEnter={() => { toolbarActiveRef.current = true; }}
          onLeave={() => { toolbarActiveRef.current = false; }}
        />
      )}

      {/* Inline delete tooltip — appears right at the highlighted text */}
      {deleteTooltip && (
        <div
          ref={deleteTooltipRef}
          className="absolute z-[100] animate-in fade-in slide-in-from-bottom-2 duration-150"
          style={{
            left: deleteTooltip.x,
            top: deleteTooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="flex items-center gap-1.5 bg-[#1a1a1f] border border-white/15 rounded-xl px-2 py-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <button
              onClick={handleDeleteHighlight}
              disabled={deleting}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 text-xs font-medium transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
              Remove
            </button>
            <button
              onClick={() => setDeleteTooltip(null)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Arrow pointing down */}
          <div className="flex justify-center">
            <div className="w-2.5 h-2.5 bg-[#1a1a1f] border-r border-b border-white/15 rotate-45 -mt-[6px]" />
          </div>
        </div>
      )}
    </div>
  );
}
