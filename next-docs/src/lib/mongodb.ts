import mongoose from 'mongoose';

let cached = ((globalThis as any)['__mongoose'] || ((globalThis as any)['__mongoose'] = {})) as { conn?: typeof mongoose };

export async function connectToMongo(uri?: string) {
  const mongoUri = uri || process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI not set in environment');

  if (cached.conn) return cached.conn;

  const conn = await mongoose.connect(mongoUri);
  cached.conn = conn;
  return conn;
}
