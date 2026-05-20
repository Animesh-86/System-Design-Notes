-- ============================================
-- System Design Hub v2.0 — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Users profile (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"theme":"dark","fontSize":"base"}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reading progress per document
CREATE TABLE public.reading_progress (
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
CREATE TABLE public.checklist_items (
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
CREATE TABLE public.highlights (
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
CREATE TABLE public.notes (
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
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  label TEXT DEFAULT 'Bookmark',
  scroll_position REAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_progress_user ON public.reading_progress(user_id);
CREATE INDEX idx_progress_slug ON public.reading_progress(slug);
CREATE INDEX idx_checklist_user ON public.checklist_items(user_id);
CREATE INDEX idx_highlights_user_slug ON public.highlights(user_id, slug);
CREATE INDEX idx_notes_user_slug ON public.notes(user_id, slug);
CREATE INDEX idx_bookmarks_user ON public.bookmarks(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies — users can only access their own data
CREATE POLICY "Users manage own profile"
  ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users manage own progress"
  ON public.reading_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own checklist"
  ON public.checklist_items FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own highlights"
  ON public.highlights FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own notes"
  ON public.notes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own bookmarks"
  ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

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
