// Lightweight topic metadata — used by Sidebar and Header.
// Does NOT include levels or content so it never forces the full
// generatedTopics chunk to load upfront.

export interface TopicMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export const TOPIC_META: TopicMeta[] = [
  {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-300 dark:border-indigo-700',
    description:
      'PHP learning path from beginner to advanced with practical backend and interview preparation.',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    icon: '🚀',
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-300 dark:border-red-700',
    description:
      'Laravel roadmap covering framework basics, architecture, and real interview-ready backend practice.',
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    color: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    borderColor: 'border-cyan-300 dark:border-cyan-700',
    description:
      'React learning system with UI fundamentals, performance patterns, and front-end interview questions.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    color: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-300 dark:border-green-700',
    description:
      'Node.js backend roadmap with API development, scaling concepts, and practical interview preparation.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🗄️',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-300 dark:border-blue-700',
    description:
      'MySQL curriculum focused on schema design, query optimization, and database interview essentials.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    description:
      'MongoDB guide with document modeling, indexing strategies, and practical NoSQL interview prep.',
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: '⚙️',
    color: 'bg-slate-100 dark:bg-slate-900/30',
    textColor: 'text-slate-700 dark:text-slate-300',
    borderColor: 'border-slate-300 dark:border-slate-700',
    description:
      'DevOps training from CI/CD basics to production reliability, security, and deployment strategies.',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    color: 'bg-gray-100 dark:bg-gray-800/40',
    textColor: 'text-gray-700 dark:text-gray-300',
    borderColor: 'border-gray-300 dark:border-gray-700',
    description:
      'GitHub collaboration playbook with workflows, automation, code review, and team engineering standards.',
  },
  {
    id: 'agile',
    name: 'Agile Methodology',
    icon: '📈',
    color: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-700 dark:text-orange-300',
    borderColor: 'border-orange-300 dark:border-orange-700',
    description:
      'Agile methodology path covering Scrum, Kanban, planning, and interview-ready process understanding.',
  },
];
