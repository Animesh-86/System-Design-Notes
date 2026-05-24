'use server';

import { connectToMongo } from '@/lib/mongodb';
import HighlightModel from '@/lib/models/Highlight';
import { getUserIdFromSession } from '@/lib/authServer';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

type HighlightRecord = Record<string, unknown> & {
  _id?: unknown;
  id?: unknown;
  __v?: unknown;
  toObject?: () => Record<string, unknown>;
  highlighted_text: string;
  color: string;
};

/** Normalize Mongoose document: map _id → id and stringify */
function normalize(doc: HighlightRecord) {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  const normalized = obj as HighlightRecord;
  normalized.id = String(normalized._id ?? normalized.id ?? '');
  delete normalized._id;
  delete normalized.__v;
  return normalized;
}

export async function createHighlight(data: {
  slug: string;
  highlighted_text: string;
  color: string;
  start_offset: number;
  end_offset: number;
  anchor_node_path: string;
}) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const h = await HighlightModel.create({
      user_id: userId,
      ...data,
    });
    return { data: normalize(h) };
  } catch (error: unknown) {
    console.error('Failed to create highlight:', error);
    return { error: error instanceof Error ? error.message : 'Failed to create highlight' };
  }
}

export async function getHighlights(slug: string) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const items = await HighlightModel.find({ user_id: userId, slug }).sort({ start_offset: 1 }).lean();
    return { data: items.map(normalize) };
  } catch (error: unknown) {
    console.error('Failed to get highlights:', error);
    return { data: [] };
  }
}

export async function deleteHighlight(id: string) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const res = await HighlightModel.deleteOne({ _id: id, user_id: userId });
    if (res.deletedCount === 1) return { success: true };
    return { error: 'Not found or not allowed' };
  } catch (error: unknown) {
    console.error('Failed to delete highlight:', error);
    return { error: error instanceof Error ? error.message : 'Failed to delete highlight' };
  }
}
