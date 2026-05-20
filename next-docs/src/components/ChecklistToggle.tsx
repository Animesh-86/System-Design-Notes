"use client";

import { useState } from 'react';
import { CheckCircle2, Circle, Clock, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { upsertChecklist } from '@/lib/actions/checklist';
import { toast } from 'sonner';

type Status = 'pending' | 'in_progress' | 'completed';

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; color: string; next: Status }> = {
  pending: {
    label: 'Not Started',
    icon: <Circle className="w-4 h-4" />,
    color: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
    next: 'in_progress',
  },
  in_progress: {
    label: 'In Progress',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    next: 'completed',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    next: 'pending',
  },
};

export function ChecklistToggle({ slug }: { slug: string }) {
  const { checklist, setChecklistItem } = useAppStore();
  const [loading, setLoading] = useState(false);

  const currentStatus: Status = checklist[slug]?.status || 'pending';
  const config = statusConfig[currentStatus];

  const handleToggle = async () => {
    setLoading(true);
    const nextStatus = config.next;
    setChecklistItem(slug, nextStatus); // Optimistic

    const result = await upsertChecklist(slug, nextStatus);
    if (result.error) {
      setChecklistItem(slug, currentStatus); // Rollback
      toast.error('Failed to update status');
    } else {
      const nextConfig = statusConfig[nextStatus];
      toast.success(`Marked as "${nextConfig.label}"`);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${config.color}`}
      title={`Click to mark as "${statusConfig[config.next].label}"`}
    >
      {config.icon}
      {config.label}
    </button>
  );
}
