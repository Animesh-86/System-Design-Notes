import { getAllContent } from '@/lib/content';
import { DashboardClient } from './DashboardClient';
import { connectToMongo } from '@/lib/mongodb';
import ReadingProgress from '@/lib/models/ReadingProgress';
import ChecklistItem from '@/lib/models/ChecklistItem';
import Note from '@/lib/models/Note';
import Bookmark from '@/lib/models/Bookmark';
import Profile from '@/lib/models/Profile';
import Highlight from '@/lib/models/Highlight';
import { getUserIdFromSession } from '@/lib/authServer';

export default async function DashboardPage() {
  await connectToMongo();

  const userId = await getUserIdFromSession();
  if (!userId) return null;

  // --- MIGRATION: Fix stuck "local-user" data ---
  // Any data saved before the session bug was fixed got assigned to "local-user".
  // This reassigns those orphans to the current authenticated user.
  await Promise.all([
    Highlight.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
    Note.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
    Bookmark.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
    ReadingProgress.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
    ChecklistItem.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
  ]);
  // ----------------------------------------------

  const [progress, checklist, notes, bookmarks, profile] = await Promise.all([
    ReadingProgress.find({ user_id: userId }).sort({ last_read_at: -1 }).limit(100).lean(),
    ChecklistItem.find({ user_id: userId }).lean(),
    Note.find({ user_id: userId }).sort({ created_at: -1 }).limit(10).lean(),
    Bookmark.find({ user_id: userId }).sort({ updated_at: -1 }).limit(10).lean(),
    Profile.findOne({ id: userId }).lean(),
  ]);

  const contentItems = getAllContent();

  const userName = profile?.display_name || profile?.email?.split('@')[0] || 'Learner';

  return (
    <DashboardClient
      progress={(progress || []).map(p => ({
        slug: p.slug,
        scroll_percentage: p.scroll_percentage,
        is_completed: p.is_completed,
        read_time_seconds: p.read_time_seconds,
        last_read_at: p.last_read_at ? new Date(p.last_read_at).toISOString() : new Date().toISOString(),
      }))}
      checklist={checklist || []}
      recentNotes={(notes || []).map(n => ({ id: String(n._id || ''), slug: n.slug, content: n.content, created_at: n.created_at ? new Date(n.created_at).toISOString() : new Date().toISOString() }))}
      recentBookmarks={(bookmarks || []).map(b => ({
        id: String(b._id || ''),
        slug: b.slug,
        note: b.note ?? null,
        created_at: b.created_at ? new Date(b.created_at).toISOString() : new Date().toISOString(),
        updated_at: b.updated_at ? new Date(b.updated_at).toISOString() : new Date().toISOString(),
      }))}
      contentItems={contentItems}
      userName={userName}
    />
  );
}
