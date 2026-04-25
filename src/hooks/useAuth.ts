import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { AuthUser } from '@/types';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the current session on mount
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
      setLoading(false);
    });

    // Listen for login / logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
