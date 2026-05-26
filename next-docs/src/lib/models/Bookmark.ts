import mongoose from 'mongoose';

interface BookmarkDoc {
  user_id: string;
  slug: string;
  note: string | null;
  created_at: Date;
  updated_at: Date;
}

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    slug: { type: String, required: true, index: true },
    note: { type: String, default: null },
    created_at: { type: Date, default: () => new Date() },
    updated_at: { type: Date, default: () => new Date() },
  },
  {
    versionKey: false,
  }
);

bookmarkSchema.index({ user_id: 1, slug: 1 }, { unique: true });

export default
  (mongoose.models.Bookmark as mongoose.Model<BookmarkDoc>) ||
  mongoose.model<BookmarkDoc>('Bookmark', bookmarkSchema);
