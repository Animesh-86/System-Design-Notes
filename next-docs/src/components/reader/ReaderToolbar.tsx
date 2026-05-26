"use client";

import { useEffect, useMemo, useState } from 'react';
import { ReadingProgressBar } from './ReadingProgressBar';
import { NotesPanel } from './NotesPanel';
import { ChecklistToggle } from '@/components/ChecklistToggle';
import { useAppStore } from '@/lib/store';
import { Bookmark, BookmarkCheck, StickyNote } from 'lucide-react';
import { getBookmarks, toggleBookmark } from '@/lib/actions/bookmarks';
import { toast } from 'sonner';

export function ReaderToolbar({ slug }: { slug: string }) {
  const { setNotesPanel, notesPanel, bookmarks, setBookmark, removeBookmark } = useAppStore();
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const isBookmarked = useMemo(() => Boolean(bookmarks[slug]), [bookmarks, slug]);

  useEffect(() => {
    let cancelled = false;

    async function loadBookmark() {
      const result = await getBookmarks(slug);
      if (cancelled || !result.data?.length) return;
      setBookmark(result.data[0]);
    }

    if (!bookmarks[slug]) {
      loadBookmark();
    }

    return () => {
      cancelled = true;
    };
  }, [slug, bookmarks, setBookmark]);

  const handleBookmarkToggle = async () => {
    if (bookmarkLoading) return;
    setBookmarkLoading(true);

    const result = await toggleBookmark(slug);
    if (result.error) {
      toast.error(result.error);
      setBookmarkLoading(false);
      return;
    }

    if (result.bookmarked && result.data) {
      setBookmark(result.data);
      toast.success('Bookmarked lesson');
    } else {
      removeBookmark(slug);
      toast.success('Removed bookmark');
    }

    setBookmarkLoading(false);
  };

  return (
    <>
      <ReadingProgressBar slug={slug} />

      {/* Floating toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <ChecklistToggle slug={slug} />

        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmarkToggle}
            disabled={bookmarkLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-500/10 disabled:opacity-60 transition-all cursor-pointer"
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

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
