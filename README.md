# LRN Guide

A developer learning platform covering PHP, Laravel, React, Node.js, MySQL, MongoDB, DevOps, GitHub, and Agile — with beginner, intermediate, and advanced levels for each topic.

**Live:** [lrn-guide.vercel.app](https://lrn-guide.vercel.app)

---

## Features

- Structured learning content at three levels (Beginner / Intermediate / Advanced)
- Interview Q&A for every topic and level
- Progress tracking synced to your account
- Bookmark topics for quick access
- Dark mode
- User profiles with role, experience, and tech stack

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Bundler | Rspack |
| Styling | Tailwind CSS |
| State | Zustand (with persist) |
| Auth + DB | Supabase |
| Deployment | Vercel |

## Getting Started

### 1. Clone

```bash
git clone https://github.com/urjit2498/lrn-guide.git
cd lrn-guide
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your [Supabase project](https://app.supabase.com) → Settings → API.

### 3. Set up the database

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

### 4. Run

```bash
npm run dev
```

Open `http://localhost:8080`.

## Project Structure

```
src/
├── components/
│   ├── auth/          # Sign in / sign up modal
│   ├── layout/        # App shell, sidebar, header, landing page
│   ├── learning/      # Topic content viewer
│   ├── profile/       # User profile panel
│   └── ui/            # Logo and shared UI
├── contexts/          # AuthContext (single Supabase subscription)
├── data/              # Topic metadata and generated content
├── hooks/             # Shared hooks
├── lib/               # Supabase client, auth, profile, progress helpers
├── store/             # Zustand app store
└── types/             # Shared TypeScript types
```

## Deployment

The app deploys automatically to Vercel on every push to `main`.

Set the following environment variables in your Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## License

MIT
