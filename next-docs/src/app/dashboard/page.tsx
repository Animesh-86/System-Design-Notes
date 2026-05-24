import { getAllContent } from '@/lib/content';
import { DashboardClient } from './DashboardClient';
import { connectToMongo } from '@/lib/mongodb';
import ReadingProgress from '@/lib/models/ReadingProgress';
import ChecklistItem from '@/lib/models/ChecklistItem';
import Note from '@/lib/models/Note';
import Profile from '@/lib/models/Profile';

export default async function DashboardPage() {
  await connectToMongo();

  const userId = process.env.DEFAULT_USER_ID || process.env.NEXT_PUBLIC_DEFAULT_USER_ID;
  if (!userId) return null;

  const [progress, checklist, notes, profile] = await Promise.all([
    ReadingProgress.find({ user_id: userId }).sort({ last_read_at: -1 }).lean(),
    ChecklistItem.find({ user_id: userId }).lean(),
    Note.find({ user_id: userId }).sort({ created_at: -1 }).limit(10).lean(),
    Profile.findOne({ id: userId }).lean(),
  ]);

  const contentItems = getAllContent();

  const userName = profile?.display_name || profile?.email?.split('@')[0] || 'Learner';

  return (
    <DashboardClient
      progress={progress || []}
      checklist={checklist || []}
      recentNotes={notes || []}
      contentItems={contentItems}
      userName={userName}
    />
  );
}
