import mongoose from 'mongoose';

interface HighlightDoc {
  user_id: string;
  slug: string;
  highlighted_text: string;
  color: string;
  start_offset: number;
  end_offset: number;
  anchor_node_path: string;
  created_at: Date;
}

const highlightSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  slug: { type: String, required: true },
  highlighted_text: { type: String, required: true },
  color: { type: String, default: 'yellow' },
  start_offset: { type: Number, required: true },
  end_offset: { type: Number, required: true },
  anchor_node_path: { type: String, default: 'p' },
  created_at: { type: Date, default: () => new Date() },
});

export default (mongoose.models.Highlight as mongoose.Model<HighlightDoc>) || mongoose.model<HighlightDoc>('Highlight', highlightSchema);
