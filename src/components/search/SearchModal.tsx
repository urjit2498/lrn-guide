import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { buildSearchIndex, searchIndex, getSnippet, type SearchResult } from '@/lib/search';
import { Highlight } from '@/lib/highlight';
import type { Level } from '@/types';

const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const LEVEL_COLORS: Record<Level, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export function SearchModal() {
  const { isSearchOpen, closeSearch, setSelectedTopic, setSelectedLevel, setHighlight } = useAppStore();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexReady, setIndexReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef<SearchResult[] | null>(null);

  // Load index once when modal first opens
  useEffect(() => {
    if (!isSearchOpen) return;
    // Focus input
    requestAnimationFrame(() => inputRef.current?.focus());
    // Build index if not ready
    if (indexRef.current) { setIndexReady(true); return; }
    setLoading(true);
    buildSearchIndex().then((idx) => {
      indexRef.current = idx;
      setIndexReady(true);
      setLoading(false);
    });
  }, [isSearchOpen]);

  // Run search whenever query changes
  useEffect(() => {
    if (!indexRef.current || query.length < 2) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const hits = searchIndex(indexRef.current, query);
    setResults(hits);
    setActiveIndex(0);
  }, [query, indexReady]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setHighlight(query, result.title);
      setSelectedTopic(result.topicId);
      setSelectedLevel(result.level);
      closeSearch();
      setQuery('');
    },
    [query, setHighlight, setSelectedTopic, setSelectedLevel, closeSearch],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
        setQuery('');
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    },
    [results, activeIndex, closeSearch, handleSelect],
  );

  if (!isSearchOpen) return null;

  const sections = results.filter((r) => r.type === 'section');
  const interviews = results.filter((r) => r.type === 'interview');

  // Offset for interview items in the flat list (sections come first)
  const interviewOffset = sections.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) { closeSearch(); setQuery(''); }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[75vh]">

        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.65 10.65z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, sections, interview questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm px-1"
            >
              ✕
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 flex-shrink-0">
            Esc
          </kbd>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-brand-500 rounded-full animate-spin mr-2" />
              Building search index…
            </div>
          )}

          {/* Empty state */}
          {!loading && query.length < 2 && (
            <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              <p className="text-2xl mb-2">🔍</p>
              <p>Type 2+ characters to search across all topics and levels</p>
              <p className="mt-1 text-xs">Sections, explanations, interview Q&amp;As</p>
            </div>
          )}

          {/* No results */}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              <p className="text-2xl mb-2">😕</p>
              <p>No results for <strong className="text-gray-600 dark:text-gray-300">"{query}"</strong></p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <ul ref={listRef} className="py-2">
              {/* Learning sections */}
              {sections.length > 0 && (
                <>
                  <SectionHeader label="Learning Sections" count={sections.length} />
                  {sections.map((r, i) => (
                    <ResultItem
                      key={`section-${r.topicId}-${r.level}-${r.title}`}
                      result={r}
                      query={query}
                      isActive={activeIndex === i}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => handleSelect(r)}
                    />
                  ))}
                </>
              )}

              {/* Interview Q&As */}
              {interviews.length > 0 && (
                <>
                  <SectionHeader label="Interview Q&A" count={interviews.length} />
                  {interviews.map((r, i) => (
                    <ResultItem
                      key={`interview-${r.topicId}-${r.level}-${r.title}`}
                      result={r}
                      query={query}
                      isActive={activeIndex === interviewOffset + i}
                      onMouseEnter={() => setActiveIndex(interviewOffset + i)}
                      onClick={() => handleSelect(r)}
                    />
                  ))}
                </>
              )}
            </ul>
          )}
        </div>

        {/* Footer hints */}
        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded border border-gray-200 dark:border-gray-700">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded border border-gray-200 dark:border-gray-700">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-gray-100 dark:bg-gray-800 px-1 rounded border border-gray-200 dark:border-gray-700">Esc</kbd>
              close
            </span>
            <span className="ml-auto">{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <li className="px-4 pt-3 pb-1 flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="text-[11px] text-gray-400 dark:text-gray-500">{count}</span>
    </li>
  );
}

interface ResultItemProps {
  result: SearchResult;
  query: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

function ResultItem({ result, query, isActive, onMouseEnter, onClick }: ResultItemProps) {
  const snippet = getSnippet(result.snippet, query);

  return (
    <li
      role="option"
      aria-selected={isActive}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`
        mx-2 px-3 py-2.5 rounded-lg cursor-pointer flex items-start gap-3 transition-colors
        ${isActive ? 'bg-brand-50 dark:bg-brand-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
      `}
    >
      {/* Icon */}
      <span className="text-lg flex-shrink-0 mt-0.5">{result.topicIcon}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {result.topicName}
          </span>
          <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${LEVEL_COLORS[result.level]}`}>
            {LEVEL_LABELS[result.level]}
          </span>
          <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            {result.type === 'interview' ? 'Q&A' : 'Section'}
          </span>
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          <Highlight text={result.title} query={query} />
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
          <Highlight text={snippet} query={query} />
        </p>
      </div>

      {/* Arrow indicator when active */}
      {isActive && (
        <svg className="w-4 h-4 text-brand-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </li>
  );
}

