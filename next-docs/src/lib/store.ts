import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
}

interface ProgressEntry {
  slug: string;
  scroll_percentage: number;
  is_completed: boolean;
  read_time_seconds: number;
  last_read_at: string;
}

interface ChecklistEntry {
  slug: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface Highlight {
  id: string;
  slug: string;
  highlighted_text: string;
  color: string;
  start_offset: number;
  end_offset: number;
  anchor_node_path: string;
}

interface Note {
  id: string;
  slug: string;
  content: string;
  note_type: 'annotation' | 'sticky' | 'bookmark_note';
  position_offset: number | null;
  anchor_node_path: string | null;
  referenced_text: string | null;
  created_at: string;
  updated_at: string;
}

interface Bookmark {
  id: string;
  slug: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

interface AppState {
  // Auth
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  notesPanel: boolean;
  setNotesPanel: (open: boolean) => void;

  // Progress (optimistic cache)
  progress: Record<string, ProgressEntry>;
  setProgress: (slug: string, entry: Partial<ProgressEntry>) => void;

  // Checklist (optimistic cache)
  checklist: Record<string, ChecklistEntry>;
  setChecklistItem: (slug: string, status: ChecklistEntry['status']) => void;

  // Highlights (optimistic cache)
  highlights: Record<string, Highlight[]>;
  setHighlights: (slug: string, highlights: Highlight[]) => void;
  addHighlight: (slug: string, highlight: Highlight) => void;
  removeHighlight: (slug: string, highlightId: string) => void;

  // Notes (optimistic cache)
  notes: Record<string, Note[]>;
  setNotes: (slug: string, notes: Note[]) => void;
  addNote: (slug: string, note: Note) => void;
  updateNote: (slug: string, noteId: string, content: string) => void;
  removeNote: (slug: string, noteId: string) => void;

  // Bookmarks (optimistic cache)
  bookmarks: Record<string, Bookmark>;
  setBookmarks: (bookmarks: Bookmark[]) => void;
  setBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (slug: string) => void;

  // Reset on logout
  reset: () => void;
}

const initialState = {
  user: null,
  sidebarOpen: true,
  notesPanel: true,
  progress: {},
  checklist: {},
  highlights: {},
  notes: {},
  bookmarks: {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user) => set({ user }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setNotesPanel: (open) => set({ notesPanel: open }),

      setProgress: (slug, entry) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [slug]: { ...s.progress[slug], ...entry, slug } as ProgressEntry,
          },
        })),

      setChecklistItem: (slug, status) =>
        set((s) => ({
          checklist: {
            ...s.checklist,
            [slug]: { slug, status },
          },
        })),

      setHighlights: (slug, highlights) =>
        set((s) => ({
          highlights: { ...s.highlights, [slug]: highlights },
        })),

      addHighlight: (slug, highlight) =>
        set((s) => ({
          highlights: {
            ...s.highlights,
            [slug]: [...(s.highlights[slug] || []), highlight],
          },
        })),

      removeHighlight: (slug, highlightId) =>
        set((s) => ({
          highlights: {
            ...s.highlights,
            [slug]: (s.highlights[slug] || []).filter((h) => h.id !== highlightId),
          },
        })),

      setNotes: (slug, notes) =>
        set((s) => ({
          notes: { ...s.notes, [slug]: notes },
        })),

      addNote: (slug, note) =>
        set((s) => ({
          notes: {
            ...s.notes,
            [slug]: [...(s.notes[slug] || []), note],
          },
        })),

      updateNote: (slug, noteId, content) =>
        set((s) => ({
          notes: {
            ...s.notes,
            [slug]: (s.notes[slug] || []).map((n) =>
              n.id === noteId ? { ...n, content, updated_at: new Date().toISOString() } : n
            ),
          },
        })),

      removeNote: (slug, noteId) =>
        set((s) => ({
          notes: {
            ...s.notes,
            [slug]: (s.notes[slug] || []).filter((n) => n.id !== noteId),
          },
        })),

      setBookmarks: (bookmarks) =>
        set(() => ({
          bookmarks: bookmarks.reduce<Record<string, Bookmark>>((acc, bookmark) => {
            acc[bookmark.slug] = bookmark;
            return acc;
          }, {}),
        })),

      setBookmark: (bookmark) =>
        set((s) => ({
          bookmarks: {
            ...s.bookmarks,
            [bookmark.slug]: bookmark,
          },
        })),

      removeBookmark: (slug) =>
        set((s) => {
          const next = { ...s.bookmarks };
          delete next[slug];
          return { bookmarks: next };
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'sdh-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        notesPanel: state.notesPanel,
        progress: state.progress,
        checklist: state.checklist,
      }),
    }
  )
);
