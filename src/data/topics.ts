import type { Topic } from '@/types';
import { TOPIC_META } from './topicMeta';
export type { TopicMeta } from './topicMeta';

// Lightweight metadata — safe to import anywhere (sidebar, header).
// Does NOT pull in the full content chunk.
export const TOPICS = TOPIC_META;

export const getTopicById = (id: string) =>
  TOPIC_META.find((t) => t.id === id);

// Cache so each topic's content is only built once per session.
const topicCache = new Map<string, Topic>();

/**
 * Async loader — dynamically imports the full content chunk only when
 * a user first views a topic. Subsequent calls are instant (cached).
 */
export async function loadTopicContent(id: string): Promise<Topic | undefined> {
  if (topicCache.has(id)) return topicCache.get(id);

  const { GENERATED_TOPICS } = await import('./generatedTopics');
  for (const t of GENERATED_TOPICS) {
    if (!topicCache.has(t.id)) topicCache.set(t.id, t);
  }
  return topicCache.get(id);
}
