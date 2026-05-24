import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, default: null },
  display_name: { type: String, default: null },
  avatar_url: { type: String, default: null },
});

export default (mongoose.models.Profile as mongoose.Model<any>) || mongoose.model('Profile', profileSchema);
