'use server';

import { connectToMongo } from '@/lib/mongodb';
import HighlightModel from '@/lib/models/Highlight';
import { getUserIdFromSession } from '@/lib/authServer';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

export type HighlightDTO = {
  id: string;
  slug: string;
  highlighted_text: string;
  color: string;
  start_offset: number;
  end_offset: number;
  anchor_node_path: string;
};

import type { Document } from 'mongoose';

/** Normalize Mongoose document into a stable DTO for the client */
function normalize(doc: Document | Record<string, unknown>): HighlightDTO {
  const obj = typeof (doc as Document).toObject === 'function' ? (doc as Document).toObject() : { ...doc } as Record<string, unknown>;
  return {
    id: String(obj._id ?? obj.id ?? ''),
    slug: String(obj.slug ?? ''),
    highlighted_text: String(obj.highlighted_text ?? ''),
    color: String(obj.color ?? 'yellow'),
    start_offset: Number(obj.start_offset ?? 0),
    end_offset: Number(obj.end_offset ?? 0),
    anchor_node_path: String(obj.anchor_node_path ?? 'p'),
  };
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

export async function getHighlights(slug: string): Promise<{ data: HighlightDTO[] } | { data: [] }> {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    const items = await HighlightModel.find({ user_id: userId, slug }).sort({ start_offset: 1 });
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
