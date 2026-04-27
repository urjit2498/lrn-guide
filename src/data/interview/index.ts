import { Level } from '@/types';
import { InterviewData, InterviewQuestion } from './types';
import { phpInterview } from './php';
import { reactInterview } from './react';
import { nodejsInterview } from './nodejs';
import { mysqlInterview } from './mysql';
import { vuejsInterview } from './vuejs';
import {
  agileInterview,
  devopsInterview,
  githubInterview,
  laravelInterview,
  mongodbInterview,
} from './remaining';

export const INTERVIEW_DATA: InterviewData = {
  php: phpInterview,
  laravel: laravelInterview,
  react: reactInterview,
  nodejs: nodejsInterview,
  mysql: mysqlInterview,
  mongodb: mongodbInterview,
  vuejs: vuejsInterview,
  devops: devopsInterview,
  github: githubInterview,
  agile: agileInterview,
};

export const getInterviewQuestions = (
  topicId: string,
  level: Level
): InterviewQuestion[] => INTERVIEW_DATA[topicId]?.[level] ?? [];
