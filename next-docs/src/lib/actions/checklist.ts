'use server';

import { connectToMongo } from '@/lib/mongodb';
import ChecklistItemModel from '@/lib/models/ChecklistItem';
import ProfileModel from '@/lib/models/Profile';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';
import { getUserIdFromSession } from '@/lib/authServer';

async function ensureProfile(userId: string) {
  await connectToMongo();
  const existing = await ProfileModel.findOne({ id: userId }).lean();
  if (!existing) await ProfileModel.create({ id: userId });
}

export async function upsertChecklist(slug: string, status: 'pending' | 'in_progress' | 'completed') {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    await ensureProfile(userId);

    const payload: any = { user_id: userId, slug, status };
    if (status === 'completed') payload.completed_at = new Date();
    else payload.completed_at = null;

    await ChecklistItemModel.updateOne({ user_id: userId, slug }, { $set: payload }, { upsert: true });
    return { success: true };
  } catch (error: any) {
    console.error('Failed to upsert checklist:', error);
    return { success: false, error: error.message || 'Failed to update checklist' };
  }
}

export async function getAllChecklist() {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
  const items = await ChecklistItemModel.find({ user_id: userId }).lean();
  return { data: items };
}
