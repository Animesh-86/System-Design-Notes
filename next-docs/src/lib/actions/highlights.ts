'use server';

import { createClient } from '@/lib/supabase/server';

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

  const { data: highlight, error } = await supabase
    .from('highlights')
    .insert({
      user_id: user.id,
      ...data,
    })
    .select()
    .single();

  if (error) return { error: error.message };
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
