import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  slug: { type: String, required: true },
  scroll_percentage: { type: Number, default: 0 },
  is_completed: { type: Boolean, default: false },
  read_time_seconds: { type: Number, default: 0 },
  last_read_at: { type: Date, default: () => new Date() },
  completed_at: { type: Date, default: null },
});

export default (mongoose.models.ReadingProgress as mongoose.Model<any>) || mongoose.model('ReadingProgress', progressSchema);
