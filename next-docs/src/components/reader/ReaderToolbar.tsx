"use client";

import { ReadingProgressBar } from './ReadingProgressBar';
import { NotesPanel } from './NotesPanel';
import { ChecklistToggle } from '@/components/ChecklistToggle';
import { useAppStore } from '@/lib/store';
import { StickyNote, Bookmark } from 'lucide-react';

export function ReaderToolbar({ slug, title }: { slug: string; title: string }) {
  const { setNotesPanel, notesPanel } = useAppStore();

  return (
    <>
      <ReadingProgressBar slug={slug} />

      {/* Floating toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <ChecklistToggle slug={slug} />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotesPanel(!notesPanel)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-500/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            <StickyNote className="w-3.5 h-3.5" />
            Notes
          </button>
        </div>
      </div>

      <NotesPanel slug={slug} />
    </>
  );
}
