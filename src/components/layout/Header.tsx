import { useAppStore } from '@/store/appStore';
import { getTopicById } from '@/data/topics';
import { Button } from '@/components/ui/Button';
import { ProfilePanel } from '@/components/profile/ProfilePanel';
import { useAuthContext } from '@/contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { selectedTopicId, isDarkMode, toggleDarkMode, bookmarks, toggleBookmark } =
    useAppStore();
  // const { isChatOpen, openChat, closeChat } = useAppStore();  // CHATBOT DISABLED

  const { user } = useAuthContext();

  const topic = getTopicById(selectedTopicId);
  const isBookmarked = bookmarks.includes(selectedTopicId);

  return (
    <header className="h-[60px] flex items-center px-4 gap-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="p-2 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Topic name */}
      {topic && (
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl">{topic.icon}</span>
          <div className="min-w-0">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight truncate">
              {topic.name}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block truncate">
              {topic.description}
            </p>
          </div>
        </div>
      )}

      <div className="ml-auto flex items-center gap-1.5">
        {/* Bookmark */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleBookmark(selectedTopicId)}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark this topic'}
        >
          <svg
            className={`w-4 h-4 ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z" />
          </svg>
        </Button>

        {/* Dark mode */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.36-6.36.7-.7M6.64 17.36l-.7.7m12.72 0-.7-.7M6.64 6.64l-.7-.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </Button>

        {/* Profile */}
        {user && <ProfilePanel user={user} />}
      </div>
    </header>
  );
}
