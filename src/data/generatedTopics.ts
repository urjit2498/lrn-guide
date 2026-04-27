import { Level, LevelContent, Topic, InterviewQA, ContentSection } from '@/types';
import { TopicMeta, TOPIC_META } from './topicMeta';

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
    'Interfaces, Abstract Classes, and Traits',
    'Magic Methods and Late Static Binding',
    'Error Handling and Exceptions',
    'PDO and Database Access',
    'PHP 8 Features',
    'Authentication and Authorization',
    'REST API Development',
    'Design Patterns in PHP',
    'SOLID Principles in PHP',
    'Namespaces and PSR Standards',
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
    'Eloquent Relationships and N+1 Problem',
    'Migrations and Seeders',
    'Authentication in Laravel',
    'Authorization with Gates and Policies',
    'Middleware and Request Pipelines',
    'API Resources and Response Formatting',
    'Service Container and Dependency Injection',
    'Service Providers and Bootstrapping',
    'Laravel Collections API',
    'Repository Pattern in Laravel',
    'Queues and Jobs',
    'Events and Listeners',
    'Task Scheduling',
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
    'Isolation Levels and Locking',
    'Stored Procedures and Views',
    'Query Optimization with EXPLAIN',
    'Window Functions and CTEs',
    'Pagination and Large Data Handling',
    'Replication and High Availability',
    'Backup and Recovery',
    'Security and Access Control',
    'MySQL in Application Architecture',
    'Common Performance Bottlenecks',
    'MySQL Interview Case Studies',
  ],
  mongodb: [
    'What is MongoDB',
    'Documents and Collections',
    'CRUD Operations in MongoDB',
    'Embedding vs Referencing',
    'Schema Design Strategies',
    'Indexes and Query Optimization',
    'Aggregation Pipeline Basics',
    'Advanced Aggregation Patterns',
    'Data Validation and Schema Governance',
    'Transactions and Consistency',
    'Replica Sets and High Availability',
    'Sharding and Horizontal Scaling',
    'Change Streams and Real-time Data',
    'MongoDB Security',
    'Performance Tuning',
    'MongoDB in Microservices',
    'Backup and Disaster Recovery',
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
  vuejs: [
    'What is Vue.js',
    'Vue CLI and Project Setup',
    'Template Syntax and Directives',
    'Data Binding and Reactivity',
    'Components and Props',
    'Component Events and Emits',
    'Computed Properties and Watchers',
    'Lifecycle Hooks',
    'Vue Router Basics',
    'Navigation Guards and Route Meta',
    'Pinia State Management',
    'Composables and the Composition API',
    'Forms and v-model',
    'HTTP Requests with Axios',
    'Provide and Inject Pattern',
    'Slots and Dynamic Components',
    'Teleport and Suspense',
    'Options API vs Composition API',
    'Performance Optimization',
    'Testing Vue Applications',
    'Vue.js Interview Trade-offs',
  ],
  postgresql: [
    'What is PostgreSQL',
    'Installation and Setup',
    'Database Design Fundamentals',
    'SQL CRUD Operations',
    'Filtering, Sorting, and Pagination',
    'JOINs and Relationships',
    'Indexes and Query Optimization',
    'Transactions and ACID Properties',
    'Constraints and Data Integrity',
    'Views and Materialized Views',
    'Stored Procedures and Functions',
    'Triggers and Rules',
    'Full-Text Search',
    'JSON and JSONB Support',
    'Partitioning and Large Tables',
    'Replication and High Availability',
    'Security and Role Management',
    'Backup and Recovery',
    'Common Performance Bottlenecks',
    'PostgreSQL Interview Case Studies',
  ],
  'manual-qa': [
    'What is Manual QA',
    'Testing Fundamentals and SDLC',
    'Types of Testing',
    'Test Planning and Strategy',
    'Test Case Design Techniques',
    'Writing Effective Test Cases',
    'Test Execution and Defect Reporting',
    'Bug Life Cycle and Priority vs Severity',
    'Functional Testing',
    'Non-Functional Testing',
    'Regression Testing and Smoke Testing',
    'User Acceptance Testing (UAT)',
    'API Testing with Postman',
    'Database Testing',
    'Mobile Application Testing',
    'Cross-Browser Testing',
    'Agile QA Practices',
    'Test Documentation and Traceability',
    'Common QA Mistakes',
    'Manual QA Interview Scenarios',
  ],
  'automation-qa': [
    'What is Automation QA',
    'When to Automate vs Manual Testing',
    'Selenium WebDriver Basics',
    'Page Object Model (POM)',
    'TestNG and JUnit Frameworks',
    'Writing Effective Automated Tests',
    'Data-Driven Testing',
    'Handling Dynamic Elements',
    'API Automation with RestAssured',
    'CI/CD Integration for Tests',
    'Playwright and Modern Testing Tools',
    'Test Reporting and Dashboards',
    'Parallel Test Execution',
    'Performance Testing Basics with JMeter',
    'Mobile Automation with Appium',
    'BDD with Cucumber and Gherkin',
    'Maintenance and Flaky Test Handling',
    'Test Coverage Strategy',
    'Common Automation Mistakes',
    'Automation QA Interview Scenarios',
  ],
};

// Per-topic module splits by level. Topics listed here override the flat TOPIC_MODULES list.
// Topics NOT listed here continue to show all modules at every level (existing behaviour).
const TOPIC_LEVEL_MODULES: Partial<Record<string, Record<Level, string[]>>> = {
  php: {
    beginner: [
      'What is PHP',
      'PHP Setup and Environment',
      'Syntax, Variables, and Data Types',
      'Operators and Expressions',
      'Control Flow Statements',
      'Functions and Scope',
      'Arrays and Associative Arrays',
    ],
    intermediate: [
      'Forms and User Input Handling',
      'Sessions and Cookies',
      'File Handling in PHP',
      'Object-Oriented PHP Basics',
      'Interfaces, Abstract Classes, and Traits',
      'Magic Methods and Late Static Binding',
      'Error Handling and Exceptions',
      'PDO and Database Access',
    ],
    advanced: [
      'PHP 8 Features',
      'Authentication and Authorization',
      'REST API Development',
      'Design Patterns in PHP',
      'SOLID Principles in PHP',
      'Namespaces and PSR Standards',
      'Composer and Dependency Management',
      'Testing PHP Applications',
      'Security Best Practices',
      'PHP Interview Problem Solving',
    ],
  },
  laravel: {
    beginner: [
      'What is Laravel',
      'Laravel Installation and Project Structure',
      'Routing and Route Groups',
      'Controllers and Request Lifecycle',
      'Blade Templating',
      'Form Request Validation',
      'Eloquent Models and ORM Basics',
    ],
    intermediate: [
      'Eloquent Relationships and N+1 Problem',
      'Migrations and Seeders',
      'Authentication in Laravel',
      'Authorization with Gates and Policies',
      'Middleware and Request Pipelines',
      'API Resources and Response Formatting',
      'Service Container and Dependency Injection',
      'Laravel Collections API',
    ],
    advanced: [
      'Service Providers and Bootstrapping',
      'Repository Pattern in Laravel',
      'Queues and Jobs',
      'Events and Listeners',
      'Task Scheduling',
      'Testing with PHPUnit and Pest',
      'Caching, Performance, and Optimization',
      'Laravel Interview Architectures',
    ],
  },
  mysql: {
    beginner: [
      'What is MySQL',
      'Database Design Fundamentals',
      'Normalization and Denormalization',
      'SQL CRUD Operations',
      'Filtering and Sorting Data',
      'JOINs and Relationships',
      'Constraints and Data Integrity',
    ],
    intermediate: [
      'Indexes and Query Performance',
      'Transactions and ACID Properties',
      'Isolation Levels and Locking',
      'Stored Procedures and Views',
      'Query Optimization with EXPLAIN',
      'Window Functions and CTEs',
      'Pagination and Large Data Handling',
    ],
    advanced: [
      'Replication and High Availability',
      'Backup and Recovery',
      'Security and Access Control',
      'MySQL in Application Architecture',
      'Common Performance Bottlenecks',
      'MySQL Interview Case Studies',
    ],
  },
  mongodb: {
    beginner: [
      'What is MongoDB',
      'Documents and Collections',
      'CRUD Operations in MongoDB',
      'Embedding vs Referencing',
      'Schema Design Strategies',
      'Indexes and Query Optimization',
    ],
    intermediate: [
      'Aggregation Pipeline Basics',
      'Advanced Aggregation Patterns',
      'Data Validation and Schema Governance',
      'Transactions and Consistency',
      'Replica Sets and High Availability',
      'MongoDB Security',
      'Performance Tuning',
    ],
    advanced: [
      'Sharding and Horizontal Scaling',
      'Change Streams and Real-time Data',
      'MongoDB in Microservices',
      'Backup and Disaster Recovery',
      'MongoDB vs MySQL',
      'Common Production Mistakes',
      'MongoDB Interview Scenarios',
    ],
  },
  vuejs: {
    beginner: [
      'What is Vue.js',
      'Vue CLI and Project Setup',
      'Template Syntax and Directives',
      'Data Binding and Reactivity',
      'Components and Props',
      'Component Events and Emits',
      'Computed Properties and Watchers',
    ],
    intermediate: [
      'Lifecycle Hooks',
      'Vue Router Basics',
      'Navigation Guards and Route Meta',
      'Pinia State Management',
      'Composables and the Composition API',
      'Forms and v-model',
      'HTTP Requests with Axios',
      'Provide and Inject Pattern',
    ],
    advanced: [
      'Slots and Dynamic Components',
      'Teleport and Suspense',
      'Options API vs Composition API',
      'Performance Optimization',
      'Testing Vue Applications',
      'Vue.js Interview Trade-offs',
    ],
  },
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
  vuejs: 'Vue.js progressive reactivity model vs React unidirectional data flow',
  postgresql: 'PostgreSQL relational integrity vs MongoDB schema flexibility',
  'manual-qa': 'Manual exploratory coverage vs automated regression speed',
  'automation-qa': 'Automated test speed and repeatability vs manual test human intuition',
};

// ─── Per-module code examples ────────────────────────────────────────────────

const PHP_EXAMPLES: Record<string, string> = {
  'What is PHP': `<?php
// PHP: server-side scripting language
echo "Hello, World!";

$name = "Urjit";
$age  = 25;
echo "Name: $name, Age: $age";

// PHP runs on the server and outputs HTML to the browser
$items = ['PHP', 'Laravel', 'MySQL'];
foreach ($items as $item) {
    echo "<li>$item</li>";
}`,

  'PHP Setup and Environment': `<?php
// Check PHP version
echo phpversion();          // e.g. 8.3.0

// php.ini recommended settings for development
// display_errors = On
// error_reporting = E_ALL
// memory_limit = 256M

// Verify extensions are loaded
var_dump(extension_loaded('pdo'));   // bool(true)
var_dump(extension_loaded('mbstring'));

// Run built-in dev server:
// php -S localhost:8000 -t public/`,

  'Syntax, Variables, and Data Types': `<?php
declare(strict_types=1);

$name   = "Alice";           // string
$age    = 30;                // int
$price  = 19.99;             // float
$active = true;              // bool
$tags   = ['php', 'web'];   // array
$empty  = null;              // null

// Type juggling trap — always use strict comparison
var_dump(0 == "a");   // true  (loose — wrong)
var_dump(0 === "a");  // false (strict — correct)

// Type casting
$str = "42px";
echo (int) $str;   // 42`,

  'Operators and Expressions': `<?php
declare(strict_types=1);

$a = 10;
$b = 3;

echo $a + $b;   // 13 — addition
echo $a % $b;   // 1  — modulo
echo $a ** $b;  // 1000 — exponentiation
echo intdiv($a, $b); // 3 — integer division

// Null coalescing
$name = $_GET['name'] ?? 'Guest';

// Spaceship operator (useful for sorting)
echo 1 <=> 2;  // -1
echo 2 <=> 2;  //  0
echo 3 <=> 2;  //  1

// String operators
$greeting = "Hello" . " " . "World";`,

  'Control Flow Statements': `<?php
declare(strict_types=1);

$score = 85;

// if / elseif / else
if ($score >= 90) {
    echo 'A';
} elseif ($score >= 75) {
    echo 'B';  // ← this runs
} else {
    echo 'C';
}

// match expression (PHP 8+)
$status = 'active';
$label = match($status) {
    'active'   => 'Active User',
    'banned'   => 'Banned',
    'inactive' => 'Inactive',
    default    => 'Unknown',
};

// Loop with break/continue
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 === 0) continue; // skip even
    if ($i > 7)       break;    // stop after 7
    echo $i . " ";              // 1 3 5 7
}`,

  'Functions and Scope': `<?php
declare(strict_types=1);

// Typed function with default parameter
function greet(string $name, string $greeting = 'Hello'): string
{
    return "$greeting, $name!";
}

echo greet('Urjit');           // Hello, Urjit!
echo greet('Urjit', 'Hey');   // Hey, Urjit!

// Arrow function (PHP 7.4+) — captures outer scope
$multiplier = 3;
$triple = fn(int $n): int => $n * $multiplier;
echo $triple(5);  // 15

// Variadic function
function sum(int ...$nums): int
{
    return array_sum($nums);
}
echo sum(1, 2, 3, 4);  // 10`,

  'Arrays and Associative Arrays': `<?php
declare(strict_types=1);

// Indexed array
$fruits = ['apple', 'banana', 'cherry'];
echo $fruits[1];  // banana

// Associative array
$user = [
    'name'  => 'Alice',
    'email' => 'alice@example.com',
    'role'  => 'admin',
];
echo $user['name'];  // Alice

// Array functions
$prices = [15, 3, 42, 8];
sort($prices);
echo implode(', ', $prices);  // 3, 8, 15, 42

$doubled = array_map(fn($p) => $p * 2, $prices);
$over10  = array_filter($doubled, fn($p) => $p > 10);
$total   = array_reduce($prices, fn($carry, $p) => $carry + $p, 0);
echo $total;  // 68`,

  'Forms and User Input Handling': `<?php
declare(strict_types=1);

// Safely read and sanitize POST input
$name  = trim(filter_input(INPUT_POST, 'name',  FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '');

$errors = [];

if ($name === '') {
    $errors[] = 'Name is required.';
} elseif (strlen($name) > 100) {
    $errors[] = 'Name is too long.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address.';
}

if (empty($errors)) {
    // safe to process
    echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
} else {
    foreach ($errors as $err) {
        echo "<p class='error'>$err</p>";
    }
}`,

  'Sessions and Cookies': `<?php
declare(strict_types=1);

// Start session with secure settings
session_start([
    'cookie_secure'   => true,   // HTTPS only
    'cookie_httponly' => true,   // no JS access
    'cookie_samesite' => 'Lax',
]);

// Store user in session after login
function loginUser(int $userId, string $email): void
{
    session_regenerate_id(true); // prevent fixation
    $_SESSION['user_id'] = $userId;
    $_SESSION['email']   = $email;
}

// Check if logged in
function isLoggedIn(): bool
{
    return isset($_SESSION['user_id']) && is_int($_SESSION['user_id']);
}

// Secure cookie
setcookie('theme', 'dark', [
    'expires'  => time() + 30 * 24 * 3600,
    'path'     => '/',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);`,

  'Object-Oriented PHP Basics': `<?php
declare(strict_types=1);

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
            throw new InvalidArgumentException('Deposit must be greater than 0.');
        }
        $this->balance += $amount;
    }

    public function withdraw(float $amount): void
    {
        if ($amount <= 0 || $amount > $this->balance) {
            throw new RuntimeException('Invalid withdraw amount.');
        }
        $this->balance -= $amount;
    }

    public function getBalance(): float { return $this->balance; }
}

$acc = new BankAccount('ACC-001', 500.00);
$acc->deposit(150.00);
$acc->withdraw(120.00);
echo number_format($acc->getBalance(), 2);  // 530.00`,

  'Error Handling and Exceptions': `<?php
declare(strict_types=1);

class NotFoundException extends RuntimeException {}
class ValidationException extends RuntimeException {}

function findUser(int $id): array
{
    if ($id <= 0) {
        throw new ValidationException('ID must be positive.');
    }

    $users = [1 => ['id' => 1, 'name' => 'Alice']];

    if (!isset($users[$id])) {
        throw new NotFoundException("User $id not found.");
    }

    return $users[$id];
}

try {
    $user = findUser(1);
    echo $user['name'];          // Alice
    $user = findUser(99);        // throws NotFoundException
} catch (NotFoundException $e) {
    http_response_code(404);
    echo 'Not found: ' . $e->getMessage();
} catch (ValidationException $e) {
    http_response_code(422);
    echo 'Validation: ' . $e->getMessage();
} finally {
    // always runs — close connections, log, etc.
    error_log('findUser executed');
}`,

  'PDO and Database Access': `<?php
declare(strict_types=1);

$dsn = 'mysql:host=127.0.0.1;dbname=app;charset=utf8mb4';

try {
    $pdo = new PDO($dsn, 'root', '', [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,  // real prepared statements
    ]);

    // Always use prepared statements — never string concat
    $stmt = $pdo->prepare(
        'SELECT id, name, email FROM users WHERE email = :email LIMIT 1'
    );
    $stmt->execute([':email' => 'alice@example.com']);
    $user = $stmt->fetch();

    if ($user === false) {
        echo 'User not found.';
    } else {
        echo $user['name'];
    }

} catch (PDOException $e) {
    error_log('DB error: ' . $e->getMessage());
    echo 'Database error. Please try again.';
}`,

  'REST API Development': `<?php
declare(strict_types=1);

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple router
if ($method === 'GET' && $path === '/api/users') {
    echo json_encode(['data' => [
        ['id' => 1, 'name' => 'Alice'],
        ['id' => 2, 'name' => 'Bob'],
    ]]);
    exit;
}

if ($method === 'POST' && $path === '/api/users') {
    $body = json_decode(file_get_contents('php://input'), true);

    if (empty($body['name']) || empty($body['email'])) {
        http_response_code(422);
        echo json_encode(['error' => 'name and email are required']);
        exit;
    }

    http_response_code(201);
    echo json_encode(['data' => ['id' => 3, ...$body]]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Route not found']);`,

  'File Handling in PHP': `<?php
declare(strict_types=1);

// Read entire file (small files only)
$content = file_get_contents('/var/log/app.log');

// Write (overwrite) — use FILE_APPEND to append
file_put_contents('/tmp/output.txt', "Line one\n");
file_put_contents('/tmp/output.txt', "Line two\n", FILE_APPEND);

// Stream large files line-by-line (memory efficient)
$handle = fopen('/var/data/large.csv', 'r');
if ($handle === false) {
    throw new RuntimeException('Cannot open file.');
}

try {
    while (($row = fgetcsv($handle)) !== false) {
        [$id, $name, $email] = $row;
        // process each row...
    }
} finally {
    fclose($handle);  // always close
}

// Check path safety before user-supplied filenames
function safeReadFile(string $basePath, string $userFile): string
{
    $real = realpath($basePath . DIRECTORY_SEPARATOR . basename($userFile));
    if ($real === false || !str_starts_with($real, realpath($basePath))) {
        throw new RuntimeException('Path traversal attempt.');
    }
    return file_get_contents($real);
}`,

  'Authentication and Authorization': `<?php
declare(strict_types=1);

// Password hashing — never store plain text
$hash = password_hash('secret123', PASSWORD_BCRYPT, ['cost' => 12]);

// Verify at login
$valid = password_verify('secret123', $hash);  // true

// Role-based access check
function requireRole(string $requiredRole): void
{
    $userRole = $_SESSION['role'] ?? 'guest';

    if ($userRole !== $requiredRole) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

// CSRF token generation and verification
function generateCsrfToken(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(string $token): bool
{
    return hash_equals($_SESSION['csrf_token'] ?? '', $token);
}`,

  'Interfaces, Abstract Classes, and Traits': `<?php
declare(strict_types=1);

// Interface: pure contract — no implementation
interface Notifiable {
    public function notify(string $message): void;
    public function getChannel(): string;
}

// Abstract class: shared implementation + enforced contracts
abstract class BaseNotifier implements Notifiable {
    abstract public function getChannel(): string;

    public function notify(string $message): void
    {
        echo "[{$this->getChannel()}] $message";
    }
}

// Concrete class
class EmailNotifier extends BaseNotifier {
    public function getChannel(): string { return 'email'; }
}

// Trait: horizontal code reuse (not inheritance)
trait Timestamps {
    private ?\\DateTime $createdAt = null;

    public function setCreatedAt(): void
    {
        $this->createdAt = new \\DateTime();
    }

    public function getCreatedAt(): ?\\DateTime { return $this->createdAt; }
}

class User {
    use Timestamps;   // mixin — no parent class needed
    public function __construct(public readonly string $email) {}
}

// Key difference:
// Interface — what a class CAN DO (contract)
// Abstract  — what a class IS (shared base)
// Trait     — reusable behaviour across unrelated classes`,

  'Magic Methods and Late Static Binding': `<?php
declare(strict_types=1);

class MagicDemo {
    private array $data = [];

    // __get / __set: intercept property access on non-existent props
    public function __get(string $name): mixed
    {
        return $this->data[$name] ?? null;
    }

    public function __set(string $name, mixed $value): void
    {
        $this->data[$name] = $value;
    }

    // __toString: cast to string
    public function __toString(): string
    {
        return json_encode($this->data);
    }

    // __invoke: call object as a function
    public function __invoke(string $arg): string
    {
        return "Invoked with $arg";
    }
}

$obj = new MagicDemo();
$obj->name = 'Alice';        // triggers __set
echo $obj->name;             // triggers __get → Alice
echo $obj;                   // triggers __toString
echo $obj('test');           // triggers __invoke

// Late Static Binding — static:: resolves to the actual called class
class ParentModel {
    public static function create(): static {
        return new static();   // static:: not self:: — correct for inheritance
    }
}

class ChildModel extends ParentModel {}

$child = ChildModel::create();  // returns ChildModel, not ParentModel`,

  'PHP 8 Features': `<?php
declare(strict_types=1);

// Named arguments (PHP 8.0) — skip optional params by name
echo str_pad(string: 'hi', length: 10, pad_type: STR_PAD_LEFT);

// Union types (PHP 8.0)
function processId(int|string $id): string
{
    return "ID: $id";
}

// Match expression (PHP 8.0) — strict, no fall-through
$status = 'active';
$label = match($status) {
    'active'   => 'Active',
    'inactive' => 'Inactive',
    default    => 'Unknown',
};

// Nullsafe operator (PHP 8.0)
$city = $user?->getAddress()?->getCity();

// Enums (PHP 8.1) — type-safe constants
enum Status: string {
    case Active   = 'active';
    case Inactive = 'inactive';
    case Banned   = 'banned';

    public function label(): string {
        return match($this) {
            Status::Active   => 'Active User',
            Status::Inactive => 'Inactive',
            Status::Banned   => 'Banned',
        };
    }
}

// Readonly properties (PHP 8.1)
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
    ) {}
}

// Fibers (PHP 8.1) — cooperative concurrency (coroutines)
$fiber = new Fiber(function(): void {
    $value = Fiber::suspend('first');
    echo "Got: $value";
});
$first = $fiber->start();   // 'first'
$fiber->resume('hello');    // echoes: Got: hello`,

  'Design Patterns in PHP': `<?php
declare(strict_types=1);

// --- Repository Pattern ---
interface UserRepository {
    public function findById(int $id): ?array;
    public function save(array $user): void;
}

class MysqlUserRepository implements UserRepository {
    public function __construct(private \\PDO $pdo) {}

    public function findById(int $id): ?array {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    public function save(array $user): void {
        // INSERT or UPDATE logic...
    }
}

// --- Factory Pattern ---
interface Logger { public function log(string $msg): void; }
class FileLogger    implements Logger { public function log(string $msg): void { file_put_contents('/tmp/app.log', $msg . PHP_EOL, FILE_APPEND); } }
class ConsoleLogger implements Logger { public function log(string $msg): void { echo $msg . PHP_EOL; } }

class LoggerFactory {
    public static function create(string $type): Logger {
        return match($type) {
            'file'    => new FileLogger(),
            'console' => new ConsoleLogger(),
            default   => throw new InvalidArgumentException("Unknown logger: $type"),
        };
    }
}

// --- Observer Pattern ---
interface Observer { public function update(string $event, mixed $data): void; }

class EventEmitter {
    private array $listeners = [];

    public function on(string $event, Observer $observer): void {
        $this->listeners[$event][] = $observer;
    }

    public function emit(string $event, mixed $data = null): void {
        foreach ($this->listeners[$event] ?? [] as $obs) {
            $obs->update($event, $data);
        }
    }
}`,

  'SOLID Principles in PHP': `<?php
declare(strict_types=1);

// S — Single Responsibility: one reason to change
class InvoiceCalculator {
    public function calculate(array $items): float {
        return array_sum(array_column($items, 'price'));
    }
}
class InvoicePrinter {
    public function print(float $total): string {
        return "Total: $$total";
    }
}

// O — Open/Closed: open for extension, closed for modification
interface Discount { public function apply(float $price): float; }
class NoDiscount      implements Discount { public function apply(float $p): float { return $p; } }
class PercentDiscount implements Discount {
    public function __construct(private float $pct) {}
    public function apply(float $p): float { return $p * (1 - $this->pct / 100); }
}

// L — Liskov Substitution: subclass must honour parent contract
class Rectangle {
    public function __construct(protected float $w, protected float $h) {}
    public function area(): float { return $this->w * $this->h; }
}
// Square IS-A Rectangle only if we keep the contract intact

// I — Interface Segregation: small focused interfaces
interface Readable  { public function read(): string; }
interface Writable  { public function write(string $data): void; }
// Don't force a read-only class to implement write()

// D — Dependency Inversion: depend on abstractions not concretions
class OrderService {
    public function __construct(
        private UserRepository $users,   // interface, not MysqlUserRepository
        private Logger $logger,          // interface, not FileLogger
    ) {}
}`,

  'Namespaces and PSR Standards': `<?php
// PSR-4 autoloading: namespace maps to directory path
// Vendor\\Package\\SubPackage → vendor/package/sub-package/

namespace App\\Services;

use App\\Models\\User;
use App\\Repositories\\UserRepository;
use Illuminate\\Support\\Collection;

class UserService
{
    public function __construct(
        private readonly UserRepository $repo,
    ) {}

    public function getActiveUsers(): array
    {
        return $this->repo->findAll(['active' => true]);
    }
}

// composer.json autoload section:
// {
//   "autoload": {
//     "psr-4": {
//       "App\\\\": "src/"
//     }
//   }
// }
// Run: composer dump-autoload

// PSR-12 coding style enforced by tools:
// ./vendor/bin/phpcs --standard=PSR12 src/
// ./vendor/bin/php-cs-fixer fix src/

// PSR-7 HTTP Message Interface (used by Slim, Guzzle)
// $request->getMethod()   — GET, POST, etc.
// $request->getUri()      — full URI object
// $request->getBody()     — stream body`,

  'Composer and Dependency Management': `<?php
// composer.json — project manifest
// {
//   "require": {
//     "php": "^8.2",
//     "guzzlehttp/guzzle": "^7.0",
//     "vlucas/phpdotenv":  "^5.5"
//   },
//   "require-dev": {
//     "phpunit/phpunit": "^11.0",
//     "pestphp/pest":    "^2.0"
//   },
//   "autoload": {
//     "psr-4": { "App\\\\": "src/" }
//   }
// }

// Key commands:
// composer install          — install from composer.lock (CI/prod)
// composer update           — update to newest allowed versions
// composer require pkg/name — add a package
// composer remove pkg/name  — remove a package
// composer dump-autoload    — regenerate autoload files

// Semantic versioning constraints:
// ^1.2.3  — >=1.2.3 <2.0.0  (safe minor/patch updates)
// ~1.2.3  — >=1.2.3 <1.3.0  (patch updates only)
// 1.2.*   — any patch of 1.2
// *       — any version (avoid in production)

// ALWAYS commit composer.lock — ensures reproducible builds
// NEVER commit vendor/ directory — add to .gitignore`,

  'Testing PHP Applications': `<?php
// tests/UserServiceTest.php — PHPUnit example
use PHPUnit\\Framework\\TestCase;
use PHPUnit\\Framework\\MockObject\\MockObject;

class UserServiceTest extends TestCase
{
    private MockObject $repo;
    private UserService $service;

    protected function setUp(): void
    {
        $this->repo    = $this->createMock(UserRepository::class);
        $this->service = new UserService($this->repo);
    }

    public function testGetActiveUsersCallsRepoWithCorrectFilter(): void
    {
        $this->repo
            ->expects($this->once())
            ->method('findAll')
            ->with(['active' => true])
            ->willReturn([['id' => 1, 'name' => 'Alice']]);

        $result = $this->service->getActiveUsers();

        $this->assertCount(1, $result);
        $this->assertSame('Alice', $result[0]['name']);
    }
}

// Using Pest (modern syntax):
// test('active users are returned', function () {
//     $repo = mock(UserRepository::class)
//         ->shouldReceive('findAll')
//         ->with(['active' => true])
//         ->andReturn([['id' => 1, 'name' => 'Alice']]);
//
//     $service = new UserService($repo);
//     expect($service->getActiveUsers())->toHaveCount(1);
// });

// Run: ./vendor/bin/phpunit
// Coverage: ./vendor/bin/phpunit --coverage-html coverage/`,

  'Security Best Practices': `<?php
declare(strict_types=1);

// 1. SQL Injection — ALWAYS use prepared statements
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute([':email' => $email]);

// 2. XSS — escape ALL output
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// 3. Password hashing
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
// Verify: password_verify($input, $hash)
// Rehash when needed: password_needs_rehash($hash, PASSWORD_BCRYPT)

// 4. CSRF protection — include token in every state-changing form
session_start();
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
// Verify: hash_equals($_SESSION['csrf'], $_POST['_token'] ?? '')

// 5. Secure headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Content-Security-Policy: default-src \'self\'');
header('Referrer-Policy: strict-origin-when-cross-origin');

// 6. File upload validation
function validateUpload(array $file): void
{
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    $finfo   = new finfo(FILEINFO_MIME_TYPE);
    $mime    = $finfo->file($file['tmp_name']);   // check real type, not extension

    if (!in_array($mime, $allowed, true)) {
        throw new RuntimeException('Invalid file type.');
    }
    if ($file['size'] > 5 * 1024 * 1024) {
        throw new RuntimeException('File too large (max 5 MB).');
    }
}`,

  'Performance and Caching': `<?php
declare(strict_types=1);

// OPcache: caches compiled bytecode in memory (enable in php.ini)
// opcache.enable = 1
// opcache.memory_consumption = 256
// opcache.max_accelerated_files = 20000

// APCu: in-memory key/value cache (single server)
$key  = "user_{$userId}";
$user = apcu_fetch($key, $success);

if (!$success) {
    $user = fetchFromDatabase($userId);
    apcu_store($key, $user, 300);  // cache 5 minutes
}

// Redis via Predis (shared cache across servers)
$redis = new Predis\\Client(['host' => '127.0.0.1', 'port' => 6379]);

$cached = $redis->get("product_{$id}");
if ($cached === null) {
    $product = fetchProduct($id);
    $redis->setex("product_{$id}", 600, serialize($product));
} else {
    $product = unserialize($cached);
}

// Lazy loading — only compute when needed
function expensiveReport(): \\Generator
{
    foreach (range(1, 10000) as $row) {
        yield processRow($row);   // yield one row at a time, no memory spike
    }
}

foreach (expensiveReport() as $row) {
    output($row);
}`,

  'PHP Interview Problem Solving': `<?php
declare(strict_types=1);

// --- FizzBuzz (classic, but asked to test loop + modulo) ---
for ($i = 1; $i <= 20; $i++) {
    echo match(true) {
        $i % 15 === 0 => 'FizzBuzz',
        $i % 3  === 0 => 'Fizz',
        $i % 5  === 0 => 'Buzz',
        default        => (string) $i,
    } . "\\n";
}

// --- Find duplicates in an array ---
function findDuplicates(array $items): array
{
    $seen = $dupes = [];
    foreach ($items as $item) {
        if (isset($seen[$item])) {
            $dupes[] = $item;
        }
        $seen[$item] = true;
    }
    return array_unique($dupes);
}

// --- Check balanced brackets ---
function isBalanced(string $expr): bool
{
    $stack = [];
    $pairs = [')' => '(', ']' => '[', '}' => '{'];

    foreach (str_split($expr) as $ch) {
        if (in_array($ch, ['(', '[', '{'])) {
            $stack[] = $ch;
        } elseif (isset($pairs[$ch])) {
            if (array_pop($stack) !== $pairs[$ch]) return false;
        }
    }
    return empty($stack);
}

// --- Fibonacci with memoization ---
function fib(int $n, array &$memo = []): int
{
    if ($n <= 1) return $n;
    return $memo[$n] ??= fib($n - 1, $memo) + fib($n - 2, $memo);
}`,
};

const LARAVEL_EXAMPLES: Record<string, string> = {
  'What is Laravel': `<?php
// Laravel is a PHP framework following MVC + Convention over Configuration.
// It provides routing, ORM (Eloquent), Blade templates, and artisan CLI.

// routes/web.php
use App\\Http\\Controllers\\UserController;
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

// Run artisan commands:
// php artisan make:controller UserController
// php artisan make:model User -m
// php artisan migrate
// php artisan serve`,

  'Routing and Route Groups': `<?php
// routes/api.php

use App\\Http\\Controllers\\Api\\UserController;
use App\\Http\\Controllers\\Api\\OrderController;

// Group routes with middleware + prefix
Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {

    Route::apiResource('users', UserController::class);
    // GET    /v1/users         → index
    // POST   /v1/users         → store
    // GET    /v1/users/{id}    → show
    // PUT    /v1/users/{id}    → update
    // DELETE /v1/users/{id}    → destroy

    Route::get('orders/pending', [OrderController::class, 'pending']);
    Route::apiResource('orders', OrderController::class);
});

// Named route for redirect
Route::get('/dashboard', fn() => view('dashboard'))->name('dashboard');`,

  'Controllers and Request Lifecycle': `<?php
namespace App\\Http\\Controllers;

use App\\Http\\Requests\\StoreUserRequest;
use App\\Models\\User;

class UserController extends Controller
{
    public function index()
    {
        // Optimization: paginate instead of all()
        return User::orderBy('created_at', 'desc')->paginate(20);
    }

    public function store(StoreUserRequest $request)
    {
        // Validation already done by FormRequest
        $user = User::create($request->validated());

        return response()->json($user, 201);
    }

    public function show(User $user)   // Route model binding
    {
        return $user;
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }
}`,

  'Eloquent Models and ORM Basics': `<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'body', 'user_id', 'published_at'];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured'  => 'boolean',
    ];

    // Scope: reusable query constraint
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

// Usage:
// Post::published()->with('user')->latest()->paginate(15);`,

  'Eloquent Relationships': `<?php
// One-to-Many
class User extends Model {
    public function posts() {
        return $this->hasMany(Post::class);
    }
}

class Post extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
    // Many-to-Many with pivot
    public function tags() {
        return $this->belongsToMany(Tag::class)
                    ->withPivot('added_by')
                    ->withTimestamps();
    }
}

// Eager loading (avoids N+1 query problem)
$posts = Post::with(['user', 'tags'])->published()->get();

// N+1 bad:
foreach ($posts as $post) {
    echo $post->user->name;   // 1 query per post
}

// Eager loading good:
// 2 queries total regardless of post count`,

  'Migrations and Seeders': `<?php
// database/migrations/2024_01_01_create_orders_table.php

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status', 20)->default('pending');
            $table->decimal('total', 10, 2);
            $table->timestamps();

            $table->index(['user_id', 'status']); // composite index
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

// database/seeders/OrderSeeder.php
class OrderSeeder extends Seeder {
    public function run(): void {
        Order::factory(100)->create(); // uses OrderFactory
    }
}

// php artisan migrate
// php artisan db:seed --class=OrderSeeder`,

  'Authentication in Laravel': `<?php
// Using Laravel Sanctum for API token auth

// Install: composer require laravel/sanctum
// php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
// php artisan migrate

// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// AuthController
class AuthController extends Controller {
    public function login(Request $request) {
        $creds = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($creds)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user  = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}`,

  'Middleware and Request Pipelines': `<?php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        if (!$request->user() || $request->user()->role !== $role) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);  // pass to next middleware / controller
    }
}

// Register in app/Http/Kernel.php:
// 'role' => CheckRole::class

// Use in routes:
// Route::delete('/users/{id}', [...])->middleware('role:admin');

// Middleware pipeline order:
// Request → GlobalMiddleware → RouteMiddleware → Controller → Response`,

  'Queues and Jobs': `<?php
namespace App\\Jobs;

use App\\Mail\\WelcomeMail;
use App\\Models\\User;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Queue\\Queueable;
use Illuminate\\Support\\Facades\\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;          // retry up to 3 times
    public int $backoff = 60;       // wait 60s between retries

    public function __construct(public readonly User $user) {}

    public function handle(): void
    {
        Mail::to($this->user->email)->send(new WelcomeMail($this->user));
    }

    public function failed(\\Throwable $e): void
    {
        \\Log::error('WelcomeEmail failed for user ' . $this->user->id, [
            'error' => $e->getMessage(),
        ]);
    }
}

// Dispatch: SendWelcomeEmail::dispatch($user);
// Worker:   php artisan queue:work --queue=emails`,

  'Blade Templating': `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title', 'My App')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @include('partials.nav')
    <main>
        @yield('content')
    </main>
</body>
</html>

{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Users')

@section('content')
    @forelse($users as $user)
        <div class="card">
            <strong>{{ $user->name }}</strong>
            <span>{{ $user->email }}</span>
            @if($user->isAdmin())
                <span class="badge">Admin</span>
            @endif
        </div>
    @empty
        <p>No users found.</p>
    @endforelse

    {{ $users->links() }}  {{-- pagination links --}}
@endsection

{{-- Components (Laravel 8+): resources/views/components/alert.blade.php --}}
@props(['type' => 'info', 'message'])
<div class="alert alert-{{ $type }}">{{ $message }}</div>

{{-- Usage: <x-alert type="success" message="Saved!" /> --}}`,

  'Form Request Validation': `<?php
namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreUserRequest extends FormRequest
{
    // Only allow authenticated users to submit
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'confirmed'],
            'role'     => ['required', 'in:admin,editor,viewer'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'This email is already registered.',
        ];
    }

    // Transform/clean data before validation runs
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower(trim($this->email ?? '')),
        ]);
    }
}

// Controller usage:
// public function store(StoreUserRequest $request) {
//     $user = User::create($request->validated());
//     ...
// }
// Validation runs automatically — 422 returned if it fails`,

  'Authorization with Gates and Policies': `<?php
// app/Providers/AuthServiceProvider.php
use Illuminate\\Support\\Facades\\Gate;

class AuthServiceProvider extends ServiceProvider {
    public function boot(): void {
        // Simple Gate — inline logic
        Gate::define('view-reports', function (User $user) {
            return in_array($user->role, ['admin', 'manager']);
        });
    }
}

// app/Policies/PostPolicy.php — resource-specific rules
class PostPolicy {
    public function update(User $user, Post $post): bool {
        return $user->id === $post->user_id || $user->isAdmin();
    }

    public function delete(User $user, Post $post): bool {
        return $user->isAdmin();
    }
}

// Controller — multiple ways to check
class PostController extends Controller {
    public function update(Request $request, Post $post) {
        $this->authorize('update', $post);   // throws 403 if denied
        // ... proceed with update
    }

    public function destroy(Post $post) {
        // Gate check inline
        if (Gate::denies('delete', $post)) {
            abort(403);
        }
    }
}

// Blade
// @can('update', $post)
//     <button>Edit</button>
// @endcan`,

  'API Resources and Response Formatting': `<?php
namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'role'       => $this->role,
            'created_at' => $this->created_at->toISOString(),
            // Conditional fields — only include if loaded
            'posts'      => PostResource::collection($this->whenLoaded('posts')),
            // Only show to admins
            'phone'      => $this->when($request->user()?->isAdmin(), $this->phone),
        ];
    }
}

// ResourceCollection with pagination metadata
class UserCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total'       => $this->total(),
                'per_page'    => $this->perPage(),
                'current_page'=> $this->currentPage(),
            ],
        ];
    }
}

// Controller usage:
// return new UserResource($user);              // single
// return UserResource::collection($users);     // collection
// return new UserCollection(User::paginate(20)); // paginated`,

  'Service Container and Dependency Injection': `<?php
// app/Providers/AppServiceProvider.php
use App\\Services\\PaymentService;
use App\\Services\\StripePaymentService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind interface to concrete implementation
        $this->app->bind(PaymentService::class, function ($app) {
            return new StripePaymentService(
                apiKey: config('services.stripe.key'),
                logger: $app->make(Logger::class),
            );
        });

        // Singleton — same instance throughout request lifecycle
        $this->app->singleton(CacheManager::class, function ($app) {
            return new CacheManager(config('cache.default'));
        });
    }
}

// The container automatically injects dependencies
class OrderController extends Controller
{
    // Laravel resolves PaymentService automatically from container
    public function __construct(
        private readonly PaymentService $payment,
    ) {}

    public function charge(Request $request): JsonResponse
    {
        $result = $this->payment->charge(
            amount: $request->integer('amount'),
            token:  $request->string('token'),
        );
        return response()->json($result);
    }
}

// Manual resolution: app(PaymentService::class)
// or:              resolve(PaymentService::class)`,

  'Eloquent Relationships and N+1 Problem': `<?php
// One-to-Many
class User extends Model {
    public function posts(): HasMany {
        return $this->hasMany(Post::class);
    }
}

// Many-to-Many with pivot
class Post extends Model {
    public function tags(): BelongsToMany {
        return $this->belongsToMany(Tag::class)
                    ->withPivot('added_by')
                    ->withTimestamps();
    }
    // Polymorphic: Post and Video both have comments
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

// ❌ N+1 Problem — 1 + N queries (1 for posts, 1 per post for user)
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name;   // queries DB every iteration
}

// ✅ Eager Loading — 2 queries total regardless of post count
$posts = Post::with('user')->get();
foreach ($posts as $post) {
    echo $post->user->name;   // no extra query
}

// Eager loading with constraint
$posts = Post::with(['comments' => function ($q) {
    $q->where('approved', true)->latest()->limit(3);
}])->get();

// withCount: get count without loading all relations
$users = User::withCount('posts')->get();
echo $users->first()->posts_count;`,

  'Service Providers and Bootstrapping': `<?php
// Service providers are the central place to configure your application.
// Every request passes through registered providers.

// app/Providers/AppServiceProvider.php
class AppServiceProvider extends ServiceProvider
{
    // register(): bind things into the container — no other services are available yet
    public function register(): void
    {
        $this->app->singleton(CurrencyConverter::class, function ($app) {
            return new CurrencyConverter(
                baseCurrency: config('app.currency', 'USD'),
            );
        });
    }

    // boot(): runs after all providers are registered — safe to use other services
    public function boot(): void
    {
        // Force HTTPS in production
        if ($this->app->isProduction()) {
            \\URL::forceScheme('https');
        }

        // Register a custom Blade directive
        \\Blade::directive('money', function ($expression) {
            return "<?php echo number_format($expression, 2); ?>";
        });

        // Register global Eloquent observer
        User::observe(UserObserver::class);
    }
}

// config/app.php — register in providers array:
// App\\Providers\\AppServiceProvider::class

// php artisan make:provider ReportingServiceProvider`,

  'Laravel Collections API': `<?php
use Illuminate\\Support\\Collection;

$users = collect([
    ['name' => 'Alice', 'role' => 'admin', 'score' => 95],
    ['name' => 'Bob',   'role' => 'user',  'score' => 72],
    ['name' => 'Carol', 'role' => 'admin', 'score' => 88],
    ['name' => 'Dave',  'role' => 'user',  'score' => 55],
]);

// filter: keep matching items
$admins = $users->filter(fn($u) => $u['role'] === 'admin');
// [Alice, Carol]

// map: transform each item
$names = $users->map(fn($u) => strtoupper($u['name']));

// pluck: extract single field
$scores = $users->pluck('score');   // [95, 72, 88, 55]

// groupBy: group by field value
$byRole = $users->groupBy('role');
// ['admin' => [...], 'user' => [...]]

// sortByDesc + take: top 2 scorers
$top2 = $users->sortByDesc('score')->take(2)->values();

// reduce: compute aggregate
$avgScore = $users->avg('score');   // 77.5

// chunk: split into batches (useful for bulk processing)
$users->chunk(2)->each(function ($batch) {
    // process 2 at a time...
});

// Eloquent collections work the same way:
// User::all()->groupBy('role')->map->count()`,

  'Repository Pattern in Laravel': `<?php
// Interface — what the repository must do
namespace App\\Repositories;

interface UserRepositoryInterface
{
    public function findById(int $id): ?\\App\\Models\\User;
    public function findByEmail(string $email): ?\\App\\Models\\User;
    public function paginate(int $perPage = 15): \\Illuminate\\Pagination\\LengthAwarePaginator;
    public function create(array $data): \\App\\Models\\User;
    public function update(int $id, array $data): bool;
}

// Eloquent implementation
class EloquentUserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?\\App\\Models\\User
    {
        return \\App\\Models\\User::find($id);
    }

    public function findByEmail(string $email): ?\\App\\Models\\User
    {
        return \\App\\Models\\User::where('email', $email)->first();
    }

    public function paginate(int $perPage = 15): \\Illuminate\\Pagination\\LengthAwarePaginator
    {
        return \\App\\Models\\User::latest()->paginate($perPage);
    }

    public function create(array $data): \\App\\Models\\User
    {
        return \\App\\Models\\User::create($data);
    }

    public function update(int $id, array $data): bool
    {
        return \\App\\Models\\User::where('id', $id)->update($data) > 0;
    }
}

// Bind in AppServiceProvider:
// $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);

// Benefits: swap Eloquent for raw PDO or API without touching business logic`,

  'Events and Listeners': `<?php
// app/Events/OrderPlaced.php
class OrderPlaced
{
    public function __construct(
        public readonly Order $order,
        public readonly User  $user,
    ) {}
}

// app/Listeners/SendOrderConfirmation.php
class SendOrderConfirmation implements ShouldQueue   // async listener
{
    public function handle(OrderPlaced $event): void
    {
        Mail::to($event->user->email)
            ->send(new OrderConfirmationMail($event->order));
    }
}

// app/Listeners/UpdateInventory.php
class UpdateInventory
{
    public function handle(OrderPlaced $event): void
    {
        foreach ($event->order->items as $item) {
            Product::decrement('stock', $item->quantity, ['id' => $item->product_id]);
        }
    }
}

// Register in EventServiceProvider:
// protected $listen = [
//     OrderPlaced::class => [
//         SendOrderConfirmation::class,  // queued
//         UpdateInventory::class,        // sync
//     ],
// ];

// Fire the event in your service:
// event(new OrderPlaced($order, $user));
// Or: OrderPlaced::dispatch($order, $user);`,

  'Task Scheduling': `<?php
// app/Console/Kernel.php
class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        // Run every day at 1 AM — send a report email
        $schedule->job(new GenerateDailyReport)
                 ->dailyAt('01:00')
                 ->onOneServer()       // only one server in a cluster runs this
                 ->withoutOverlapping() // skip if previous run is still running
                 ->emailOutputOnFailure('admin@example.com');

        // Every 5 minutes — sync exchange rates
        $schedule->command('rates:sync')
                 ->everyFiveMinutes()
                 ->runInBackground();

        // Every Monday at 8 AM — prune old records
        $schedule->call(function () {
            \\DB::table('activity_log')
                ->where('created_at', '<', now()->subDays(90))
                ->delete();
        })->weeklyOn(1, '08:00');

        // Hourly between 9 AM and 5 PM on weekdays
        $schedule->command('reports:cache')
                 ->hourly()
                 ->weekdays()
                 ->between('09:00', '17:00');
    }
}

// Cron entry on the server (one line — Laravel handles the rest):
// * * * * * cd /var/www && php artisan schedule:run >> /dev/null 2>&1`,

  'Testing with PHPUnit and Pest': `<?php
// Feature test (Pest) — tests a full HTTP endpoint
use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns 401 when unauthenticated', function () {
    $response = $this->getJson('/api/users');
    $response->assertStatus(401);
});

it('returns paginated users for authenticated admin', function () {
    $admin = User::factory()->admin()->create();
    User::factory(5)->create();

    $response = $this->actingAs($admin, 'sanctum')
                     ->getJson('/api/users');

    $response->assertOk()
             ->assertJsonStructure(['data' => [['id', 'name', 'email']], 'meta']);
});

it('stores a new user with valid data', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin, 'sanctum')
                     ->postJson('/api/users', [
                         'name'  => 'Alice',
                         'email' => 'alice@example.com',
                         'role'  => 'editor',
                     ]);

    $response->assertCreated()->assertJsonPath('data.name', 'Alice');
    $this->assertDatabaseHas('users', ['email' => 'alice@example.com']);
});

// Mock a service
it('sends welcome email on user creation', function () {
    Mail::fake();
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
         ->postJson('/api/users', [...]);

    Mail::assertSent(WelcomeMail::class);
});`,

  'Caching, Performance, and Optimization': `<?php
use Illuminate\\Support\\Facades\\Cache;

// Store with expiry
Cache::put('featured_products', $products, now()->addHours(2));

// Remember: get from cache, or compute and store
$popular = Cache::remember('popular_posts', 3600, function () {
    return Post::withCount('views')
               ->orderBy('views_count', 'desc')
               ->limit(10)
               ->get();
});

// Cache tags — invalidate a group at once (Redis only)
Cache::tags(['posts', 'homepage'])->put('featured', $data, 3600);
Cache::tags('posts')->flush();  // clears all post-tagged items

// Cache forever + explicit forget
Cache::forever('site_settings', $settings);
Cache::forget('site_settings');

// Database query caching pattern
$users = Cache::remember("users_page_{$page}", 300, fn() =>
    User::active()->paginate(20)
);

// Query optimization: avoid N+1
$orders = Order::with(['user', 'items.product'])
               ->whereDate('created_at', today())
               ->get();

// Use chunking for large data sets
User::chunk(200, function ($users) {
    foreach ($users as $user) {
        $user->sendWeeklyDigest();
    }
});`,

  'Laravel Interview Architectures': `<?php
// ===== Key architecture questions =====

// Q: How does the request lifecycle work in Laravel?
// Answer:
// 1. index.php creates the Application (IoC container)
// 2. HTTP Kernel loads middleware stack
// 3. Router matches the URI
// 4. Middleware runs (global → route-specific)
// 5. Controller action executes
// 6. Response passes back through middleware
// 7. Response sent to browser

// Q: What is the difference between Singleton, Bind, and Instance?
$app->singleton(Logger::class, fn() => new FileLogger());
// Same instance returned every call

$app->bind(Logger::class, fn() => new FileLogger());
// New instance on every resolve

$app->instance(Logger::class, $existingLogger);
// Bind a pre-built object

// Q: Sanctum vs Passport?
// Sanctum: SPA/mobile token auth — lightweight, uses cookies or tokens
// Passport: full OAuth2 server — use when you need third-party OAuth flows

// Q: How to prevent N+1 in Eloquent?
// Use ->with([]) eager loading
// Enable strict mode: Model::preventLazyLoading() in AppServiceProvider

// Q: What is a Service Provider vs Service Container?
// Container: IoC engine that resolves dependencies
// Provider: tells the container HOW to build things

// Q: How do queues help performance?
// Offload slow work (emails, PDFs, notifications) to background workers
// Response time stays fast; jobs run in parallel`,
};

const REACT_EXAMPLES: Record<string, string> = {
  'What is React': `// React: a JavaScript library for building UIs with components.
// It uses a virtual DOM to efficiently update only what changed.

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,

  'JSX and Rendering Basics': `// JSX is syntactic sugar — it compiles to React.createElement()
// Rules: one root element, className not class, camelCase attributes

export function UserCard({ name, role }: { name: string; role: string }) {
  const isAdmin = role === 'admin';

  return (
    <div className="card">
      <h2>{name}</h2>
      <span className={\`badge \${isAdmin ? 'badge-red' : 'badge-blue'}\`}>
        {role}
      </span>
      {/* Conditional rendering */}
      {isAdmin && <p>You have admin access.</p>}
    </div>
  );
}`,

  'Components and Reusability': `// Split UI into small, focused, reusable components
import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function Button({ variant = 'primary', disabled, onClick, children }: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition-colors';
  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    danger:  'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`\${base} \${styles[variant]} disabled:opacity-50\`}
    >
      {children}
    </button>
  );
}`,

  'Props and Data Flow': `// Data flows DOWN through props (parent → child)
// Events flow UP through callbacks (child → parent)

interface Product { id: number; name: string; price: number }

function ProductItem({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (id: number) => void;
}) {
  return (
    <div>
      <span>{product.name} — \${product.price}</span>
      <button onClick={() => onAddToCart(product.id)}>Add to cart</button>
    </div>
  );
}

export function ProductList({ products }: { products: Product[] }) {
  function handleAdd(id: number) {
    console.log('Adding product', id);
  }

  return (
    <ul>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onAddToCart={handleAdd} />
      ))}
    </ul>
  );
}`,

  'State and useState': `import { useState } from 'react';

interface Todo { id: number; text: string; done: boolean }

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput]  = useState('');

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  }

  function toggle(id: number) {
    // Always derive new state from previous — never mutate
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id} onClick={() => toggle(t.id)}
              style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,

  'useEffect and Side Effects': `import { useEffect, useState } from 'react';

interface User { id: number; name: string }

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    let cancelled = false;   // cleanup flag to prevent state update after unmount

    setLoading(true);
    setError('');

    fetch(\`/api/users/\${userId}\`)
      .then((r) => r.json())
      .then((data: User) => { if (!cancelled) setUser(data); })
      .catch(() => { if (!cancelled) setError('Failed to load user.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };  // cleanup on unmount or userId change
  }, [userId]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{error}</p>;
  return <h2>{user?.name}</h2>;
}`,

  'useMemo and useCallback': `import { useMemo, useCallback, useState } from 'react';

interface Item { id: number; name: string; price: number }

export function ProductFilter({ items }: { items: Item[] }) {
  const [query, setQuery]  = useState('');
  const [minPrice, setMin] = useState(0);

  // useMemo: recompute only when deps change (not on every render)
  const filtered = useMemo(
    () =>
      items
        .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
        .filter((i) => i.price >= minPrice),
    [items, query, minPrice],
  );

  // useCallback: stable reference for child component prop
  const handleReset = useCallback(() => {
    setQuery('');
    setMin(0);
  }, []);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <input type="number" value={minPrice} onChange={(e) => setMin(+e.target.value)} />
      <button onClick={handleReset}>Reset</button>
      <p>{filtered.length} results</p>
    </div>
  );
}`,

  'useRef and DOM Interaction': `import { useRef, useEffect } from 'react';

export function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto focused" />;
}

// useRef for mutable value that does NOT trigger re-render
import { useRef, useState, useEffect } from 'react';

export function StopWatch() {
  const [elapsed, setElapsed] = useState(0);
  const intervalId = useRef<number | null>(null);

  function start() {
    intervalId.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
  }

  function stop() {
    if (intervalId.current) clearInterval(intervalId.current);
  }

  return (
    <div>
      <p>{elapsed}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`,

  'Custom Hooks': `import { useEffect, useState } from 'react';

// Custom hook: encapsulate fetch logic for reuse across components
function useFetch<T>(url: string) {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        return r.json() as Promise<T>;
      })
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
interface Post { id: number; title: string }

export function PostList() {
  const { data, loading, error } = useFetch<Post[]>('/api/posts');

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;
  return <ul>{data?.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}`,

  'Context API': `import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextValue {
  user: { name: string } | null;
  login:  (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  function login(name: string)  { setUser({ name }); }
  function logout()              { setUser(null); }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

// Usage in any child:
// const { user, logout } = useAuth();`,

  'Forms and Controlled Components': `import { useState, type FormEvent } from 'react';

interface FormData { name: string; email: string }
interface Errors    { name?: string; email?: string }

export function ContactForm() {
  const [form, setForm]     = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim())                     e.name  = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email))   e.email = 'Valid email required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submitted:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}`,
};

const NODEJS_EXAMPLES: Record<string, string> = {
  'What is Node.js': `// Node.js: JavaScript runtime built on Chrome's V8 engine.
// Non-blocking I/O — handles many connections without threads.

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

// Check version: node --version
// Run a file:   node app.js`,

  'Event Loop and Non-blocking I/O': `const fs = require('fs');

// Blocking (bad for production — freezes the event loop)
// const data = fs.readFileSync('file.txt', 'utf8');

// Non-blocking (correct — event loop stays free)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Read failed:', err.message);
    return;
  }
  console.log('File contents:', data);
});

console.log('This runs BEFORE file is read — non-blocking!');

// Event loop phases: timers → I/O → poll → check → close
// setTimeout(() => console.log('timer'), 0);
// setImmediate(() => console.log('immediate'));  // runs after I/O`,

  'Building APIs with Express': `import express from 'express';

const app = express();
app.use(express.json());

const users: { id: number; name: string; email: string }[] = [];

// GET all users
app.get('/users', (_req, res) => {
  res.json({ data: users });
});

// POST create user
app.post('/users', (req, res) => {
  const { name, email } = req.body as { name?: string; email?: string };

  if (!name?.trim() || !email?.trim()) {
    return res.status(422).json({ error: 'name and email are required' });
  }

  const user = { id: Date.now(), name: name.trim(), email: email.trim() };
  users.push(user);
  res.status(201).json({ data: user });
});

// GET single user
app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

app.listen(3000, () => console.log('API running on :3000'));`,

  'Middleware in Node Applications': `import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

// 1. Request logger middleware
function logger(req: Request, _res: Response, next: NextFunction) {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);
  next();  // must call next() or request hangs
}

// 2. Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== 'secret-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// 3. Error handler (4 params — Express detects it as error middleware)
function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
}

app.use(logger);
app.get('/protected', requireAuth, (_req, res) => res.json({ ok: true }));
app.use(errorHandler);`,

  'Authentication and Session Handling': `import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app   = express();
const SECRET = process.env.JWT_SECRET ?? 'change-me-in-production';

app.use(express.json());

// POST /login
app.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(422).json({ error: 'email and password are required' });
  }

  // In production: fetch user from DB
  const storedHash = await bcrypt.hash('demo-password', 10);
  const valid      = await bcrypt.compare(password, storedHash);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: '123', email }, SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Protected route
app.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const payload = jwt.verify(token, SECRET);
    res.json({ user: payload });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});`,

  'JWT and Token Strategies': `import jwt from 'jsonwebtoken';

const ACCESS_SECRET  = process.env.ACCESS_SECRET  ?? 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? 'refresh-secret';

// Issue short-lived access token + long-lived refresh token
function issueTokens(userId: string) {
  const access  = jwt.sign({ sub: userId }, ACCESS_SECRET,  { expiresIn: '15m' });
  const refresh = jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: '7d'  });
  return { access, refresh };
}

// Verify access token
function verifyAccess(token: string): { sub: string } {
  return jwt.verify(token, ACCESS_SECRET) as { sub: string };
}

// Refresh endpoint: exchange valid refresh token for new access token
function refreshAccess(refreshToken: string): string {
  const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { sub: string };
  return jwt.sign({ sub: payload.sub }, ACCESS_SECRET, { expiresIn: '15m' });
}

// Usage:
const tokens = issueTokens('user-123');
console.log(tokens.access);

try {
  const user = verifyAccess(tokens.access);
  console.log('Authenticated:', user.sub);
} catch {
  console.log('Token invalid or expired');
}`,

  'Error Handling and Logging': `import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

// Custom error class with HTTP status
class AppError extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message);
    this.name = 'AppError';
  }
}

// Route that can throw
app.get('/users/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new AppError('Invalid user ID', 422);
    }
    // simulate not found
    if (id > 100) throw new AppError('User not found', 404);

    res.json({ id, name: 'Alice' });
  } catch (err) {
    next(err);  // pass to error middleware
  }
});

// Centralized error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error('[UNHANDLED]', err);
  res.status(500).json({ error: 'Internal server error' });
});`,

  'Asynchronous Patterns': `// Callbacks → Promises → async/await evolution

// 1. Callback (old style — "callback hell")
function readCb(path: string, cb: (err: Error | null, data?: string) => void) {
  setTimeout(() => cb(null, 'file content'), 100);
}

// 2. Promise
function readPromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('file content'), 100);
  });
}

// 3. async/await (modern — most readable)
async function processFile(path: string): Promise<void> {
  try {
    const data = await readPromise(path);
    console.log('Data:', data);
  } catch (err) {
    console.error('Failed:', err);
  }
}

// Parallel async — run independent tasks simultaneously
async function loadDashboard(userId: string) {
  const [profile, orders, notifications] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then((r) => r.json()),
    fetch(\`/api/orders?user=\${userId}\`).then((r) => r.json()),
    fetch(\`/api/notifications?user=\${userId}\`).then((r) => r.json()),
  ]);
  return { profile, orders, notifications };
}`,
};

const MYSQL_EXAMPLES: Record<string, string> = {
  'What is MySQL': `-- MySQL: open-source relational database management system.
-- Data is stored in tables with rows and columns (structured).

-- Check version
SELECT VERSION();

-- Create a database
CREATE DATABASE IF NOT EXISTS shop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE shop;

-- Create a table
CREATE TABLE products (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200)   NOT NULL,
  price      DECIMAL(10,2)  NOT NULL,
  stock      INT UNSIGNED   NOT NULL DEFAULT 0,
  created_at DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,

  'SQL CRUD Operations': `-- CREATE
INSERT INTO users (name, email, role)
VALUES ('Alice', 'alice@example.com', 'admin'),
       ('Bob',   'bob@example.com',   'user');

-- READ
SELECT id, name, email FROM users WHERE role = 'admin';

-- UPDATE — always use WHERE clause
UPDATE users
SET email = 'alice-new@example.com'
WHERE id = 1;

-- DELETE — always use WHERE clause
DELETE FROM users WHERE id = 2;

-- Soft delete pattern (preferred in production)
ALTER TABLE users ADD COLUMN deleted_at DATETIME NULL;

UPDATE users SET deleted_at = NOW() WHERE id = 2;
SELECT * FROM users WHERE deleted_at IS NULL;  -- active only`,

  'JOINs and Relationships': `-- Schema
-- users(id, name)
-- orders(id, user_id, total, status)
-- order_items(id, order_id, product_id, qty)

-- INNER JOIN: only rows matching in both tables
SELECT u.name, o.id AS order_id, o.total
FROM   users  u
INNER JOIN orders o ON o.user_id = u.id
WHERE  o.status = 'completed';

-- LEFT JOIN: all users, even those with no orders
SELECT u.name, COUNT(o.id) AS order_count
FROM   users  u
LEFT  JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;

-- Multi-table join
SELECT u.name, p.name AS product, oi.qty
FROM   users u
JOIN   orders o      ON o.user_id  = u.id
JOIN   order_items oi ON oi.order_id = o.id
JOIN   products p    ON p.id        = oi.product_id
WHERE  o.id = 42;`,

  'Indexes and Query Performance': `-- Without index: full table scan (slow on large tables)
EXPLAIN SELECT * FROM orders WHERE user_id = 5;
-- type: ALL → bad

-- Add index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- After index
EXPLAIN SELECT * FROM orders WHERE user_id = 5;
-- type: ref → fast

-- Composite index for multi-column WHERE
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- This query uses the composite index:
SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';

-- Covering index: index contains all needed columns (no table lookup)
CREATE INDEX idx_orders_cover ON orders(user_id, status, total, created_at);

-- Rules:
-- Index columns used in WHERE, JOIN ON, ORDER BY
-- Don't index low-cardinality columns (e.g. boolean)
-- Too many indexes slow down INSERT/UPDATE`,

  'Transactions and ACID Properties': `-- ACID: Atomicity, Consistency, Isolation, Durability

-- Transfer money between accounts — must be atomic
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Validate: abort if balance goes negative
SELECT balance FROM accounts WHERE id = 1;
-- If balance < 0:
-- ROLLBACK;

COMMIT;

-- Savepoints for partial rollback
START TRANSACTION;
INSERT INTO orders (user_id, total) VALUES (1, 199.99);
SAVEPOINT order_created;

INSERT INTO order_items (order_id, product_id, qty) VALUES (LAST_INSERT_ID(), 5, 2);
-- If item insert fails:
ROLLBACK TO SAVEPOINT order_created;
COMMIT;`,

  'Query Optimization with EXPLAIN': `-- Always run EXPLAIN before deploying slow queries

-- Step 1: identify slow query
-- Enable slow query log: slow_query_log = 1, long_query_time = 1

-- Step 2: explain
EXPLAIN SELECT u.name, COUNT(o.id) as orders
FROM   users u
LEFT  JOIN orders o ON o.user_id = u.id
WHERE  u.created_at > '2024-01-01'
GROUP BY u.id;

-- Key columns to check:
-- type:  ALL (bad), range/ref/eq_ref (good), const (best)
-- rows:  estimated rows examined — lower is better
-- Extra: 'Using filesort' or 'Using temporary' = needs optimization
-- key:   which index was used (NULL = no index)

-- Fix: add index on filtered/joined columns
CREATE INDEX idx_users_created ON users(created_at);
CREATE INDEX idx_orders_user   ON orders(user_id);

-- Re-run EXPLAIN to verify improvement`,

  'Database Design Fundamentals': `-- Identify entities (nouns) and relationships before writing SQL

-- users(id, name, email, created_at)
-- orders(id, user_id, status, total, created_at)
-- order_items(id, order_id, product_id, qty, unit_price)
-- products(id, name, price, stock, category_id)
-- categories(id, name, parent_id)  -- self-referencing for tree

-- Primary key: uniquely identifies each row
-- Foreign key: enforces referential integrity
-- Composite key: multiple columns form a unique identifier

CREATE TABLE order_items (
    id         BIGINT UNSIGNED AUTO_INCREMENT,
    order_id   BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    qty        SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Good design rules:
-- Store unit_price on order_items (snapshot) not product.price (changes over time)
-- Use BIGINT for IDs to handle growth
-- Use utf8mb4 to support emoji and all Unicode`,

  'Normalization and Denormalization': `-- 1NF: atomic values — no repeating groups
-- BAD: tags = "php,laravel,mysql"   (not atomic)
-- GOOD: separate post_tags table

-- 2NF: no partial dependency on composite key
-- If composite key is (order_id, product_id):
-- BAD: store product_name in order_items (depends only on product_id)
-- GOOD: join to products table to get product_name

-- 3NF: no transitive dependency
-- BAD: users(id, zip_code, city, state) — city depends on zip, not id
-- GOOD: zip_codes(zip, city, state) referenced from users

-- Normalized design (3NF):
CREATE TABLE posts (id INT PRIMARY KEY, title VARCHAR(200), user_id INT);
CREATE TABLE post_tags (post_id INT, tag_id INT, PRIMARY KEY(post_id, tag_id));
CREATE TABLE tags (id INT PRIMARY KEY, name VARCHAR(50) UNIQUE);

-- Denormalization for performance (trade write overhead for faster reads):
-- Store cached_comment_count on posts instead of COUNT() every page load
ALTER TABLE posts ADD COLUMN comment_count INT NOT NULL DEFAULT 0;

-- Increment on INSERT to comments, decrement on DELETE
-- Risk: can drift — add a periodic reconciliation job`,

  'Filtering and Sorting Data': `-- WHERE conditions
SELECT * FROM orders
WHERE status = 'pending'
  AND total > 100
  AND created_at >= '2024-01-01';

-- BETWEEN (inclusive on both ends)
SELECT * FROM products WHERE price BETWEEN 10 AND 50;

-- LIKE pattern matching (% = any, _ = one char)
SELECT * FROM users WHERE name LIKE 'A%';       -- starts with A
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- IN / NOT IN
SELECT * FROM orders WHERE status IN ('pending', 'processing');

-- NULL handling — always use IS NULL / IS NOT NULL
SELECT * FROM users WHERE deleted_at IS NULL;

-- ORDER BY multiple columns
SELECT * FROM products ORDER BY category_id ASC, price DESC;

-- LIMIT with OFFSET (for pagination)
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 40;  -- page 3

-- NULL LAST in sort (MySQL default is NULL first on ASC)
SELECT * FROM users ORDER BY last_login IS NULL, last_login DESC;`,

  'Constraints and Data Integrity': `-- NOT NULL: column must have a value
-- UNIQUE: no two rows can have the same value (allows one NULL)
-- PRIMARY KEY: NOT NULL + UNIQUE + clustered index
-- FOREIGN KEY: referential integrity
-- CHECK: custom rule (MySQL 8.0.16+)
-- DEFAULT: fallback value

CREATE TABLE users (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(255)  NOT NULL UNIQUE,
    role       ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
    age        TINYINT UNSIGNED CHECK (age >= 0 AND age <= 150),
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP     NULL
);

-- Composite UNIQUE: email must be unique per tenant
ALTER TABLE users
    ADD CONSTRAINT uq_tenant_email UNIQUE (tenant_id, email);

-- Foreign key with action
ALTER TABLE orders
    ADD CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT   -- prevent deleting user with orders
    ON UPDATE CASCADE;   -- if user.id changes, propagate

-- Disable FK checks during bulk import, re-enable after:
-- SET FOREIGN_KEY_CHECKS = 0;
-- ... bulk insert ...
-- SET FOREIGN_KEY_CHECKS = 1;`,

  'Isolation Levels and Locking': `-- MySQL default isolation: REPEATABLE READ
-- Dirty Read  — read uncommitted data from another tx
-- Non-Repeatable Read — same row returns different value in same tx
-- Phantom Read — same query returns different rows in same tx

-- READ UNCOMMITTED: fastest, dirty reads allowed
-- READ COMMITTED:   no dirty reads; used by PostgreSQL by default
-- REPEATABLE READ:  no dirty/non-repeatable; MySQL default
-- SERIALIZABLE:     full isolation; slowest

SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Check current level
SELECT @@transaction_isolation;

-- Row-level locking
START TRANSACTION;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;   -- exclusive lock
-- Other transactions block on this row until COMMIT/ROLLBACK
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
COMMIT;

-- Shared lock (allow other reads, block writes)
SELECT * FROM products WHERE id = 5 LOCK IN SHARE MODE;

-- Deadlock example:
-- Tx1: locks row A, waits for row B
-- Tx2: locks row B, waits for row A
-- MySQL detects and rolls back one tx with error 1213
-- Prevention: always lock rows in the same order across transactions

SHOW ENGINE INNODB STATUS;  -- shows recent deadlock details`,

  'Stored Procedures and Views': `-- View: saved SELECT as a virtual table
CREATE OR REPLACE VIEW active_users_summary AS
SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count, SUM(o.total) AS lifetime_value
FROM   users u
LEFT  JOIN orders o ON o.user_id = u.id AND o.status = 'completed'
WHERE  u.deleted_at IS NULL
GROUP BY u.id, u.name, u.email;

-- Query the view like a table
SELECT * FROM active_users_summary WHERE lifetime_value > 500;

-- Stored Procedure: reusable parameterized SQL block
DELIMITER $$

CREATE PROCEDURE transfer_funds(
    IN from_id  INT,
    IN to_id    INT,
    IN amount   DECIMAL(10,2)
)
BEGIN
    DECLARE insufficient CONDITION FOR SQLSTATE '45000';

    START TRANSACTION;

    IF (SELECT balance FROM accounts WHERE id = from_id) < amount THEN
        SIGNAL insufficient SET MESSAGE_TEXT = 'Insufficient funds';
    END IF;

    UPDATE accounts SET balance = balance - amount WHERE id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE id = to_id;

    COMMIT;
END$$

DELIMITER ;

-- Call: CALL transfer_funds(1, 2, 500.00);`,

  'Window Functions and CTEs': `-- Window functions: aggregate over a partition without collapsing rows

-- ROW_NUMBER: sequential row number per partition
SELECT
    id,
    user_id,
    total,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS order_rank
FROM orders;
-- order_rank = 1 means each user's latest order

-- RANK vs DENSE_RANK
-- RANK:       1, 1, 3 (gaps after tie)
-- DENSE_RANK: 1, 1, 2 (no gaps)
SELECT name, score,
    RANK()       OVER (ORDER BY score DESC) AS rank_with_gap,
    DENSE_RANK() OVER (ORDER BY score DESC) AS rank_dense
FROM leaderboard;

-- LAG / LEAD: access adjacent rows
SELECT
    date,
    revenue,
    LAG(revenue)  OVER (ORDER BY date) AS prev_revenue,
    LEAD(revenue) OVER (ORDER BY date) AS next_revenue,
    revenue - LAG(revenue) OVER (ORDER BY date) AS day_change
FROM daily_revenue;

-- CTE (Common Table Expression) — named subquery, readable
WITH high_value_customers AS (
    SELECT user_id, SUM(total) AS total_spent
    FROM   orders
    WHERE  status = 'completed'
    GROUP BY user_id
    HAVING total_spent > 1000
),
ranked AS (
    SELECT *, RANK() OVER (ORDER BY total_spent DESC) AS rank
    FROM high_value_customers
)
SELECT u.name, r.total_spent, r.rank
FROM   ranked r
JOIN   users  u ON u.id = r.user_id
WHERE  r.rank <= 10;`,

  'Pagination and Large Data Handling': `-- BAD: OFFSET gets slower as page number grows
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 10000;
-- MySQL scans 10020 rows to skip 10000

-- GOOD: Cursor/keyset pagination (constant performance)
-- First page
SELECT id, user_id, total, created_at
FROM   orders
ORDER BY created_at DESC, id DESC
LIMIT  20;

-- Next page: pass last row's created_at + id as cursor
SELECT id, user_id, total, created_at
FROM   orders
WHERE  (created_at, id) < ('2024-06-15 10:00:00', 1500)
ORDER BY created_at DESC, id DESC
LIMIT  20;

-- For large exports: use batching instead of loading all rows
SET @batch = 0;
REPEAT
  SELECT * FROM orders WHERE id > @batch LIMIT 1000;
  SET @batch = @batch + 1000;
UNTIL @batch >= (SELECT MAX(id) FROM orders) END REPEAT;`,

  'Replication and High Availability': `-- Replication: copy data from primary (source) to replicas (read replicas)
-- Primary: handles all writes
-- Replicas: handle reads, can promote to primary on failover

-- Types:
-- Async replication: replica may lag (default, fast writes)
-- Semi-sync:        primary waits for at least one replica to acknowledge

-- Check replication status (on replica):
SHOW REPLICA STATUS\\G
-- Seconds_Behind_Source: lag in seconds
-- Replica_IO_Running: YES
-- Replica_SQL_Running: YES

-- GTID-based replication (Global Transaction ID) — easier failover
-- gtid_mode = ON
-- enforce_gtid_consistency = ON

-- Use case: route read queries to replica in app config
-- Laravel: DB::connection('mysql_read')->select(...)

-- Multi-source replication: one replica pulls from multiple primaries

-- MySQL Group Replication / InnoDB Cluster:
-- Built-in HA — automatic primary election on failure
-- Minimum 3 nodes required for quorum

-- Backup before replication: use mysqldump with --source-data=2
-- Test failover in staging — never discover your failover is broken in prod`,

  'Backup and Recovery': `-- Full logical backup (mysqldump)
-- mysqldump -u root -p --single-transaction --routines --triggers \\
--   --all-databases > backup_$(date +%Y%m%d).sql

-- Single table
-- mysqldump -u root -p mydb users > users_backup.sql

-- Restore
-- mysql -u root -p mydb < backup.sql

-- Point-In-Time Recovery (PITR) — needs binary log enabled
-- my.cnf: log_bin = /var/log/mysql/mysql-bin.log

-- List binary logs
SHOW BINARY LOGS;

-- Restore to specific timestamp:
-- 1. Restore last full backup
-- 2. Apply binary logs up to target time:
-- mysqlbinlog --start-datetime="2024-06-01 00:00:00" \\
--             --stop-datetime="2024-06-01 14:30:00" \\
--             /var/log/mysql/mysql-bin.* | mysql -u root -p

-- Physical backup (faster, bigger files)
-- Use Percona XtraBackup for hot backups (no downtime)
-- xtrabackup --backup --target-dir=/backup/

-- Best practices:
-- Test restores regularly (backup is worthless if restore fails)
-- Store backups off-server (S3, GCS)
-- Encrypt backups at rest
-- Keep 7 daily + 4 weekly + 12 monthly`,

  'Security and Access Control': `-- Principle of Least Privilege: grant only what is needed

-- Create application user (never use root in your app)
CREATE USER 'app_user'@'%' IDENTIFIED BY 'strong-password';

-- Grant only necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON myapp.* TO 'app_user'@'%';
-- No GRANT OPTION, no DROP, no CREATE

-- Read-only user for analytics/reporting
CREATE USER 'analytics'@'%' IDENTIFIED BY 'another-password';
GRANT SELECT ON myapp.* TO 'analytics'@'%';

-- View current grants
SHOW GRANTS FOR 'app_user'@'%';

-- Revoke
REVOKE DELETE ON myapp.* FROM 'app_user'@'%';

-- Encryption at rest: enable InnoDB tablespace encryption
-- innodb_encrypt_tables = ON

-- TLS in transit: require_secure_transport = ON
-- ALTER USER 'app_user'@'%' REQUIRE SSL;

-- Audit logging (MySQL Enterprise or MariaDB Audit Plugin)
-- Logs who did what and when

-- Harden my.cnf:
-- local-infile = 0          (disable file import by users)
-- skip-symbolic-links = 1
-- bind-address = 127.0.0.1  (only local connections)`,

  'MySQL in Application Architecture': `-- Laravel: config/database.php — read/write splitting
// 'mysql' => [
//   'read'  => ['host' => ['replica1.db', 'replica2.db']],
//   'write' => ['host' => 'primary.db'],
//   'sticky' => true,   // after a write, reads go to primary for this request
// ]

-- Connection pooling (important for high-traffic apps)
-- Don't open a new connection per request — use a pool (PgBouncer, ProxySQL)
-- PHP-FPM: PDO persistent connections  ->  PDO::ATTR_PERSISTENT => true

-- Soft deletes: never hard DELETE in most business apps
-- ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;
-- Always: SELECT * FROM users WHERE deleted_at IS NULL;

-- Timestamps pattern
-- created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

-- UUID vs Auto-increment IDs
-- Auto-increment: fast inserts, sequential, predictable
-- UUID: globally unique, distributed-safe, random → index fragmentation
-- ULID: sorted UUID alternative — ordered + globally unique

-- Database migrations strategy
-- Always additive first: add column, deploy code, then drop old column
-- Never remove a column in the same deploy as the code that stops using it`,

  'Common Performance Bottlenecks': `-- 1. Missing indexes — the most common issue
EXPLAIN SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';
-- type: ALL → add index: CREATE INDEX idx ON orders(user_id, status);

-- 2. SELECT * — fetches unneeded columns, breaks covering index
SELECT id, name FROM users WHERE role = 'admin';  -- not SELECT *

-- 3. N+1 queries — fetch related data in application loop
-- Fix: JOIN in SQL, or use ORM eager loading (with())

-- 4. Unindexed JOINs
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;
-- Ensure orders.user_id is indexed

-- 5. LIKE with leading wildcard — cannot use index
SELECT * FROM products WHERE name LIKE '%phone%';  -- full scan
-- Fix: use FULLTEXT index for search

-- 6. Functions on indexed columns — breaks index usage
SELECT * FROM orders WHERE YEAR(created_at) = 2024;   -- bad
SELECT * FROM orders WHERE created_at >= '2024-01-01'  -- good
  AND created_at < '2025-01-01';

-- 7. Large OFFSET pagination (covered in Pagination module)
-- 8. Locking too many rows (use narrowest WHERE possible)
-- 9. Missing composite index (column order matters — most selective first)
-- 10. Slow query log: slow_query_log=1, long_query_time=1`,

  'MySQL Interview Case Studies': `-- ===== Common Interview Questions =====

-- Q: What is the difference between DELETE, TRUNCATE, DROP?
-- DELETE: DML — removes rows, logs each, can rollback, fires triggers
-- TRUNCATE: DDL — removes all rows fast, minimal logging, cannot rollback
-- DROP: DDL — removes the entire table and its data

-- Q: Explain clustered vs non-clustered index in InnoDB
-- Clustered: the PRIMARY KEY index IS the table data (rows stored in PK order)
-- Non-clustered: secondary indexes — leaf nodes store PK values, not row data
--   → Two lookups: secondary index → PK → row (unless covering index)

-- Q: What is a covering index?
-- An index that contains ALL columns needed by the query
-- No need to visit the actual table row (faster)
CREATE INDEX idx_cover ON orders(user_id, status, total);
SELECT total FROM orders WHERE user_id = 5 AND status = 'pending';
-- Uses index only — "Using index" in EXPLAIN Extra

-- Q: How to find the second highest salary?
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);
-- Or with window functions:
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS r FROM employees
) ranked WHERE r = 2 LIMIT 1;

-- Q: What causes a full table scan?
-- No index on WHERE column, function on indexed column, low cardinality,
-- type mismatch (string vs int comparison)`,
};

const MONGODB_EXAMPLES: Record<string, string> = {
  'What is MongoDB': `// MongoDB: NoSQL document database.
// Data stored as BSON (Binary JSON) documents inside collections.

// Connect (mongosh)
// mongosh "mongodb://localhost:27017/mydb"

// Insert a document
db.users.insertOne({
  name:  "Alice",
  email: "alice@example.com",
  role:  "admin",
  tags:  ["javascript", "nodejs"],
  createdAt: new Date(),
});

// Find all documents
db.users.find().pretty();

// Key differences from SQL:
// No fixed schema — documents in same collection can have different fields
// Scales horizontally via sharding
// Best for hierarchical or varied data`,

  'CRUD Operations in MongoDB': `// CREATE
db.products.insertMany([
  { name: "Laptop",  price: 999,  stock: 50, category: "electronics" },
  { name: "Mouse",   price: 25,   stock: 200, category: "electronics" },
  { name: "Desk",    price: 350,  stock: 15,  category: "furniture"   },
]);

// READ with filter + projection
db.products.find(
  { category: "electronics", price: { $lt: 100 } },
  { name: 1, price: 1, _id: 0 }   // project: include name+price, exclude _id
);

// UPDATE — $set to modify specific fields (not replace whole doc)
db.products.updateOne(
  { name: "Mouse" },
  { $set: { price: 29.99 }, $inc: { stock: -1 } }
);

// DELETE
db.products.deleteOne({ name: "Desk" });

// Soft delete pattern
db.products.updateOne(
  { name: "Desk" },
  { $set: { deletedAt: new Date() } }
);`,

  'Aggregation Pipeline Basics': `// Aggregation: transform and analyze data through a pipeline of stages

db.orders.aggregate([
  // Stage 1: filter
  { $match: { status: "completed", createdAt: { $gte: new Date("2024-01-01") } } },

  // Stage 2: group and compute
  {
    $group: {
      _id:        "$userId",
      orderCount: { $sum: 1 },
      totalSpent: { $sum: "$total" },
      avgOrder:   { $avg: "$total" },
    },
  },

  // Stage 3: sort by total spent descending
  { $sort: { totalSpent: -1 } },

  // Stage 4: top 10 customers only
  { $limit: 10 },

  // Stage 5: reshape output
  {
    $project: {
      _id: 0,
      userId:     "$_id",
      orderCount: 1,
      totalSpent: { $round: ["$totalSpent", 2] },
    },
  },
]);`,

  'Indexes and Query Optimization': `// Check if index is used with explain
db.users.find({ email: "alice@example.com" }).explain("executionStats");
// Look for: winningPlan.stage = "IXSCAN" (good) vs "COLLSCAN" (bad)

// Create single-field index
db.users.createIndex({ email: 1 }, { unique: true });

// Compound index (order matters — matches left-prefix queries)
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });
// Matches: { userId } or { userId, status } or { userId, status, createdAt }

// Text index for search
db.articles.createIndex({ title: "text", body: "text" });
db.articles.find({ $text: { $search: "nodejs performance" } });

// TTL index — auto-delete documents after expiry
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// View existing indexes
db.orders.getIndexes();`,

  'Embedding vs Referencing': `// Embedding: store related data inside the document
db.users.insertOne({
  _id:   ObjectId(),
  name:  "Alice",
  email: "alice@example.com",
  // Embedded — always read together, belongs to this user only
  address: { street: "123 Main St", city: "Mumbai", zip: "400001" },
  // Embed small arrays (bounded — won't grow to thousands)
  skills: ["PHP", "Laravel", "MySQL"],
});

// Referencing: store the _id of the related document
db.posts.insertOne({
  _id:       ObjectId(),
  title:     "Node.js Tips",
  authorId:  ObjectId("64a1f..."),  // reference to users._id
  tags:      ["nodejs"],
  createdAt: new Date(),
});

// Use $lookup (like a JOIN) when you need both documents
db.posts.aggregate([
  { $lookup: {
    from:         "users",
    localField:   "authorId",
    foreignField: "_id",
    as:           "author",
  }},
  { $unwind: "$author" },
  { $project: { title: 1, "author.name": 1 } },
]);

// Rule of thumb:
// Embed  → data read/written together, belongs to one parent, bounded size
// Reference → data shared across docs, unbounded growth, queried independently`,

  'Schema Design Strategies': `// Bucket Pattern — group time-series events into buckets
// Instead of 1 doc per measurement (millions of docs):
db.metrics.insertOne({
  sensorId:    "sensor-42",
  date:        new Date("2024-06-01"),
  count:       24,
  measurements: [
    { hour: 0,  value: 21.5 },
    { hour: 1,  value: 21.8 },
    // ... up to 24 entries
  ],
});
// Query: find all measurements for a day — one document fetch

// Polymorphic Pattern — different sub-types in one collection
db.content.insertMany([
  { _id: ObjectId(), type: "article", title: "...", body: "...", wordCount: 500 },
  { _id: ObjectId(), type: "video",   title: "...", url: "...", duration: 300 },
]);
db.content.createIndex({ type: 1 });  // query by type efficiently

// Outlier Pattern — handle rare large documents differently
db.orders.insertOne({
  _id:         ObjectId(),
  userId:      ObjectId("..."),
  items:       [/* most orders: < 20 items */],
  hasOverflow: false,
});
// For rare orders with 1000+ items, set hasOverflow: true
// and store extra items in an overflow collection

// Anti-patterns to avoid:
// Unbounded arrays (comments array on a post — use separate collection)
// Massive documents (>16MB BSON limit)
// Deeply nested data you need to query on`,

  'Advanced Aggregation Patterns': `// $lookup: LEFT JOIN between collections
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $lookup: {
      from:         "users",
      localField:   "userId",
      foreignField: "_id",
      as:           "user",
    },
  },
  { $unwind: "$user" },            // flatten the array lookup produces
  {
    $project: {
      orderId:   "$_id",
      userName:  "$user.name",
      userEmail: "$user.email",
      total:     1,
    },
  },
]);

// $unwind: flatten arrays — one doc per array element
db.orders.aggregate([
  { $unwind: "$items" },           // one doc per order line item
  { $group: { _id: "$items.productId", totalSold: { $sum: "$items.qty" } } },
  { $sort: { totalSold: -1 } },
  { $limit: 10 },
]);

// $facet: run multiple pipelines in one pass (multi-faceted search)
db.products.aggregate([
  { $match: { category: "electronics" } },
  {
    $facet: {
      byBrand: [{ $group: { _id: "$brand", count: { $sum: 1 } } }],
      priceRanges: [
        { $bucket: { groupBy: "$price", boundaries: [0, 100, 500, 1000, 5000],
                     default: "5000+" } },
      ],
      total: [{ $count: "count" }],
    },
  },
]);`,

  'Data Validation and Schema Governance': `// MongoDB 3.6+ supports JSON Schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role"],
      properties: {
        name:  { bsonType: "string", minLength: 1, maxLength: 100 },
        email: { bsonType: "string", pattern: "^.+@.+\\\\..+$" },
        role:  { bsonType: "string", enum: ["admin", "editor", "viewer"] },
        age:   { bsonType: "int", minimum: 0, maximum: 150 },
      },
      additionalProperties: false,  // reject unknown fields
    },
  },
  validationAction: "error",   // reject invalid inserts/updates
  // validationAction: "warn"  — log but allow (useful during migration)
});

// Add validation to existing collection
db.runCommand({
  collMod: "orders",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "total", "status"],
      properties: {
        status: { enum: ["pending", "processing", "completed", "cancelled"] },
        total:  { bsonType: "double", minimum: 0 },
      },
    },
  },
});`,

  'Transactions and Consistency': `// Multi-document transactions (MongoDB 4.0+ replica sets, 4.2+ sharded)
// Use when multiple writes must be atomic

const session = db.getMongo().startSession();
session.startTransaction({
  readConcern:  { level: "snapshot" },
  writeConcern: { w: "majority" },
});

try {
  const ordersCol  = session.getDatabase("shop").orders;
  const productsCol = session.getDatabase("shop").products;

  // Both writes succeed or both are rolled back
  ordersCol.insertOne({
    userId: ObjectId("..."),
    items:  [{ productId: ObjectId("..."), qty: 2 }],
    total:  199.99,
    status: "pending",
  }, { session });

  productsCol.updateOne(
    { _id: ObjectId("..."), stock: { $gte: 2 } },
    { $inc: { stock: -2 } },
    { session }
  );

  session.commitTransaction();
} catch (err) {
  session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}

// Caution: transactions have performance cost
// Design schema to minimize cross-collection writes
// Use atomic update operators ($set, $inc, $push) for single-doc operations`,

  'Replica Sets and High Availability': `// Replica set: group of MongoDB instances with same data
// Primary: accepts all writes
// Secondaries: replicate from primary (async), can serve reads
// Minimum 3 nodes recommended (for election majority)

// Start a 3-node replica set (mongod config):
// replication:
//   replSetName: "rs0"

// Initialize:
// rs.initiate({
//   _id: "rs0",
//   members: [
//     { _id: 0, host: "mongo1:27017", priority: 2 },  // preferred primary
//     { _id: 1, host: "mongo2:27017" },
//     { _id: 2, host: "mongo3:27017", arbiterOnly: true },  // votes only
//   ]
// })

// Connection string targets all members — driver handles failover
// mongodb://mongo1:27017,mongo2:27017,mongo3:27017/?replicaSet=rs0

// Read preferences
// primary         — always read from primary (default, consistent)
// primaryPreferred — primary if available, else secondary
// secondary       — always secondary (may be slightly stale)
// nearest         — lowest latency member

// Check replica set status
rs.status();
rs.isMaster();   // which node is primary right now

// Stepdown primary manually (for maintenance):
// rs.stepDown()`,

  'Sharding and Horizontal Scaling': `// Sharding: distributes data across multiple shards (servers)
// Use when a single replica set cannot handle your data volume or throughput

// Components:
// mongos: query router (client connects here)
// config servers: store cluster metadata (3-node replica set)
// shards: each shard is itself a replica set

// Enable sharding on a database and collection
sh.enableSharding("mydb");

// Choose a shard key — most important decision
// Good shard key: high cardinality, even distribution, query-friendly
sh.shardCollection("mydb.orders", { userId: "hashed" });
// Hashed sharding: even distribution, no hotspots, no range queries

sh.shardCollection("mydb.events", { tenantId: 1, createdAt: 1 });
// Compound: range queries on createdAt per tenant, risk: hotspot on new dates

// Check sharding status
sh.status();
db.orders.getShardDistribution();

// Anti-patterns:
// Low-cardinality key (e.g. status: "active"/"inactive") → only 2 shards
// Monotonically increasing key (auto-increment) → all writes to one shard
// Key not in query → scatter-gather (all shards queried)

// Rule: only shard when you need to — adds operational complexity`,

  'Change Streams and Real-time Data': `// Change streams: listen to real-time data changes (MongoDB 3.6+)
// Requires replica set or sharded cluster

// Watch a collection for all changes
const changeStream = db.orders.watch();

changeStream.forEach(change => {
  console.log("Operation:", change.operationType);  // insert, update, delete
  console.log("Document:",  change.fullDocument);
  console.log("Key:",       change.documentKey);
});

// Filter: only watch inserts and updates
const stream = db.orders.watch([
  { $match: {
    operationType: { $in: ["insert", "update"] },
    "fullDocument.status": "completed",
  }},
]);

// Resume after restart (store resumeToken)
let resumeToken = null;

db.orders.watch([], { resumeAfter: resumeToken }).forEach(change => {
  resumeToken = change._id;   // save to DB — resume here on restart
  processChange(change);
});

// Use cases:
// Real-time notifications (new order → push notification)
// Cache invalidation (product updated → clear Redis cache)
// Audit logging (document changed → write to audit collection)
// Sync to search index (Elasticsearch, Algolia)`,

  'MongoDB Security': `// 1. Enable authentication (disabled by default in dev)
// mongod.conf:
// security:
//   authorization: enabled

// 2. Create admin user first
use admin
db.createUser({
  user: "admin",
  pwd:  passwordPrompt(),
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});

// 3. Create application user with minimum permissions
use myapp
db.createUser({
  user: "app_user",
  pwd:  passwordPrompt(),
  roles: [{ role: "readWrite", db: "myapp" }]
});

// 4. Field-level redaction in aggregation
db.users.aggregate([
  { $project: {
    name:     1,
    email:    1,
    password: 0,     // never return password hash to API
    ssn:      0,
  }},
]);

// 5. TLS in transit
// mongod.conf:
// net:
//   tls:
//     mode: requireTLS
//     certificateKeyFile: /etc/ssl/mongo.pem
//     CAFile: /etc/ssl/ca.pem

// 6. Network isolation — bind to app server IPs only
// net:
//   bindIp: 127.0.0.1,10.0.1.5

// 7. Audit logging (MongoDB Enterprise)
// Logs authentication, authorization, CRUD operations`,

  'Performance Tuning': `// 1. Always check explain output before deploying queries
db.orders.find({ userId: ObjectId("..."), status: "pending" })
         .explain("executionStats");
// Look for: IXSCAN (good) vs COLLSCAN (bad)
// Check: totalDocsExamined vs nReturned — ratio should be close to 1

// 2. Create compound index matching query + sort
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });
// Supports: find({userId, status}), find({userId}), sort by createdAt

// 3. Projection — only fetch needed fields
db.products.find({ category: "electronics" }, { name: 1, price: 1, _id: 0 });

// 4. Aggregation: put $match and $limit early to reduce pipeline work
db.orders.aggregate([
  { $match: { status: "completed" } },   // filter first
  { $sort:  { createdAt: -1 } },
  { $limit: 100 },                        // limit early
  { $lookup: { from: "users", ... } },   // then join
]);

// 5. Use covered queries — index contains all projected fields
db.users.createIndex({ email: 1, name: 1, role: 1 });
db.users.find({ email: "alice@example.com" }, { name: 1, role: 1, _id: 0 });
// "indexOnly": true in explain — never touches the collection

// 6. currentOp: find slow running operations
db.currentOp({ secs_running: { $gt: 5 } });
// db.killOp(opid)  — terminate if needed`,

  'MongoDB in Microservices': `// Database-per-service pattern: each service owns its data
// Service A: MongoDB (flexible documents for content)
// Service B: PostgreSQL (strict schema for billing)
// Service C: Redis (session/cache)

// Event-driven sync between services using change streams
// Order service writes order → emits event via change stream
// Inventory service listens → decrements stock
// Notification service listens → sends confirmation email

// Avoid distributed transactions across services
// Use Saga pattern instead:
// 1. Order service creates order (status: "pending")
// 2. Inventory service reserves stock → emits "reserved" event
// 3. Payment service charges → emits "paid" event
// 4. Order service marks "completed"
// If any step fails → compensating transactions rollback previous steps

// Shared data anti-pattern — each service has its own copy
// Sync via events, accept eventual consistency
db.orders.createIndex({ externalRef: 1 }, { unique: true });
// externalRef: ID from another service — for idempotent upserts
db.orders.updateOne(
  { externalRef: "payment-123" },
  { $set: { status: "paid", paidAt: new Date() } },
  { upsert: true }
);`,

  'Backup and Disaster Recovery': `// Logical backup: mongodump
// mongodump --uri="mongodb://user:pass@host:27017/mydb" \\
//           --gzip \\
//           --archive=backup_$(date +%Y%m%d).gz

// Restore
// mongorestore --uri="mongodb://..." \\
//              --gzip \\
//              --archive=backup_20240601.gz \\
//              --drop   // drop existing collections first

// Point-in-time restore from oplog
// mongodump --oplog  // includes oplog in backup
// mongorestore --oplogReplay --oplogLimit="1717200000:1"  // replay to timestamp

// Atlas: continuous backup with point-in-time restore (cloud)
// On-prem: use mongodump + cron or Percona Backup for MongoDB (PBM)

// Backup strategy:
// Hourly: oplog tailing (near-zero RPO)
// Daily:  full mongodump or PBM snapshot
// Weekly: full backup stored off-site (S3 Glacier)

// Test your restore:
// Restore to a test server monthly — never assume backups work
// Measure RTO (time to restore) — know this before an incident

// RPO (Recovery Point Objective): how much data loss is acceptable?
// RTO (Recovery Time Objective): how fast must service be restored?`,

  'MongoDB vs MySQL': `// Choose based on data shape, query patterns, and consistency needs

// MongoDB strengths:
// Flexible schema — schema evolves without migrations
// Hierarchical data — embed related data, avoid JOINs
// Horizontal scaling — sharding built-in
// Developer speed — JSON-native, no ORM mismatch
// Best for: content management, catalogs, user profiles, IoT, event logs

// MySQL strengths:
// ACID transactions across multiple tables — rock solid
// Complex JOINs and ad-hoc queries
// Strict schema — enforces data integrity
// Mature tooling, reporting, BI tools
// Best for: billing, financials, inventory, anything with strict consistency

// When to use both together:
// MySQL: orders, payments (transactional data)
// MongoDB: product catalog, user activity, content (flexible data)

// Common mistake: choosing MongoDB to "avoid schema design"
// MongoDB requires MORE thought on schema, not less
// The difference: you pay for schema upfront (MySQL) vs at query time (MongoDB)

// Interview answer template:
// "I would use MongoDB for [flexible/hierarchical/high-volume] data where
//  the schema evolves frequently and horizontal scaling is needed.
//  I would use MySQL when strong relational integrity, complex JOINs,
//  or multi-table ACID transactions are required."`,

  'Common Production Mistakes': `// 1. No indexes on query fields — COLLSCAN on large collections
//    Fix: analyze slow queries with db.currentOp(), add indexes

// 2. Unbounded arrays in documents
//    Bad: { post: "...", comments: [ {c1}, {c2}, ... {c10000} ] }
//    Fix: separate comments collection, reference post._id

// 3. Using _id as a UUID string instead of ObjectId
//    ObjectId is indexed, sorted, contains timestamp — use it

// 4. Schema version 0: no schema validation in prod
//    Fix: db.runCommand({ collMod: "users", validator: {...} })

// 5. Not setting maxTimeMS on queries — runaway queries
db.orders.find({ status: "pending" }).maxTimeMS(5000);

// 6. Missing write concern for critical writes
db.payments.insertOne({ amount: 500 }, { writeConcern: { w: "majority" } });

// 7. Transactions everywhere — massive performance cost
//    Fix: design schema to avoid cross-document transactions

// 8. Not monitoring oplog window — replication lag fills oplog
//    Fix: set oplogSizeMB = 10240 (10GB) for busy systems

// 9. Hardcoded connection string — one host, no replica set members
//    Fix: include all replica set members in connection string

// 10. No TTL index on session/log collections — disk fills up
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });`,

  'MongoDB Interview Scenarios': `// ===== Most Common MongoDB Interview Questions =====

// Q: What is the aggregation pipeline?
// Series of stages that transform documents. Each stage output → next stage input.
// Common stages: $match, $group, $sort, $limit, $lookup, $unwind, $project, $facet

// Q: When would you embed vs reference?
// Embed: data always accessed together, 1-to-1 or 1-to-few, bounded arrays
// Reference: data shared across docs, 1-to-many (unbounded), queried independently

// Q: How do you avoid N+1 in MongoDB?
// Use $lookup in aggregation (one query with join)
// Batch-load references using $in: db.users.find({ _id: { $in: authorIds } })

// Q: What is the difference between $match before vs after $group?
// $match BEFORE $group: filters docs first (uses index, faster)
// $match AFTER $group: filters on computed aggregation fields (no index)

// Q: How would you model a many-to-many relationship?
// Option 1: embed arrays of IDs on both sides (small sets)
// Option 2: junction collection (for large sets or pivot data)
db.userRoles.insertOne({ userId: ObjectId("..."), roleId: ObjectId("..."), grantedAt: new Date() });

// Q: How does MongoDB handle consistency?
// Single-document writes: always atomic
// Multi-document: use transactions (4.0+)
// Replica reads: may be stale — use readConcern: "majority" for strong consistency

// Q: What is an upsert?
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { name: "Alice", updatedAt: new Date() } },
  { upsert: true }   // insert if not found, update if found
);`,
};

const DEVOPS_EXAMPLES: Record<string, string> = {
  'What is DevOps': `# DevOps bridges Development and Operations.
# Goal: faster, more reliable software delivery through automation.

# Core loop: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor

# Key practices:
# - CI/CD: automate build, test, deploy
# - IaC:   define infrastructure as code
# - Monitoring: observe everything in production

# Example: simple Makefile to standardize team workflows
.PHONY: install test build deploy

install:
  npm ci

test:
  npm test

build:
  docker build -t myapp:$(git rev-parse --short HEAD) .

deploy:
  kubectl set image deployment/myapp myapp=myapp:$(git rev-parse --short HEAD)`,

  'Continuous Integration': `# .github/workflows/ci.yml
# CI: run tests on every push/PR so broken code is caught early

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4`,

  'Continuous Delivery and Deployment': `# .github/workflows/deploy.yml
# CD: automatically deploy to staging; manually approve for production

name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          docker tag myapp:\${{ github.sha }} registry.example.com/myapp:\${{ github.sha }}
          docker push registry.example.com/myapp:\${{ github.sha }}

      - name: Deploy to staging
        run: |
          kubectl set image deployment/myapp \
            myapp=registry.example.com/myapp:\${{ github.sha }} \
            --namespace=staging

  deploy-production:
    needs: deploy-staging
    environment:
      name: production   # requires manual approval in GitHub Environments
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapp \
            myapp=registry.example.com/myapp:\${{ github.sha }} \
            --namespace=production`,

  'Containers and Docker': `# Dockerfile — multi-stage build for a Node.js app

# Stage 1: install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: production image (small — no dev deps, no source)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/dist         ./dist

EXPOSE 3000
USER node   # don't run as root
CMD ["node", "dist/server.js"]

# Build and run:
# docker build -t myapp:latest .
# docker run -p 3000:3000 --env-file .env myapp:latest`,

  'Container Orchestration': `# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: registry.example.com/myapp:v1.2.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url`,

  'Infrastructure as Code': `# terraform/main.tf — provision AWS infra as code

terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "mycompany-tfstate"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" { region = "us-east-1" }

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "production-vpc" }
}

# RDS instance
resource "aws_db_instance" "app" {
  identifier        = "app-db"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = "db.t3.medium"
  allocated_storage = 20
  db_name           = "appdb"
  username          = "admin"
  password          = var.db_password   # never hardcode
  skip_final_snapshot = false
  deletion_protection = true
}

# Commands:
# terraform init
# terraform plan
# terraform apply`,

  'Monitoring and Alerting': `# prometheus/alert-rules.yml — alerting rules for Prometheus

groups:
  - name: application
    rules:
      # Alert if error rate > 5% for 5 minutes
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value | humanizePercentage }}"

      # Alert if p99 latency > 2s
      - alert: SlowRequests
        expr: |
          histogram_quantile(0.99,
            rate(http_request_duration_seconds_bucket[5m])
          ) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Slow p99 latency on {{ $labels.service }}"`,

  'Secrets and Configuration Management': `# NEVER store secrets in code or git

# 1. Use environment variables
# .env.example (commit this)
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your-secret-here

# .env.local (never commit — add to .gitignore)
DATABASE_URL=postgresql://prod_user:realpass@db.prod:5432/app
JWT_SECRET=super-secret-value

# 2. Kubernetes Secrets
kubectl create secret generic app-secrets \
  --from-literal=DATABASE_URL="postgresql://..." \
  --from-literal=JWT_SECRET="secret"

# 3. Reference in deployment
# env:
#   - name: DATABASE_URL
#     valueFrom:
#       secretKeyRef:
#         name: app-secrets
#         key: DATABASE_URL

# 4. AWS Secrets Manager (production)
# aws secretsmanager create-secret \
#   --name prod/app/db-url \
#   --secret-string "postgresql://..."`,
};

const GITHUB_EXAMPLES: Record<string, string> = {
  'What is GitHub': `# GitHub is a cloud platform for hosting Git repositories
# and collaborating on code.

# Core Git concepts:
# repository — project folder with full history
# commit     — snapshot of changes
# branch     — independent line of development
# remote     — repository hosted on GitHub

# Clone a repo
git clone https://github.com/username/repo.git
cd repo

# Check status and log
git status
git log --oneline --graph

# Configure identity (one-time setup)
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"`,

  'Repositories and Project Setup': `# Create a new repo and push first commit

# Initialize locally
mkdir my-project && cd my-project
git init
git branch -M main

# Add files
echo "# My Project" > README.md
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# First commit
git add README.md .gitignore
git commit -m "feat: initial project setup"

# Connect to GitHub remote
git remote add origin https://github.com/username/my-project.git
git push -u origin main

# Verify remote
git remote -v`,

  'Branching Strategies': `# Git Flow: structured branching for larger teams

# Branch types:
# main       — production-ready code only
# develop    — integration branch
# feature/*  — new features
# release/*  — release prep
# hotfix/*   — urgent production fixes

# Start a feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Work and commit
git add src/auth/
git commit -m "feat: add JWT login endpoint"
git commit -m "test: add auth unit tests"

# Push feature branch
git push -u origin feature/user-authentication

# Merge back via Pull Request (never push directly to main)
# After PR approval:
git checkout develop
git merge --no-ff feature/user-authentication
git push origin develop`,

  'Pull Requests and Code Reviews': `# Pull Request best practices

# 1. Keep PRs small and focused (< 400 lines changed)
# 2. Write a clear description with context
# 3. Link to the issue it resolves

# PR description template (.github/pull_request_template.md):
# ## What
# Brief description of the change.
#
# ## Why
# Why is this needed? Link to issue: Closes #123
#
# ## How
# Approach taken, trade-offs considered.
#
# ## Test plan
# - [ ] Unit tests added
# - [ ] Tested in staging
# - [ ] No regressions

# Create PR using GitHub CLI
gh pr create \
  --title "feat: add user authentication" \
  --body "Closes #42 — adds JWT-based login and refresh token flow." \
  --reviewer "teammate1,teammate2" \
  --label "feature"

# Review a PR
gh pr review 123 --approve
gh pr review 123 --request-changes --body "Please add error handling for expired tokens."`,

  'GitHub Actions Basics': `# .github/workflows/hello.yml
# GitHub Actions: automate tasks on repo events

name: Hello World

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:   # manual trigger

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Print commit info
        run: |
          echo "Triggered by: \${{ github.event_name }}"
          echo "Branch: \${{ github.ref_name }}"
          echo "Commit: \${{ github.sha }}"
          echo "Author: \${{ github.actor }}"

      - name: Run a script
        run: |
          echo "Hello from GitHub Actions!"
          node --version
          npm --version`,

  'CI/CD with GitHub Actions': `# .github/workflows/ci-cd.yml

name: CI / CD

on:
  push:
    branches: [main]
  pull_request:

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE: ghcr.io/\${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.IMAGE }}:\${{ github.sha }},\${{ env.IMAGE }}:latest`,

  'Branch Protection Rules': `# Branch protection ensures quality gates before merging to main.
# Configure in: Settings → Branches → Add rule

# Recommended rules for main branch:
# ✅ Require pull request before merging
#    - Required approvals: 1 (small team) or 2 (large team)
#    - Dismiss stale reviews when new commits pushed
# ✅ Require status checks to pass
#    - Select your CI job names (e.g. "test", "lint")
#    - Require branches to be up to date
# ✅ Require conversation resolution before merging
# ✅ Do not allow bypassing the above settings
# ✅ Restrict who can push to matching branches

# Via GitHub CLI:
gh api repos/OWNER/REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}'`,

  'Issues and Project Boards': `# GitHub Issues: track bugs, features, and tasks

# Create issue with GitHub CLI
gh issue create \
  --title "Bug: login fails on Safari" \
  --body "Steps to reproduce: 1. Open Safari 2. Click Login 3. Error appears" \
  --label "bug,high-priority" \
  --assignee "teammate1"

# List open issues
gh issue list --label "bug" --assignee "@me"

# Close issue from commit message (auto-closes on merge to main)
# git commit -m "fix: resolve token expiry crash
#
# Closes #42"

# Issue templates (.github/ISSUE_TEMPLATE/bug_report.md):
# name: Bug Report
# about: Report a bug
# ---
# **Describe the bug**
# **To Reproduce**
# **Expected behavior**
# **Environment**`,

  'Release Management and Tagging': `# Semantic versioning: MAJOR.MINOR.PATCH
# 1.0.0 → breaking change → 2.0.0
# 1.0.0 → new feature    → 1.1.0
# 1.0.0 → bug fix        → 1.0.1

# Tag a release
git tag -a v1.2.0 -m "Release v1.2.0: add OAuth login, fix session bug"
git push origin v1.2.0

# Create GitHub Release with CLI
gh release create v1.2.0 \
  --title "v1.2.0 — OAuth Login" \
  --notes "## What's New
- Add Google OAuth login (#45)
- Fix session expiry crash (#52)

## Breaking Changes
- Removed deprecated /api/v1/auth endpoint" \
  --prerelease=false

# Automated release with GitHub Actions:
# on:
#   push:
#     tags: ['v*']`,

  'Git Hooks and Automation': `# Git hooks run scripts at key points in the workflow.
# Stored in .git/hooks/ — not committed by default.
# Use Husky to share hooks across the team.

# Install Husky
# npm install --save-dev husky
# npx husky init

# .husky/pre-commit — runs before every commit
#!/bin/sh
npm run lint-staged   # lint only staged files

# .husky/commit-msg — enforce commit message format
#!/bin/sh
npx commitlint --edit "$1"

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always',
      ['feat','fix','docs','style','refactor','test','chore','perf','ci']
    ],
  },
};

# lint-staged.config.js
module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,md}': ['prettier --write'],
};`,

  'Open Source Contribution Workflow': `# Standard open source contribution flow

# 1. Fork the repo on GitHub (creates your own copy)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/upstream-repo.git
cd upstream-repo

# 3. Add upstream remote to stay in sync
git remote add upstream https://github.com/ORIGINAL_OWNER/upstream-repo.git
git remote -v

# 4. Create feature branch from latest upstream
git fetch upstream
git checkout -b fix/typo-in-readme upstream/main

# 5. Make changes, commit using conventional commits
git add README.md
git commit -m "docs: fix typo in installation section"

# 6. Sync with upstream before pushing (avoid merge conflicts)
git fetch upstream
git rebase upstream/main

# 7. Push to your fork
git push origin fix/typo-in-readme

# 8. Open PR from your fork to upstream's main`,
};

const AGILE_EXAMPLES: Record<string, string> = {
  'What is Agile Methodology': `# Agile Manifesto — 4 core values:
#
# Individuals and interactions   OVER  processes and tools
# Working software               OVER  comprehensive documentation
# Customer collaboration         OVER  contract negotiation
# Responding to change           OVER  following a plan
#
# Agile ≠ no planning — it means planning in smaller, adaptive cycles.
#
# Common frameworks:
# Scrum   — sprints, ceremonies, defined roles
# Kanban  — continuous flow, WIP limits, visualize work
# SAFe    — scaled agile for large enterprises
# XP      — engineering practices (TDD, pair programming, CI)
#
# Key concept: deliver value early and often,
# then inspect and adapt based on real feedback.`,

  'Scrum Framework Basics': `# Scrum: iterative framework with fixed-length Sprints (1–4 weeks)

# Three roles:
# Product Owner  — owns the backlog, prioritizes by business value
# Scrum Master   — facilitates, removes impediments, coaches the team
# Dev Team       — self-organizing, cross-functional, delivers the increment

# Five events:
# Sprint           — 1–4 week timebox to produce a Done increment
# Sprint Planning  — what + how for the upcoming Sprint
# Daily Scrum      — 15-min sync (3 questions: did, will do, blockers)
# Sprint Review    — demo to stakeholders, inspect the increment
# Retrospective    — inspect and improve the team's process

# Three artifacts:
# Product Backlog  — ordered list of everything needed
# Sprint Backlog   — subset selected for the current Sprint
# Increment        — sum of all Done PBIs — must be potentially releasable

# Definition of Done example:
# ✅ Code reviewed and approved
# ✅ Unit tests written and passing
# ✅ Feature tested in staging
# ✅ Documentation updated`,

  'Scrum Roles and Responsibilities': `# Product Owner responsibilities:
# - Own and maintain the Product Backlog
# - Write clear User Stories with acceptance criteria
# - Prioritize by business value, risk, and dependencies
# - Be available to the team to clarify requirements
# - Accept or reject completed work at Sprint Review

# Scrum Master responsibilities:
# - Facilitate all Scrum events
# - Remove impediments the team cannot resolve themselves
# - Shield the team from external interruptions
# - Coach PO on backlog refinement
# - Coach team on self-organization and technical practices

# Development Team responsibilities:
# - Self-organize to complete Sprint Goal
# - Estimate and own the Sprint Backlog
# - Maintain code quality and technical standards
# - Cross-train to reduce single points of failure
# - Raise blockers in Daily Scrum — don't wait

# Anti-patterns to avoid:
# ❌ PO micromanaging how the team builds things
# ❌ SM acting as a project manager assigning tasks
# ❌ Team members working in silos on their own tasks only`,

  'User Stories and Acceptance Criteria': `# User Story format:
# As a [persona], I want [action], so that [value].

# Example stories:

# Story: User Login
# As a registered user,
# I want to log in with my email and password,
# so that I can access my personalized dashboard.
#
# Acceptance Criteria:
# ✅ Given valid credentials, I am redirected to /dashboard
# ✅ Given invalid credentials, I see "Invalid email or password"
# ✅ Given 5 failed attempts, my account is locked for 15 minutes
# ✅ My session expires after 7 days of inactivity

# Story: Password Reset
# As a user who forgot my password,
# I want to receive a reset email,
# so that I can regain access to my account.
#
# Acceptance Criteria:
# ✅ Reset link is valid for 1 hour only
# ✅ Link can only be used once
# ✅ Confirmation email sent after successful reset

# INVEST criteria for good stories:
# Independent, Negotiable, Valuable, Estimable, Small, Testable`,

  'Sprint Planning': `# Sprint Planning agenda (2 hours for a 2-week sprint):

# Part 1 — WHAT (60 min): PO + Team
# - Review Sprint Goal proposed by PO
# - PO presents top backlog items
# - Team asks clarifying questions
# - Team selects stories that fit their capacity
# - Stories must meet Definition of Ready:
#   ✅ Story written with clear acceptance criteria
#   ✅ Dependencies identified
#   ✅ Estimated by the team
#   ✅ Small enough to complete in one Sprint

# Part 2 — HOW (60 min): Team only
# - Break selected stories into tasks (2–8 hour chunks)
# - Identify technical risks and spikes
# - Confirm the Sprint Goal is achievable

# Sprint capacity calculation:
# Team members:        5
# Sprint days:         10
# Focus factor:        70% (meetings, reviews, sick days)
# Available hours:     5 × 10 × 8 × 0.70 = 280 hours
# Velocity (average):  32 story points
# → Select stories totaling ~30–34 points`,

  'Estimation Techniques': `# Story Point Estimation — relative sizing, not hours

# Fibonacci scale: 1, 2, 3, 5, 8, 13, 21
# 1  = trivial change (config tweak)
# 2  = small, well-understood task
# 3  = routine work, minor unknowns
# 5  = moderate complexity
# 8  = complex, multiple components
# 13 = large, needs breakdown
# 21 = too big — split before sprint

# Planning Poker process:
# 1. PO reads story and answers questions
# 2. Each team member picks a card face-down
# 3. All reveal simultaneously
# 4. Highest + lowest explain reasoning
# 5. Re-vote until consensus

# T-shirt sizing (for roadmap planning):
# XS = hours | S = 1-2 days | M = 3-5 days | L = 1-2 weeks | XL = split it

# Velocity: average story points completed per sprint
# Sprint 1: 28 pts | Sprint 2: 34 pts | Sprint 3: 30 pts
# Velocity: (28 + 34 + 30) / 3 = 30.7 → plan ~30 pts per sprint

# Never convert story points to hours for external reporting
# They measure complexity, not time`,

  'Kanban Fundamentals': `# Kanban board — visualize and manage flow of work

# Columns example:
# Backlog → Ready → In Progress → In Review → Testing → Done

# WIP (Work In Progress) limits per column:
# Backlog:     unlimited
# Ready:       8
# In Progress: 3   ← lower = faster flow, reveals bottlenecks
# In Review:   4
# Testing:     3
# Done:        unlimited

# Metrics:
# Lead Time   = time from request to delivery (customer perspective)
# Cycle Time  = time from "In Progress" to "Done" (team perspective)
# Throughput  = items completed per week

# Kanban principles:
# 1. Visualize the workflow
# 2. Limit WIP — stop starting, start finishing
# 3. Manage flow — optimize for throughput, not utilization
# 4. Make policies explicit — team agrees on DoD, review process
# 5. Implement feedback loops — daily standups, flow reviews
# 6. Improve collaboratively — kaizen mindset`,

  'Retrospectives and Continuous Improvement': `# Retrospective: inspect and adapt the team's process after each Sprint

# Format 1: Start / Stop / Continue
# Start:    what should we begin doing?
# Stop:     what's hurting us and should stop?
# Continue: what's working well and must keep?

# Format 2: 4Ls
# Liked:    what went well?
# Learned:  what did we discover?
# Lacked:   what was missing?
# Longed for: what do we wish we had?

# Format 3: Sailboat
# Wind  (🌬️): what's speeding us up?
# Anchor (⚓): what's slowing us down?
# Island (🏝️): what's our goal/vision?
# Rock  (🪨): what risks lie ahead?

# Facilitator tips:
# - Create psychological safety — no blame
# - Limit to 3 action items maximum per retro
# - Assign owner + due date to each action
# - Review previous actions at start of next retro
# - Rotate facilitator to avoid single-voice bias`,
};

// ─── Vue.js examples ─────────────────────────────────────────────────────────

const VUEJS_EXAMPLES: Record<string, string> = {
  'What is Vue.js': `<!-- Vue.js: progressive JavaScript framework for building UIs -->
<!-- Single File Component (SFC) — App.vue -->

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="greet">Click me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello, Vue.js!')

function greet() {
  message.value = 'You clicked the button!'
}
</script>

<style scoped>
h1 { color: #42b883; }
</style>`,

  'Vue CLI and Project Setup': `# Create a new Vue 3 project with Vite (recommended)
npm create vue@latest my-app
# Select: TypeScript ✅  Vue Router ✅  Pinia ✅  Vitest ✅

cd my-app
npm install
npm run dev      # development server on http://localhost:5173
npm run build    # production build
npm run test     # run unit tests

# Project structure:
# src/
#   assets/        static assets
#   components/    reusable SFCs
#   router/        Vue Router config
#   stores/        Pinia stores
#   views/         page-level components
#   App.vue        root component
#   main.ts        entry point`,

  'Template Syntax and Directives': `<template>
  <!-- Text interpolation -->
  <p>{{ title }}</p>

  <!-- v-bind: bind attributes -->
  <img :src="imageUrl" :alt="imageAlt" />

  <!-- v-if / v-else-if / v-else: conditional rendering -->
  <span v-if="status === 'active'">Active</span>
  <span v-else-if="status === 'pending'">Pending</span>
  <span v-else>Inactive</span>

  <!-- v-show: CSS display toggle (DOM stays in tree) -->
  <p v-show="isVisible">Visible when true</p>

  <!-- v-for: list rendering -->
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>

  <!-- v-on: event handling -->
  <button @click="handleClick">Submit</button>
  <input @keyup.enter="onEnter" />
</template>

<script setup>
import { ref } from 'vue'

const title   = ref('Directives Demo')
const imageUrl = ref('/logo.png')
const imageAlt = ref('Logo')
const status   = ref('active')
const isVisible = ref(true)
const items    = ref([{ id: 1, name: 'Vue' }, { id: 2, name: 'React' }])

function handleClick() { console.log('clicked') }
function onEnter()     { console.log('enter pressed') }
</script>`,

  'Data Binding and Reactivity': `<template>
  <p>Count: {{ count }}</p>
  <p>Double: {{ double }}</p>
  <button @click="increment">+1</button>

  <!-- Two-way binding with v-model -->
  <input v-model="name" placeholder="Your name" />
  <p>Hello, {{ name }}</p>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'

// ref: for primitives
const count = ref(0)
const name  = ref('')

// computed: derived state — auto-updates when deps change
const double = computed(() => count.value * 2)

// reactive: for objects
const user = reactive({ id: 1, role: 'admin' })

function increment() {
  count.value++   // .value required outside template
}

// watch: side effects when a value changes
watch(count, (newVal, oldVal) => {
  console.log(\`count changed from \${oldVal} to \${newVal}\`)
})
</script>`,

  'Components and Props': `<!-- ParentComponent.vue -->
<template>
  <UserCard :user="currentUser" :highlight="true" />
</template>

<script setup>
import UserCard from './UserCard.vue'
import { ref } from 'vue'

const currentUser = ref({ id: 1, name: 'Alice', role: 'Admin' })
</script>

---

<!-- UserCard.vue -->
<template>
  <div :class="['card', { 'card--highlight': highlight }]">
    <h2>{{ user.name }}</h2>
    <span>{{ user.role }}</span>
  </div>
</template>

<script setup>
// defineProps with TypeScript types
const props = defineProps<{
  user: { id: number; name: string; role: string }
  highlight?: boolean
}>()
</script>`,

  'Component Events and Emits': `<!-- Child.vue -->
<template>
  <button @click="sendMessage">Notify Parent</button>
</template>

<script setup>
// Declare emitted events with types
const emit = defineEmits<{
  (e: 'message', payload: string): void
  (e: 'delete', id: number): void
}>()

function sendMessage() {
  emit('message', 'Hello from child!')
}
</script>

---

<!-- Parent.vue -->
<template>
  <!-- Listen with @ shorthand -->
  <Child @message="onMessage" @delete="onDelete" />
  <p>{{ received }}</p>
</template>

<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const received = ref('')

function onMessage(msg: string) {
  received.value = msg
}
function onDelete(id: number) {
  console.log('delete item', id)
}
</script>`,

  'Computed Properties and Watchers': `<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const firstName = ref('Alice')
const lastName  = ref('Smith')

// computed: cached — only recalculates when deps change
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

// watch: explicit dep tracking — good for async side effects
watch(firstName, async (newVal) => {
  console.log('firstName changed to', newVal)
  // await fetchSuggestions(newVal)
})

// watch multiple sources
watch([firstName, lastName], ([fn, ln]) => {
  console.log('Name is now', fn, ln)
})

// watchEffect: auto-tracks deps used inside
watchEffect(() => {
  document.title = fullName.value  // tracks fullName → firstName, lastName
})
</script>`,

  'Lifecycle Hooks': `<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'

// onMounted: DOM is ready — safe to access refs, call APIs
onMounted(() => {
  console.log('Component mounted')
  fetchData()
})

// onBeforeUnmount: cleanup — clear timers, remove listeners
onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', onResize)
})

onUnmounted(() => {
  console.log('Component destroyed')
})

function fetchData() { /* API call */ }
let timer: ReturnType<typeof setInterval>
function onResize() { /* handler */ }
</script>`,

  'Vue Router Basics': `// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '@/views/HomeView.vue'
import UserView    from '@/views/UserView.vue'
import NotFound    from '@/views/NotFound.vue'

const routes = [
  { path: '/',           component: HomeView },
  { path: '/users/:id',  component: UserView, name: 'user' },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

---

<!-- In a component -->
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route  = useRoute()

const userId = route.params.id     // dynamic segment
const tab    = route.query.tab     // ?tab=settings

function goToUser(id: number) {
  router.push({ name: 'user', params: { id } })
}
</script>`,

  'Pinia State Management': `// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<{ id: number; name: string } | null>(null)
  const token = ref<string | null>(null)

  // Getters (computed)
  const isLoggedIn = computed(() => token.value !== null)
  const userName   = computed(() => user.value?.name ?? 'Guest')

  // Actions
  async function login(email: string, password: string) {
    // const res = await api.post('/auth/login', { email, password })
    token.value = 'jwt-token'
    user.value  = { id: 1, name: 'Alice' }
  }

  function logout() {
    user.value  = null
    token.value = null
  }

  return { user, token, isLoggedIn, userName, login, logout }
})

---

<!-- In a component -->
<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
// auth.isLoggedIn  auth.login()  auth.logout()
</script>`,

  'Composables and the Composition API': `// src/composables/useFetch.ts
import { ref, watchEffect } from 'vue'

export function useFetch<T>(url: string) {
  const data    = ref<T | null>(null)
  const error   = ref<string | null>(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    error.value   = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      data.value = await res.json()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  watchEffect(fetchData)

  return { data, error, loading, refetch: fetchData }
}

---

<!-- Usage in component -->
<script setup>
import { useFetch } from '@/composables/useFetch'

const { data, error, loading } = useFetch<User[]>('/api/users')
</script>`,

  'Forms and v-model': `<template>
  <form @submit.prevent="handleSubmit">
    <!-- v-model on input -->
    <input v-model="form.email" type="email" placeholder="Email" />

    <!-- v-model on select -->
    <select v-model="form.role">
      <option value="admin">Admin</option>
      <option value="member">Member</option>
    </select>

    <!-- v-model on checkbox -->
    <input v-model="form.agree" type="checkbox" />
    <label>I agree</label>

    <p v-if="errors.email" class="error">{{ errors.email }}</p>

    <button type="submit" :disabled="!form.agree">Submit</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ email: '', role: 'member', agree: false })
const errors = reactive({ email: '' })

function validate() {
  errors.email = ''
  if (!form.email.includes('@')) errors.email = 'Invalid email'
  return !errors.email
}

function handleSubmit() {
  if (!validate()) return
  console.log('Submit', { ...form })
}
</script>`,
};

// ─── PostgreSQL examples ──────────────────────────────────────────────────────

const POSTGRESQL_EXAMPLES: Record<string, string> = {
  'What is PostgreSQL': `-- PostgreSQL: powerful open-source relational database

-- Check version
SELECT version();

-- Create a database
CREATE DATABASE myapp;

-- Connect
\\c myapp

-- Create a table
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      TEXT   NOT NULL UNIQUE,
  name       TEXT   NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert a row
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice');

-- Query
SELECT id, name, email FROM users WHERE email = 'alice@example.com';`,

  'SQL CRUD Operations': `-- CREATE
INSERT INTO users (email, name)
VALUES ('bob@example.com', 'Bob')
RETURNING id, created_at;

-- READ
SELECT id, name, email
FROM   users
WHERE  name ILIKE '%bob%'   -- case-insensitive search
ORDER  BY created_at DESC;

-- UPDATE
UPDATE users
SET    name       = 'Robert',
       updated_at = now()
WHERE  id = 1
RETURNING id, name;

-- DELETE
DELETE FROM users
WHERE  id = 1
RETURNING id;   -- confirm what was deleted

-- Upsert (INSERT … ON CONFLICT)
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice Updated')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;`,

  'Filtering, Sorting, and Pagination': `-- Filtering
SELECT * FROM orders
WHERE  status = 'shipped'
  AND  total  > 100
  AND  created_at >= now() - INTERVAL '30 days';

-- Pattern matching
SELECT * FROM products WHERE name ILIKE '%widget%';

-- NULL checks
SELECT * FROM users WHERE phone IS NULL;

-- Sorting
SELECT * FROM products
ORDER BY price DESC, name ASC;

-- Keyset pagination (preferred for large tables)
SELECT id, name, created_at
FROM   products
WHERE  created_at < :last_seen_cursor  -- from previous page
ORDER  BY created_at DESC
LIMIT  20;

-- Offset pagination (simpler but slower on large offsets)
SELECT id, name
FROM   products
ORDER  BY id
LIMIT  20 OFFSET 40;   -- page 3`,

  'JOINs and Relationships': `-- INNER JOIN: only matching rows
SELECT o.id, u.name, o.total
FROM   orders  o
JOIN   users   u ON u.id = o.user_id;

-- LEFT JOIN: all orders, user may be null
SELECT o.id, u.name
FROM   orders o
LEFT  JOIN users u ON u.id = o.user_id;

-- Many-to-many via junction table
SELECT u.name, r.name AS role
FROM   users       u
JOIN   user_roles  ur ON ur.user_id = u.id
JOIN   roles       r  ON r.id       = ur.role_id;

-- Subquery
SELECT name FROM users
WHERE  id IN (
  SELECT user_id FROM orders WHERE total > 500
);

-- Common Table Expression (CTE)
WITH recent_orders AS (
  SELECT user_id, COUNT(*) AS cnt
  FROM   orders
  WHERE  created_at > now() - INTERVAL '7 days'
  GROUP  BY user_id
)
SELECT u.name, ro.cnt
FROM   users u
JOIN   recent_orders ro ON ro.user_id = u.id
ORDER  BY ro.cnt DESC;`,

  'Indexes and Query Optimization': `-- B-tree index (default) — equality and range queries
CREATE INDEX idx_orders_user_id   ON orders (user_id);
CREATE INDEX idx_orders_created   ON orders (created_at DESC);

-- Composite index — column order matters
CREATE INDEX idx_orders_status_created ON orders (status, created_at DESC);

-- Partial index — only index a subset
CREATE INDEX idx_active_users ON users (email) WHERE active = true;

-- GIN index for full-text search or JSONB
CREATE INDEX idx_products_fts ON products USING GIN (to_tsvector('english', name));

-- Analyze a query
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders WHERE user_id = 42 ORDER BY created_at DESC LIMIT 10;

-- Key things to look for in EXPLAIN output:
-- Seq Scan  → missing index
-- high rows estimate vs actual → stale statistics (run ANALYZE)
-- Hash Join vs Nested Loop → may indicate missing index on join key`,

  'Transactions and ACID Properties': `-- Begin a transaction
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit only if both succeed
COMMIT;

-- If something fails, roll back
ROLLBACK;

-- Savepoints — partial rollback within a transaction
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 250);
  SAVEPOINT before_item;
  INSERT INTO order_items (order_id, product_id) VALUES (999, 1);  -- may fail
  ROLLBACK TO SAVEPOINT before_item;
  -- continue with something else
COMMIT;

-- Isolation levels
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Deadlock prevention: always acquire locks in consistent order`,

  'Views and Materialized Views': `-- View: stored query — always reflects current data
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = true;

SELECT * FROM active_users;

-- Updatable view (simple single-table views)
UPDATE active_users SET name = 'Bob' WHERE id = 1;

-- Materialized view: result is physically stored — must be refreshed
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
  date_trunc('month', created_at) AS month,
  SUM(total)                      AS revenue
FROM  orders
GROUP BY 1
ORDER BY 1;

-- Refresh (can be expensive — schedule off-peak)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;

-- Index a materialized view like a regular table
CREATE INDEX ON monthly_revenue (month);`,

  'JSON and JSONB Support': `-- JSONB: stored as binary — faster for querying than JSON
CREATE TABLE events (
  id      SERIAL PRIMARY KEY,
  payload JSONB NOT NULL
);

INSERT INTO events (payload)
VALUES ('{"type": "purchase", "amount": 49.99, "user": {"id": 1}}');

-- Access fields with ->> (text) or -> (JSON)
SELECT payload->>'type'           AS event_type,
       (payload->>'amount')::numeric AS amount,
       payload->'user'->>'id'    AS user_id
FROM   events;

-- Filter on JSONB fields
SELECT * FROM events
WHERE  payload->>'type' = 'purchase'
  AND  (payload->>'amount')::numeric > 20;

-- GIN index for fast JSONB lookups
CREATE INDEX idx_events_payload ON events USING GIN (payload);

-- Check if a key exists
SELECT * FROM events WHERE payload ? 'user';

-- Merge / update JSONB
UPDATE events
SET payload = payload || '{"processed": true}'::jsonb
WHERE id = 1;`,

  'Full-Text Search': `-- to_tsvector converts text to searchable tokens
-- to_tsquery converts a search string to a query

SELECT id, title
FROM   articles
WHERE  to_tsvector('english', title || ' ' || body)
       @@ to_tsquery('english', 'postgresql & performance');

-- Rank results by relevance
SELECT id, title,
       ts_rank(to_tsvector('english', body), query) AS rank
FROM   articles,
       to_tsquery('english', 'index & query') query
WHERE  to_tsvector('english', body) @@ query
ORDER  BY rank DESC;

-- Store as a generated column for speed
ALTER TABLE articles
  ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body,''))
  ) STORED;

CREATE INDEX idx_articles_fts ON articles USING GIN (search_vector);

-- Query using the indexed column
SELECT id, title FROM articles
WHERE  search_vector @@ to_tsquery('english', 'migration & zero:*');`,
};

// ─── Manual QA examples ───────────────────────────────────────────────────────

const MANUAL_QA_EXAMPLES: Record<string, string> = {
  'What is Manual QA': `## Manual QA Overview

Manual QA (Quality Assurance) is the human-led process of verifying
that software meets requirements and works correctly for end users.

### Key responsibilities:
- Understand requirements and acceptance criteria
- Design test cases and test plans
- Execute tests and record results
- Report defects clearly and reproducibly
- Verify fixes and perform regression testing

### When manual QA outperforms automation:
✅ Exploratory testing — finding unexpected bugs
✅ Usability and UX review
✅ One-off or rarely run scenarios
✅ Visual / layout validation
✅ Early prototypes where the UI changes frequently

### QA does NOT mean:
❌ Only finding bugs at the end of development
❌ Just executing test scripts without thinking
❌ A gate that slows delivery

### Goal:
Shift quality left — involve QA from requirements through release.`,

  'Test Case Design Techniques': `## Test Case Design Techniques

### 1. Equivalence Partitioning
Divide input into valid and invalid partitions.
Test one value from each partition.

Age field (valid: 18–65):
  Valid partition:   30       → should pass
  Invalid (low):     5        → should fail
  Invalid (high):   80        → should fail

---

### 2. Boundary Value Analysis (BVA)
Test at and around boundaries where bugs cluster.

For age 18–65:
  Test: 17, 18, 19, 64, 65, 66

---

### 3. Decision Table Testing
Map conditions to expected actions.

| Logged In | Has Subscription | Action         |
|-----------|-----------------|----------------|
| No        | —               | Redirect login |
| Yes       | No              | Show upgrade   |
| Yes       | Yes             | Show content   |

---

### 4. State Transition Testing
Test all valid state changes and invalid transitions.

Order states: Created → Paid → Shipped → Delivered
Invalid: Shipped → Created (should be blocked)

---

### 5. Exploratory Testing
No script — use the app as a real user would.
Session-based: 60–90 min with a charter (goal + scope).`,

  'Writing Effective Test Cases': `## Test Case Template

Test Case ID: TC-LOGIN-001
Title:        Login with valid credentials
Module:       Authentication
Priority:     High
Preconditions:
  - User account exists (email: test@example.com, pass: Test@1234)
  - App is on the login page

Steps:
  1. Enter email: test@example.com
  2. Enter password: Test@1234
  3. Click "Sign In"

Expected Result:
  - User is redirected to the dashboard
  - Username appears in the header
  - Session cookie is set

Actual Result:   [filled during execution]
Status:          Pass / Fail / Blocked

---

## Negative Test Case

Test Case ID: TC-LOGIN-002
Title:        Login with incorrect password
Priority:     High

Steps:
  1. Enter email: test@example.com
  2. Enter password: WrongPass
  3. Click "Sign In"

Expected Result:
  - Error message: "Invalid email or password"
  - User stays on login page
  - No session is created`,

  'Test Execution and Defect Reporting': `## Defect Report Template

Bug ID:      BUG-2024-045
Title:       Checkout button disabled after valid payment details entered
Module:      Checkout / Payment
Severity:    Critical
Priority:    High
Environment: Chrome 124, macOS 14, Staging v2.3.1
Found by:    QA Engineer
Date:        2024-05-10

Steps to Reproduce:
  1. Add any item to cart
  2. Go to checkout
  3. Enter valid card: 4111 1111 1111 1111, CVV: 123, Expiry: 12/26
  4. Observe the "Place Order" button

Expected:    Button is enabled and clickable
Actual:      Button remains disabled — order cannot be placed

Attachments: screenshot.png, screen-recording.mp4

Root cause hypothesis:
  Card validation JS regex may reject valid test numbers.

---

## Bug Severity vs Priority

Severity (impact):   Critical > High > Medium > Low
Priority (fix order): P1 > P2 > P3 > P4

Example:
  Typo in footer text  → Low severity, Low priority
  Crash on checkout    → Critical severity, P1 priority
  Wrong color on banner → Low severity, Low priority (but client may escalate)`,

  'API Testing with Postman': `## API Testing with Postman

### Basic GET request
GET https://api.example.com/users/1
Authorization: Bearer {{token}}

Expected response (200 OK):
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}

---

### POST request with body
POST https://api.example.com/users
Content-Type: application/json
Body:
{
  "name": "Bob",
  "email": "bob@example.com"
}

Expected: 201 Created with user object

---

### Postman Test Scripts (JavaScript)
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has id", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
  pm.expect(body.id).to.be.a("number");
});

pm.test("Response time < 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

---

### Environment variables
Base URL: {{base_url}}
Token:    {{auth_token}}

Use Postman Collections + Environments to run the
same tests against dev, staging, and production.`,

  'Regression Testing and Smoke Testing': `## Smoke Testing vs Regression Testing

### Smoke Test (Build Verification Test)
- Run after each new build
- Covers only critical paths — fast (< 30 min)
- Goal: confirm the build is stable enough for full testing

Smoke test checklist:
  ✅ App loads without crash
  ✅ Login / logout works
  ✅ Core navigation accessible
  ✅ Basic CRUD on main entity (e.g., create order)
  ✅ Payment flow reachable (not full checkout)

If smoke fails → reject build, notify dev team immediately.

---

### Regression Test
- Run after any code change to verify no existing feature broke
- Full suite or risk-based subset

Risk-based regression strategy:
  1. Identify changed modules from the diff
  2. Map to dependent features (impact analysis)
  3. Prioritize test cases covering those areas
  4. Run smoke + impacted area first
  5. Run full suite overnight / on CI

---

### Regression in Agile
- Automate regression where possible (Selenium, Playwright)
- Manual regression focus: new UI, complex user flows, integrations
- Run before every sprint demo`,
};

// ─── Automation QA examples ───────────────────────────────────────────────────

const AUTOMATION_QA_EXAMPLES: Record<string, string> = {
  'What is Automation QA': `## What is Automation QA?

Automation QA uses code and tools to execute tests automatically,
replacing or supplementing repetitive manual execution.

### Key benefits:
✅ Fast feedback — run thousands of tests in minutes
✅ Consistent — no human error in execution
✅ Repeatable — run on every commit (CI/CD)
✅ Parallel execution across browsers and environments

### Automation pyramid (bottom = most tests):
         /\\
        /E2E\\       ← few, slow, expensive
       /------\\
      /  Integration\\  ← medium count
     /--------------\\
    /    Unit Tests   \\  ← many, fast, cheap
   /------------------\\

### Best candidates for automation:
✅ Regression suites run on every build
✅ Smoke tests run on every deployment
✅ Data-driven scenarios with many input combinations
✅ API contract testing
✅ Performance benchmarks

### Poor candidates:
❌ One-off manual tests
❌ Rapidly changing UI (high maintenance)
❌ Subjective UX / visual design review`,

  'Selenium WebDriver Basics': `// Selenium WebDriver — Java example

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginTest {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/login");

            // Locate elements
            WebElement emailInput = driver.findElement(By.id("email"));
            WebElement passInput  = driver.findElement(By.id("password"));
            WebElement loginBtn   = driver.findElement(By.cssSelector("button[type=submit]"));

            // Interact
            emailInput.sendKeys("user@example.com");
            passInput.sendKeys("secret");
            loginBtn.click();

            // Explicit wait — avoid Thread.sleep()
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement dashboard = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("dashboard"))
            );

            System.out.println("Login passed: " + dashboard.isDisplayed());

        } finally {
            driver.quit();  // always close the browser
        }
    }
}`,

  'Page Object Model (POM)': `// Page Object Model — separates UI locators from test logic

// LoginPage.java — Page Object
public class LoginPage {
    private final WebDriver driver;

    // Locators defined once — easy to update when UI changes
    private final By emailInput = By.id("email");
    private final By passInput  = By.id("password");
    private final By loginBtn   = By.cssSelector("button[type=submit]");
    private final By errorMsg   = By.className("error-message");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterEmail(String email) {
        driver.findElement(emailInput).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(passInput).sendKeys(password);
    }

    public DashboardPage clickLogin() {
        driver.findElement(loginBtn).click();
        return new DashboardPage(driver);   // return next page object
    }

    public String getErrorMessage() {
        return driver.findElement(errorMsg).getText();
    }
}

---

// LoginTest.java — clean test using POM
public class LoginTest {
    @Test
    public void loginWithValidCredentials() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.enterEmail("user@example.com");
        loginPage.enterPassword("secret");
        DashboardPage dashboard = loginPage.clickLogin();
        assertTrue(dashboard.isLoaded());
    }
}`,

  'Playwright and Modern Testing Tools': `// Playwright — TypeScript (recommended for modern web testing)
import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('#email',    'user@example.com');
    await page.fill('#password', 'secret');
    await page.click('button[type=submit]');

    // Auto-waits — no explicit waits needed
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('#welcome')).toContainText('Welcome');
  });

  test('shows error on invalid password', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email',    'user@example.com');
    await page.fill('#password', 'wrong');
    await page.click('button[type=submit]');

    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toContainText('Invalid');
  });
});

// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox',  use: { browserName: 'firefox'  } },
    { name: 'webkit',   use: { browserName: 'webkit'   } },
  ],
});`,

  'CI/CD Integration for Tests': `# .github/workflows/tests.yml
# Run automated tests on every push and pull request

name: Automated Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm test -- --coverage

  e2e-tests:
    runs-on: ubuntu-latest
    needs: unit-tests   # run after unit tests pass
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Start app
        run: npm run build && npm run start &
      - name: Wait for app
        run: npx wait-on http://localhost:3000
      - name: Run E2E tests
        run: npx playwright test
      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/`,

  'BDD with Cucumber and Gherkin': `# Feature file — written in Gherkin (human-readable)
# features/login.feature

Feature: User Login
  As a registered user
  I want to log in to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When  I enter email "user@example.com" and password "secret"
    And   I click the login button
    Then  I should be redirected to the dashboard
    And   I should see "Welcome, Alice"

  Scenario: Failed login with wrong password
    Given I am on the login page
    When  I enter email "user@example.com" and password "wrong"
    And   I click the login button
    Then  I should see the error "Invalid email or password"
    And   I should remain on the login page

---

// Step definitions — Java + Selenium
@Given("I am on the login page")
public void iAmOnLoginPage() {
    driver.get(BASE_URL + "/login");
}

@When("I enter email {string} and password {string}")
public void iEnterCredentials(String email, String pass) {
    new LoginPage(driver).enterEmail(email).enterPassword(pass);
}

@Then("I should be redirected to the dashboard")
public void iShouldBeOnDashboard() {
    assertEquals(BASE_URL + "/dashboard", driver.getCurrentUrl());
}`,

  'Handling Dynamic Elements': `// Playwright — strategies for dynamic / async elements

import { test, expect, Page } from '@playwright/test';

test('handle dynamic loading', async ({ page }) => {
  await page.goto('/products');

  // Wait for specific element
  await page.waitForSelector('.product-card', { state: 'visible' });

  // Wait for network idle (all requests done)
  await page.waitForLoadState('networkidle');

  // Wait for a specific response
  const [response] = await Promise.all([
    page.waitForResponse('**/api/products'),
    page.click('#load-more'),
  ]);
  expect(response.status()).toBe(200);
});

// Handle elements that may not exist yet
async function waitForToast(page: Page, message: string) {
  const toast = page.locator('.toast', { hasText: message });
  await expect(toast).toBeVisible({ timeout: 5000 });
  await expect(toast).toBeHidden({ timeout: 5000 });
}

// Intercept and mock API responses
test('show empty state when no products', async ({ page }) => {
  await page.route('**/api/products', route =>
    route.fulfill({ json: [] })
  );
  await page.goto('/products');
  await expect(page.locator('.empty-state')).toBeVisible();
});`,
};

const createCodeExample = (topicId: string, moduleName: string): string => {
  if (topicId === 'php') {
    return PHP_EXAMPLES[moduleName] ?? `<?php
declare(strict_types=1);

// ${moduleName}
// Production-quality example with validation and error handling

function process${moduleName.replace(/[^a-zA-Z0-9]/g, '')}(array $input): array
{
    if (empty($input['name'])) {
        throw new \\InvalidArgumentException('name is required');
    }

    $name = trim((string) $input['name']);

    // Optimization: static cache for repeated calls
    static $cache = [];
    if (isset($cache[$name])) {
        return $cache[$name];
    }

    $result = ['name' => $name, 'status' => 'ok'];
    $cache[$name] = $result;
    return $result;
}

try {
    $result = process${moduleName.replace(/[^a-zA-Z0-9]/g, '')}(['name' => 'Alice']);
    echo json_encode($result, JSON_PRETTY_PRINT);
} catch (\\Throwable $e) {
    error_log('Error: ' . $e->getMessage());
    echo 'Something went wrong.';
}`;
  }

  if (topicId === 'laravel') {
    return LARAVEL_EXAMPLES[moduleName] ?? `<?php
// ${moduleName} — Laravel example

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class ExampleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => 'integer|min:1|max:100',
        ]);

        $perPage = $validated['per_page'] ?? 20;

        // Replace with your model and logic
        $items = collect([
            ['id' => 1, 'name' => 'Item A'],
            ['id' => 2, 'name' => 'Item B'],
        ]);

        return response()->json(['data' => $items]);
    }
}

// Route: Route::get('/items', [ExampleController::class, 'index']);`;
  }

  if (topicId === 'react') {
    return REACT_EXAMPLES[moduleName] ?? `import { useState } from 'react';

// ${moduleName}
export function ${moduleName.replace(/[^a-zA-Z0-9]/g, '')}Example() {
  const [value, setValue] = useState('');

  return (
    <div>
      <h2>${moduleName}</h2>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something…"
      />
      <p>You typed: {value || '(empty)'}</p>
    </div>
  );
}`;
  }

  if (topicId === 'nodejs') {
    return NODEJS_EXAMPLES[moduleName] ?? `import express from 'express';

// ${moduleName}
const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/resource', (req, res) => {
  const { name } = req.body as { name?: string };

  if (!name?.trim()) {
    return res.status(422).json({ error: 'name is required' });
  }

  try {
    const resource = { id: Date.now(), name: name.trim() };
    return res.status(201).json({ data: resource });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server running on :3000'));`;
  }

  if (topicId === 'mysql') {
    return MYSQL_EXAMPLES[moduleName] ?? `-- ${moduleName}
-- Practical MySQL example

-- Create table with proper constraints
CREATE TABLE IF NOT EXISTS items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  status     ENUM('active','archived') NOT NULL DEFAULT 'active',
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                          ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);

-- Insert with duplicate protection
INSERT INTO items (name) VALUES ('Example Item')
ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Paginated read
SELECT id, name, status, created_at
FROM   items
WHERE  status = 'active'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- Update safely
UPDATE items SET status = 'archived' WHERE id = 1;

-- Soft delete
ALTER TABLE items ADD COLUMN deleted_at DATETIME NULL;
UPDATE items SET deleted_at = NOW() WHERE id = 1;`;
  }

  if (topicId === 'mongodb') {
    return MONGODB_EXAMPLES[moduleName] ?? `// ${moduleName} — MongoDB example

// Connect
// const { MongoClient } = require('mongodb');
// const client = new MongoClient('mongodb://localhost:27017');
// const db = client.db('myapp');

// Insert
db.items.insertOne({
  name:      'Example Item',
  status:    'active',
  tags:      ['tag1', 'tag2'],
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Find with filter + projection
db.items.find(
  { status: 'active' },
  { name: 1, tags: 1, _id: 0 }
).sort({ createdAt: -1 }).limit(20);

// Update specific fields
db.items.updateOne(
  { name: 'Example Item' },
  {
    $set:         { status: 'archived' },
    $currentDate: { updatedAt: true },
  }
);

// Index for frequent queries
db.items.createIndex({ status: 1, createdAt: -1 });`;
  }

  if (topicId === 'devops') {
    return DEVOPS_EXAMPLES[moduleName] ?? `# ${moduleName} — DevOps example
# .github/workflows/example.yml

name: ${moduleName}

on:
  push:
    branches: [main]
  pull_request:

jobs:
  pipeline:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup
        run: echo "Setting up environment"

      - name: Lint
        run: echo "Running linter"

      - name: Test
        run: echo "Running tests"

      - name: Build
        run: echo "Building artifact"

      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: echo "Deploying to production"`;
  }

  if (topicId === 'github') {
    return GITHUB_EXAMPLES[moduleName] ?? `# ${moduleName} — GitHub workflow example
# .github/workflows/example.yml

name: ${moduleName}

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # full history for analysis

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install
        run: npm ci

      - name: Run checks
        run: |
          npm run lint
          npm test -- --coverage

      - name: Notify on failure
        if: failure()
        run: echo "Pipeline failed — check logs above"`;
  }

  if (topicId === 'vuejs') {
    return VUEJS_EXAMPLES[moduleName] ?? `<!-- ${moduleName} — Vue.js example -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleAction">Run Action</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title       = ref('${moduleName}')
const description = ref('Implement ${moduleName} following Vue 3 Composition API patterns.')

function handleAction() {
  console.log('${moduleName} action triggered')
}
</script>`;
  }

  if (topicId === 'postgresql') {
    return POSTGRESQL_EXAMPLES[moduleName] ?? `-- ${moduleName} — PostgreSQL example

-- Always use parameterized queries to prevent SQL injection
-- $1, $2 ... are placeholders (filled by the driver)

PREPARE example_query (text) AS
  SELECT id, name, created_at
  FROM   items
  WHERE  category = $1
  ORDER  BY created_at DESC
  LIMIT  20;

EXECUTE example_query ('${moduleName}');

-- Index the column you filter or sort on:
CREATE INDEX IF NOT EXISTS idx_items_category
  ON items (category);

-- Check query plan:
EXPLAIN ANALYZE
  SELECT * FROM items WHERE category = '${moduleName}';`;
  }

  if (topicId === 'manual-qa') {
    return MANUAL_QA_EXAMPLES[moduleName] ?? `## ${moduleName} — Manual QA Guide

### Objective
Understand and apply "${moduleName}" in a QA context.

### Test Scenario
Feature under test: ${moduleName}

Steps:
  1. Review requirements and acceptance criteria
  2. Identify positive (happy path) test cases
  3. Identify negative (error path) test cases
  4. Identify boundary and edge cases
  5. Execute and record results

### Sample Test Cases

TC-001: Verify happy path
  Given: Prerequisites are met
  When:  User performs the primary action
  Then:  Expected outcome matches requirements
  Status: Pass / Fail

TC-002: Verify error handling
  Given: Invalid data or missing prerequisites
  When:  User performs the action
  Then:  Appropriate error is shown without crash
  Status: Pass / Fail

### Defect Template (if fail)
  Title: [brief description]
  Steps to reproduce: [numbered list]
  Expected: [what should happen]
  Actual:   [what happened]
  Severity: Critical / High / Medium / Low`;
  }

  if (topicId === 'automation-qa') {
    return AUTOMATION_QA_EXAMPLES[moduleName] ?? `// ${moduleName} — Automation QA example (Playwright / TypeScript)
import { test, expect } from '@playwright/test';

test.describe('${moduleName}', () => {
  test('verify primary functionality', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act — interact with the feature under test
    await page.click('[data-testid="primary-action"]');

    // Assert
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
  });

  test('verify error state', async ({ page }) => {
    // Mock API to return error
    await page.route('**/api/resource', route =>
      route.fulfill({ status: 500, body: 'Server Error' })
    );

    await page.goto('/');
    await page.click('[data-testid="primary-action"]');

    // Error feedback should be visible
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});`;
  }

  if (topicId === 'agile') {
    return AGILE_EXAMPLES[moduleName] ?? `# ${moduleName} — Agile practice guide

# User Story (if applicable):
# As a [role], I want [feature], so that [benefit].

# Acceptance Criteria:
# ✅ Given [context], When [action], Then [outcome]
# ✅ Given [context], When [action], Then [outcome]

# Definition of Done:
# ✅ Code written and peer reviewed
# ✅ Automated tests pass
# ✅ Tested in staging environment
# ✅ Acceptance criteria verified by PO
# ✅ Documentation updated

# Team agreements for this practice:
# - Who:    entire team collaborates
# - When:   [sprint event or cadence]
# - How:    [tools, format, timebox]
# - Output: [artifact or decision]

# Common mistakes to avoid:
# ❌ Skipping this practice under deadline pressure
# ❌ Only one person owning this process
# ❌ Not revisiting or improving the practice over time`;
  }

  return `// ${moduleName}\n// Example coming soon.`;
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
  const allModules = TOPIC_MODULES[meta.id] ?? [];
  const levelModules = TOPIC_LEVEL_MODULES[meta.id];
  const levels = LEVEL_CONFIGS.map((cfg) => {
    const modules = levelModules ? (levelModules[cfg.level] ?? allModules) : allModules;
    return createLevelContent(meta.name, meta.id, modules, cfg);
  });

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
