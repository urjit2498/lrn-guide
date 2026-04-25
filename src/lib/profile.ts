import { supabase } from './supabaseClient';
import type { UserProfile } from '@/types';

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // no row yet
    throw new Error(error.message);
  }
  return data as UserProfile;
}

export async function upsertProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as UserProfile;
}

export async function deleteAccount(): Promise<void> {
  const { error } = await supabase.rpc('delete_user');
  if (error) throw new Error(error.message);
}
