import { useState } from 'react';
import { ContentSection } from '@/types';
import { clsx } from 'clsx';

interface ContentCardProps {
  section: ContentSection;
  index: number;
}

export function ContentCard({ section, index }: ContentCardProps) {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            {index + 1}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-snug">
            {section.title}
          </h3>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Explanation */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {section.explanation}
        </p>

        {/* Real-world example */}
        <InfoBlock
          icon="🌍"
          label="Real-World Example"
          color="blue"
          text={section.realWorldExample}
        />

        {/* Practical use case */}
        <InfoBlock
          icon="🛠️"
          label="Try This"
          color="purple"
          text={section.practicalUseCase}
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

            {codeOpen && (
              <div className="mt-2 prose-code">
                <pre>
                  <code>{section.codeExample}</code>
                </pre>
              </div>
            )}
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
}

function InfoBlock({ icon, label, color, text }: InfoBlockProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-700 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/40 text-purple-700 dark:text-purple-400',
  };

  return (
    <div className={clsx('rounded-xl p-3.5 border', colorClasses[color])}>
      <p className={clsx('text-xs font-semibold mb-1 flex items-center gap-1.5')}>
        <span>{icon}</span> {label}
      </p>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}
