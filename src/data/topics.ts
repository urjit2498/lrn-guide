import { Topic } from '@/types';
import { GENERATED_TOPICS } from './generatedTopics';

export const TOPICS: Topic[] = GENERATED_TOPICS;

export const getTopicById = (id: string): Topic | undefined =>
  TOPICS.find((t) => t.id === id);
