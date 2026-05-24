import { getServerSession } from 'next-auth/next';
import { authOptions } from './nextAuthOptions';

export async function getUserIdFromSession() {
  try {
    const session = await getServerSession(authOptions as any) as any;
    return session?.user?.id ?? null;
  } catch (e) {
    return null;
  }
}

export default getUserIdFromSession;
