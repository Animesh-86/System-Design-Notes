 'use server';

import { connectToMongo } from '@/lib/mongodb';
import NoteModel from '@/lib/models/Note';
import ProfileModel from '@/lib/models/Profile';
import { getUserIdFromSession } from '@/lib/authServer';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'local-user';

export type NoteDTO = {
  id: string;
  slug: string;
  content: string;
  note_type: 'annotation' | 'sticky' | 'bookmark_note';
  position_offset: number | null;
  anchor_node_path: string | null;
  referenced_text: string | null;
  created_at: string;
  updated_at: string;
};

/** Normalize Mongoose document into stable DTO for client */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(doc: any): NoteDTO {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  return {
    id: String(obj._id ?? obj.id ?? ''),
    slug: String(obj.slug ?? ''),
    content: String(obj.content ?? ''),
    note_type: (obj.note_type as 'annotation' | 'sticky' | 'bookmark_note') ?? 'sticky',
    position_offset: obj.position_offset == null ? null : Number(obj.position_offset),
    anchor_node_path: obj.anchor_node_path == null ? null : String(obj.anchor_node_path),
    referenced_text: obj.referenced_text == null ? null : String(obj.referenced_text),
    created_at: obj.created_at ? new Date(obj.created_at).toISOString() : new Date().toISOString(),
    updated_at: obj.updated_at ? new Date(obj.updated_at).toISOString() : new Date().toISOString(),
  };
}
async function ensureProfile(userId: string, email?: string, displayName?: string) {
  await connectToMongo();
  const existing = await ProfileModel.findOne({ id: userId }).lean();
  if (!existing) {
    await ProfileModel.create({ id: userId, email: email || null, display_name: displayName || null });
  }
}

export async function createNote(data: {
  slug: string;
  content: string;
  note_type?: 'annotation' | 'sticky' | 'bookmark_note';
  position_offset?: number | null;
  anchor_node_path?: string | null;
  referenced_text?: string | null;
}) {
  try {
    await connectToMongo();
    const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;
    await ensureProfile(userId);

    const note = await NoteModel.create({
      user_id: userId,
      note_type: data.note_type ?? 'sticky',
      ...data,
    });

    return { data: normalize(note) };
  } catch (error: unknown) {
    console.error('Failed to create note:', error);
    return { error: error instanceof Error ? error.message : 'Failed to create note' };
  }
}

export async function getNotes(slug?: string): Promise<{ data: NoteDTO[] } | { data: [] }> {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const query: Record<string, unknown> = { user_id: userId };
  if (slug) query.slug = slug;

  const items = await NoteModel.find(query).sort({ created_at: -1 });
  return { data: items.map(normalize) };
}

export async function updateNote(id: string, content: string) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const res = await NoteModel.updateOne({ _id: id, user_id: userId }, { content, updated_at: new Date() });
  if (res.modifiedCount === 1) return { success: true };
  return { error: 'Not found or not allowed' };
}

export async function deleteNote(id: string) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const res = await NoteModel.deleteOne({ _id: id, user_id: userId });
  if (res.deletedCount === 1) return { success: true };
  return { error: 'Not found or not allowed' };
}

export async function searchNotes(q: string) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const items = await NoteModel.find({ user_id: userId, content: { $regex: q, $options: 'i' } }).sort({ updated_at: -1 }).limit(20).lean();
  return { data: items.map(normalize) };
}
