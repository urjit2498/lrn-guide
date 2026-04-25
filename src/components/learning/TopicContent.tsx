import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { getTopicById } from '@/data/topics';
import { LevelTabs } from './LevelTabs';
import { ContentCard } from './ContentCard';
import { InterviewQA } from './InterviewQA';
import { LevelBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getInterviewQuestions } from '@/data/interview';
import { useAuth } from '@/hooks/useAuth';
import { saveProgress } from '@/lib/progress';
import { toast } from 'sonner';

export function TopicContent() {
  const {
    selectedTopicId,
    selectedLevel,
    markLevelComplete,
    isLevelComplete,
    // openChat,  // CHATBOT DISABLED
  } = useAppStore();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  async function handleMarkComplete() {
    setSaving(true);
    try {
      if (user) {
        await saveProgress(user.id, selectedTopicId, selectedLevel, true);
      }
      markLevelComplete(selectedTopicId, selectedLevel);
      toast.success(`${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} level marked as complete!`);
    } catch {
      toast.error('Failed to save progress. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const topic = getTopicById(selectedTopicId);
  if (!topic) return null;

  const levelContent = topic.levels.find((l) => l.level === selectedLevel);
  if (!levelContent) return null;

  const completed = isLevelComplete(selectedTopicId, selectedLevel);
  const fullInterviewQuestions = getInterviewQuestions(selectedTopicId, selectedLevel);
  const questionsForLevel =
    fullInterviewQuestions.length > 0 ? fullInterviewQuestions : levelContent.interviewQA;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Level tabs */}
      <LevelTabs topicId={topic.id} />

      {/* Level intro */}
      <div className="flex items-start justify-between gap-3">
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

        {/* CHATBOT DISABLED — re-enable by uncommenting
        <Button variant="outline" size="sm" onClick={openChat} className="flex-shrink-0">
          <span>🤖</span>
          <span className="hidden sm:inline">Ask AI</span>
        </Button>
        */}
      </div>

      {/* Content cards */}
      <div className="space-y-4">
        {levelContent.sections.map((section, i) => (
          <ContentCard
            key={`${selectedTopicId}-${selectedLevel}-${i}`}
            section={section}
            index={i}
          />
        ))}
      </div>

      {/* Interview Q&A */}
      <InterviewQA questions={questionsForLevel} />

      {/* Complete level button */}
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
