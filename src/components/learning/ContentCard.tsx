import { useState } from 'react';
import { ContentSection } from '@/types';
import { clsx } from 'clsx';
import { Highlight, slugify } from '@/lib/highlight';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const lines = code.split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 dark:border-gray-700 shadow-md mt-2">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="bg-gray-900 overflow-x-auto">
        <table className="w-full text-sm font-mono leading-6">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/5">
                <td className="select-none text-right text-gray-600 px-4 py-0 w-10 text-xs">
                  {i + 1}
                </td>
                <td className="text-gray-100 pr-6 py-0 whitespace-pre">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          <Highlight text={section.explanation} query={highlightQuery} />
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
