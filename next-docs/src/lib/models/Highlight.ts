import mongoose from 'mongoose';

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

export default (mongoose.models.Highlight as mongoose.Model<any>) || mongoose.model('Highlight', highlightSchema);
