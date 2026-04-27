import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { loadTopicContent } from '@/data/topics';
import { LevelTabs } from './LevelTabs';
import { ContentCard } from './ContentCard';
import { InterviewQA } from './InterviewQA';
import { LevelBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getInterviewQuestions } from '@/data/interview';
import { useAuthContext } from '@/contexts/AuthContext';
import { saveProgress } from '@/lib/progress';
import { slugify } from '@/lib/highlight';
import { toast } from 'sonner';
import type { Topic } from '@/types';

export function TopicContent() {
  const {
    selectedTopicId,
    selectedLevel,
    markLevelComplete,
    isLevelComplete,
    highlightQuery,
    highlightTitle,
    clearHighlight,
  } = useAppStore();
  const { user } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [contentLoading, setContentLoading] = useState(true);

  // Load full topic content lazily — only runs when selectedTopicId changes
  useEffect(() => {
    let cancelled = false;
    setContentLoading(true);
    loadTopicContent(selectedTopicId).then((t) => {
      if (!cancelled) {
        setTopic(t ?? null);
        setContentLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [selectedTopicId]);

  // Scroll to the search-matched element and clear highlight after a delay
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!highlightTitle || contentLoading) return;

    const scrollTimer = setTimeout(() => {
      const sectionEl = document.getElementById(`section-${slugify(highlightTitle)}`);
      const qaEl = document.getElementById(`qa-${slugify(highlightTitle)}`);
      const target = sectionEl ?? qaEl;
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);

    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => clearHighlight(), 4000);

    return () => clearTimeout(scrollTimer);
  }, [highlightTitle, contentLoading, clearHighlight]);

  async function handleMarkComplete() {
    setSaving(true);
    try {
      if (user) {
        await saveProgress(user.id, selectedTopicId, selectedLevel, true);
      }
      markLevelComplete(selectedTopicId, selectedLevel);
      toast.success(
        `${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} level marked as complete!`
      );
    } catch {
      toast.error('Failed to save progress. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (contentLoading) {
    return <TopicSkeleton />;
  }

  if (!topic) return null;

  const levelContent = topic.levels.find((l) => l.level === selectedLevel);
  if (!levelContent) return null;

  const completed = isLevelComplete(selectedTopicId, selectedLevel);
  const fullInterviewQuestions = getInterviewQuestions(selectedTopicId, selectedLevel);
  const questionsForLevel =
    fullInterviewQuestions.length > 0 ? fullInterviewQuestions : levelContent.interviewQA;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <LevelTabs topicId={topic.id} />

      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <LevelBadge level={selectedLevel} />
            {completed && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                ✅ Completed
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {levelContent.intro}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {levelContent.sections.map((section, i) => (
          <ContentCard
            key={`${selectedTopicId}-${selectedLevel}-${i}`}
            section={section}
            index={i}
            highlightQuery={highlightQuery}
            highlightTitle={highlightTitle}
          />
        ))}
      </div>

      <InterviewQA
        questions={questionsForLevel}
        highlightQuery={highlightQuery}
        highlightTitle={highlightTitle}
      />

      <div className="pt-2 pb-4">
        {!completed ? (
          <Button
            onClick={handleMarkComplete}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Saving…
              </>
            ) : (
              '✅ Mark Level as Complete'
            )}
          </Button>
        ) : (
          <div className="text-center py-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 font-medium text-sm">
              🎉 You completed the {selectedLevel} level!
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Move on to the next level to continue learning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function TopicSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-pulse">
      {/* Level tabs placeholder */}
      <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />

      {/* Intro */}
      <div className="space-y-2">
        <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Content cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 space-y-3"
        >
          <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-4/6 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      ))}
    </div>
  );
}
