export interface InterviewQuestion {
  question: string;
  answer: string;
  example: string;
  use_case: string;
  follow_up: string;
}

export interface InterviewTopic {
  beginner: InterviewQuestion[];
  intermediate: InterviewQuestion[];
  advanced: InterviewQuestion[];
}

export type InterviewData = Record<string, InterviewTopic>;
