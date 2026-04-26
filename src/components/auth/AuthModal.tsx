import { useState } from 'react';
import { toast } from 'sonner';
import { signIn, signUp, signOut, resetPassword } from '@/lib/auth';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

type PasswordStrength = 'weak' | 'fair' | 'strong';

function getPasswordStrength(pw: string): PasswordStrength | null {
  if (pw.length === 0) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'fair';
  return 'strong';
}

const strengthConfig: Record<PasswordStrength, { label: string; color: string; bars: number }> = {
  weak:   { label: 'Weak',   color: 'bg-red-500',    bars: 1 },
  fair:   { label: 'Fair',   color: 'bg-yellow-500', bars: 2 },
  strong: { label: 'Strong', color: 'bg-green-500',  bars: 3 },
};

const inputCls =
  'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  function switchMode(next: AuthMode) {
    setMode(next);
    setResetSent(false);
    setEmail('');
    setPassword('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password);
        toast.success('Account created!');
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

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Could not send reset email.');
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

  function headingText() {
    if (user)           return 'Account';
    if (mode === 'login')  return 'Sign In';
    if (mode === 'signup') return 'Create Account';
    return 'Reset Password';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {headingText()}
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

        ) : mode === 'forgot' ? (
          /* ── Forgot password ── */
          resetSent ? (
            <div className="space-y-4 text-center">
              <div className="text-4xl">📧</div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We sent a password reset link to{' '}
                <span className="font-semibold">{email}</span>.
                Check your inbox and follow the link.
              </p>
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgot} className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and we'll send you a link to reset your password.
              </p>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Back to Sign In
                </button>
              </p>
            </form>
          )

        ) : (
          /* ── Login / Signup ── */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Min. 8 characters recommended' : 'Your password'}
                className={inputCls}
              />
              {/* Strength meter — signup only */}
              {mode === 'signup' && (() => {
                const strength = getPasswordStrength(password);
                if (!strength) return null;
                const cfg = strengthConfig[strength];
                return (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                            n <= cfg.bars ? cfg.color : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${
                      strength === 'weak'   ? 'text-red-500' :
                      strength === 'fair'   ? 'text-yellow-600 dark:text-yellow-400' :
                                             'text-green-600 dark:text-green-400'
                    }`}>
                      {cfg.label} password
                      {strength === 'weak' && ' — add uppercase, numbers, or symbols'}
                    </p>
                  </div>
                );
              })()}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading
                ? mode === 'login' ? 'Signing in…' : 'Creating account…'
                : mode === 'login' ? 'Sign In'     : 'Create Account'}
            </button>

            {/* Mode toggle */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login' ? (
                <>
                  No account?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-indigo-600 hover:underline font-medium">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="text-indigo-600 hover:underline font-medium">
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
