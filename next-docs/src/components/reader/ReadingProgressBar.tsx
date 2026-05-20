"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { upsertProgress } from '@/lib/actions/progress';

export function ReadingProgressBar({ slug }: { slug: string }) {
  const { progress, setProgress } = useAppStore();
  const timerRef = useRef(0);
  const lastSaveRef = useRef(0);
  const scrollRef = useRef(0);

  const currentProgress = progress[slug];
  const scrollPercentage = currentProgress?.scroll_percentage || 0;

  const saveProgress = useCallback(async (pct: number, time: number) => {
    const now = Date.now();
    if (now - lastSaveRef.current < 3000) return; // Debounce 3s
    lastSaveRef.current = now;

    const isCompleted = pct >= 90 && time >= 60;
    
    setProgress(slug, {
      scroll_percentage: pct,
      read_time_seconds: time,
      is_completed: isCompleted,
      last_read_at: new Date().toISOString(),
    });

    await upsertProgress(slug, {
      scroll_percentage: pct,
      read_time_seconds: time,
      is_completed: isCompleted,
    });
  }, [slug, setProgress]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    // Restore scroll position
    if (currentProgress?.scroll_percentage) {
      const targetScroll = (currentProgress.scroll_percentage / 100) * (main.scrollHeight - main.clientHeight);
      setTimeout(() => main.scrollTo({ top: targetScroll, behavior: 'smooth' }), 500);
    }

    // Track scroll
    const handleScroll = () => {
      const pct = Math.round((main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100);
      scrollRef.current = Math.max(scrollRef.current, pct);

      setProgress(slug, {
        scroll_percentage: Math.max(scrollPercentage, pct),
        last_read_at: new Date().toISOString(),
      });
    };

    // Track read time
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        timerRef.current += 1;
      }
    }, 1000);

    // Save periodically
    const saveInterval = setInterval(() => {
      if (scrollRef.current > 0) {
        saveProgress(scrollRef.current, timerRef.current);
      }
    }, 5000);

    main.addEventListener('scroll', handleScroll, { passive: true });

    // Save on unmount
    return () => {
      main.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearInterval(saveInterval);
      if (scrollRef.current > 0) {
        saveProgress(scrollRef.current, timerRef.current);
      }
    };
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayPct = Math.min(100, Math.max(0, scrollPercentage));

  return (
    <div className="fixed top-0 left-0 md:left-80 right-0 z-50 h-1 bg-black/5 dark:bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${displayPct}%` }}
      />
      {displayPct > 0 && (
        <div className="absolute right-3 top-2 text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-[#0e0e11]/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-black/5 dark:border-white/10">
          {displayPct}%
        </div>
      )}
    </div>
  );
}
