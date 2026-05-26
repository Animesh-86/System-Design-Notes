'use server';

import { connectToMongo } from '@/lib/mongodb';
import BookmarkModel from '@/lib/models/Bookmark';
import ProfileModel from '@/lib/models/Profile';
import { getUserIdFromSession } from '@/lib/authServer';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

export type BookmarkDTO = {
  id: string;
  slug: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(doc: any): BookmarkDTO {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  return {
    id: String(obj._id ?? obj.id ?? ''),
    slug: String(obj.slug ?? ''),
    note: obj.note == null ? null : String(obj.note),
    created_at: obj.created_at ? new Date(obj.created_at).toISOString() : new Date().toISOString(),
    updated_at: obj.updated_at ? new Date(obj.updated_at).toISOString() : new Date().toISOString(),
  };
}

async function ensureProfile(userId: string) {
  await connectToMongo();
  const existing = await ProfileModel.findOne({ id: userId }).lean();
  if (!existing) {
    await ProfileModel.create({ id: userId });
  }
}

export async function getBookmarks(slug?: string): Promise<{ data: BookmarkDTO[] }> {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const query: Record<string, unknown> = { user_id: userId };
  if (slug) query.slug = slug;

  const items = await BookmarkModel.find(query).sort({ updated_at: -1 }).lean();
  return { data: items.map(normalize) };
}

export async function toggleBookmark(slug: string, note?: string) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    await ensureProfile(userId);

    const existing = await BookmarkModel.findOne({ user_id: userId, slug });
    if (existing) {
      await BookmarkModel.deleteOne({ _id: existing._id, user_id: userId });
      return { data: null, bookmarked: false };
    }

    const created = await BookmarkModel.create({
      user_id: userId,
      slug,
      note: note ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return { data: normalize(created), bookmarked: true };
  } catch (error: unknown) {
    console.error('Failed to toggle bookmark:', error);
    return { error: error instanceof Error ? error.message : 'Failed to toggle bookmark' };
  }
}

export async function removeBookmark(slug: string) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const res = await BookmarkModel.deleteOne({ user_id: userId, slug });
    if (res.deletedCount === 1) return { success: true };
    return { error: 'Bookmark not found' };
  } catch (error: unknown) {
    console.error('Failed to remove bookmark:', error);
    return { error: error instanceof Error ? error.message : 'Failed to remove bookmark' };
  }
}
