import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import getMongoClient from './mongodbClient';

const clientPromise = getMongoClient();

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Use JWT strategy so middleware using `getToken` can detect sessions
    // (database strategy does not expose a JWT token for `getToken`).
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, user }) {
      const authUser = user as { id?: string } | undefined;
      return { ...session, user: { ...session.user, id: authUser?.id ?? '' } };
    },
  },
};

export default authOptions;
