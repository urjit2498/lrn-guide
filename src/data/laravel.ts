import { Topic } from '@/types';

export const laravelTopic: Topic = {
  id: 'laravel',
  name: 'Laravel',
  icon: '🔴',
  color: 'bg-red-100 dark:bg-red-900/30',
  textColor: 'text-red-700 dark:text-red-300',
  borderColor: 'border-red-300 dark:border-red-700',
  description: 'Laravel is the most popular PHP framework — elegant syntax, powerful tools, rapid development.',
  levels: [
    {
      level: 'beginner',
      intro: 'Set up Laravel, understand MVC, routes, views, and the Artisan CLI.',
      sections: [
        {
          title: 'What is Laravel & MVC Pattern',
          explanation:
            'Laravel is a PHP framework that follows the MVC (Model-View-Controller) pattern. Model = database logic, View = HTML templates (Blade), Controller = logic that connects them. This separation makes code easier to maintain.',
          realWorldExample:
            'When you visit /products on a Laravel app: the Route directs the request → ProductController@index runs → it asks the Product model for data → passes data to the products/index.blade.php view → HTML is returned.',
          practicalUseCase:
            'Install Laravel with "composer create-project laravel/laravel myapp" and explore the folder structure.',
          codeExample: `# Install
composer create-project laravel/laravel myapp
cd myapp
php artisan serve   # http://127.0.0.1:8000

# routes/web.php
Route::get('/products', [ProductController::class, 'index']);

# app/Http/Controllers/ProductController.php
public function index() {
    $products = Product::all();           // Eloquent (Model)
    return view('products.index', compact('products')); // Blade (View)
}

# resources/views/products/index.blade.php
@foreach ($products as $product)
    <p>{{ $product->name }} — \${{ $product->price }}</p>
@endforeach`,
          exercise:
            'Create a route, controller, and Blade view that displays a list of 3 hard-coded books (title + author).',
        },
        {
          title: 'Eloquent ORM — Working with the Database',
          explanation:
            'Eloquent is Laravel\'s ORM (Object-Relational Mapper). It lets you interact with database tables using PHP objects instead of SQL. Each model represents a table. Relationships (hasMany, belongsTo) let you navigate related data naturally.',
          realWorldExample:
            'An e-commerce app: $user->orders returns all orders for a user. $order->products returns all products in that order. No raw SQL needed.',
          practicalUseCase:
            'Create a Post model, run a migration to add a posts table, then seed some records and display them.',
          codeExample: `# Create model + migration + seeder in one go
php artisan make:model Post -mf

# database/migrations/xxx_create_posts_table.php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('body');
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->timestamps();
});

# app/Models/Post.php
class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}

# Usage in controller
$posts = Post::with('user')->latest()->paginate(10);`,
          exercise:
            'Add a Comment model that belongs to Post. Display a post with all its comments on a detail page.',
        },
        {
          title: 'Blade Templating',
          explanation:
            'Blade is Laravel\'s template engine. It compiles to plain PHP and is cached for performance. It provides clean syntax for loops, conditionals, layouts, and components.',
          realWorldExample:
            'Almost every Laravel app has a layouts/app.blade.php master template. Every page extends it with @extends and overrides the @section("content") block.',
          practicalUseCase:
            'Build a layout with a nav bar that is shared across all pages using Blade layouts.',
          codeExample: `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title', 'MyApp')</title>
</head>
<body>
    <nav>...</nav>
    <main>
        @yield('content')
    </main>
</body>
</html>

{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('title', 'All Posts')

@section('content')
    @forelse($posts as $post)
        <article>
            <h2>{{ $post->title }}</h2>
            <p>By {{ $post->user->name }}</p>
        </article>
    @empty
        <p>No posts yet.</p>
    @endforelse

    {{ $posts->links() }}  {{-- Pagination --}}
@endsection`,
          exercise:
            'Create a Blade component for a reusable alert box (success/error/warning) that accepts a type and message.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between Route::get and Route::resource?',
          answer:
            'Route::get defines a single route for GET requests. Route::resource creates all 7 RESTful routes (index, create, store, show, edit, update, destroy) for a controller with one line of code.',
        },
        {
          question: 'What is Artisan?',
          answer:
            'Artisan is Laravel\'s CLI. It helps you generate code (make:model, make:controller), run migrations (migrate), seed the database (db:seed), clear caches (cache:clear), and many other development tasks.',
        },
        {
          question: 'What is middleware in Laravel?',
          answer:
            'Middleware is code that runs before or after a request reaches the controller. Common uses: authentication (redirecting unauthenticated users), rate limiting, logging, CORS headers. The auth middleware is the most common example.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Service Container, Eloquent internals, Sanctum API auth, advanced validation, and Redis caching — how Laravel actually works under the hood.',
      sections: [
        {
          title: 'Service Container & Dependency Injection',
          explanation:
            'Laravel\'s Service Container is an IoC (Inversion of Control) container that manages class dependencies. When a controller type-hints `PaymentService` in its constructor, Laravel looks up its binding in the container and automatically instantiates and injects it. You do not call `new PaymentService()` manually. Bindings are registered in Service Providers (usually `AppServiceProvider::register()`). The container supports singleton bindings (`app()->singleton()`), where only one instance is created and reused, and regular bindings where a fresh instance is returned on every resolution.',
          realWorldExample:
            'An e-commerce checkout controller depends on `PaymentGateway`, `InventoryService`, and `EmailNotifier`. Instead of instantiating all three manually, you type-hint them in the constructor: `public function __construct(private PaymentGateway $gateway, private InventoryService $inventory)`. Laravel resolves each dependency recursively — if `PaymentGateway` itself depends on `HttpClient`, the container builds that too. When you switch from Stripe to PayPal, you change one binding in `AppServiceProvider` — the controller code stays untouched.',
          practicalUseCase:
            'Register an interface-to-implementation binding in AppServiceProvider. Inject the interface into a controller and verify that swapping the implementation requires zero controller changes.',
          keyPoints: [
            'The container resolves constructor dependencies automatically using PHP reflection — it reads the type-hints and builds the dependency graph.',
            '`app()->bind(Interface::class, Implementation::class)` — new instance on every resolve. `app()->singleton(...)` — same instance reused across the request.',
            'Service Providers have two methods: `register()` for container bindings (no other services available yet) and `boot()` for code that runs after all providers are registered.',
            'Facades like `Cache::`, `DB::`, and `Queue::` are syntactic sugar over container resolutions — `Cache::get("key")` resolves the cache manager from the container and calls `get()`.',
            '`app()->make(Foo::class)` manually resolves a class. Useful in places where constructor injection is not available (command handlers, closures).',
            'Tagged bindings: `app()->tag([DriverA::class, DriverB::class], "exporters")` then `app()->tagged("exporters")` returns all — useful for plugin systems.',
          ],
          codeExample: `// app/Providers/AppServiceProvider.php
public function register(): void
{
    // Bind interface to implementation — swap Stripe for PayPal here, nowhere else
    $this->app->bind(PaymentGatewayInterface::class, StripeGateway::class);

    // Singleton — one SMS client shared across the whole request
    $this->app->singleton(SmsClient::class, function (Application $app) {
        return new TwilioClient(config('services.twilio.sid'), config('services.twilio.token'));
    });
}

// app/Http/Controllers/CheckoutController.php
class CheckoutController extends Controller
{
    // Container injects both — no "new" keyword needed
    public function __construct(
        private PaymentGatewayInterface $gateway,
        private InventoryService $inventory,
    ) {}

    public function charge(ChargeRequest $request): JsonResponse
    {
        $this->inventory->reserve($request->items);
        $result = $this->gateway->charge($request->amount, $request->token);
        return response()->json(['receipt' => $result->id]);
    }
}`,
          exercise:
            'Create a `NotificationChannel` interface with `send(User $user, string $message)`. Implement `EmailChannel` and `SlackChannel`. Bind `EmailChannel` in production and `SlackChannel` in local via `app()->environment()`. Inject the interface into a controller and test that the correct channel is used.',
        },
        {
          title: 'Eloquent Relationships, Scopes & Query Optimization',
          explanation:
            'Eloquent is not just an ORM — it is a complete query-building and data-mapping layer. `hasMany` / `belongsTo` define relationships that produce lazy-loaded queries by default (causing N+1). Eager loading with `with()` collapses N+1 into 2 queries. Local scopes (`scopeActive()`) encapsulate reusable WHERE clauses. Global scopes (like `SoftDeletes`) apply automatically to every query on a model. `withCount()` and `loadMissing()` are advanced tools for controlling query count without over-fetching.',
          realWorldExample:
            'A SaaS dashboard lists 50 companies, each showing their active subscription plan and user count. Without optimization: `Company::all()` triggers 1 query, then `$company->plan` and `$company->users->count()` inside the loop trigger 100 more queries (50×2). With optimization: `Company::with("plan")->withCount("users")->where("status", "active")->get()` fetches everything in 3 queries regardless of record count.',
          practicalUseCase:
            'Use Laravel Debugbar or `DB::listen()` to count queries on a page that lists orders with their customer and product names. Reduce the query count to 3 using eager loading and `withCount()`.',
          keyPoints: [
            '`Post::with("user", "tags")->get()` issues 3 queries total (posts + users + tags), not 1+N. Always eager-load what you display in a loop.',
            'Local scopes: `public function scopePublished(Builder $query) { $query->where("status", "published"); }` — called as `Post::published()->latest()->get()`.',
            '`withCount("comments")` adds a `comments_count` attribute without loading the comment records — critical for list pages.',
            '`loadMissing("author")` on an already-fetched collection only runs the query if the relation is not already loaded — safe to call conditionally.',
            'Pivot tables in `belongsToMany`: use `->withPivot("quantity")` and `->withTimestamps()` to access pivot column data on the related model.',
            'Chunking: `User::chunk(500, fn($users) => ...)` processes records in batches — avoids loading 100k rows into memory at once.',
          ],
          codeExample: `// N+1 problem — BAD (51 queries for 50 orders)
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->customer->name; // 1 query per iteration
}

// Fixed — 2 queries total
$orders = Order::with('customer')->get();

// Advanced — complex dashboard query in 3 queries
$orders = Order::query()
    ->with(['customer:id,name,email', 'items.product:id,name,sku'])
    ->withCount('items')
    ->withSum('items', 'price')
    ->where('status', 'pending')
    ->latest()
    ->paginate(25);

// Local scope on Order model
public function scopePending(Builder $query): void
{
    $query->where('status', 'pending');
}

// Global scope — automatically filters soft-deleted records
// SoftDeletes trait adds this automatically:
// SELECT * FROM orders WHERE deleted_at IS NULL

// Usage
$pending = Order::pending()->withCount('items')->get();`,
          exercise:
            'On a blog listing page, use `DB::listen()` to log every query. Add `with(["author", "tags"])` and `withCount("comments")`. Confirm the query count drops from N+2 to 3 as post count grows.',
        },
        {
          title: 'Sanctum API Authentication — Token vs SPA Cookie',
          explanation:
            'Laravel Sanctum provides two distinct authentication mechanisms. Token authentication issues opaque tokens stored in the `personal_access_tokens` table — used for mobile apps and third-party API clients. SPA cookie authentication uses encrypted session cookies — used when the frontend is on the same domain (e.g., a Next.js SPA on `app.example.com` calling a Laravel API on `api.example.com`). Sanctum is simpler than Passport: no OAuth server, no JWT, just stateful cookie sessions or opaque tokens depending on whether the request has a session cookie.',
          realWorldExample:
            'A React Native mobile app stores the Sanctum token in secure storage and sends it as `Authorization: Bearer <token>` on every API request. A Next.js SPA on the same domain uses cookie-based auth — no token is exposed in JavaScript at all, which prevents XSS token theft. The same Laravel backend serves both clients using `auth:sanctum` middleware — Sanctum detects which mechanism to use based on the request.',
          practicalUseCase:
            'Issue a Sanctum token on login. Scope the token (e.g., "read:orders") and verify that a token without the write scope cannot POST to /api/orders.',
          keyPoints: [
            'Token abilities are like scopes: `$user->createToken("mobile-app", ["read:orders", "write:orders"])`. Check with `$request->user()->tokenCan("write:orders")`.',
            'Tokens are stored hashed in `personal_access_tokens`. The plain-text token is only shown once at creation — store it immediately.',
            'SPA auth requires `EnsureFrontendRequestsAreStateful` middleware and CORS configuration. The `SANCTUM_STATEFUL_DOMAINS` env var lists trusted origins.',
            'Token expiration: set `sanctum.expiration` in minutes in `config/sanctum.php`. Expired tokens are pruned with `php artisan sanctum:prune-expired`.',
            'Do NOT use Sanctum tokens in localStorage — XSS can steal them. Use httpOnly cookies (SPA mode) or secure native storage (mobile).',
          ],
          codeExample: `// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $r) => $r->user());
    Route::apiResource('orders', OrderController::class);
});

// app/Http/Controllers/AuthController.php
public function login(LoginRequest $request): JsonResponse
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials.'],
        ]);
    }

    $user  = $request->user();
    $token = $user->createToken(
        name: 'mobile-app',
        abilities: ['read:orders', 'write:orders'],
        expiresAt: now()->addDays(30),
    );

    return response()->json(['token' => $token->plainTextToken]);
}

public function logout(Request $request): JsonResponse
{
    // Revoke only the current token, not all tokens
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
}

// In controller — check ability before write operations
public function store(StoreOrderRequest $request): JsonResponse
{
    abort_unless($request->user()->tokenCan('write:orders'), 403);
    $order = Order::create($request->validated() + ['user_id' => $request->user()->id]);
    return new OrderResource($order);
}`,
          exercise:
            'Create two token abilities: `read:reports` and `export:reports`. A route to view reports accepts both. A route to download a CSV export requires `export:reports`. Write a feature test that proves a `read:reports` token returns 403 on the export endpoint.',
        },
        {
          title: 'Form Requests — Advanced Validation Patterns',
          explanation:
            'Laravel Form Requests do more than define rules arrays. The `authorize()` method is a policy gate — you can check `$this->user()->can("update", $this->route("post"))` to authorize against a model policy. The `prepareForValidation()` method lets you normalize or transform input before rules run. `after()` hooks let you add complex cross-field validation that the rules DSL cannot express. `$request->validated()` returns ONLY the fields declared in `rules()` — this prevents mass-assignment vulnerabilities from accidental extra fields.',
          realWorldExample:
            'An invoice update form: `authorize()` checks that the logged-in user owns the invoice and the invoice is not yet paid. `prepareForValidation()` strips formatting from a currency input ("$1,234.56" → 1234.56). An `after()` hook validates that line item totals sum to the invoice total — impossible with standard rules.',
          practicalUseCase:
            'Build an UpdateProfileRequest where the email unique rule ignores the current user\'s own record. Add an `after()` hook that rejects if new_password matches old_password (requires a database check).',
          keyPoints: [
            '`$request->validated()` is safe for `Model::create()` — it only contains fields you declared. `$request->all()` is not safe.',
            '`sometimes` rule: `"phone" => ["sometimes", "required", "regex:/^\\+[1-9]\\d{7,14}$/"]` — only validates `phone` if it is present in the request.',
            'Custom Rule objects: `php artisan make:rule NoDisposableEmail` — implement `validate(string $attribute, mixed $value, Closure $fail)`. Reusable across multiple requests.',
            '`prepareForValidation()` runs before validation — use it to cast types, strip formatting, or merge computed values.',
            'Conditional rules: `Rule::requiredIf($request->payment_method === "bank_transfer")` — require bank details only when payment method is bank transfer.',
          ],
          codeExample: `// php artisan make:request UpdateInvoiceRequest
class UpdateInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Uses InvoicePolicy::update() automatically
        return $this->user()->can('update', $this->route('invoice'));
    }

    protected function prepareForValidation(): void
    {
        // Strip currency formatting before rules run
        $this->merge([
            'amount' => (float) str_replace(['$', ','], '', $this->amount),
        ]);
    }

    public function rules(): array
    {
        return [
            'amount'       => ['required', 'numeric', 'min:0.01'],
            'due_date'     => ['required', 'date', 'after:today'],
            'line_items'   => ['required', 'array', 'min:1'],
            'line_items.*.description' => ['required', 'string', 'max:255'],
            'line_items.*.price'       => ['required', 'numeric', 'min:0'],
            'notes'        => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $lineTotal = collect($this->line_items)->sum('price');
                if (abs($lineTotal - $this->amount) > 0.01) {
                    $validator->errors()->add(
                        'amount',
                        'Amount must equal the sum of line item prices.'
                    );
                }
            },
        ];
    }
}`,
          exercise:
            'Write a `StoreUserRequest` where email must be unique in the `users` table but ignore the current user on update. Add a custom rule `NoDisposableEmail` that rejects addresses from throwaway mail domains (check against a hardcoded list). Write a unit test that asserts the rule rejects "user@mailinator.com".',
        },
        {
          title: 'Redis Caching — Cache Tags, Drivers & Invalidation',
          explanation:
            'Laravel\'s cache layer is a unified API over multiple backends — Redis, Memcached, file, database, DynamoDB. In production, Redis is the default because it supports cache tags (grouping related keys for bulk invalidation), atomic increment/decrement, and TTL-precise expiry. `Cache::remember("key", $ttl, fn)` is the most common pattern — it returns the cached value if it exists, otherwise executes the closure, stores the result, and returns it. Cache tags (`Cache::tags(["products"])->flush()`) let you invalidate all product-related cached data in one call without knowing every individual key.',
          realWorldExample:
            'A product listing page with 10 filter combinations would need 10 different cache keys. Using tags: every product list query is cached under the "products" tag. When any product is updated, `Cache::tags(["products"])->flush()` invalidates all 10 variants. Without tags (file/database drivers), you\'d have to track and delete each key manually — or use a wildcard pattern which Redis supports but is slow.',
          practicalUseCase:
            'Cache the result of an expensive product search query. Invalidate only the product cache (not user cache) when a product is updated. Use `Cache::remember()` with a 15-minute TTL and tags.',
          keyPoints: [
            '`Cache::remember("dashboard_stats", 3600, fn() => Stats::calculate())` — if the key exists in Redis, returns immediately without hitting the database.',
            'Cache tags require a tag-supporting driver (Redis, Memcached) — file and database drivers do NOT support tags.',
            'Avoid caching per-user data under the same key — prefix with user ID: `"user_{$userId}_dashboard"`.',
            '`Cache::forever("config_data", $data)` stores without expiry — use for rarely-changing system config; always pair with a manual `Cache::forget()` on update.',
            'Lock-based cache: `Cache::lock("report_generation", 60)->block(5, fn() => generateReport())` prevents multiple workers from regenerating the same expensive report simultaneously.',
            'HTTP response caching is separate from application caching — consider `spatie/laravel-responsecache` for full-page response caching.',
          ],
          codeExample: `// Cache product list results — invalidated when products change
class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $cacheKey = 'products_' . md5(serialize($request->query()));

        $products = Cache::tags(['products'])
            ->remember($cacheKey, now()->addMinutes(15), function () use ($request) {
                return Product::query()
                    ->with('category')
                    ->when($request->category, fn($q, $v) => $q->where('category_id', $v))
                    ->when($request->min_price, fn($q, $v) => $q->where('price', '>=', $v))
                    ->paginate(25);
            });

        return ProductResource::collection($products)->response();
    }
}

// In Product model observer — flush cache on any product change
class ProductObserver
{
    public function saved(Product $product): void
    {
        Cache::tags(['products'])->flush();
    }

    public function deleted(Product $product): void
    {
        Cache::tags(['products'])->flush();
    }
}

// Prevent thundering herd — only one process regenerates the cache
$result = Cache::lock('product_report_lock', 30)
    ->block(5, function () {
        return Cache::tags(['products'])->remember('monthly_report', 3600, fn() => generateReport());
    });`,
          exercise:
            'Cache the authenticated user\'s notification count under a per-user key. Write a service method that clears only that user\'s notification cache when they mark a notification as read. Prove with `Cache::has()` assertions in a feature test.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between `app()->bind()` and `app()->singleton()` in the Service Container?',
          answer:
            '`bind()` creates a new instance every time the binding is resolved from the container. `singleton()` creates the instance once and returns the same object on every subsequent resolution within the same request lifecycle. Use `singleton()` for stateful services (database connections, HTTP clients, cache managers) where you want one shared instance. Use `bind()` for stateless value objects where each caller needs an independent instance.',
          follow_up: 'When would you use `app()->instance()` instead of singleton()?',
        },
        {
          question: 'You have a page that shows 100 blog posts with their author name and comment count. A junior dev wrote `Post::all()` in the controller and it now fires 201 database queries. How do you fix this?',
          answer:
            'Replace `Post::all()` with `Post::with("author")->withCount("comments")->get()`. This fires exactly 3 queries: one for posts, one for the batch-loaded authors (IN query), one for the aggregated comment counts. The `with("author")` eager-loads the relationship using a WHERE IN (all post IDs) instead of one query per post. `withCount("comments")` uses a subquery in the SELECT clause — no extra round-trip at all.',
          follow_up: 'How would you identify N+1 problems in a production app without modifying code?',
        },
        {
          question: 'What is the difference between Laravel Sanctum token auth and SPA cookie auth?',
          answer:
            'Token auth issues an opaque string stored in the `personal_access_tokens` table. The client sends it as `Authorization: Bearer <token>`. Used for mobile apps and third-party API clients. SPA cookie auth creates an encrypted, httpOnly session cookie — the JavaScript never sees the token, which prevents XSS theft. The client must first hit `/sanctum/csrf-cookie` to get a CSRF token, then all subsequent requests use the cookie automatically. Both use `auth:sanctum` middleware — Sanctum decides which mechanism applies based on whether the request has a session cookie.',
          follow_up: 'What security risk does storing a Sanctum token in localStorage introduce, and how does SPA cookie mode solve it?',
        },
        {
          question: 'Why should you use `$request->validated()` instead of `$request->all()` when creating Eloquent models?',
          answer:
            '`$request->validated()` returns only the fields explicitly declared in the `rules()` array of the Form Request. If an attacker sends extra fields like `is_admin=true` or `role=admin`, they are silently dropped. `$request->all()` returns every field the client sent — if any extra field matches a `$fillable` attribute on the model, it gets mass-assigned directly to the database. This is a mass-assignment vulnerability. The `$fillable` array provides some protection, but `validated()` is a second layer that prevents unexpected fields from ever reaching the model.',
          follow_up: 'What is the `$guarded` property and how does it differ from `$fillable` in terms of security?',
        },
        {
          question: 'How do cache tags work in Redis and why can\'t you use them with the file or database cache driver?',
          answer:
            'Cache tags store a tag-to-key mapping in Redis sets. When you call `Cache::tags(["products"])->put("key", $value)`, Laravel stores `key` in a Redis set named after the "products" tag. `Cache::tags(["products"])->flush()` iterates the set, deletes all keys, and clears the set — O(n) in the number of tagged keys. The file and database drivers have no equivalent of Redis sets for storing key-to-tag relationships. The database driver would require a schema change (a tags pivot table), and the file driver has no indexing mechanism. Spatie\'s `laravel-responsecache` package implements tag-like invalidation for the database driver by storing a tag column.',
          follow_up: 'What is the thundering herd problem with `Cache::remember()` and how does `Cache::lock()` solve it?',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Queue internals, Event-driven architecture, Service Provider deep-dive, production testing patterns, and scaling Eloquent at 10M rows.',
      sections: [
        {
          title: 'Queue System Deep Dive — Drivers, Horizon & Failure Handling',
          explanation:
            'Laravel queues serialize a Job class (including its constructor arguments) to a JSON payload and push it to a queue backend — Redis, SQS, database, or Beanstalkd. A queue worker process (`php artisan queue:work`) polls the backend, deserializes the job, calls `handle()`, and either ACKs success or marks failure. Redis is the standard production driver because it is fast and supports Laravel Horizon — a dashboard that monitors queue throughput, job runtimes, and failure rates in real time. The `failed_jobs` table captures failed jobs with their payload and exception so they can be retried with `php artisan queue:retry {id}`.',
          realWorldExample:
            'A subscription billing system: `ProcessSubscriptionRenewal` runs nightly via Laravel Scheduler dispatching to a "billing" queue. `SendRenewalReceiptEmail` is dispatched from within the job after a successful charge — chained so it only runs if billing succeeds. Stripe webhook events (payment.failed) dispatch `HandleFailedPayment` jobs to a separate "webhooks" queue with higher priority so they are processed ahead of batch jobs.',
          practicalUseCase:
            'Configure Horizon to run two queues: "default" with 3 workers and "emails" with 1 worker. Make a job fail intentionally and observe it in the Horizon failed jobs UI. Retry it and confirm the database record updates.',
          keyPoints: [
            'Jobs implement `ShouldQueue` — the queue worker dispatches via `dispatch()`, not `dispatchSync()`. Use `dispatchSync()` only in tests or when you need synchronous processing.',
            'Horizon tags jobs automatically by Eloquent model ID: `ProcessOrder` with `Order $order` gets tagged "order:15" — lets you search failing jobs by order ID.',
            '`$this->release(30)` inside `handle()` pushes the job back onto the queue with a 30-second delay — useful for rate-limiting third-party API calls.',
            '`UniqueJob` interface prevents duplicate jobs: if a `ProcessUserExport` for user #5 is already queued, a second dispatch is silently dropped. Requires Redis.',
            'Queue batches (`Bus::batch([...jobs])`) run groups of jobs and fire a `then`, `catch`, or `finally` callback when all complete — used for bulk import reporting.',
            'Use separate named queues for different job priorities: dispatch slow reports to "reports", urgent notifications to "high" — run workers with `--queue=high,default`.',
          ],
          codeExample: `// Job with retry, backoff, and timeout
class ProcessSubscriptionRenewal implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public int    $tries   = 3;
    public int    $timeout = 60;    // Kill worker if job exceeds 60s
    public array  $backoff = [30, 120, 300]; // Exponential: 30s, 2min, 5min

    // UniqueId prevents duplicate renewal jobs for same subscription
    public function uniqueId(): string
    {
        return (string) $this->subscription->id;
    }

    public function __construct(private Subscription $subscription) {}

    public function handle(BillingGateway $gateway): void
    {
        $result = $gateway->charge($this->subscription);

        if ($result->requiresRetry()) {
            $this->release(300); // Back to queue in 5 min
            return;
        }

        // Chain — only runs if billing succeeded
        $this->subscription->markRenewed();
        SendRenewalReceiptEmail::dispatch($this->subscription)->onQueue('emails');
    }

    // Called after all $tries are exhausted
    public function failed(Throwable $e): void
    {
        $this->subscription->markFailed();
        Notification::send($this->subscription->owner, new BillingFailedNotification($e));
    }
}

// Batch — import 5000 users, get notified when all complete
$batch = Bus::batch(
    User::whereNull('imported_at')->cursor()
        ->map(fn($user) => new ImportUserJob($user))
        ->all()
)->then(function (Batch $batch) {
    Log::info("Import complete: {$batch->totalJobs} users imported");
})->catch(function (Batch $batch, Throwable $e) {
    Log::error("Batch failed", ['exception' => $e->getMessage()]);
})->onQueue('imports')->dispatch();`,
          exercise:
            'Create a rate-limited job that calls an external weather API (max 10 req/min). Use `$this->release()` to requeue if the rate limit is hit. Use `ShouldBeUnique` so only one weather-fetch job for the same city ID is ever queued. Write a feature test using `Queue::fake()` to assert the job was dispatched and carries the correct city ID.',
        },
        {
          title: 'Events, Listeners & Observers — Decoupling Business Logic',
          explanation:
            'Laravel Events implement the Observer/Pub-Sub pattern. An event class (e.g., `OrderPlaced`) is a plain data object. One or more Listeners respond to it — they can be synchronous (run in the same request) or queued (pushed to a background job). Observers are a simplified version for Eloquent model lifecycle hooks (`creating`, `created`, `updated`, `deleting`). The key benefit: your `OrderController` dispatches `OrderPlaced` without knowing what happens next (email, inventory update, analytics). Adding a new behavior means registering a new Listener — zero changes to the controller.',
          realWorldExample:
            'An e-commerce order flow: `OrderController::store()` dispatches `OrderPlaced($order)`. Three listeners respond: `SendOrderConfirmationEmail` (queued), `DeductInventory` (synchronous — must succeed before response), and `NotifyWarehouse` (queued — pushes to "warehouse" Slack channel). If marketing adds a new "first-order discount" trigger, they register `AwardFirstOrderDiscount` as a 4th listener. The controller is never touched.',
          practicalUseCase:
            'Register an `OrderPlaced` event with two listeners: one that sends a confirmation email (queued) and one that decrements stock (synchronous). Use `Event::fake()` in tests to assert the event was dispatched without actually sending emails.',
          keyPoints: [
            'Register events in `EventServiceProvider::$listen` or use `#[AsListener]` attribute (Laravel 11+). Auto-discovery via `Event::discover()` scans all Listener classes.',
            'Listeners implement `ShouldQueue` to run in the background — the event is serialized and stored in the queue like a regular job.',
            'Model Observers register all Eloquent lifecycle hooks in one class — use `php artisan make:observer ProductObserver --model=Product`.',
            '`Event::fake()` in tests prevents real listeners from firing. Assert with `Event::assertDispatched(OrderPlaced::class, fn($e) => $e->order->id === $order->id)`.',
            'Stoppable events: implement `StoppableEventInterface` — a listener returning `false` or calling `$event->stopPropagation()` prevents subsequent listeners from running.',
            'Observers vs Listeners: Observers are scoped to one model. Listeners can respond to any event — use Listeners for cross-model or cross-domain reactions.',
          ],
          codeExample: `// app/Events/OrderPlaced.php
class OrderPlaced
{
    public function __construct(public readonly Order $order) {}
}

// app/Listeners/SendOrderConfirmationEmail.php
class SendOrderConfirmationEmail implements ShouldQueue
{
    public string $queue = 'emails';

    public function handle(OrderPlaced $event): void
    {
        Mail::to($event->order->customer)->send(new OrderConfirmation($event->order));
    }
}

// app/Listeners/DeductInventory.php (synchronous — no ShouldQueue)
class DeductInventory
{
    public function handle(OrderPlaced $event): void
    {
        foreach ($event->order->items as $item) {
            $item->product->decrement('stock', $item->quantity);
        }
    }
}

// app/Providers/EventServiceProvider.php
protected $listen = [
    OrderPlaced::class => [
        DeductInventory::class,      // Runs first, synchronously
        SendOrderConfirmationEmail::class, // Queued
        NotifyWarehouse::class,      // Queued
    ],
];

// app/Observers/ProductObserver.php
class ProductObserver
{
    public function creating(Product $product): void
    {
        $product->slug = Str::slug($product->name);
    }

    public function deleted(Product $product): void
    {
        Cache::tags(['products'])->flush();
        Storage::disk('public')->deleteDirectory("products/{$product->id}");
    }
}

// Feature test
public function test_placing_an_order_dispatches_order_placed_event(): void
{
    Event::fake();
    $order = Order::factory()->create();

    $this->actingAs($order->customer)
         ->postJson('/api/orders', ['items' => [['product_id' => 1, 'qty' => 2]]])
         ->assertCreated();

    Event::assertDispatched(OrderPlaced::class, fn($e) => $e->order->customer_id === $order->customer_id);
    Event::assertListening(OrderPlaced::class, SendOrderConfirmationEmail::class);
}`,
          exercise:
            'Create a `UserSubscribed` event. Write a `SendWelcomeSequence` queued listener that dispatches 3 delayed email jobs (day 1, day 3, day 7). Write a `GrantAccessPermissions` synchronous listener. Test both with `Event::fake()` and assert the correct job chain was dispatched.',
        },
        {
          title: 'Service Providers — Registering, Booting & Package Internals',
          explanation:
            'Service Providers are Laravel\'s bootstrapping engine. Every framework feature — routing, Eloquent, queues, caching — is registered through a Service Provider. Your app has `AppServiceProvider`, but packages like `spatie/laravel-permission` ship with their own providers registered in `composer.json` under `extra.laravel.providers`. The lifecycle is: `register()` runs for all providers first (container bindings only — no cross-service dependencies here), then `boot()` runs for all providers (safe to use facades, routes, events). Understanding this order prevents "container not ready" errors.',
          realWorldExample:
            'A multi-tenant SaaS: a custom `TenantServiceProvider` is registered early. Its `register()` binds `TenantManager` as a singleton. Its `boot()` reads the subdomain from the request, resolves the correct database connection, and binds a tenant-scoped `DatabaseManager` so every Eloquent query automatically targets the correct tenant\'s database — without any tenant filtering in controllers.',
          practicalUseCase:
            'Write a `AnalyticsServiceProvider` that registers an `AnalyticsClient` singleton (reading API keys from config), adds a Blade directive `@trackEvent("name")`, and registers a route macro `Route::tracking()`.',
          keyPoints: [
            '`register()` should ONLY bind things into the container — calling `config()`, `view()`, or `auth()` here fails because those services are not registered yet.',
            '`boot()` has full access to all framework services. Register Blade directives, view composers, route model bindings, event listeners, and validators here.',
            'Deferred providers (`implements DeferrableProvider`): the provider is not loaded until one of its declared services is actually resolved — improves cold-start performance.',
            '`$this->publishes([...])` in a package provider allows `php artisan vendor:publish` to copy config, migrations, and views into the application.',
            '`$this->mergeConfigFrom(__DIR__."/../config/package.php", "package")` lets your package have default config that the app can partially override.',
            'Load order matters: providers listed earlier in `config/app.php` boot first. If Provider B depends on Provider A\'s bindings, A must come first.',
          ],
          codeExample: `// app/Providers/AnalyticsServiceProvider.php
class AnalyticsServiceProvider extends ServiceProvider implements DeferrableProvider
{
    // DeferrableProvider — only loads when AnalyticsClient is actually needed
    public function provides(): array
    {
        return [AnalyticsClient::class];
    }

    public function register(): void
    {
        $this->app->singleton(AnalyticsClient::class, function (Application $app) {
            return new SegmentClient(
                writeKey: config('analytics.segment_key'),
                timeout: config('analytics.timeout', 2),
            );
        });
    }

    public function boot(): void
    {
        // Blade directive: @trackEvent('button_clicked')
        Blade::directive('trackEvent', function (string $expression) {
            return "<?php app(AnalyticsClient::class)->track({$expression}, auth()->id()); ?>";
        });

        // Macro: Route::tracking('/events', TrackingController::class)
        Route::macro('tracking', function (string $uri, string $controller) {
            return Route::post($uri, $controller)->middleware(['auth:sanctum', 'throttle:analytics']);
        });

        // View composer — inject analytics config into every view
        View::composer('*', function (View $view) {
            $view->with('analyticsEnabled', config('analytics.enabled'));
        });

        // Publish config if this is a package
        $this->publishes([
            __DIR__.'/../config/analytics.php' => config_path('analytics.php'),
        ], 'analytics-config');
    }
}`,
          exercise:
            'Write a `TenantServiceProvider` that reads the `X-Tenant-ID` request header, validates it against a `tenants` database table (cache the result for 60 seconds), and binds the resolved `Tenant` model as a singleton so any class can inject `Tenant $tenant`. Write a test that proves requests with an invalid header return 422 before reaching the controller.',
        },
        {
          title: 'Feature Testing, Queue Fakes & Database Assertions',
          explanation:
            'Laravel\'s testing framework wraps PHPUnit with HTTP simulation (`$this->postJson()`), database assertions (`assertDatabaseHas()`), and fakes for queues, mail, events, and HTTP clients (`Http::fake()`). Feature tests are the most valuable — they test the full request lifecycle: middleware, controller, service, database. `RefreshDatabase` wraps each test in a transaction that rolls back after the test, keeping tests isolated. `Queue::fake()` prevents jobs from actually running — you assert they were dispatched with the right payload instead.',
          realWorldExample:
            'A checkout test: `Queue::fake()`, `Mail::fake()`, `Http::fake(["stripe.com/*" => Http::response(["id" => "ch_123"])])`. POST to `/api/checkout`. Assert 201, assert `orders` table has the row, assert `ProcessPayment` job was dispatched, assert `OrderConfirmation` mailable was queued to the user\'s email. The entire checkout flow is tested without hitting Stripe, without sending emails, without running background workers.',
          practicalUseCase:
            'Write a test for a checkout endpoint that fakes Stripe, fakes the queue, asserts the database state, and asserts the correct job was dispatched with the correct order amount.',
          keyPoints: [
            '`RefreshDatabase` uses database transactions (fast) by default. `DatabaseMigrations` trait re-runs migrations before each test (slow) — avoid for large test suites.',
            '`Http::fake(["api.stripe.com/*" => Http::response(["id" => "ch_test"])])` intercepts outbound HTTP calls — no real API calls in tests.',
            '`Queue::fake()` — then `Queue::assertPushed(SendWelcomeEmail::class, fn($job) => $job->user->id === $user->id)` to assert correct job with correct data.',
            '`Mail::fake()` — then `Mail::assertQueued(OrderConfirmation::class, fn($m) => $m->hasTo($user->email))` — asserts the mailable was queued, not sent synchronously.',
            'Use `$this->seed(ProductSeeder::class)` instead of `DatabaseSeeder::class` to seed only what the test needs — faster and explicit.',
            'Avoid `assertDatabaseHas()` for encrypted or hashed columns — query with `User::where("email", $email)->exists()` and assert the model state instead.',
          ],
          codeExample: `class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_creates_order_and_dispatches_payment_job(): void
    {
        // Arrange
        Queue::fake();
        Mail::fake();
        Http::fake([
            'api.stripe.com/*' => Http::response(['id' => 'ch_test_123', 'status' => 'succeeded'], 200),
        ]);

        $user    = User::factory()->create();
        $product = Product::factory()->create(['price' => 49.99, 'stock' => 10]);

        // Act
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/checkout', [
                'items'          => [['product_id' => $product->id, 'quantity' => 2]],
                'payment_token'  => 'tok_visa',
            ]);

        // Assert HTTP response
        $response->assertCreated()
                 ->assertJsonPath('data.status', 'pending')
                 ->assertJsonPath('data.total', '99.98');

        // Assert database state
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'total'   => 99.98,
            'status'  => 'pending',
        ]);

        $this->assertDatabaseHas('products', [
            'id'    => $product->id,
            'stock' => 8, // Decremented synchronously
        ]);

        // Assert job dispatched with correct payload
        Queue::assertPushed(ProcessStripePayment::class, function ($job) use ($user) {
            return $job->order->user_id === $user->id
                && $job->order->total == 99.98;
        });

        // Assert email queued to correct address
        Mail::assertQueued(OrderConfirmation::class, fn($m) => $m->hasTo($user->email));
    }

    public function test_checkout_returns_422_when_product_out_of_stock(): void
    {
        $user    = User::factory()->create();
        $product = Product::factory()->create(['stock' => 0]);

        $this->actingAs($user, 'sanctum')
             ->postJson('/api/checkout', [
                 'items' => [['product_id' => $product->id, 'quantity' => 1]],
             ])
             ->assertUnprocessable()
             ->assertJsonValidationErrors(['items.0.quantity']);
    }
}`,
          exercise:
            'Write a test for a "bulk delete products" endpoint. Fake the queue. Assert: 200 response, all product IDs missing from the database, `DeleteProductImages` job dispatched once per product with the correct product ID, and that an admin token can call it but a regular user token gets 403.',
        },
        {
          title: 'Scaling Eloquent — Large Datasets, Indexes & Query Analysis',
          explanation:
            'Eloquent is convenient but can destroy performance at scale. `Model::all()` on a 5M-row table loads all 5M objects into PHP memory — it will crash. `chunk(1000)` or `cursor()` (which uses a server-side cursor via `yield`) processes large datasets without memory exhaustion. Missing database indexes are the most common production performance bug — a `WHERE status = "active"` on 10M rows without an index is a full table scan (seconds). The `EXPLAIN` command in MySQL and `DB::listen()` in Laravel reveal the actual queries and their execution plans.',
          realWorldExample:
            'An analytics report exports 500,000 user records to CSV. `User::all()` → out-of-memory crash. `User::chunk(500, fn($batch) => writeCsv($batch))` → processes in 1000 batches of 500, steady ~10MB memory. After adding composite indexes on `(status, created_at)` and `(country, status)`, filter queries that took 4 seconds drop to 12ms. `DB::listen()` during development logged 47 queries on the dashboard page — eager loading reduced it to 5.',
          practicalUseCase:
            'Use `DB::listen()` to log all queries during a slow page load. Identify missing indexes with `EXPLAIN SELECT ...`. Add an index via migration and measure the before/after query time.',
          keyPoints: [
            '`cursor()` uses a PHP Generator and a MySQL cursor — memory stays constant at ~few MB regardless of row count. Use for large exports. Cannot be used with eager loading.',
            '`chunk()` runs a new paginated query per batch using LIMIT/OFFSET — safe for most cases but OFFSET gets slower as N grows. Prefer `chunkById()` which uses WHERE id > last_id — O(1) regardless of position.',
            'Composite indexes: `(status, created_at)` satisfies `WHERE status=? ORDER BY created_at DESC`. Column order matters — put the equality condition first, range/order last.',
            'Select only needed columns: `User::select(["id", "name", "email"])->get()` — avoids transmitting and hydrating unused columns (e.g., JSON blobs, TEXT fields).',
            'Avoid `whereHas()` on large tables — it generates a correlated subquery (`EXISTS (SELECT ... WHERE user_id = users.id)`). Use a `JOIN` via `whereIn()` + a pre-fetched ID list for better index usage.',
            '`DB::statement("ANALYZE TABLE orders")` and `DB::select("EXPLAIN SELECT ...")` give you query plan data directly from Laravel without leaving the framework.',
          ],
          codeExample: `// BAD — loads all rows into memory
$users = User::where('status', 'active')->get(); // 2M rows = crash

// GOOD — chunkById processes in batches, O(1) memory
User::where('status', 'active')
    ->chunkById(500, function (Collection $users) use ($csvWriter) {
        $users->each(fn($user) => $csvWriter->writeRow([$user->id, $user->email]));
    });

// BETTER for read-only export — cursor uses server-side cursor, true streaming
foreach (User::where('status', 'active')->cursor() as $user) {
    $csvWriter->writeRow([$user->id, $user->email]);
}

// Migration — composite index for common query patterns
Schema::table('orders', function (Blueprint $table) {
    // Covers: WHERE status = ? AND created_at BETWEEN ? AND ?
    $table->index(['status', 'created_at'], 'orders_status_created_at_idx');

    // Covers: WHERE user_id = ? AND status = ?
    $table->index(['user_id', 'status'], 'orders_user_status_idx');
});

// Diagnose slow queries in development
DB::listen(function (QueryExecuted $query) {
    if ($query->time > 100) { // Log queries slower than 100ms
        Log::warning('Slow query', [
            'sql'  => $query->sql,
            'time' => $query->time . 'ms',
        ]);
    }
});

// Avoid N+1 in a report without full eager loading
$userIds = Order::where('status', 'completed')
    ->where('created_at', '>=', now()->subMonth())
    ->pluck('user_id')
    ->unique();

$users = User::whereIn('id', $userIds)->select(['id', 'name', 'email'])->get();`,
          exercise:
            'Write a command `php artisan export:active-users` that exports all active users to a CSV using `chunkById(500)`. Add `DB::listen()` to count total queries. Prove memory stays under 30MB with 10,000 seeded users using `memory_get_peak_usage()`. Then add a missing index on `(status, created_at)` and measure the query time drop using `DB::listen()`.',
        },
      ],
      interviewQA: [
        {
          question: 'A production job processes Stripe webhooks. It occasionally fails with a "Deadlock found" MySQL error. How do you handle this in Laravel?',
          answer:
            'Deadlocks are transient and retrying usually resolves them. Configure `public array $backoff = [1, 5, 10]` on the job for exponential retry delays. Set `public int $tries = 5`. In `handle()`, wrap the database transaction in `DB::transaction(fn() => ..., attempts: 3)` — Laravel retries the entire transaction on deadlock automatically. In `failed()`, log the full exception with the webhook payload so you can manually retry via `php artisan queue:retry {id}`. Add `ShouldBeUnique` with a uniqueId of the Stripe event ID to prevent duplicate processing if Stripe resends the webhook.',
          follow_up: 'How do you prevent duplicate webhook processing when Stripe sends the same event twice?',
        },
        {
          question: 'What is the difference between `Event::fake()`, `Queue::fake()`, and `Bus::fake()` in tests?',
          answer:
            '`Event::fake()` prevents event listeners from running — events are dispatched but listeners are not called. Use it when you want to assert an event was fired without triggering side effects. `Queue::fake()` prevents jobs from being pushed to the queue driver — `dispatch()` calls are recorded but no worker processes them. Use it to assert jobs are dispatched with correct payloads. `Bus::fake()` fakes both jobs and batches — use when testing `Bus::batch()`. The key: all three let you assert what was dispatched without executing the actual side effects (emails sent, queues processed, events listened).',
          follow_up: 'How do you test that a queued listener actually fires when an event is dispatched without faking the queue?',
        },
        {
          question: 'You have a `Product::with("variants")->get()` call that loads 50,000 variants. The page takes 8 seconds. How do you diagnose and fix this?',
          answer:
            'First diagnose: wrap the call in `DB::enableQueryLog()` and inspect `DB::getQueryLog()` to see the actual SQL and timing. Check if `variants` is missing an index on `product_id` — `EXPLAIN SELECT * FROM variants WHERE product_id IN (...)` will show a full table scan. Fix the index first (biggest win). Then pagination: replace `get()` with `paginate(25)` so only 25 products and their variants load per request. Consider `with("variants:id,product_id,name,price")` to select only needed variant columns — reduces data transfer. If 8s is still too slow, cache the result per product page with Redis tags and invalidate on product/variant update.',
          follow_up: 'When would you use `lazyLoad()` instead of `with()` for relationships?',
        },
        {
          question: 'Explain the Service Provider boot order and why calling `Cache::` inside `register()` causes an error.',
          answer:
            'Laravel boots all providers in two passes. Pass 1: calls `register()` on every provider in order — only container bindings are safe here because other providers may not have run yet. The `CacheServiceProvider` registers the cache manager in pass 1, but if your provider also runs in pass 1 and depends on cache, the cache may not be registered yet. Pass 2: calls `boot()` on every provider — at this point all `register()` calls have completed, so all services including Cache, Auth, DB, and Queue are available. Calling `Cache::get()` inside `register()` throws "Target class [cache] does not exist" because the cache binding has not been registered yet.',
          follow_up: 'How do deferred Service Providers improve application boot performance?',
        },
        {
          question: 'How does `chunkById()` differ from `chunk()` and why is it preferred for large tables?',
          answer:
            '`chunk(500)` uses LIMIT/OFFSET internally: first batch is `LIMIT 500 OFFSET 0`, second is `LIMIT 500 OFFSET 500`, etc. At offset 100,000, MySQL must scan and skip 100,000 rows before returning 500 — it gets progressively slower. `chunkById(500)` uses `WHERE id > {last_seen_id} ORDER BY id LIMIT 500` — the WHERE clause hits the primary key index directly, making each batch O(log n) regardless of position in the table. The tradeoff: `chunkById()` requires a sortable unique column (usually the primary key) and cannot be used when you need to delete rows inside the chunk (IDs shift and you skip records).',
          follow_up: 'When would you use `cursor()` over `chunkById()` and what are the memory trade-offs?',
        },
        {
          question: 'A Laravel app is using `belongsToMany` for User → Roles. Adding `->withPivot("granted_at")` to the relationship made a page slow. Why?',
          answer:
            'Without `withPivot()`, Eloquent\'s belongsToMany SELECT query selects only the foreign key columns from the pivot table: `SELECT roles.*, role_user.user_id, role_user.role_id`. Adding `withPivot("granted_at")` adds the column to the SELECT — this alone is not slow. The slowdown is usually that the developer then accesses `$user->roles` inside a loop (N+1 problem), or the pivot table `role_user` lacks a composite index on `(user_id, role_id)`. Add `$table->primary(["user_id", "role_id"])` in the pivot migration. Then verify with `DB::listen()` that loading 50 users with their roles fires exactly 2 queries, not 51.',
          follow_up: 'How do you add extra columns to a pivot table and access them in Eloquent without creating a full Pivot model?',
        },
      ],
    },
  ],
};
