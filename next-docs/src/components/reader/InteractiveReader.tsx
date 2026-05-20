"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const { setHighlights, addHighlight, removeHighlight, addNote } = useAppStore();
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Render highlights visually on the page
  const renderHighlights = (highlights: any[]) => {
    const container = containerRef.current;
    if (!container) return;

    highlights.forEach((highlight) => {
      try {
        const colorMap: Record<string, string> = {
          yellow: 'rgba(250, 204, 21, 0.3)',
          green: 'rgba(52, 211, 153, 0.3)',
          blue: 'rgba(96, 165, 250, 0.3)',
          pink: 'rgba(244, 114, 182, 0.3)',
          purple: 'rgba(192, 132, 252, 0.3)',
        };

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
                const span = document.createElement('span');
                span.style.backgroundColor = colorMap[highlight.color] || colorMap.yellow;
                span.style.borderBottom = `2px solid ${colorMap[highlight.color]?.replace('0.3', '0.8') || 'rgba(250, 204, 21, 0.8)'}`;
                span.style.cursor = 'pointer';
                span.style.transition = 'all 0.2s';
                span.setAttribute('data-highlight-id', highlight.id);
                span.appendChild(document.createTextNode(textToFind));
                span.onclick = async (e: Event) => {
                  e.stopPropagation();
                  if (confirm('Delete this highlight?')) {
                    const res = await deleteHighlight(highlight.id);
                    if (res.success) {
                      span.replaceWith(...Array.from(span.childNodes));
                      removeHighlight(slug, highlight.id);
                      toast.success('Highlight deleted');
                    }
                  }
                };
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
          const span = document.createElement('span');
          const colorMap: Record<string, string> = {
            yellow: 'rgba(250, 204, 21, 0.3)',
            green: 'rgba(52, 211, 153, 0.3)',
            blue: 'rgba(96, 165, 250, 0.3)',
            pink: 'rgba(244, 114, 182, 0.3)',
            purple: 'rgba(192, 132, 252, 0.3)',
          };
          span.style.backgroundColor = colorMap[color] || colorMap.yellow;
          span.style.borderBottom = `2px solid ${colorMap[color]?.replace('0.3', '0.8') || 'rgba(250, 204, 21, 0.8)'}`;
          span.style.cursor = 'pointer';
          span.style.transition = 'all 0.2s';
          span.setAttribute('data-highlight-id', result.data.id);
          span.onclick = async () => {
            if (confirm('Delete this highlight?')) {
              const res = await deleteHighlight(result.data.id);
              if (res.success) {
                span.replaceWith(...Array.from(span.childNodes));
                removeHighlight(slug, result.data.id);
                toast.success('Highlight deleted');
              }
            }
          };
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
    </div>
  );
}
