import { clsx } from 'clsx';
import { Level } from '@/types';

interface BadgeProps {
  level: Level;
}

const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export function LevelBadge({ level }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide',
        {
          'badge-beginner': level === 'beginner',
          'badge-intermediate': level === 'intermediate',
          'badge-advanced': level === 'advanced',
        }
      )}
    >
      {LEVEL_LABELS[level]}
    </span>
  );
}
