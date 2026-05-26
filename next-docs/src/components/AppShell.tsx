"use client";

import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Sidebar } from '@/components/Sidebar';
import type { ContentItem } from '@/lib/content';
import { useAppStore } from '@/lib/store';

export function AppShell({
  items,
  children,
}: {
  items: ContentItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { notesPanel } = useAppStore();
  const isDocsPath = pathname.startsWith('/docs/');

  if (pathname.startsWith('/auth')) {
    return <div className="flex-1 min-w-0 h-screen overflow-hidden">{children}</div>;
  }

  return (
    <>
      <Sidebar items={items} />
      <main
        className={clsx(
          'flex-1 h-screen overflow-y-auto custom-scrollbar relative',
          isDocsPath && notesPanel && 'md:pr-[22rem]'
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8 w-full max-w-6xl mx-auto lg:ml-4 lg:mr-auto xl:ml-8">
          {children}
        </div>
      </main>
    </>
  );
}