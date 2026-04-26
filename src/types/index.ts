// ─── Learning Content Types ──────────────────────────────────────────────────

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface InterviewQA {
  question: string;
  answer: string;
  example?: string;
  use_case?: string;
  follow_up?: string;
}

export interface ContentSection {
  title: string;
  explanation: string;         // Simple language explanation
  realWorldExample: string;    // How it's used in real projects
  practicalUseCase: string;    // Hands-on scenario
  codeExample?: string;        // Optional code snippet
  exercise?: string;           // Small task for the learner
}

export interface LevelContent {
  level: Level;
  intro: string;               // Short intro for this level
  sections: ContentSection[];
  interviewQA: InterviewQA[];
}

export interface Topic {
  id: string;
  name: string;
  icon: string;                // Emoji icon
  color: string;               // Tailwind color class (bg-*)
  textColor: string;           // Tailwind text color class
  borderColor: string;         // Tailwind border color class
  description: string;
  levels: LevelContent[];
}

// ─── Supabase / Auth Types ───────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  experience_level: string;
  years_of_experience: number | null;
  tech_stack: string[];
  learning_goals: string;
  github_url: string;
  linkedin_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  topic: string;
  subtopic: string;
  completed: boolean;
  created_at: string;
}

// ─── App State Types ─────────────────────────────────────────────────────────

export interface AppState {
  selectedTopicId: string;
  selectedLevel: Level;
  searchQuery: string;
  isDarkMode: boolean;
  bookmarks: string[];
  progress: Record<string, Record<Level, boolean>>;
}
