"use client";

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import type { ContentItem } from '@/lib/content';

export function AppShell({
  items,
  children,
}: {
  items: ContentItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith('/auth')) {
    return <div className="flex-1 min-w-0 h-screen overflow-hidden">{children}</div>;
  }

  return (
    <>
      <Sidebar items={items} />
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}