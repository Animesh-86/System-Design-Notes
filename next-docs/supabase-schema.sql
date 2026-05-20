-- ============================================
-- System Design Hub v2.0 — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Users profile (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"theme":"dark","fontSize":"base"}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reading progress per document
CREATE TABLE IF NOT EXISTS public.reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  scroll_percentage REAL DEFAULT 0 CHECK (scroll_percentage >= 0 AND scroll_percentage <= 100),
  is_completed BOOLEAN DEFAULT false,
  read_time_seconds INTEGER DEFAULT 0,
  last_read_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, slug)
);

-- Checklist items
CREATE TABLE IF NOT EXISTS public.checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed')),
  category TEXT DEFAULT 'chapter',
  sort_order INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- Text highlights
CREATE TABLE IF NOT EXISTS public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  highlighted_text TEXT NOT NULL,
  color TEXT DEFAULT 'yellow' CHECK (color IN ('yellow','green','blue','pink','purple')),
  start_offset INTEGER NOT NULL,
  end_offset INTEGER NOT NULL,
  anchor_node_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notes and annotations
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'annotation' CHECK (note_type IN ('annotation','sticky','bookmark_note')),
  position_offset INTEGER,
  anchor_node_path TEXT,
  referenced_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quick bookmarks
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  label TEXT DEFAULT 'Bookmark',
  scroll_position REAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes (IF NOT EXISTS is implicit for CREATE INDEX)
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_slug ON public.reading_progress(slug);
CREATE INDEX IF NOT EXISTS idx_checklist_user ON public.checklist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_user_slug ON public.highlights(user_id, slug);
CREATE INDEX IF NOT EXISTS idx_notes_user_slug ON public.notes(user_id, slug);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies — FIXED with separate SELECT/INSERT/UPDATE/DELETE
-- The previous "FOR ALL" policy didn't include WITH CHECK
-- which is required for INSERT and UPDATE operations.
-- ============================================

-- Drop old policies if they exist (safe to re-run)
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users manage own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "Users manage own checklist" ON public.checklist_items;
DROP POLICY IF EXISTS "Users manage own highlights" ON public.highlights;
DROP POLICY IF EXISTS "Users manage own notes" ON public.notes;
DROP POLICY IF EXISTS "Users manage own bookmarks" ON public.bookmarks;

-- Profiles
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_delete" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Reading Progress
CREATE POLICY "progress_select" ON public.reading_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_insert" ON public.reading_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_update" ON public.reading_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_delete" ON public.reading_progress FOR DELETE USING (auth.uid() = user_id);

-- Checklist
CREATE POLICY "checklist_select" ON public.checklist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "checklist_insert" ON public.checklist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "checklist_update" ON public.checklist_items FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "checklist_delete" ON public.checklist_items FOR DELETE USING (auth.uid() = user_id);

-- Highlights
CREATE POLICY "highlights_select" ON public.highlights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "highlights_insert" ON public.highlights FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "highlights_update" ON public.highlights FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "highlights_delete" ON public.highlights FOR DELETE USING (auth.uid() = user_id);

-- Notes
CREATE POLICY "notes_select" ON public.notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notes_insert" ON public.notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notes_update" ON public.notes FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notes_delete" ON public.notes FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks
CREATE POLICY "bookmarks_select" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookmarks_insert" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookmarks_update" ON public.bookmarks FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookmarks_delete" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
