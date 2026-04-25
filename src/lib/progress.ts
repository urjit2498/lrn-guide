import { supabase } from './supabaseClient';
import type { UserProgress } from '@/types';

// ─── Fetch all progress for a user ───────────────────────────────────────────

export async function fetchProgress(userId: string): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('users_progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Save progress (upsert) ───────────────────────────────────────────────────
// Uses upsert so calling it multiple times is safe (idempotent).

export async function saveProgress(
  userId: string,
  topic: string,
  subtopic: string,
  completed: boolean
): Promise<UserProgress> {
  const { data, error } = await supabase
    .from('users_progress')
    .upsert(
      { user_id: userId, topic, subtopic, completed },
      { onConflict: 'user_id,topic,subtopic' }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ─── Update a single progress row ────────────────────────────────────────────

export async function updateProgress(id: string, completed: boolean): Promise<UserProgress> {
  const { data, error } = await supabase
    .from('users_progress')
    .update({ completed })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ─── Delete a progress row ────────────────────────────────────────────────────

export async function deleteProgress(id: string): Promise<void> {
  const { error } = await supabase
    .from('users_progress')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
