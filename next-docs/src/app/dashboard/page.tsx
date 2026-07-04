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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type DashboardChecklistItem = {
  slug: string;
  status: 'pending' | 'in_progress' | 'completed';
};

type DashboardNote = {
  _id?: unknown;
  slug: string;
  content: string;
  created_at: Date | string;
};

type DashboardBookmark = {
  _id?: unknown;
  slug: string;
  note?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

type DashboardProfile = {
  display_name?: string | null;
  email?: string | null;
} | null;

export default async function DashboardPage() {
  let progress: Array<{
    slug: string;
    scroll_percentage: number;
    is_completed: boolean;
    read_time_seconds: number;
    last_read_at: string;
  }> = [];
  let checklist: DashboardChecklistItem[] = [];
  let notes: DashboardNote[] = [];
  let bookmarks: DashboardBookmark[] = [];
  let profile: DashboardProfile = null;

  const userId = await getUserIdFromSession();
  if (!userId) return null;

  try {
    await connectToMongo();

    const existingProfile = await Profile.findOne({ id: userId }).lean();

    if (existingProfile && !existingProfile.migrated_local_user_data) {
      // --- MIGRATION: Fix stuck "local-user" data ---
      // Any data saved before the session bug was fixed got assigned to "local-user".
      // This runs once per user to move those records to the authenticated account.
      await Promise.all([
        Highlight.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
        Note.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
        Bookmark.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
        ReadingProgress.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
        ChecklistItem.updateMany({ user_id: 'local-user' }, { $set: { user_id: userId } }),
      ]);
      await Profile.updateOne({ id: userId }, { $set: { migrated_local_user_data: true } });
      // ----------------------------------------------
    }

    const [progressResult, checklistResult, notesResult, bookmarksResult, profileResult] = await Promise.all([
      ReadingProgress.find({ user_id: userId }).sort({ last_read_at: -1 }).limit(100).lean(),
      ChecklistItem.find({ user_id: userId }).lean(),
      Note.find({ user_id: userId }).sort({ created_at: -1 }).limit(10).lean(),
      Bookmark.find({ user_id: userId }).sort({ updated_at: -1 }).limit(10).lean(),
      Profile.findOne({ id: userId }).lean(),
    ]);

    progress = progressResult.map(p => ({
      slug: p.slug,
      scroll_percentage: p.scroll_percentage,
      is_completed: p.is_completed,
      read_time_seconds: p.read_time_seconds,
      last_read_at: p.last_read_at ? new Date(p.last_read_at).toISOString() : new Date().toISOString(),
    }));
    checklist = checklistResult || [];
    notes = notesResult || [];
    bookmarks = bookmarksResult || [];
    profile = profileResult;
  } catch (error) {
    console.error('Dashboard load failed:', error);
  }

  const contentItems = getAllContent();
  const userName = profile?.display_name || profile?.email?.split('@')[0] || 'Learner';

  return (
    <DashboardClient
      progress={progress}
      checklist={checklist || []}
      recentNotes={notes.map(n => ({ id: String(n._id || ''), slug: n.slug, content: n.content, created_at: n.created_at ? new Date(n.created_at).toISOString() : new Date().toISOString() }))}
      recentBookmarks={bookmarks.map(b => ({
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
