import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TopicContent } from '@/components/learning/TopicContent';
import { LandingPage } from '@/components/layout/LandingPage';
import { useAuth } from '@/hooks/useAuth';
import { fetchProgress } from '@/lib/progress';
import { useAppStore } from '@/store/appStore';
// import { ChatBot } from '@/components/chatbot/ChatBot';  // CHATBOT DISABLED

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const loadProgress = useAppStore((s) => s.loadProgress);

  // Sync progress from Supabase whenever user logs in
  useEffect(() => {
    if (!user) return;
    fetchProgress(user.id)
      .then((rows) => loadProgress(rows))
      .catch(() => {}); // silently fall back to local progress
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Content — full width while chatbot is disabled */}
        <main className="flex-1 overflow-y-auto">
          <TopicContent />
        </main>

        {/* CHATBOT DISABLED — re-enable by uncommenting below and restoring imports
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <TopicContent />
          </main>
          {isChatOpen && (
            <div className="hidden md:block flex-shrink-0 overflow-hidden">
              <ChatBot />
            </div>
          )}
        </div>
        {isChatOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-white dark:bg-gray-900">
            <ChatBot />
          </div>
        )}
        */}
      </div>
    </div>
  );
}
