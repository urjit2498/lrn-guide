import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Level, AppState } from '@/types';

interface AppActions {
  setSelectedTopic: (id: string) => void;
  setSelectedLevel: (level: Level) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleBookmark: (topicId: string) => void;
  markLevelComplete: (topicId: string, level: Level) => void;
  isLevelComplete: (topicId: string, level: Level) => boolean;
  loadProgress: (rows: Array<{ topic: string; subtopic: string; completed: boolean }>) => void;
}

const initialState: AppState = {
  selectedTopicId: 'php',
  selectedLevel: 'beginner',
  searchQuery: '',
  isDarkMode: false,
  bookmarks: [],
  progress: {},
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedTopic: (id) =>
        set({ selectedTopicId: id, selectedLevel: 'beginner' }),

      setSelectedLevel: (level) => set({ selectedLevel: level }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleDarkMode: () => {
        const next = !get().isDarkMode;
        set({ isDarkMode: next });
        document.documentElement.classList.toggle('dark', next);
      },

      toggleBookmark: (topicId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(topicId)
            ? state.bookmarks.filter((id) => id !== topicId)
            : [...state.bookmarks, topicId],
        })),

      markLevelComplete: (topicId, level) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [topicId]: {
              ...state.progress[topicId],
              [level]: true,
            },
          },
        })),

      isLevelComplete: (topicId, level) =>
        get().progress[topicId]?.[level] ?? false,

      loadProgress: (rows) => {
        const VALID_LEVELS = new Set<Level>(['beginner', 'intermediate', 'advanced']);
        set((state) => {
          const merged = { ...state.progress };
          for (const row of rows) {
            if (!VALID_LEVELS.has(row.subtopic as Level)) continue;
            merged[row.topic] = {
              ...merged[row.topic],
              [row.subtopic as Level]: row.completed,
            };
          }
          return { progress: merged };
        });
      },
    }),
    {
      name: 'lrn-guide-storage',
      partialize: (state) => ({
        selectedTopicId: state.selectedTopicId,
        selectedLevel: state.selectedLevel,
        isDarkMode: state.isDarkMode,
        bookmarks: state.bookmarks,
        progress: state.progress,
      }),
    }
  )
);
