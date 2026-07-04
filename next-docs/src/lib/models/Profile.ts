import mongoose from 'mongoose';

interface ProfileDoc {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  migrated_local_user_data: boolean;
}

const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, default: null },
  display_name: { type: String, default: null },
  avatar_url: { type: String, default: null },
  migrated_local_user_data: { type: Boolean, default: false },
});

export default (mongoose.models.Profile as mongoose.Model<ProfileDoc>) || mongoose.model<ProfileDoc>('Profile', profileSchema);
