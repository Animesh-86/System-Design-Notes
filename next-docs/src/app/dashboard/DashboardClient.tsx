"use client";

import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, StickyNote, ArrowRight, BarChart3, Trophy, Share2, BookmarkCheck } from 'lucide-react';
import type { ContentItem } from '@/lib/content';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

interface ProgressEntry {
  slug: string;
  scroll_percentage: number;
  is_completed: boolean;
  read_time_seconds: number;
  last_read_at: string;
}

interface ChecklistEntry {
  slug: string;
  status: string;
}

interface NoteEntry {
  id: string;
  slug: string;
  content: string;
  created_at: string;
}

interface BookmarkEntry {
  id: string;
  slug: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

interface DashboardClientProps {
  progress: ProgressEntry[];
  checklist: ChecklistEntry[];
  recentNotes: NoteEntry[];
  recentBookmarks: BookmarkEntry[];
  contentItems: ContentItem[];
  userName: string;
}

export function DashboardClient({ progress, checklist, recentNotes, recentBookmarks, contentItems, userName }: DashboardClientProps) {
  const totalItems = contentItems.length;
  const completedCount = checklist.filter(c => c.status === 'completed').length;
  const totalReadTime = progress.reduce((sum, p) => sum + (p.read_time_seconds || 0), 0);
  const recentlyRead = progress.slice(0, 5);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const completionPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const findTitle = (slug: string) => {
    return contentItems.find(c => c.slug === slug)?.title || slug;
  };

  const { reset } = useAppStore();

  useEffect(() => {
    // no-op: keep hook for reset usage in handler
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20 max-w-5xl mx-auto space-y-8 pt-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{userName}</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Here&apos;s your learning progress overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (!confirm('Reset all your progress and notes for your account? This cannot be undone.')) return;
              try {
                const r = await fetch('/api/admin/reset', { method: 'POST' });
                if (r.status === 401) {
                  window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(window.location.href)}`;
                  return;
                }
                const j = await r.json();
                if (r.ok && j.success) {
                  try {
                    // clear persisted client store to remove stale progress cache
                    localStorage.removeItem('sdh-store');
                  } catch {
                    // ignore
                  }
                  // clear in-memory store
                  try { reset(); } catch {}
                  // reload to reflect cleared data
                  window.location.reload();
                } else {
                  alert(j.error || 'Reset failed');
                }
              } catch {
                alert('Reset request failed');
              }
            }}
            className="text-xs px-3 py-1 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/15"
          >Reset Progress</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{completionPct}%</p>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">Overall Progress</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{completedCount}<span className="text-sm text-gray-400 font-normal">/{totalItems}</span></p>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">Completed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{formatTime(totalReadTime)}</p>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">Time Reading</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <StickyNote className="w-4 h-4 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{recentNotes.length}</p>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">Notes Taken</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Continue Reading */}
        <div className="bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 rounded-2xl p-6 backdrop-blur-lg">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-blue-500" />
            Continue Reading
          </h2>
          {recentlyRead.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">Start reading to see your history here!</p>
          ) : (
            <div className="space-y-3">
              {recentlyRead.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/docs/${entry.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">
                      {findTitle(entry.slug)}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${entry.scroll_percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{Math.round(entry.scroll_percentage)}%</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Notes */}
        <div className="bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 rounded-2xl p-6 backdrop-blur-lg">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
            <StickyNote className="w-4 h-4 text-amber-500" />
            Recent Notes
          </h2>
          {recentNotes.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">Add notes while reading to see them here!</p>
          ) : (
            <div className="space-y-3">
              {recentNotes.slice(0, 5).map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition-all"
                >
                  <Link href={`/docs/${note.slug}`} className="block">
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{note.content}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-[10px] text-gray-400 truncate max-w-[45%]">{findTitle(note.slug)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono">
                        {new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <button
                        type="button"
                        onClick={async () => {
                          const url = `${window.location.origin}/docs/${note.slug}`;
                          try {
                            await navigator.clipboard.writeText(url);
                          } catch {
                            // noop
                          }
                        }}
                        className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md text-[10px] text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookmarks */}
      <div className="bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 rounded-2xl p-6 backdrop-blur-lg">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
          <BookmarkCheck className="w-4 h-4 text-blue-500" />
          Recent Bookmarks
        </h2>
        {recentBookmarks.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">Bookmark lessons while reading to pin them here.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentBookmarks.slice(0, 6).map((bookmark) => (
              <Link
                key={bookmark.id}
                href={`/docs/${bookmark.slug}`}
                className="block p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-all"
              >
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">
                  {findTitle(bookmark.slug)}
                </p>
                {bookmark.note && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {bookmark.note}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-400 truncate max-w-[55%]">/{bookmark.slug}</span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {new Date(bookmark.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Completion Grid */}
      <div className="bg-white/60 dark:bg-[#0e0e11]/80 border border-black/5 dark:border-white/10 rounded-2xl p-6 backdrop-blur-lg">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-amber-500" />
          Progress Map
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {contentItems.map((item) => {
            const checkItem = checklist.find(c => c.slug === item.slug);
            const progressItem = progress.find(p => p.slug === item.slug);
            let bgClass = 'bg-gray-200/50 dark:bg-white/5';
            if (checkItem?.status === 'completed') bgClass = 'bg-emerald-500';
            else if (checkItem?.status === 'in_progress') bgClass = 'bg-amber-500/60';
            else if (progressItem && progressItem.scroll_percentage > 0) bgClass = 'bg-blue-500/30';

            return (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                title={item.title}
                className={`w-5 h-5 md:w-6 md:h-6 rounded-md ${bgClass} hover:ring-2 hover:ring-blue-500/50 transition-all cursor-pointer`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200/50 dark:bg-white/5 inline-block" /> Not started</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/30 inline-block" /> Reading</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/60 inline-block" /> In progress</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Completed</span>
        </div>
      </div>
    </div>
  );
}
