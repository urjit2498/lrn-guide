-- ─── Run this in: Supabase Dashboard → SQL Editor ───────────────────────────
--
-- Creates the users_progress table and enables Row Level Security (RLS)
-- so every user can only access their own rows.
-- ─────────────────────────────────────────────────────────────────────────────


-- 1. Create the table
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users_progress (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic       TEXT        NOT NULL,
  subtopic    TEXT        NOT NULL,
  completed   BOOLEAN     DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint so upsert (on conflict) works correctly
ALTER TABLE users_progress
  ADD CONSTRAINT users_progress_user_topic_subtopic_key
  UNIQUE (user_id, topic, subtopic);


-- 2. Enable Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE users_progress ENABLE ROW LEVEL SECURITY;


-- 3. RLS Policies — users can only touch their own rows
-- ─────────────────────────────────────────────────────────────────────────────

-- SELECT: read own rows
CREATE POLICY "Users can view own progress"
  ON users_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: insert only rows where user_id matches the logged-in user
CREATE POLICY "Users can insert own progress"
  ON users_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: update only own rows
CREATE POLICY "Users can update own progress"
  ON users_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE: delete only own rows
CREATE POLICY "Users can delete own progress"
  ON users_progress
  FOR DELETE
  USING (auth.uid() = user_id);


-- 4. Optional: index for fast per-user queries
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS users_progress_user_id_idx ON users_progress (user_id);
