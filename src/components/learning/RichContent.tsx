import { useState } from 'react';
import { Highlight } from '@/lib/highlight';

type Segment =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language: string };

const SQL_RE = /\b(select|insert|update|delete|create|alter|drop|from|where|join|group by|order by)\b/i;
const PHP_RE = /(<\?php|\$[a-z_]\w*|->|::|public function|private function|protected function|php artisan|composer )/i;
const JSON_RE = /^\s*[\[{][\s\S]*[\]}]\s*$/;
const SHELL_RE = /^\s*(npm |yarn |pnpm |git |composer |php artisan |docker |kubectl )/im;
const JS_RE = /\b(import|export|const|let|var|async function|function\s+\w+|=>)\b/;

function detectLanguage(code: string): string {
  const trimmed = code.trim();
  if (PHP_RE.test(trimmed)) return 'php';
  if (SQL_RE.test(trimmed)) return 'sql';
  if (SHELL_RE.test(trimmed)) return 'bash';
  if (JSON_RE.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // fall through
    }
  }
  if (JS_RE.test(trimmed)) return 'js';
  return 'text';
}

function isCodeLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  return /^(<\?php|class\s+\w+|function\s+\w+|import\s+|export\s+|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|return\b|SELECT\b|INSERT\b|UPDATE\b|DELETE\b|CREATE\b|ALTER\b|DROP\b|Route::|Schema::|php artisan|composer\s+|npm\s+|git\s+|docker\s+|kubectl\s+|\$[a-z_]\w*|[{[\]}();]|<\/?\w+)/i.test(
    t,
  );
}

function parseFenced(text: string): Segment[] {
  const out: Segment[] = [];
  const normalized = text.replace(/\r\n/g, '\n');
  const fenceRe = /```([a-zA-Z0-9+-]*)\n([\s\S]*?)```/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null = fenceRe.exec(normalized);
  while (match) {
    if (match.index > lastIdx) {
      out.push({ type: 'text', content: normalized.slice(lastIdx, match.index) });
    }
    out.push({
      type: 'code',
      language: match[1] || detectLanguage(match[2]),
      content: match[2].replace(/\n$/, ''),
    });
    lastIdx = fenceRe.lastIndex;
    match = fenceRe.exec(normalized);
  }
  if (lastIdx < normalized.length) {
    out.push({ type: 'text', content: normalized.slice(lastIdx) });
  }
  return out;
}

function splitTextAndCode(text: string): Segment[] {
  const lines = text.split('\n');
  const segments: Segment[] = [];
  let textBuf: string[] = [];
  let codeBuf: string[] = [];
  let codeStreak = 0;

  const flushText = () => {
    if (textBuf.length) {
      segments.push({ type: 'text', content: textBuf.join('\n').trim() });
      textBuf = [];
    }
  };
  const flushCode = () => {
    if (codeBuf.length) {
      const content = codeBuf.join('\n').trimEnd();
      segments.push({ type: 'code', content, language: detectLanguage(content) });
      codeBuf = [];
      codeStreak = 0;
    }
  };

  for (const line of lines) {
    if (isCodeLine(line)) {
      codeStreak += 1;
      codeBuf.push(line);
      continue;
    }

    if (line.trim() === '' && codeBuf.length > 0) {
      codeBuf.push(line);
      continue;
    }

    if (codeBuf.length > 0 && codeStreak >= 2) {
      flushText();
      flushCode();
    } else if (codeBuf.length > 0) {
      textBuf.push(...codeBuf);
      codeBuf = [];
      codeStreak = 0;
    }

    textBuf.push(line);
  }

  if (codeBuf.length > 0 && codeStreak >= 2) {
    flushText();
    flushCode();
  } else if (codeBuf.length > 0) {
    textBuf.push(...codeBuf);
  }

  flushText();
  return segments.filter((s) => s.content.trim().length > 0);
}

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = language || detectLanguage(code);
  const lines = code.split('\n');

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 dark:border-gray-700 shadow-md mt-2">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-[11px] uppercase tracking-wide text-gray-400">{lang}</span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 min-w-[86px] rounded-md border border-gray-600 bg-gray-700/70 px-2.5 py-1 text-xs font-medium text-gray-100 hover:bg-gray-600 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="bg-gray-900 overflow-x-auto">
        <table className="w-full text-sm font-mono leading-6">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/5">
                <td className="select-none text-right text-gray-600 px-4 py-0 w-10 text-xs">{i + 1}</td>
                <td className="text-gray-100 pr-6 py-0 whitespace-pre">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RichContent({
  text,
  highlightQuery = '',
  className = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300',
}: {
  text: string;
  highlightQuery?: string;
  className?: string;
}) {
  const fenced = parseFenced(text);
  const segments =
    fenced.length === 1 && fenced[0].type === 'text'
      ? splitTextAndCode(fenced[0].content)
      : fenced;

  return (
    <div className="space-y-2">
      {segments.map((seg, idx) =>
        seg.type === 'code' ? (
          <CodeBlock key={idx} code={seg.content} language={seg.language} />
        ) : (
          <p key={idx} className={className}>
            <Highlight text={seg.content} query={highlightQuery} />
          </p>
        ),
      )}
    </div>
  );
}
