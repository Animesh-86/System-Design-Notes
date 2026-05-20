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

export async function upsertChecklist(slug: string, status: 'pending' | 'in_progress' | 'completed') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  await ensureProfile(supabase, user);

  const { error } = await supabase
    .from('checklist_items')
    .upsert({
      user_id: user.id,
      slug,
      status,
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : { completed_at: null }),
    }, {
      onConflict: 'user_id,slug',
    });

  if (error) {
    console.error('[upsertChecklist] DB error:', error.message);
    return { error: error.message };
  }
  return { success: true };
}

export async function getAllChecklist() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('checklist_items')
    .select('*')
    .eq('user_id', user.id);

  if (error) return { data: [], error: error.message };
  return { data: data || [] };
}
