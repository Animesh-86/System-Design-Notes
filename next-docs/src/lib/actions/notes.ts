'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Ensure the user has a profile row — creates one if missing.
 * This fixes "foreign key violation" errors for users who signed in before the SQL schema was applied.
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

export async function createNote(data: {
  slug: string;
  content: string;
  note_type?: 'annotation' | 'sticky' | 'bookmark_note';
  position_offset?: number | null;
  anchor_node_path?: string | null;
  referenced_text?: string | null;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  // Guarantee profile exists before inserting
  await ensureProfile(supabase, user);

  const { data: note, error } = await supabase
    .from('notes')
    .insert({
      user_id: user.id,
      note_type: 'sticky',
      ...data,
    })
    .select()
    .single();

  if (error) {
    console.error('[createNote] DB error:', error.message, error.details);
    return { error: error.message };
  }
  return { data: note };
}

export async function getNotes(slug?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  let query = supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (slug) {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query;
  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}

export async function updateNote(id: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('notes')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function searchNotes(query: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)
    .ilike('content', `%${query}%`)
    .order('updated_at', { ascending: false })
    .limit(20);

  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}
