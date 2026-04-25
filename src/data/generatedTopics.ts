import { Level, LevelContent, Topic, InterviewQA, ContentSection } from '@/types';

interface TopicMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
  textColor: string;
  borderColor: string;
  description: string;
}

interface LevelConfig {
  level: Level;
  intro: string;
  titleSuffix: string;
  focus: string;
}

const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 'beginner',
    intro:
      'Start from scratch with simple language, core concepts, and practical basics you can apply immediately.',
    titleSuffix: 'Fundamentals',
    focus: 'basic understanding and first implementation',
  },
  {
    level: 'intermediate',
    intro:
      'Move to practical patterns, better structure, debugging skills, and real project decision-making.',
    titleSuffix: 'Practical Patterns',
    focus: 'project-level implementation and trade-off thinking',
  },
  {
    level: 'advanced',
    intro:
      'Master architecture, optimization, reliability, and interview-level problem solving for production systems.',
    titleSuffix: 'Architecture and Interview Mastery',
    focus: 'scalable design, optimization, and leadership decisions',
  },
];

const TOPIC_META: TopicMeta[] = [
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

const TOPIC_MODULES: Record<string, string[]> = {
  php: [
    'What is PHP',
    'PHP Setup and Environment',
    'Syntax, Variables, and Data Types',
    'Operators and Expressions',
    'Control Flow Statements',
    'Functions and Scope',
    'Arrays and Associative Arrays',
    'Forms and User Input Handling',
    'Sessions and Cookies',
    'File Handling in PHP',
    'Object-Oriented PHP Basics',
    'Error Handling and Exceptions',
    'PDO and Database Access',
    'Authentication and Authorization',
    'REST API Development',
    'Composer and Dependency Management',
    'Testing PHP Applications',
    'Security Best Practices',
    'Performance and Caching',
    'PHP Interview Problem Solving',
  ],
  laravel: [
    'What is Laravel',
    'Laravel Installation and Project Structure',
    'Routing and Route Groups',
    'Controllers and Request Lifecycle',
    'Blade Templating',
    'Form Request Validation',
    'Eloquent Models and ORM Basics',
    'Eloquent Relationships',
    'Migrations and Seeders',
    'Authentication in Laravel',
    'Authorization with Gates and Policies',
    'Middleware and Request Pipelines',
    'API Resources and Response Formatting',
    'Service Container and Dependency Injection',
    'Queues and Jobs',
    'Events and Listeners',
    'Testing with PHPUnit and Pest',
    'Caching, Performance, and Optimization',
    'Deployment and Environment Configuration',
    'Laravel Interview Architectures',
  ],
  react: [
    'What is React',
    'JSX and Rendering Basics',
    'Components and Reusability',
    'Props and Data Flow',
    'State and useState',
    'Event Handling',
    'Conditional Rendering',
    'Lists and Keys',
    'Forms and Controlled Components',
    'useEffect and Side Effects',
    'useMemo and useCallback',
    'useRef and DOM Interaction',
    'Custom Hooks',
    'Context API',
    'Routing with React Router',
    'Global State Patterns',
    'Performance Optimization',
    'Testing React Applications',
    'Accessibility and UX Best Practices',
    'React Interview Trade-offs',
  ],
  nodejs: [
    'What is Node.js',
    'Node Runtime and V8 Engine',
    'Event Loop and Non-blocking I/O',
    'Modules and Package Management',
    'File System and Streams',
    'Asynchronous Patterns',
    'Building APIs with Express',
    'Middleware in Node Applications',
    'Request Validation',
    'Authentication and Session Handling',
    'JWT and Token Strategies',
    'Database Integration Patterns',
    'Error Handling and Logging',
    'Caching Strategies',
    'Queue Processing',
    'Testing Node APIs',
    'Node Security Best Practices',
    'Performance and Scalability',
    'Deployment and Monitoring',
    'Node.js Interview Scenarios',
  ],
  mysql: [
    'What is MySQL',
    'Database Design Fundamentals',
    'Normalization and Denormalization',
    'SQL CRUD Operations',
    'Filtering and Sorting Data',
    'JOINs and Relationships',
    'Indexes and Query Performance',
    'Constraints and Data Integrity',
    'Transactions and ACID Properties',
    'Stored Procedures and Views',
    'Query Optimization with EXPLAIN',
    'Pagination and Large Data Handling',
    'Backup and Recovery',
    'Replication and High Availability',
    'Security and Access Control',
    'MySQL in Application Architecture',
    'MySQL vs MongoDB',
    'Common Performance Bottlenecks',
    'Troubleshooting Production Issues',
    'MySQL Interview Case Studies',
  ],
  mongodb: [
    'What is MongoDB',
    'Documents and Collections',
    'CRUD Operations in MongoDB',
    'Schema Design Strategies',
    'Embedding vs Referencing',
    'Indexes and Query Optimization',
    'Aggregation Pipeline Basics',
    'Advanced Aggregation Patterns',
    'Data Validation and Schema Governance',
    'Replica Sets and High Availability',
    'Sharding and Horizontal Scaling',
    'Transactions and Consistency',
    'MongoDB Security',
    'Backup and Disaster Recovery',
    'Performance Tuning',
    'Monitoring and Observability',
    'MongoDB in Microservices',
    'MongoDB vs MySQL',
    'Common Production Mistakes',
    'MongoDB Interview Scenarios',
  ],
  devops: [
    'What is DevOps',
    'DevOps Culture and Team Practices',
    'Version Control Workflows',
    'Continuous Integration',
    'Continuous Delivery and Deployment',
    'Infrastructure as Code',
    'Containers and Docker',
    'Container Orchestration',
    'Cloud Environments and Environments Strategy',
    'Monitoring and Alerting',
    'Logging and Observability',
    'Security in DevOps',
    'Secrets and Configuration Management',
    'Release Management Strategies',
    'Rollback and Incident Recovery',
    'Performance and Reliability Engineering',
    'Cost Optimization in Cloud',
    'DevOps Metrics and KPIs',
    'Common DevOps Pitfalls',
    'DevOps Interview Scenarios',
  ],
  github: [
    'What is GitHub',
    'Repositories and Project Setup',
    'Branching Strategies',
    'Pull Requests and Code Reviews',
    'Issues and Project Boards',
    'GitHub Actions Basics',
    'CI/CD with GitHub Actions',
    'Branch Protection Rules',
    'Code Owners and Team Permissions',
    'Release Management and Tagging',
    'Package and Artifact Management',
    'Dependabot and Security Alerts',
    'Secret Scanning and Security Policies',
    'Open Source Contribution Workflow',
    'Forking and Upstream Sync',
    'GitHub for Team Collaboration',
    'Automation with Workflows',
    'Governance and Compliance',
    'Common GitHub Workflow Mistakes',
    'GitHub Interview Scenarios',
  ],
  agile: [
    'What is Agile Methodology',
    'Agile Values and Principles',
    'Scrum Framework Basics',
    'Scrum Roles and Responsibilities',
    'Scrum Events and Ceremonies',
    'Product Backlog Management',
    'User Stories and Acceptance Criteria',
    'Sprint Planning',
    'Estimation Techniques',
    'Definition of Done',
    'Kanban Fundamentals',
    'Work in Progress Limits',
    'Agile Metrics and Reporting',
    'Retrospectives and Continuous Improvement',
    'Stakeholder Collaboration',
    'Agile Team Communication',
    'Agile vs Waterfall',
    'Scaling Agile Across Teams',
    'Common Agile Mistakes',
    'Agile Interview Scenarios',
  ],
};

const topicVsComparisons: Record<string, string> = {
  php: 'PHP vs Node.js backend approach',
  laravel: 'Laravel convention-driven flow vs custom PHP architecture',
  react: 'React local state vs global state strategy',
  nodejs: 'Node.js event loop model vs multi-thread server models',
  mysql: 'MySQL relational design vs document-first modeling',
  mongodb: 'MongoDB schema flexibility vs strict relational schema',
  devops: 'Fast delivery vs release risk control',
  github: 'Fast merge velocity vs strict quality gates',
  agile: 'Agile adaptation vs fixed-plan delivery',
};

const createCodeExample = (topicId: string, moduleName: string): string => {
  if (topicId === 'php' && moduleName === 'Object-Oriented PHP Basics') {
    return `<?php
declare(strict_types=1);

// Object-Oriented PHP Basics
// Working example with validation + error handling + optimization (readonly + typed properties)

final class BankAccount
{
    public function __construct(
        public readonly string $accountNumber,
        private float $balance = 0.0,
    ) {
        if ($accountNumber === '') {
            throw new InvalidArgumentException('Account number is required.');
        }
        if ($balance < 0) {
            throw new InvalidArgumentException('Opening balance cannot be negative.');
        }
    }

    public function deposit(float $amount): void
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Deposit amount must be greater than 0.');
        }
        $this->balance += $amount;
    }

    public function withdraw(float $amount): void
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Withdraw amount must be greater than 0.');
        }
        if ($amount > $this->balance) {
            throw new RuntimeException('Insufficient balance.');
        }
        $this->balance -= $amount;
    }

    public function getBalance(): float
    {
        return $this->balance;
    }
}

try {
    $account = new BankAccount('ACC-2026-001', 500.00);
    $account->deposit(150.00);
    $account->withdraw(120.00);
    echo 'Current balance: ' . number_format($account->getBalance(), 2);
} catch (Throwable $e) {
    error_log('OOP example failed: ' . $e->getMessage());
    echo 'Action failed. Please try again.';
}`;
  }

  if (topicId === 'php' && moduleName === 'File Handling in PHP') {
    return `<?php
// PHP - File Handling in PHP
// 1) Implement a small working example
// 2) Add validation and error handling
// 3) Add one optimization and explain why

declare(strict_types=1);

$filePath = __DIR__ . '/logs/app.log';
$cachePath = __DIR__ . '/logs/app.cache';

function appendLog(string $filePath, string $message): bool
{
    if (trim($message) === '') {
        throw new InvalidArgumentException('Message cannot be empty.');
    }

    $directory = dirname($filePath);
    if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
        throw new RuntimeException('Cannot create log directory.');
    }

    // Validation: only allow .log files for this helper
    if (pathinfo($filePath, PATHINFO_EXTENSION) !== 'log') {
        throw new InvalidArgumentException('Only .log files are allowed.');
    }

    $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
    $written = @file_put_contents($filePath, $line, FILE_APPEND | LOCK_EX);

    if ($written === false) {
        throw new RuntimeException('Failed to write log entry.');
    }

    return true;
}

function readRecentLines(string $filePath, int $limit = 10): array
{
    if (!file_exists($filePath)) {
        return [];
    }
    if ($limit <= 0) {
        throw new InvalidArgumentException('Limit must be greater than 0.');
    }

    // Optimization: cache recent lines to avoid repeated full file reads
    $cacheKey = md5($filePath . ':' . $limit);
    global $cachePath;
    $cache = file_exists($cachePath) ? json_decode((string) file_get_contents($cachePath), true) : [];
    if (isset($cache[$cacheKey], $cache[$cacheKey]['expires_at']) && $cache[$cacheKey]['expires_at'] > time()) {
        return $cache[$cacheKey]['data'];
    }

    $lines = @file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        throw new RuntimeException('Failed to read log file.');
    }

    $data = array_slice($lines, -$limit);
    $cache[$cacheKey] = [
        'expires_at' => time() + 5, // 5-second cache for frequent reads
        'data' => $data,
    ];
    file_put_contents($cachePath, json_encode($cache, JSON_PRETTY_PRINT));

    return $data;
}

try {
    appendLog($filePath, 'User logged in successfully');
    appendLog($filePath, 'Order #1024 created');

    $recent = readRecentLines($filePath, 5);
    echo 'Recent log lines:' . PHP_EOL;
    foreach ($recent as $line) {
        echo $line . PHP_EOL;
    }
} catch (Throwable $e) {
    error_log('File handling error: ' . $e->getMessage());
    echo 'Something went wrong. Please try again.';
}`;
  }

  if (topicId === 'react') {
    return `import { useMemo, useState } from 'react';

type Item = { id: number; name: string; price: number };

export function ProductFilter({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');

  // Optimization: memoize filtered list so it recomputes only when needed
  const filtered = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search product"
      />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.name} - $ {item.price}</li>
        ))}
      </ul>
    </div>
  );
}`;
  }

  if (topicId === 'nodejs') {
    return `import express from 'express';

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  try {
    // Small working example: pretend to save user
    const user = { id: Date.now(), name, email };
    return res.status(201).json(user);
  } catch (error) {
    // Error handling
    return res.status(500).json({ message: 'Unable to create user' });
  }
});

app.listen(3000, () => console.log('API started on port 3000'));`;
  }

  if (topicId === 'php' || topicId === 'laravel') {
    return `<?php
declare(strict_types=1);

function run${moduleName.replace(/[^a-zA-Z0-9]/g, '')}(array $input): array
{
    if (empty($input['name'])) {
        throw new InvalidArgumentException('name is required');
    }

    try {
        $normalized = trim((string) $input['name']);

        // Optimization: avoid duplicate expensive processing
        static $cache = [];
        if (isset($cache[$normalized])) {
            return $cache[$normalized];
        }

        $result = ['name' => $normalized, 'status' => 'ok'];
        $cache[$normalized] = $result;
        return $result;
    } catch (Throwable $e) {
        error_log('${moduleName} failed: ' . $e->getMessage());
        throw $e;
    }
}`;
  }

  if (topicId === 'react') {
    return `import { useMemo, useState } from 'react';

export function ${moduleName.replace(/[^a-zA-Z0-9]/g, '')}Example() {
  const [input, setInput] = useState('');

  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Optimization: memoize derived output
  const output = useMemo(() => input.trim().toLowerCase(), [input]);

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Result: {output || 'empty'}</p>
    </div>
  );
}`;
  }

  if (topicId === 'nodejs' || topicId === 'github' || topicId === 'devops') {
    return `import express from 'express';

const app = express();
app.use(express.json());

app.post('/example', (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ message: 'name is required' });

  try {
    // Optimization: short in-memory cache for repeated input
    globalThis.__cache = globalThis.__cache ?? new Map();
    if (globalThis.__cache.has(name)) {
      return res.json({ source: 'cache', data: globalThis.__cache.get(name) });
    }
    const result = { name, status: 'ok' };
    globalThis.__cache.set(name, result);
    return res.json({ source: 'fresh', data: result });
  } catch {
    return res.status(500).json({ message: 'internal error' });
  }
});`;
  }

  if (topicId === 'mysql') {
    return `-- ${moduleName}
-- Validation via parameter checks in app layer
-- Error handling via transaction rollback
-- Optimization via index usage

START TRANSACTION;

INSERT INTO users (name, email)
VALUES ('Asha', 'asha@example.com');

SELECT id, name, email
FROM users
WHERE email = 'asha@example.com';

COMMIT;

-- Optimization suggestion:
-- CREATE INDEX idx_users_email ON users(email);`;
  }

  if (topicId === 'mongodb') {
    return `// ${moduleName}
// MongoDB example with validation, error handling, and optimization
const user = { name: 'Asha', email: 'asha@example.com' };
if (!user.name || !user.email) throw new Error('name and email are required');

try {
  db.users.insertOne(user);
  db.users.createIndex({ email: 1 }); // optimization for lookup
  const result = db.users.findOne({ email: user.email });
  printjson(result);
} catch (e) {
  print('Operation failed: ' + e.message);
}`;
  }

  return `// ${moduleName}
// Real working example:
// 1) Validate input
// 2) Handle runtime errors safely
// 3) Add one optimization and explain why
`;
};

const createSection = (
  topicName: string,
  topicId: string,
  moduleName: string,
  levelConfig: LevelConfig,
): ContentSection => {
  const comparison = topicVsComparisons[topicId];
  const title = `${moduleName} - ${levelConfig.titleSuffix}`;
  return {
    title,
    explanation:
      `${moduleName} in ${topicName} should be learned with ${levelConfig.focus}. ` +
      `Start from core ideas, then practice with small real tasks, then connect it to project architecture. ` +
      `Common mistakes developers make: skipping validation, ignoring edge cases, and using one pattern everywhere. ` +
      `When to use vs not use: use this approach when it improves clarity, maintainability, and team speed; avoid it when it adds complexity without clear value. ` +
      `Interview comparison to remember: ${comparison}.`,
    realWorldExample:
      `In a production ${topicName} project, teams apply ${moduleName.toLowerCase()} to reduce bugs and improve release confidence. ` +
      `Example: implement one feature, test it in staging, measure result, and iterate based on user feedback.`,
    practicalUseCase:
      `Hands-on task: build a mini ${moduleName.toLowerCase()} feature in ${topicName}. ` +
      `Add one success case, one failure case, and one optimization. ` +
      `Then explain your decisions as if answering an interview question.`,
    codeExample: createCodeExample(topicId, moduleName),
    exercise:
      `Practice challenge: create a small project section focused on "${moduleName}" and document: ` +
      `what to use, what not to use, common mistakes, and one comparison with another approach.`,
  };
};

const createInterviewQuestions = (
  topicName: string,
  topicId: string,
  modules: string[],
  level: Level,
): InterviewQA[] => {
  const comparison = topicVsComparisons[topicId];
  const base = modules.slice(0, 10);

  return base.map((moduleName, index) => ({
    question: `In ${topicName} (${level}), how would you explain "${moduleName}" in a real project?`,
    answer:
      `I explain ${moduleName.toLowerCase()} using a practical example, then I describe common mistakes, ` +
      `when to use it, and when not to use it. I also mention trade-offs and how I validate the solution.`,
    use_case:
      `Use case ${index + 1}: implement ${moduleName.toLowerCase()} in a real feature, monitor impact, and improve based on feedback.`,
    follow_up: `Compare "${moduleName}" with another approach and explain why you choose one. Example comparison: ${comparison}.`,
  }));
};

const createLevelContent = (
  topicName: string,
  topicId: string,
  modules: string[],
  levelConfig: LevelConfig,
): LevelContent => ({
  level: levelConfig.level,
  intro: levelConfig.intro,
  sections: modules.map((moduleName) =>
    createSection(topicName, topicId, moduleName, levelConfig),
  ),
  interviewQA: createInterviewQuestions(topicName, topicId, modules, levelConfig.level),
});

const buildTopic = (meta: TopicMeta): Topic => {
  const modules = TOPIC_MODULES[meta.id] ?? [];
  const levels = LEVEL_CONFIGS.map((cfg) =>
    createLevelContent(meta.name, meta.id, modules, cfg),
  );

  return {
    id: meta.id,
    name: meta.name,
    icon: meta.icon,
    color: meta.color,
    textColor: meta.textColor,
    borderColor: meta.borderColor,
    description: meta.description,
    levels,
  };
};

export const GENERATED_TOPICS: Topic[] = TOPIC_META.map(buildTopic);
