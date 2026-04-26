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

  'Schema Design Strategies': `// Two main patterns: Embedding vs Referencing

// EMBEDDING — best for data always read together (1-to-few)
db.users.insertOne({
  _id:     ObjectId(),
  name:    "Alice",
  email:   "alice@example.com",
  address: {          // embedded — no JOIN needed
    street: "123 Main St",
    city:   "Mumbai",
    zip:    "400001",
  },
  socialLinks: {
    github:   "https://github.com/alice",
    linkedin: "https://linkedin.com/in/alice",
  },
});

// REFERENCING — best for large/shared/frequently updated sub-docs (1-to-many)
db.posts.insertOne({
  _id:       ObjectId(),
  title:     "Node.js Tips",
  authorId:  ObjectId("user123"),  // reference to users collection
  tags:      ["nodejs", "performance"],
  createdAt: new Date(),
});

// Rule of thumb:
// Embed when sub-data belongs to parent only
// Reference when sub-data is shared or grows unbounded`,
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
