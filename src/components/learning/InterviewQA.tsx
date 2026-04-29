import { useState, useEffect } from 'react';
import { InterviewQA as IQA } from '@/types';
import { clsx } from 'clsx';
import { Highlight, slugify } from '@/lib/highlight';
import { RichContent } from './RichContent';

interface InterviewQAProps {
  questions: IQA[];
  highlightQuery?: string;
  highlightTitle?: string;
}

export function InterviewQA({ questions, highlightQuery = '', highlightTitle = '' }: InterviewQAProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Auto-open the question that matches the search result
  useEffect(() => {
    if (!highlightTitle) return;
    const idx = questions.findIndex((qa) => qa.question === highlightTitle);
    if (idx !== -1) setOpenIndex(idx);
  }, [highlightTitle, questions]);

  if (questions.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎯</span>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Interview Questions</h3>
        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
          {questions.length}
        </span>
      </div>

      <div className="space-y-2">
        {questions.map((qa, i) => {
          const isHighlighted = highlightTitle && qa.question === highlightTitle;
          return (
          <div
            key={i}
            id={`qa-${slugify(qa.question)}`}
            className={clsx(
              'bg-white dark:bg-gray-900 border rounded-xl overflow-hidden transition-shadow duration-500',
              isHighlighted
                ? 'border-yellow-400 dark:border-yellow-500 ring-2 ring-yellow-300 dark:ring-yellow-600/60 shadow-lg'
                : 'border-gray-200 dark:border-gray-800',
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                Q
              </span>
              <p className="flex-1 font-medium text-sm text-gray-800 dark:text-gray-200 leading-snug">
                <Highlight text={qa.question} query={highlightQuery} />
              </p>
              <span className={clsx(
                'text-gray-400 text-xs flex-shrink-0 mt-1 transition-transform duration-200',
                openIndex === i ? 'rotate-180' : ''
              )}>
                ▼
              </span>
            </button>

            {openIndex === i && (
              <div className="px-4 pb-4 flex gap-3 animate-fade-in">
                <div className="w-6 flex-shrink-0" />
                <div className="flex-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1.5 flex items-center gap-1">
                    <span>✅</span> Answer
                  </p>
                  <RichContent text={qa.answer} highlightQuery={highlightQuery} />

                  {qa.example && (
                    <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Example</p>
                      <RichContent
                        text={qa.example}
                        highlightQuery={highlightQuery}
                        className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed"
                      />
                    </div>
                  )}

                  {qa.use_case && (
                    <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">Real-world Use Case</p>
                      <RichContent
                        text={qa.use_case}
                        highlightQuery={highlightQuery}
                        className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed"
                      />
                    </div>
                  )}

                  {qa.follow_up && (
                    <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">Follow-up Question</p>
                      <RichContent
                        text={qa.follow_up}
                        highlightQuery={highlightQuery}
                        className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}
