-- ─────────────────────────────────────────────────────────────────────────────
-- LRN GUIDE — Complete Supabase Schema
-- Run the entire file in: Supabase Dashboard → SQL Editor → New Query → Run
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / DROP IF EXISTS)
-- ─────────────────────────────────────────────────────────────────────────────


-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. PROFILES TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.profiles (
  id                   UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email                TEXT,
  full_name            TEXT        NOT NULL DEFAULT '',
  role                 TEXT        NOT NULL DEFAULT '',
  experience_level     TEXT        NOT NULL DEFAULT '',
  years_of_experience  INTEGER,
  tech_stack           TEXT[]      NOT NULL DEFAULT '{}',
  learning_goals       TEXT        NOT NULL DEFAULT '',
  github_url           TEXT        NOT NULL DEFAULT '',
  linkedin_url         TEXT        NOT NULL DEFAULT '',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies so re-runs don't error
DROP POLICY IF EXISTS "select_own"  ON public.profiles;
DROP POLICY IF EXISTS "insert_own"  ON public.profiles;
DROP POLICY IF EXISTS "update_own"  ON public.profiles;

CREATE POLICY "select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS profiles_id_idx ON public.profiles (id);


-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. USERS_PROGRESS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.users_progress (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic       TEXT        NOT NULL,
  subtopic    TEXT        NOT NULL CHECK (subtopic IN ('beginner', 'intermediate', 'advanced')),
  completed   BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT users_progress_user_topic_subtopic_key UNIQUE (user_id, topic, subtopic)
);

ALTER TABLE public.users_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own"  ON public.users_progress;
DROP POLICY IF EXISTS "insert_own"  ON public.users_progress;
DROP POLICY IF EXISTS "update_own"  ON public.users_progress;
DROP POLICY IF EXISTS "delete_own"  ON public.users_progress;

CREATE POLICY "select_own" ON public.users_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.users_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.users_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.users_progress FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS users_progress_user_id_idx ON public.users_progress (user_id);


-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. AUTO-CREATE PROFILE ROW ON SIGNUP
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ═══════════════════════════════════════════════════════════════════════════════
-- 4. DELETE ACCOUNT RPC
-- Only deletes the currently authenticated user — scoped by auth.uid()
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM auth.users WHERE id = auth.uid();
$$;
