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
      intro: 'Authentication, form validation, API building, queues, and the service container.',
      sections: [
        {
          title: 'Authentication with Laravel Breeze',
          explanation:
            'Laravel Breeze is the simplest authentication starter. It scaffolds login, register, password reset, and email verification pages — all pre-wired with validation and session management.',
          realWorldExample:
            'Most SaaS products (project management tools, CRMs) start with Laravel Breeze for auth then build product features on top.',
          practicalUseCase:
            'Install Breeze, add a "profile" page that shows the logged-in user\'s info, and protect it with the auth middleware.',
          codeExample: `# Install
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run dev
php artisan migrate

# Protect routes — only logged-in users can access
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'show']);
});

# In controller — get current user
public function show(Request $request) {
    return view('profile.show', ['user' => $request->user()]);
}`,
          exercise:
            'Add a "role" field to users (admin/user). Create a middleware that restricts certain routes to admins only.',
        },
        {
          title: 'Form Validation & Requests',
          explanation:
            'Laravel\'s validation system checks incoming data against rules before it reaches your controller. Form Request classes keep validation logic in dedicated classes — keeping controllers slim.',
          realWorldExample:
            'A job application form validates that the CV upload is a PDF (max 2MB), email is a valid format and unique in the database, and the cover letter is between 100 and 2000 characters.',
          practicalUseCase:
            'Build a contact form with validation: name (required, max 100), email (required, valid email), message (required, min 10, max 1000).',
          codeExample: `# Generate a Form Request
php artisan make:request StorePostRequest

# app/Http/Requests/StorePostRequest.php
class StorePostRequest extends FormRequest {
    public function authorize(): bool {
        return auth()->check();
    }

    public function rules(): array {
        return [
            'title'   => ['required', 'string', 'max:255'],
            'body'    => ['required', 'string', 'min:10'],
            'tags'    => ['array', 'max:5'],
            'tags.*'  => ['string', 'max:30'],
        ];
    }

    public function messages(): array {
        return [
            'body.min' => 'Post body must be at least 10 characters.',
        ];
    }
}

# Controller — inject the Form Request
public function store(StorePostRequest $request) {
    // $request->validated() — only validated, safe data
    $post = Post::create($request->validated() + ['user_id' => auth()->id()]);
    return redirect()->route('posts.show', $post);
}`,
          exercise:
            'Add a unique email validation rule for registration that ignores the current user\'s own email on the update profile form.',
        },
        {
          title: 'Building a REST API with Laravel',
          explanation:
            'Laravel is excellent for building APIs. API routes are in routes/api.php. Laravel Sanctum handles token authentication for SPAs and mobile apps. API Resources format Eloquent models as JSON responses.',
          realWorldExample:
            'A React/Next.js frontend calls the Laravel API: GET /api/products returns a JSON list, POST /api/orders creates an order. The Laravel API returns clean, consistent JSON responses.',
          practicalUseCase:
            'Build a products API: GET /api/products, POST /api/products, GET /api/products/{id}, PUT and DELETE.',
          codeExample: `# routes/api.php
Route::middleware('auth:sanctum')->apiResource('products', ProductController::class);

# Generate API Resource
php artisan make:resource ProductResource

# app/Http/Resources/ProductResource.php
class ProductResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'price'      => number_format($this->price, 2),
            'inStock'    => $this->stock > 0,
            'createdAt'  => $this->created_at->toIso8601String(),
        ];
    }
}

# Controller
public function index() {
    return ProductResource::collection(Product::paginate(15));
}

public function store(StoreProductRequest $request) {
    $product = Product::create($request->validated());
    return new ProductResource($product);
}`,
          exercise:
            'Add filtering to GET /api/products: ?category=electronics&min_price=100&max_price=500.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the N+1 query problem and how does Laravel solve it?',
          answer:
            'N+1 occurs when you load N records and then make 1 extra query per record to get related data (N additional queries). Laravel solves this with eager loading: Post::with("user")->get() fetches all posts and all their users in just 2 queries.',
        },
        {
          question: 'What is the Service Container in Laravel?',
          answer:
            'The Service Container (IoC Container) is Laravel\'s dependency injection system. When a class type-hints a dependency in its constructor, Laravel automatically resolves and injects it. This makes code more testable and decoupled.',
        },
        {
          question: 'What is the difference between hasMany and belongsToMany?',
          answer:
            'hasMany is a one-to-many relationship (User hasMany Posts). belongsToMany is many-to-many — requires a pivot table (Post belongsToMany Tags, because a post can have many tags and a tag can belong to many posts).',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Events, queues, caching, testing, design patterns, and scaling Laravel apps.',
      sections: [
        {
          title: 'Queues & Jobs — Background Processing',
          explanation:
            'Queues let you defer slow tasks (sending emails, processing images, calling third-party APIs) to run in the background so the HTTP response returns immediately to the user.',
          realWorldExample:
            'When you sign up to a service, you get a welcome email instantly — but it was queued in the background. The response returned "registered!" immediately while the email job was processed by a queue worker milliseconds later.',
          practicalUseCase:
            'Queue a "WelcomeEmail" job when a user registers. Run the queue worker and verify the email was sent.',
          codeExample: `# Generate job
php artisan make:job SendWelcomeEmail

# app/Jobs/SendWelcomeEmail.php
class SendWelcomeEmail implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable;

    public function __construct(private User $user) {}

    public function handle(): void {
        Mail::to($this->user)->send(new WelcomeMailer($this->user));
    }

    // Retry on failure — up to 3 times, wait 30s between retries
    public int $tries = 3;
    public int $backoff = 30;
}

# Dispatch in controller (returns immediately)
SendWelcomeEmail::dispatch($user);

# Or delay it by 10 minutes
SendWelcomeEmail::dispatch($user)->delay(now()->addMinutes(10));

# Run the worker (in a separate terminal)
php artisan queue:work --tries=3`,
          exercise:
            'Create a job that resizes an uploaded image to three sizes (thumbnail, medium, large) and stores them. Dispatch it from the upload controller.',
        },
        {
          title: 'Testing Laravel Applications',
          explanation:
            'Laravel has built-in testing support via PHPUnit. Feature tests simulate HTTP requests and assert responses. Unit tests test individual classes in isolation. The RefreshDatabase trait resets the database after each test.',
          realWorldExample:
            'Before deploying to production, the test suite runs: 200+ tests covering auth, CRUD, API endpoints, and edge cases. If any test fails, the deployment is blocked.',
          practicalUseCase:
            'Write feature tests for your products API: test creating, listing, updating, and deleting a product.',
          codeExample: `# Generate a test
php artisan make:test ProductApiTest

class ProductApiTest extends TestCase {
    use RefreshDatabase;

    public function test_authenticated_user_can_create_product(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/products', [
                'name'  => 'Test Product',
                'price' => 9.99,
                'stock' => 10,
            ]);

        $response->assertCreated()
                 ->assertJsonPath('data.name', 'Test Product');

        $this->assertDatabaseHas('products', ['name' => 'Test Product']);
    }

    public function test_unauthenticated_user_cannot_access_products(): void
    {
        $this->getJson('/api/products')->assertUnauthorized();
    }
}`,
          exercise:
            'Write a test for the N+1 prevention: assert that listing 10 posts with their users generates exactly 2 database queries.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between Laravel Events and Jobs?',
          answer:
            'Events represent something that happened in your app (UserRegistered, OrderPlaced). Listeners respond to events (can be synchronous or queued). Jobs are units of work to be queued and processed in the background. Events are for decoupling; Jobs are for deferred work.',
        },
        {
          question: 'How does Laravel\'s caching work?',
          answer:
            'Laravel supports multiple cache backends (Redis, Memcached, database, file). Cache::remember("key", ttl, fn) returns cached data if available, otherwise runs the closure, stores the result, and returns it. Cache::tags() lets you invalidate groups of related cached items.',
        },
        {
          question: 'What is Repository Pattern and why use it in Laravel?',
          answer:
            'Repository Pattern abstracts the data access layer. Instead of calling Eloquent directly in controllers, you call $repo->findAll(). Benefits: easier to test (mock the repo), swap databases without changing controllers, and centralise query logic.',
        },
      ],
    },
  ],
};
