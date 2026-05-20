'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Shared helper — ensure a profile row exists before writing to child tables.
 */
async function ensureProfile(supabase: Awaited<ReturnType<typeof createClient>>, user: { id: string; email?: string; user_metadata?: Record<string, unknown> }) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!existing) {
    const meta = user.user_metadata ?? {};
    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      display_name: (meta['full_name'] ?? meta['display_name'] ?? user.email?.split('@')[0]) as string,
      avatar_url: (meta['avatar_url'] ?? null) as string | null,
    });
  }
}

export async function upsertProgress(slug: string, data: {
  scroll_percentage?: number;
  is_completed?: boolean;
  read_time_seconds?: number;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  await ensureProfile(supabase, user);

  const { error } = await supabase
    .from('reading_progress')
    .upsert({
      user_id: user.id,
      slug,
      ...data,
      last_read_at: new Date().toISOString(),
      ...(data.is_completed ? { completed_at: new Date().toISOString() } : {}),
    }, {
      onConflict: 'user_id,slug',
    });

  if (error) {
    console.error('[upsertProgress] DB error:', error.message);
    return { error: error.message };
  }
  return { success: true };
}

export async function getProgress(slug?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  let query = supabase
    .from('reading_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('last_read_at', { ascending: false });

  if (slug) {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query;
  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}

export async function getAllProgress() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('reading_progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}
