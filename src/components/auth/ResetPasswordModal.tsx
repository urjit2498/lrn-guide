import { useState } from 'react';
import { toast } from 'sonner';
import { updatePassword } from '@/lib/auth';
import { useAuthContext } from '@/contexts/AuthContext';

type Strength = 'weak' | 'fair' | 'strong';

function getStrength(pw: string): Strength | null {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'fair';
  return 'strong';
}

const inputCls =
  'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

export function ResetPasswordModal() {
  const { isPasswordRecovery, clearPasswordRecovery } = useAuthContext();
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);

  if (!isPasswordRecovery) return null;

  const strength = getStrength(password);
  const mismatch = confirm.length > 0 && confirm !== password;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      toast.success('Password updated! You are now signed in.');
      clearPasswordRecovery();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Could not update password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Set New Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters recommended"
              className={inputCls}
            />
            {/* Strength bars */}
            {strength && (() => {
              const config = {
                weak:   { label: 'Weak',   color: 'bg-red-500',    bars: 1, textColor: 'text-red-500' },
                fair:   { label: 'Fair',   color: 'bg-yellow-500', bars: 2, textColor: 'text-yellow-600 dark:text-yellow-400' },
                strong: { label: 'Strong', color: 'bg-green-500',  bars: 3, textColor: 'text-green-600 dark:text-green-400' },
              }[strength];
              return (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                          n <= config.bars ? config.color : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${config.textColor}`}>{config.label} password</p>
                </div>
              );
            })()}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your new password"
              className={`${inputCls} ${mismatch ? 'border-red-400 focus:ring-red-400' : ''}`}
            />
            {mismatch && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || mismatch}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
