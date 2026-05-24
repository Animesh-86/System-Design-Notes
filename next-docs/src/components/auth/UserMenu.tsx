"use client";

import { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useAppStore } from '@/lib/store';

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = (user.display_name || user.email || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer w-full"
      >
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.display_name || 'Avatar'}
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-cover border border-black/10 dark:border-white/10"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
            {initials}
          </div>
        )}
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
            {user.display_name || 'User'}
          </p>
          <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-[#141417] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
