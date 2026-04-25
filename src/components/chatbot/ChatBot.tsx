import { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useAppStore } from '@/store/appStore';
import { ChatMessage } from './ChatMessage';
import { clsx } from 'clsx';

// Quick-start prompt chips for the current topic
const QUICK_PROMPTS: Record<string, string[]> = {
  php: ['Explain variables simply', 'What is OOP?', 'PHP vs Node.js?'],
  laravel: ['What is Eloquent?', 'Explain migrations', 'What is middleware?'],
  react: ['Explain useState', 'What is Virtual DOM?', 'useMemo vs useCallback?'],
  nodejs: ['What is the event loop?', 'Explain async/await', 'What is Express?'],
  mysql: ['What is a JOIN?', 'Explain indexing', 'MySQL vs MongoDB?'],
  mongodb: ['What is a document?', 'Explain aggregation', 'When to use MongoDB?'],
  devops: ['What is Docker?', 'Explain CI/CD', 'What is Kubernetes?'],
  github: ['Explain git merge vs rebase', 'What is a PR?', 'Git branching strategy?'],
  agile: ['What is a Sprint?', 'Explain Scrum roles', 'Agile vs Waterfall?'],
};

export function ChatBot() {
  const { messages, isLoading, sendMessage, clearChat, topicName } = useChat();
  const { isChatOpen, closeChat, selectedTopicId } = useAppStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = QUICK_PROMPTS[selectedTopicId] ?? [];

  if (!isChatOpen) return null;

  return (
    <aside
      className={clsx(
        'flex flex-col w-80 xl:w-96 h-[calc(100vh-60px)] sticky top-[60px]',
        'bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800',
        'animate-slide-up'
      )}
    >
      {/* Chat header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-sm">
          🤖
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">AI Tutor</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            Helping with {topicName}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
              title="Clear chat"
            >
              🗑️
            </button>
          )}
          <button
            onClick={closeChat}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Close chat"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-center py-6 animate-fade-in">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Hi! I'm your AI Tutor
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Ask me anything about {topicName}. I'll give you simple, clear answers!
            </p>
            {/* Quick prompt chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-700 rounded-full px-3 py-1 hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-sm flex-shrink-0">
              🤖
            </div>
            <div className="chat-assistant">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        {/* Quick prompts after first message */}
        {messages.length > 0 && quickPrompts.length > 0 && (
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2.5 py-1 whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topicName}...`}
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none text-sm bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2.5 outline-none focus:bg-white dark:focus:bg-gray-700 border border-transparent focus:border-brand-300 dark:focus:border-brand-600 transition-all disabled:opacity-50 max-h-24"
            style={{ minHeight: '40px' }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = 'auto';
              t.style.height = Math.min(t.scrollHeight, 96) + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 mb-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </aside>
  );
}
