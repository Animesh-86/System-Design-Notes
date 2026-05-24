import { MongoClient } from 'mongodb';

type MongoClientCache = { client?: MongoClient };
const globalForMongoClient = globalThis as typeof globalThis & { __mongoClient?: MongoClientCache };
const cached = globalForMongoClient.__mongoClient || (globalForMongoClient.__mongoClient = {});

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
