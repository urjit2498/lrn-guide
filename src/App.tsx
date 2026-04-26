import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TopicContent } from '@/components/learning/TopicContent';
import { LandingPage } from '@/components/layout/LandingPage';
import { ResetPasswordModal } from '@/components/auth/ResetPasswordModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { fetchProgress } from '@/lib/progress';
import { useAppStore } from '@/store/appStore';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuthContext();
  const loadProgress = useAppStore((s) => s.loadProgress);

  // Sync progress from Supabase whenever user logs in
  useEffect(() => {
    if (!user) return;
    fetchProgress(user.id)
      .then((rows) => loadProgress(rows))
      .catch(() => {}); // silently fall back to local progress
  }, [user?.id, loadProgress]);

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
    <>
      <ResetPasswordModal />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto">
            <TopicContent />
          </main>
        </div>
      </div>
    </>
  );
}
