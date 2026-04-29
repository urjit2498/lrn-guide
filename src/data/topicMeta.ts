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
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    description:
      'JavaScript roadmap from fundamentals to engine-level behavior, async patterns, and interview-grade problem solving.',
  },
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
  {
    id: 'oop',
    name: 'OOP',
    icon: '🧱',
    color: 'bg-violet-100 dark:bg-violet-900/30',
    textColor: 'text-violet-700 dark:text-violet-300',
    borderColor: 'border-violet-300 dark:border-violet-700',
    description:
      'Object-oriented programming track covering encapsulation, inheritance, polymorphism, abstraction, and design trade-offs.',
  },
  {
    id: 'solid',
    name: 'SOLID Principles',
    icon: '📐',
    color: 'bg-teal-100 dark:bg-teal-900/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    borderColor: 'border-teal-300 dark:border-teal-700',
    description:
      'SOLID learning path with practical refactoring patterns, architecture decisions, and interview-ready examples.',
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    icon: '💚',
    color: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-300 dark:border-green-700',
    description:
      'Vue.js learning path from template syntax and reactivity to Pinia, Composition API, and interview preparation.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    color: 'bg-sky-100 dark:bg-sky-900/30',
    textColor: 'text-sky-700 dark:text-sky-300',
    borderColor: 'border-sky-300 dark:border-sky-700',
    description:
      'PostgreSQL curriculum covering schema design, advanced queries, indexing, JSON support, and database interview essentials.',
  },
  {
    id: 'manual-qa',
    name: 'Manual QA',
    icon: '🧪',
    color: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-300 dark:border-purple-700',
    description:
      'Manual QA roadmap covering test planning, case design, bug reporting, Agile QA practices, and interview preparation.',
  },
  {
    id: 'automation-qa',
    name: 'Automation QA',
    icon: '🤖',
    color: 'bg-rose-100 dark:bg-rose-900/30',
    textColor: 'text-rose-700 dark:text-rose-300',
    borderColor: 'border-rose-300 dark:border-rose-700',
    description:
      'Automation QA path with Selenium, Playwright, POM, CI/CD integration, and advanced test automation interview scenarios.',
  },
];
