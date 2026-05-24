"use client";

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import type { ContentItem } from '@/lib/content';

/** Renders the sidebar only on non-auth pages */
export function ConditionalSidebar({ items }: { items: ContentItem[] }) {
  const pathname = usePathname();

  // Hide sidebar on auth pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  return <Sidebar items={items} />;
}
