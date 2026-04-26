import { clsx } from 'clsx';
import { TOPICS, type TopicMeta } from '@/data/topics';
import { useAppStore } from '@/store/appStore';
import { SearchBar } from '@/components/ui/SearchBar';
import { Logo } from '@/components/ui/Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { selectedTopicId, searchQuery, bookmarks, progress, setSelectedTopic } =
    useAppStore();

  const filtered = TOPICS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Count completed levels per topic
  const getCompletedCount = (topicId: string) => {
    const p = progress[topicId];
    if (!p) return 0;
    return Object.values(p).filter(Boolean).length;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 h-dvh w-64 bg-white dark:bg-gray-900',
          'border-r border-gray-200 dark:border-gray-800',
          'flex flex-col overflow-hidden transition-transform duration-300',
          // Desktop: always visible
          'lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto',
          // Mobile: slide in/out
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <Logo size={32} />
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pt-3 pb-2">
          <SearchBar />
        </div>

        {/* Bookmarks shortcut */}
        {bookmarks.length > 0 && !searchQuery && (
          <div className="px-3 pb-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold px-1 mb-1">
              Bookmarked
            </p>
            {TOPICS.filter((t) => bookmarks.includes(t.id)).map((topic) => (
              <TopicButton
                key={topic.id}
                topic={topic}
                isActive={selectedTopicId === topic.id}
                completedCount={getCompletedCount(topic.id)}
                bookmarked
                onClick={() => {
                  setSelectedTopic(topic.id);
                  onClose();
                }}
              />
            ))}
            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
          </div>
        )}

        {/* Topic list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold px-1 mb-1">
            {searchQuery ? `Results (${filtered.length})` : 'All Topics'}
          </p>
          {filtered.length === 0 ? (
            <p className="text-xs text-gray-500 px-1 py-4 text-center">
              No topics match "{searchQuery}"
            </p>
          ) : (
            filtered.map((topic) => (
              <TopicButton
                key={topic.id}
                topic={topic}
                isActive={selectedTopicId === topic.id}
                completedCount={getCompletedCount(topic.id)}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  onClose();
                }}
              />
            ))
          )}
        </div>

        {/* Progress footer */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Overall Progress</span>
            <span>
              {Object.values(progress).reduce(
                (sum, p) => sum + Object.values(p).filter(Boolean).length,
                0,
              )}{' '}
              / {TOPICS.length * 3} levels
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (Object.values(progress).reduce(
                    (sum, p) => sum + Object.values(p).filter(Boolean).length,
                    0,
                  ) /
                    (TOPICS.length * 3)) *
                    100,
                )}%`,
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Topic Button ─────────────────────────────────────────────────────────────

interface TopicButtonProps {
  topic: TopicMeta;
  isActive: boolean;
  completedCount: number;
  bookmarked?: boolean;
  onClick: () => void;
}

function TopicButton({
  topic,
  isActive,
  completedCount,
  bookmarked,
  onClick,
}: TopicButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm transition-all duration-150 mb-0.5',
        isActive
          ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200',
      )}
    >
      <span className="text-base flex-shrink-0">{topic.icon}</span>
      <span className="flex-1 truncate">{topic.name}</span>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {bookmarked && <span className="text-yellow-400 text-xs">★</span>}
        {completedCount > 0 && (
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={clsx(
                  'w-1.5 h-1.5 rounded-full',
                  i < completedCount ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
