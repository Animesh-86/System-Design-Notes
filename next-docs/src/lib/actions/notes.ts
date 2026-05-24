'use server';

import { connectToMongo } from '@/lib/mongodb';
import NoteModel from '@/lib/models/Note';
import ProfileModel from '@/lib/models/Profile';
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
  } catch (error: any) {
    console.error('Failed to create note:', error);
    return { error: error.message || 'Failed to create note' };
  }
}

export async function getNotes(slug?: string) {
  await connectToMongo();
  const userId = (await getUserIdFromSession()) || DEFAULT_USER_ID;

  const query: any = { user_id: userId };
  if (slug) query.slug = slug;

  const items = await NoteModel.find(query).sort({ created_at: -1 }).lean();
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
