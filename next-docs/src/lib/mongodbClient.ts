import { MongoClient } from 'mongodb';

let cached = ((globalThis as any)['__mongoClient'] || ((globalThis as any)['__mongoClient'] = {})) as { client?: MongoClient };

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in environment');

  if (cached.client) return cached.client;

  const client = new MongoClient(uri);
  await client.connect();
  cached.client = client;
  return client;
}

export default getMongoClient;
