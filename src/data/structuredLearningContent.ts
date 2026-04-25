import { TOPICS } from './topics';
import { InterviewQA, Topic } from '@/types';

export interface StructuredInterviewQuestion {
  question: string;
  answer: string;
  follow_up: string;
}

export interface StructuredSection {
  title: string;
  explanation: string;
  simple_understanding: string;
  real_world_example: string;
  key_points: string[];
  interview_questions: StructuredInterviewQuestion[];
}

export interface StructuredTopicContent {
  topic: string;
  sections: StructuredSection[];
}

export interface StructuredLearningContent {
  topics: StructuredTopicContent[];
}

const GENERIC_QUESTIONS = (title: string): StructuredInterviewQuestion[] => [
  {
    question: `What is ${title}?`,
    answer: `${title} is an important concept used in real projects to build stable and scalable software.`,
    follow_up: `When would you use ${title}, and when would you avoid it?`,
  },
  {
    question: `Why is ${title} important in interviews?`,
    answer: `Interviewers use it to check if you understand both concept and practical use.`,
    follow_up: `Can you explain ${title} with a simple real app example?`,
  },
  {
    question: `What is one common mistake in ${title}?`,
    answer: `A common mistake is using it without understanding trade-offs and real-world constraints.`,
    follow_up: `How would you avoid that mistake in production code?`,
  },
  {
    question: `How do you decide when to use ${title}?`,
    answer: `Decide based on app size, team needs, performance, and maintainability.`,
    follow_up: `What are signs that ${title} is not the right choice?`,
  },
  {
    question: `Compare ${title} with an alternative approach.`,
    answer: `${title} can be simpler in some cases, but alternatives may offer better control for complex scenarios.`,
    follow_up: `Which option would you choose for a large production system and why?`,
  },
];

const toSimpleUnderstanding = (explanation: string): string => {
  const sentence = explanation.split('.').find((part) => part.trim().length > 0)?.trim();
  if (!sentence) return 'This concept helps you build better software in a simple and practical way.';
  return sentence.length > 170 ? `${sentence.slice(0, 167)}...` : `${sentence}.`;
};

const toKeyPoints = (title: string, explanation: string): string[] => {
  const firstLine = explanation.split('.').find((part) => part.trim().length > 0)?.trim();
  return [
    firstLine ? `${firstLine}.` : `Understand ${title} clearly.`,
    `Use ${title} when it improves clarity, safety, and performance.`,
    `Do not use ${title} if it adds complexity without clear benefit.`,
    `Common mistake: applying ${title} without understanding trade-offs.`,
    `Interview tip: explain ${title} with a real project example.`,
  ];
};

const mapInterviewQuestions = (
  interviewQA: InterviewQA[] | undefined,
  sectionTitle: string,
): StructuredInterviewQuestion[] => {
  if (!interviewQA || interviewQA.length === 0) return GENERIC_QUESTIONS(sectionTitle);

  const mapped = interviewQA.map((qa) => ({
    question: qa.question,
    answer: qa.answer,
    follow_up:
      qa.follow_up ??
      `Can you share a practical project scenario where ${sectionTitle} was useful?`,
  }));

  if (mapped.length >= 5) return mapped.slice(0, 10);
  return [...mapped, ...GENERIC_QUESTIONS(sectionTitle)].slice(0, 10);
};

const topicToStructured = (topic: Topic): StructuredTopicContent => {
  const levelQuestions = topic.levels.flatMap((level) => level.interviewQA ?? []);

  const sections = topic.levels.flatMap((level) =>
    level.sections.map((section) => ({
      title: section.title,
      explanation: section.explanation,
      simple_understanding: toSimpleUnderstanding(section.explanation),
      real_world_example: section.realWorldExample,
      key_points: toKeyPoints(section.title, section.explanation),
      interview_questions: mapInterviewQuestions(levelQuestions, section.title),
    })),
  );

  return {
    topic: topic.id,
    sections,
  };
};

export const STRUCTURED_LEARNING_CONTENT: StructuredLearningContent = {
  topics: TOPICS.map(topicToStructured),
};

export const getStructuredTopicContent = (
  topicId: string,
): StructuredTopicContent | undefined =>
  STRUCTURED_LEARNING_CONTENT.topics.find((topic) => topic.topic === topicId);
