"use client";

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { upsertChecklist } from '@/lib/actions/checklist';
import { toast } from 'sonner';

type Status = 'pending' | 'in_progress' | 'completed';

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: 'Not Started',
    icon: <Circle className="w-4 h-4" />,
    color: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  },
  in_progress: {
    label: 'In Progress',
    icon: <Circle className="w-4 h-4" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
};

export function ChecklistToggle({ slug }: { slug: string }) {
  const { checklist, setChecklistItem } = useAppStore();
  const [loading, setLoading] = useState(false);

  const currentStatus: Status = checklist[slug]?.status || 'pending';
  const config = statusConfig[currentStatus];
  const isCompleted = currentStatus === 'completed';

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    setLoading(true);
    setChecklistItem(slug, 'completed');

    const result = await upsertChecklist(slug, 'completed');
    if (result.error) {
      setChecklistItem(slug, currentStatus); // Rollback
      toast.error('Failed to update status');
    } else {
      toast.success('Marked as complete');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleMarkComplete}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${config.color}`}
      title={isCompleted ? 'This lesson is already marked as complete' : 'Mark this lesson as complete'}
    >
      {config.icon}
      {isCompleted ? config.label : 'Mark as Complete'}
    </button>
  );
}
