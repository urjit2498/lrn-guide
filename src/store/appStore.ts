import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Level, ChatMessage, AppState } from '@/types';

interface AppActions {
  setSelectedTopic: (id: string) => void;
  setSelectedLevel: (level: Level) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  openChat: () => void;
  closeChat: () => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setChatLoading: (loading: boolean) => void;
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
  chatMessages: [],
  isChatOpen: false,
  isChatLoading: false,
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
        // Apply dark class to HTML element
        document.documentElement.classList.toggle('dark', next);
      },

      openChat: () => set({ isChatOpen: true }),
      closeChat: () => set({ isChatOpen: false }),

      addChatMessage: (msg) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            { ...msg, id: crypto.randomUUID(), timestamp: new Date() },
          ],
        })),

      clearChat: () => set({ chatMessages: [] }),

      setChatLoading: (loading) => set({ isChatLoading: loading }),

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
        const progress: Record<string, Record<Level, boolean>> = {};
        for (const row of rows) {
          if (!progress[row.topic]) progress[row.topic] = {} as Record<Level, boolean>;
          progress[row.topic][row.subtopic as Level] = row.completed;
        }
        set({ progress });
      },
    }),
    {
      name: 'lrn-guide-storage',
      // Only persist preferences and progress — not chat messages
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
