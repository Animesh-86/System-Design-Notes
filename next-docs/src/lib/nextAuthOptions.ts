import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
    },
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
    async session({ session, token }) {
      if (session.user && token?.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
};

export default authOptions;
