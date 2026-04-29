import { useState } from 'react';
import { ContentSection } from '@/types';
import { clsx } from 'clsx';
import { Highlight, slugify } from '@/lib/highlight';
import { CodeBlock, RichContent } from './RichContent';

interface ContentCardProps {
  section: ContentSection;
  index: number;
  highlightQuery?: string;
  highlightTitle?: string;
}

export function ContentCard({ section, index, highlightQuery = '', highlightTitle = '' }: ContentCardProps) {
  const [codeOpen, setCodeOpen] = useState(false);
  const isHighlighted = highlightTitle && section.title === highlightTitle;

  return (
    <div
      id={`section-${slugify(section.title)}`}
      className={clsx(
        'bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden animate-slide-up transition-shadow duration-500',
        isHighlighted
          ? 'border-yellow-400 dark:border-yellow-500 ring-2 ring-yellow-300 dark:ring-yellow-600/60 shadow-lg'
          : 'border-gray-200 dark:border-gray-800',
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            {index + 1}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-snug">
            <Highlight text={section.title} query={highlightQuery} />
          </h3>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Explanation */}
        <RichContent
          text={section.explanation}
          highlightQuery={highlightQuery}
          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
        />

        {/* Key points */}
        {section.keyPoints && section.keyPoints.length > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-xl p-3.5">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-1.5">
              <span>⚡</span> Key Points
            </p>
            <ul className="space-y-1">
              {section.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 leading-snug">
                  <span className="text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5">•</span>
                  <Highlight text={point} query={highlightQuery} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Real-world example */}
        <InfoBlock
          icon="🌍"
          label="Real-World Example"
          color="blue"
          text={section.realWorldExample}
          highlightQuery={highlightQuery}
        />

        {/* Practical use case */}
        <InfoBlock
          icon="🛠️"
          label="Try This"
          color="purple"
          text={section.practicalUseCase}
          highlightQuery={highlightQuery}
        />

        {/* Code example (collapsible) */}
        {section.codeExample && (
          <div>
            <button
              onClick={() => setCodeOpen((v) => !v)}
              className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              <span className="w-4 h-4 flex items-center justify-center rounded bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-[10px]">
                {codeOpen ? '▲' : '▼'}
              </span>
              {codeOpen ? 'Hide' : 'Show'} Code Example
            </button>

            {codeOpen && <CodeBlock code={section.codeExample} />}
          </div>
        )}

        {/* Exercise */}
        {section.exercise && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-3.5">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
              <span>📝</span> Exercise
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              {section.exercise}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared info block ────────────────────────────────────────────────────────

interface InfoBlockProps {
  icon: string;
  label: string;
  color: 'blue' | 'purple';
  text: string;
  highlightQuery?: string;
}

function InfoBlock({ icon, label, color, text, highlightQuery = '' }: InfoBlockProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-700 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/40 text-purple-700 dark:text-purple-400',
  };

  return (
    <div className={clsx('rounded-xl p-3.5 border', colorClasses[color])}>
      <p className={clsx('text-xs font-semibold mb-1 flex items-center gap-1.5')}>
        <span>{icon}</span> {label}
      </p>
      <RichContent text={text} highlightQuery={highlightQuery} />
    </div>
  );
}
