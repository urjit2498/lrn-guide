import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth';
import { getProfile, upsertProfile, deleteAccount } from '@/lib/profile';
import type { AuthUser, UserProfile } from '@/types';

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Mobile Developer',
  'Data Engineer',
  'QA Engineer',
  'Tech Lead / Architect',
  'Student / Learner',
];

const EXPERIENCE_LEVELS = [
  'Junior (0–2 yrs)',
  'Mid-level (2–5 yrs)',
  'Senior (5–8 yrs)',
  'Lead / Staff (8+ yrs)',
];

const TECH_OPTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Angular',
  'Node.js', 'PHP', 'Laravel', 'Python', 'Django', 'Java', 'Spring Boot', 'Go',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'CI/CD',
  'HTML/CSS', 'Tailwind CSS', 'GraphQL', 'REST APIs',
];

const EMPTY_PROFILE: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> = {
  email: '',
  full_name: '',
  role: '',
  experience_level: '',
  years_of_experience: null,
  tech_stack: [],
  learning_goals: '',
  github_url: '',
  linkedin_url: '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfilePanelProps {
  user: AuthUser;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfilePanel({ user }: ProfilePanelProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'profile' | 'account'>('profile');
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load profile when panel opens
  useEffect(() => {
    if (!open) return;
    setLoadingProfile(true);
    getProfile(user.id)
      .then((profile) => {
        if (profile) {
          setForm({
            email: profile.email ?? user.email,
            full_name: profile.full_name ?? '',
            role: profile.role ?? '',
            experience_level: profile.experience_level ?? '',
            years_of_experience: profile.years_of_experience ?? null,
            tech_stack: profile.tech_stack ?? [],
            learning_goals: profile.learning_goals ?? '',
            github_url: profile.github_url ?? '',
            linkedin_url: profile.linkedin_url ?? '',
          });
        } else {
          setForm({ ...EMPTY_PROFILE, email: user.email });
        }
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : '';
        if (msg.includes('schema cache') || msg.includes('profiles')) {
          toast.error('Profiles table missing. Run the setup SQL in your Supabase dashboard first.');
        } else {
          toast.error('Failed to load profile.');
        }
      })
      .finally(() => setLoadingProfile(false));
  }, [open, user.id, user.email]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirmDelete(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function toggleTech(tech: string) {
    setForm((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  }

  function isValidUrl(value: string): boolean {
    if (!value) return true; // empty is fine
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }

  async function handleSave() {
    if (!isValidUrl(form.github_url)) {
      toast.error('Invalid GitHub URL.');
      return;
    }
    if (!isValidUrl(form.linkedin_url)) {
      toast.error('Invalid LinkedIn URL.');
      return;
    }
    setSaving(true);
    try {
      await upsertProfile(user.id, form);
      toast.success('Profile saved!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed.';
      if (msg.includes('schema cache') || msg.includes('profiles')) {
        toast.error('Profiles table missing. Run the setup SQL in your Supabase dashboard first.');
      } else {
        toast.error(msg);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      toast.success('Signed out.');
    } catch {
      toast.error('Sign out failed.');
    }
  }

  async function handleDeleteAccount() {
    setSaving(true);
    try {
      await deleteAccount();
      toast.success('Account deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      setSaving(false);
      setConfirmDelete(false);
    }
  }

  const initials = form.full_name
    ? form.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={panelRef}>
      {/* Avatar trigger */}
      <button
        onClick={() => { setOpen((v) => !v); setConfirmDelete(false); }}
        className="w-9 h-9 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center hover:bg-indigo-700 transition-colors ring-2 ring-white dark:ring-gray-900 focus:outline-none focus:ring-indigo-400"
        title={user.email}
        aria-label="Open profile"
      >
        {initials}
      </button>

      {/* Slide panel */}
      {open && (
        <div className="absolute right-0 top-11 w-[360px] max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                {form.full_name || 'Your Profile'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none flex-shrink-0"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 px-5">
            {(['profile', 'account'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-2.5 px-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-4">
            {loadingProfile ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
              </div>
            ) : tab === 'profile' ? (
              <>
                {/* Full name */}
                <Field label="Full Name">
                  <input
                    value={form.full_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                    placeholder="e.g. Urjit Patel"
                    maxLength={100}
                    className={inputCls}
                  />
                </Field>

                {/* Role */}
                <Field label="Role">
                  <select
                    value={form.role}
                    onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">Select your role…</option>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>

                {/* Experience level */}
                <Field label="Experience Level">
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, experience_level: lvl }))}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          form.experience_level === lvl
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Years */}
                <Field label="Years of Experience">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={form.years_of_experience ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, years_of_experience: e.target.value === '' ? null : Number(e.target.value) }))}
                    placeholder="e.g. 3"
                    className={inputCls}
                  />
                </Field>

                {/* Tech stack */}
                <Field label="Tech Stack">
                  <div className="flex flex-wrap gap-1.5">
                    {TECH_OPTIONS.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                          form.tech_stack.includes(tech)
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Learning goals */}
                <Field label="Learning Goals">
                  <textarea
                    rows={2}
                    value={form.learning_goals}
                    onChange={(e) => setForm((prev) => ({ ...prev, learning_goals: e.target.value }))}
                    placeholder="What are you aiming to learn or improve?"
                    maxLength={500}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {/* GitHub */}
                <Field label="GitHub URL">
                  <input
                    value={form.github_url}
                    onChange={(e) => setForm((prev) => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/username"
                    maxLength={200}
                    className={inputCls}
                  />
                </Field>

                {/* LinkedIn */}
                <Field label="LinkedIn URL">
                  <input
                    value={form.linkedin_url}
                    onChange={(e) => setForm((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/in/username"
                    maxLength={200}
                    className={inputCls}
                  />
                </Field>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors mt-1"
                >
                  {saving ? 'Saving…' : 'Save Profile'}
                </button>
              </>
            ) : (
              /* Account tab */
              <div className="flex flex-col gap-3">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm">
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Signed in as</p>
                  <p className="font-medium text-gray-900 dark:text-white break-all">{user.email}</p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Sign Out
                </button>

                <hr className="border-gray-200 dark:border-gray-700 my-1" />

                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Deleting your account is permanent. All your data will be erased and cannot be recovered.
                </p>

                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full rounded-lg border border-red-300 dark:border-red-800 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="rounded-lg border border-red-300 dark:border-red-800 p-4 space-y-3">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      Are you sure? This cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={saving}
                        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        {saving ? 'Deleting…' : 'Yes, Delete'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}
