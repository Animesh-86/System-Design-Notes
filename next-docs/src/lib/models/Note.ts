import mongoose from 'mongoose';

interface NoteDoc {
  user_id: string;
  slug: string;
  content: string;
  note_type: 'annotation' | 'sticky' | 'bookmark_note';
  position_offset: number | null;
  anchor_node_path: string | null;
  referenced_text: string | null;
  created_at: Date;
  updated_at: Date;
}

const noteSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  note_type: { type: String, default: 'sticky' },
  position_offset: { type: Number, default: null },
  anchor_node_path: { type: String, default: null },
  referenced_text: { type: String, default: null },
  created_at: { type: Date, default: () => new Date() },
  updated_at: { type: Date, default: () => new Date() },
});

export default (mongoose.models.Note as mongoose.Model<NoteDoc>) || mongoose.model<NoteDoc>('Note', noteSchema);
