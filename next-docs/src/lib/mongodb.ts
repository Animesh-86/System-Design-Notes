import mongoose from 'mongoose';

type MongooseCache = { conn?: typeof mongoose };
const globalForMongoose = globalThis as typeof globalThis & { __mongoose?: MongooseCache };
const cached = globalForMongoose.__mongoose || (globalForMongoose.__mongoose = {});

export async function connectToMongo(uri?: string) {
  const mongoUri = uri || process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI not set in environment');

  if (cached.conn) return cached.conn;

  const conn = await mongoose.connect(mongoUri);
  cached.conn = conn;
  return conn;
}
