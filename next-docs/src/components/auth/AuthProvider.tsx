"use client";

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { SessionProvider, useSession } from 'next-auth/react';

function SessionSync({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((s) => s.setUser);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const u = session.user as { id?: string; email?: string | null; name?: string | null; image?: string | null };
      setUser({ id: u.id || u.email || '', email: u.email || '', display_name: u.name || u.email || '', avatar_url: u.image || null });
    } else {
      const defaultId = process.env.NEXT_PUBLIC_DEFAULT_USER_ID;
      if (defaultId) {
        setUser({ id: defaultId, email: '', display_name: defaultId, avatar_url: null });
      } else {
        setUser(null);
      }
    }
  }, [session, setUser]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync>{children}</SessionSync>
    </SessionProvider>
  );
}
