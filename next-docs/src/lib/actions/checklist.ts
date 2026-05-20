'use server';

import { createClient } from '@/lib/supabase/server';

export async function upsertChecklist(slug: string, status: 'pending' | 'in_progress' | 'completed') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

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

  if (error) return { error: error.message };
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
