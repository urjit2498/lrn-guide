import { useState } from 'react';
import { toast } from 'sonner';
import { signIn, signUp, signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password);
        toast.success('Account created! Check your email to confirm.');
      } else {
        await signIn(email, password);
        toast.success('Welcome back!');
        onClose();
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      toast.success('Signed out successfully.');
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Sign out failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user ? 'Account' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Already logged in */}
        {user ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing out…' : 'Sign Out'}
            </button>
          </div>
        ) : (
          // Auth form
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading
                ? mode === 'login' ? 'Signing in…' : 'Creating account…'
                : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Mode toggle */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login' ? (
                <>
                  No account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
