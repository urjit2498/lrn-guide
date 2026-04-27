import type { Level } from '@/types';

export interface SearchResult {
  topicId: string;
  topicName: string;
  topicIcon: string;
  level: Level;
  type: 'section' | 'interview';
  title: string;
  snippet: string;
}

// In-memory index — built once on first search, reused for every subsequent query
let cachedIndex: SearchResult[] | null = null;

export async function buildSearchIndex(): Promise<SearchResult[]> {
  if (cachedIndex) return cachedIndex;

  const { GENERATED_TOPICS } = await import('@/data/generatedTopics');
  const index: SearchResult[] = [];

  for (const topic of GENERATED_TOPICS) {
    for (const levelContent of topic.levels) {
      for (const section of levelContent.sections) {
        index.push({
          topicId: topic.id,
          topicName: topic.name,
          topicIcon: topic.icon,
          level: levelContent.level,
          type: 'section',
          title: section.title,
          snippet: section.explanation,
        });
      }

      for (const qa of levelContent.interviewQA) {
        index.push({
          topicId: topic.id,
          topicName: topic.name,
          topicIcon: topic.icon,
          level: levelContent.level,
          type: 'interview',
          title: qa.question,
          snippet: qa.answer,
        });
      }
    }
  }

  cachedIndex = index;
  return index;
}

/** Score and rank results; title matches rank higher than snippet matches. */
export function searchIndex(index: SearchResult[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const scored: Array<{ item: SearchResult; score: number }> = [];

  for (const item of index) {
    const titleLower = item.title.toLowerCase();
    const snippetLower = item.snippet.toLowerCase();

    const titleExact = titleLower.includes(q);
    const snippetMatch = snippetLower.includes(q);

    if (!titleExact && !snippetMatch) continue;

    // Score: title-starts-with > title-contains > snippet-contains
    let score = 0;
    if (titleLower.startsWith(q)) score = 4;
    else if (titleLower.includes(q)) score = 3;
    else if (snippetMatch) score = 1;

    scored.push({ item, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 60)
    .map((r) => r.item);
}

/** Extract a short snippet (~160 chars) centred on the first match. */
export function getSnippet(text: string, query: string): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, 160);

  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, idx + query.length + 100);
  const snippet = text.slice(start, end);
  return (start > 0 ? '…' : '') + snippet + (end < text.length ? '…' : '');
}
