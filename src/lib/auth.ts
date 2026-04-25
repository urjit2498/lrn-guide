import { supabase } from './supabaseClient';
import { upsertProfile } from './profile';

// ─── Sign Up ─────────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

// ─── Sign In ─────────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  // Ensure a profile row exists for existing users (backfill)
  if (data.user) {
    await upsertProfile(data.user.id, { email: data.user.email ?? '' }).catch(() => {});
  }
  return data;
}

// ─── Sign Out ────────────────────────────────────────────────────────────────

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// ─── Get current session ─────────────────────────────────────────────────────

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
}
