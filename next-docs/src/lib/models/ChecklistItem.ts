import mongoose from 'mongoose';

const checklistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  slug: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  completed_at: { type: Date, default: null },
});

export default (mongoose.models.ChecklistItem as mongoose.Model<any>) || mongoose.model('ChecklistItem', checklistSchema);
