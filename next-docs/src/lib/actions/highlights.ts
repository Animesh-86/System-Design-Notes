'use server';

import { connectToMongo } from '@/lib/mongodb';
import HighlightModel from '@/lib/models/Highlight';
import { getUserIdFromSession } from '@/lib/authServer';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

/** Normalize Mongoose document: map _id → id and stringify */
function normalize(doc: any) {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  obj.id = (obj._id ?? obj.id)?.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
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
  } catch (error: any) {
    console.error('Failed to create highlight:', error);
    return { error: error.message || 'Failed to create highlight' };
  }
}

export async function getHighlights(slug: string) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const items = await HighlightModel.find({ user_id: userId, slug }).sort({ start_offset: 1 }).lean();
    return { data: items.map(normalize) };
  } catch (error: any) {
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
  } catch (error: any) {
    console.error('Failed to delete highlight:', error);
    return { error: error.message || 'Failed to delete highlight' };
  }
}
