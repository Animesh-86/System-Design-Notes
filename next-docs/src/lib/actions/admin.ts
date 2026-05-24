'use server';

import { connectToMongo } from '@/lib/mongodb';
import HighlightModel from '@/lib/models/Highlight';
import NoteModel from '@/lib/models/Note';
import ReadingProgressModel from '@/lib/models/ReadingProgress';
import ChecklistItemModel from '@/lib/models/ChecklistItem';
import { getUserIdFromSession } from '@/lib/authServer';

export async function resetUserData(userId?: string) {
  try {
    await connectToMongo();
    const uid = userId || (await getUserIdFromSession());
    if (!uid) return { error: 'No user' };
    const [hRes, nRes, pRes, cRes] = await Promise.all([
      HighlightModel.deleteMany({ user_id: uid }),
      NoteModel.deleteMany({ user_id: uid }),
      ReadingProgressModel.deleteMany({ user_id: uid }),
      ChecklistItemModel.deleteMany({ user_id: uid }),
    ]);

    return {
      success: true,
      deleted: {
        highlights: hRes.deletedCount ?? 0,
        notes: nRes.deletedCount ?? 0,
        progress: pRes.deletedCount ?? 0,
        checklist: cRes.deletedCount ?? 0,
      },
    };
  } catch (err: unknown) {
    console.error('resetUserData error', err);
    return { error: err instanceof Error ? err.message : 'Failed' };
  }
}
