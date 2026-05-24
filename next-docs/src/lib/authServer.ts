import { getServerSession } from 'next-auth/next';
import { authOptions } from './nextAuthOptions';

export async function getUserIdFromSession() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as { id?: string } | undefined;
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export default getUserIdFromSession;
