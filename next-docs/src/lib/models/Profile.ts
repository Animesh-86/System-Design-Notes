import mongoose from 'mongoose';

interface ProfileDoc {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, default: null },
  display_name: { type: String, default: null },
  avatar_url: { type: String, default: null },
});

export default (mongoose.models.Profile as mongoose.Model<ProfileDoc>) || mongoose.model<ProfileDoc>('Profile', profileSchema);
