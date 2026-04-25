import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { Logo } from '@/components/ui/Logo';

export function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Logo size={36} />
        <button
          onClick={() => setAuthOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Sign In
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Your Developer
            <br />
            <span className="text-indigo-600">Learning Guide</span>
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Master PHP, React, Laravel, Node.js, MySQL, MongoDB, DevOps, and more — with
            structured content and interview prep at every level.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setAuthOpen(true)}
              className="w-full sm:w-auto rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            {
              icon: '🎯',
              title: 'Structured Topics',
              desc: '9 tech areas with beginner to advanced levels',
            },
            {
              icon: '💼',
              title: 'Interview Prep',
              desc: 'Real interview questions with detailed answers',
            },
            {
              icon: '🔖',
              title: 'Bookmarks',
              desc: 'Save topics and track your progress',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 text-left shadow-sm"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
