'use server';

import { connectToMongo } from '@/lib/mongodb';
import ReadingProgressModel from '@/lib/models/ReadingProgress';
import { getUserIdFromSession } from '@/lib/authServer';
import ProfileModel from '@/lib/models/Profile';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

type ProgressPayload = {
  user_id: string;
  slug: string;
  last_read_at: Date;
  scroll_percentage?: number;
  read_time_seconds?: number;
  is_completed?: boolean;
  completed_at?: Date | null;
};

async function ensureProfile(userId: string) {
  await connectToMongo();
  const existing = await ProfileModel.findOne({ id: userId }).lean();
  if (!existing) await ProfileModel.create({ id: userId });
}

export async function upsertProgress(slug: string, data: {
  scroll_percentage?: number;
  is_completed?: boolean;
  read_time_seconds?: number;
}) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
  await ensureProfile(userId);

  const payload: ProgressPayload = {
    user_id: userId,
    slug,
    last_read_at: new Date(),
    ...(data.scroll_percentage !== undefined ? { scroll_percentage: data.scroll_percentage } : {}),
    ...(data.read_time_seconds !== undefined ? { read_time_seconds: data.read_time_seconds } : {}),
  };
  if (data.is_completed) {
    payload.is_completed = true;
    payload.completed_at = new Date();
  }

  await ReadingProgressModel.updateOne({ user_id: userId, slug }, { $set: payload }, { upsert: true });
  return { success: true };
}

export async function getProgress(slug?: string) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const query: Record<string, unknown> = { user_id: userId };
  if (slug) query.slug = slug;

  const items = await ReadingProgressModel.find(query).sort({ last_read_at: -1 }).lean();
  return { data: items };
}

export async function getAllProgress() {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
  const items = await ReadingProgressModel.find({ user_id: userId }).lean();
  return { data: items };
}
