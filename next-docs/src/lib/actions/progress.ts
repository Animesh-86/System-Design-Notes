'use server';

import { createClient } from '@/lib/supabase/server';

export async function upsertProgress(slug: string, data: {
  scroll_percentage?: number;
  is_completed?: boolean;
  read_time_seconds?: number;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

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

  if (error) return { error: error.message };
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
