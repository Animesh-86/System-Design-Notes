'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Ensure the user has a profile row — creates one if missing.
 * This fixes "foreign key violation" errors when notes/highlights fail to save.
 */
async function ensureProfile(supabase: Awaited<ReturnType<typeof createClient>>, user: { id: string; email?: string; user_metadata?: Record<string, unknown> }) {
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!existingProfile) {
    const meta = user.user_metadata ?? {};
    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      display_name: (meta['full_name'] ?? meta['display_name'] ?? user.email?.split('@')[0]) as string,
      avatar_url: (meta['avatar_url'] ?? null) as string | null,
    });
  }
}

export async function createHighlight(data: {
  slug: string;
  highlighted_text: string;
  color: string;
  start_offset: number;
  end_offset: number;
  anchor_node_path: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  // Guarantee profile exists before inserting
  await ensureProfile(supabase, user);

  const { data: highlight, error } = await supabase
    .from('highlights')
    .insert({
      user_id: user.id,
      ...data,
    })
    .select()
    .single();

  if (error) {
    console.error('[createHighlight] DB error:', error.message, error.details);
    return { error: error.message };
  }
  return { data: highlight };
}

export async function getHighlights(slug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('highlights')
    .select('*')
    .eq('user_id', user.id)
    .eq('slug', slug)
    .order('start_offset', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}

export async function deleteHighlight(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('highlights')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}
