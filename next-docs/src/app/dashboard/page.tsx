import { createClient } from '@/lib/supabase/server';
import { getAllContent } from '@/lib/content';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch all user data in parallel
  const [progressRes, checklistRes, notesRes] = await Promise.all([
    supabase.from('reading_progress').select('*').eq('user_id', user.id).order('last_read_at', { ascending: false }),
    supabase.from('checklist_items').select('*').eq('user_id', user.id),
    supabase.from('notes').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ]);

  const contentItems = getAllContent();

  return (
    <DashboardClient
      progress={progressRes.data || []}
      checklist={checklistRes.data || []}
      recentNotes={notesRes.data || []}
      contentItems={contentItems}
      userName={user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Learner'}
    />
  );
}
