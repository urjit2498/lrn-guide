import { clsx } from 'clsx';
import { Level } from '@/types';
import { useAppStore } from '@/store/appStore';

const LEVELS: { id: Level; label: string; emoji: string }[] = [
  { id: 'beginner',     label: 'Beginner',     emoji: '🌱' },
  { id: 'intermediate', label: 'Intermediate',  emoji: '🚀' },
  { id: 'advanced',     label: 'Advanced',      emoji: '⚡' },
];

interface LevelTabsProps {
  topicId: string;
}

export function LevelTabs({ topicId }: LevelTabsProps) {
  const { selectedLevel, setSelectedLevel, isLevelComplete } = useAppStore();

  return (
    <div className="flex gap-1.5 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
      {LEVELS.map(({ id, label, emoji }) => {
        const complete = isLevelComplete(topicId, id);
        return (
          <button
            key={id}
            onClick={() => setSelectedLevel(id)}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200',
              selectedLevel === id
                ? 'bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            )}
          >
            <span className="text-base">{complete ? '✅' : emoji}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
