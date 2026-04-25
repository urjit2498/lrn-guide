import { Topic } from '@/types';

export const phpTopic: Topic = {
  id: 'php',
  name: 'PHP',
  icon: '🐘',
  color: 'bg-indigo-100 dark:bg-indigo-900/30',
  textColor: 'text-indigo-700 dark:text-indigo-300',
  borderColor: 'border-indigo-300 dark:border-indigo-700',
  description: 'PHP is a server-side scripting language used to build dynamic websites and web apps.',
  levels: [
    {
      level: 'beginner',
      intro: 'Learn the fundamentals — variables, loops, functions, and how PHP fits into the web.',
      sections: [
        {
          title: 'What is PHP?',
          explanation:
            'PHP stands for "PHP: Hypertext Preprocessor". It runs on a web server and generates HTML pages. When a user visits a page, PHP code runs on the server, builds the HTML, and sends it to the browser. The user never sees PHP code — only the result.',
          realWorldExample:
            'WordPress — the platform behind 40% of all websites — is built entirely in PHP. When you visit a WordPress blog, PHP queries the database, gets the post content, and builds the page you see.',
          practicalUseCase:
            'Build a simple "Hello, World" PHP page. Create a file called index.php, write <?php echo "Hello, World!"; ?>, and open it in a browser via a local server (XAMPP or MAMP).',
          codeExample: `<?php
// Variables start with $
$name = "Alice";
$age  = 25;

// String interpolation with double quotes
echo "Hello, my name is $name and I am $age years old.";

// Concatenation with the dot (.) operator
echo "Hello, " . $name . "!";
?>`,
          exercise:
            'Create a PHP file that asks for a name via a form (GET request) and greets the user by name on the same page.',
        },
        {
          title: 'Variables, Data Types & Operators',
          explanation:
            'PHP is loosely typed — you do not declare the type, PHP figures it out. The main types are: string (text), integer (whole number), float (decimal), boolean (true/false), array (list), and null (no value).',
          realWorldExample:
            'An e-commerce site stores a product price as float ($price = 9.99), product name as string ($name = "T-Shirt"), and whether it is in stock as boolean ($inStock = true).',
          practicalUseCase:
            'Build a simple calculator that takes two numbers and an operator (+, -, *, /) from a form and displays the result.',
          codeExample: `<?php
$price    = 19.99;    // float
$quantity = 3;        // integer
$item     = "Mug";    // string
$onSale   = true;     // boolean

$total = $price * $quantity;
echo "Total for $item: $$total";

// Comparison operators
if ($total > 50) {
    echo " — you qualify for free shipping!";
}
?>`,
          exercise:
            'Write a PHP script that checks if a number is even or odd and prints the result.',
        },
        {
          title: 'Loops & Arrays',
          explanation:
            'Loops let you repeat code. Arrays let you store many values under one variable. Together they are powerful for handling lists of data.',
          realWorldExample:
            'A shopping cart page loops through an array of cart items and prints each product name and price in a table.',
          practicalUseCase:
            'Create an array of 5 fruit names and print each one using a foreach loop.',
          codeExample: `<?php
// Indexed array
$fruits = ["Apple", "Banana", "Cherry", "Mango", "Orange"];

foreach ($fruits as $fruit) {
    echo "- $fruit<br>";
}

// Associative array (key → value)
$person = [
    "name" => "Bob",
    "age"  => 30,
    "city" => "Mumbai",
];

echo $person["name"] . " lives in " . $person["city"];
?>`,
          exercise:
            'Build a "to-do list" page: store tasks in an array and loop through them with numbering.',
        },
        {
          title: 'Functions',
          explanation:
            'Functions are reusable blocks of code. You define them once and call them anywhere. This avoids repeating the same code.',
          realWorldExample:
            'A website uses a formatPrice($amount) function in multiple places (cart page, checkout page, product page) so the price format is always consistent.',
          practicalUseCase:
            'Write a function that accepts a first name and last name and returns the full name.',
          codeExample: `<?php
function greet(string $name): string {
    return "Hello, $name! Welcome to LRN Guide.";
}

function add(int $a, int $b): int {
    return $a + $b;
}

echo greet("Alice");    // Hello, Alice! Welcome to LRN Guide.
echo add(5, 3);         // 8
?>`,
          exercise:
            'Write a function calculateDiscount($price, $percent) that returns the discounted price.',
        },
      ],
      interviewQA: [
        {
          question: 'What is PHP used for?',
          answer:
            'PHP is a server-side scripting language used for building dynamic web pages, form handling, database interaction, and REST APIs. It powers popular platforms like WordPress, Laravel, and Drupal.',
        },
        {
          question: 'What is the difference between echo and print in PHP?',
          answer:
            'Both output text. echo is slightly faster and can output multiple values separated by commas. print always returns 1 and can only output a single value. In practice, echo is preferred.',
        },
        {
          question: 'What is the difference between == and === in PHP?',
          answer:
            '"==" checks value only (loose comparison — "3" == 3 is true). "===" checks both value AND type (strict — "3" === 3 is false because one is a string and the other is an integer).',
        },
        {
          question: 'What are superglobals in PHP?',
          answer:
            'Superglobals are built-in variables always accessible anywhere in a script: $_GET, $_POST (form data), $_SESSION (session data), $_COOKIE, $_SERVER (server info), $_FILES (file uploads), and $GLOBALS.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Go deeper — OOP, file handling, sessions, form validation, and working with databases.',
      sections: [
        {
          title: 'Object-Oriented PHP (OOP)',
          explanation:
            'OOP lets you organise code into classes (blueprints) and objects (instances). A class has properties (data) and methods (functions). OOP makes large codebases easier to manage and test.',
          realWorldExample:
            'A Laravel model is a PHP class. The User class represents users in the database. You call User::find(1) to get user with ID 1 — all the SQL logic is hidden inside the class.',
          practicalUseCase:
            'Create a BankAccount class with a balance property and deposit/withdraw methods.',
          codeExample: `<?php
class BankAccount {
    private float $balance;

    public function __construct(float $initialBalance = 0) {
        $this->balance = $initialBalance;
    }

    public function deposit(float $amount): void {
        if ($amount <= 0) throw new InvalidArgumentException("Amount must be positive");
        $this->balance += $amount;
    }

    public function withdraw(float $amount): void {
        if ($amount > $this->balance) throw new RuntimeException("Insufficient funds");
        $this->balance -= $amount;
    }

    public function getBalance(): float {
        return $this->balance;
    }
}

$account = new BankAccount(100);
$account->deposit(50);
$account->withdraw(30);
echo "Balance: $" . $account->getBalance(); // Balance: $120
?>`,
          exercise:
            'Extend BankAccount with a transaction history feature — store each deposit/withdrawal in an array and add a getHistory() method.',
        },
        {
          title: 'PDO — Connecting PHP to MySQL',
          explanation:
            'PDO (PHP Data Objects) is the safe way to talk to databases. It uses prepared statements to prevent SQL injection — one of the most common security vulnerabilities.',
          realWorldExample:
            'Every form submission on a website (login, register, contact) goes through PDO to safely insert or query data without risk of malicious SQL being injected.',
          practicalUseCase:
            'Build a simple user registration form that inserts name and email into a MySQL users table using PDO.',
          codeExample: `<?php
// Connect
$pdo = new PDO(
    "mysql:host=localhost;dbname=myapp;charset=utf8mb4",
    "root",
    "password",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// INSERT with prepared statement (safe — no SQL injection)
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->execute(["name" => "Alice", "email" => "alice@example.com"]);

// SELECT
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(["email" => "alice@example.com"]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
echo $user["name"]; // Alice
?>`,
          exercise:
            'Build a basic CRUD (Create, Read, Update, Delete) page for a "notes" table with title and body columns.',
        },
        {
          title: 'Sessions & Authentication',
          explanation:
            'HTTP is stateless — each request is independent. Sessions allow you to remember a user across requests (e.g., keeping them logged in). PHP stores session data on the server and gives the browser a session ID cookie.',
          realWorldExample:
            'When you log into a website, PHP stores your user ID in a session. Every subsequent request checks $_SESSION["user_id"] to verify you are authenticated.',
          practicalUseCase:
            'Build a login/logout system: store user ID in session on login, destroy session on logout, protect a "dashboard" page.',
          codeExample: `<?php
session_start(); // Always call first

// Login
function login(string $email, string $password, PDO $pdo): bool {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(["email" => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user["password"])) {
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["user_name"] = $user["name"];
        return true;
    }
    return false;
}

// Protect a page
function requireLogin(): void {
    if (empty($_SESSION["user_id"])) {
        header("Location: /login.php");
        exit;
    }
}

// Logout
function logout(): void {
    session_destroy();
    header("Location: /login.php");
    exit;
}
?>`,
          exercise:
            'Build a "remember me" feature using cookies that persists login for 7 days.',
        },
      ],
      interviewQA: [
        {
          question: 'What are the four pillars of OOP?',
          answer:
            'Encapsulation (hiding internal details), Inheritance (child class reuses parent class), Polymorphism (same interface, different behaviours), and Abstraction (hiding complexity behind simple interfaces).',
        },
        {
          question: 'Why use prepared statements instead of plain SQL queries?',
          answer:
            'Prepared statements separate SQL code from user data, preventing SQL injection attacks. The query structure is compiled once and then data is passed separately, so malicious input cannot alter the query logic.',
        },
        {
          question: 'What is the difference between include and require in PHP?',
          answer:
            'Both include another PHP file. include gives a warning and continues if the file is missing. require throws a fatal error and stops execution. Use require for critical files (config, database) and include for optional ones.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Master design patterns, Composer, REST APIs, performance, and PHP 8 features.',
      sections: [
        {
          title: 'Composer & Package Management',
          explanation:
            'Composer is PHP\'s dependency manager. It lets you pull in third-party libraries (packages) from Packagist with a single command. It also handles autoloading so you never need manual require/include.',
          realWorldExample:
            'Laravel itself is installed via Composer. Every package you add (e.g., league/flysystem for file storage, guzzlehttp/guzzle for HTTP requests) is managed by Composer.',
          practicalUseCase:
            'Create a small project that uses Guzzle to fetch data from a public API (e.g., GitHub user info) and display it.',
          codeExample: `# Terminal
composer require guzzlehttp/guzzle

# PHP
<?php
require "vendor/autoload.php"; // Composer's autoloader

use GuzzleHttp\\Client;

$client = new Client(["base_uri" => "https://api.github.com/"]);
$response = $client->get("users/torvalds", [
    "headers" => ["User-Agent" => "MyApp/1.0"],
]);

$data = json_decode($response->getBody(), true);
echo $data["name"];       // Linus Torvalds
echo $data["public_repos"]; // Number of repos
?>`,
          exercise:
            'Build a simple CLI script using Composer packages that fetches current weather from a free API and displays temperature and description.',
        },
        {
          title: 'Building a REST API in PHP',
          explanation:
            'A REST API lets other applications communicate with yours over HTTP. PHP can act as an API backend that a React or mobile frontend calls. You receive JSON, process it, and respond with JSON.',
          realWorldExample:
            'The backend of a food delivery app is a PHP REST API. The mobile app sends POST /orders with order details, PHP processes the order, saves to database, and responds with {"status":"confirmed","orderId":123}.',
          practicalUseCase:
            'Build a /api/products endpoint that returns a JSON list of products (GET), and accepts a POST request to create a new product.',
          codeExample: `<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$method = $_SERVER["REQUEST_METHOD"];
$uri    = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Simple router
match (true) {
    $method === "GET"  && $uri === "/api/products" => getProducts(),
    $method === "POST" && $uri === "/api/products" => createProduct(),
    default => jsonResponse(["error" => "Not found"], 404),
};

function getProducts(): void {
    // In real code, fetch from database
    jsonResponse(["data" => [["id" => 1, "name" => "Laptop", "price" => 999]]]);
}

function createProduct(): void {
    $body = json_decode(file_get_contents("php://input"), true);
    // Validate, save to DB...
    jsonResponse(["data" => $body, "message" => "Created"], 201);
}

function jsonResponse(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
?>`,
          exercise:
            'Add a DELETE /api/products/{id} endpoint and a PUT endpoint to update a product.',
        },
        {
          title: 'PHP 8 Modern Features',
          explanation:
            'PHP 8 introduced powerful features that make code cleaner and faster: Named Arguments, Match expressions, Nullsafe Operator, Union Types, Constructor Property Promotion, and Fibers (async).',
          realWorldExample:
            'Laravel 9+ requires PHP 8.0+ to take full advantage of union types for controller parameters, match expressions in middleware, and constructor promotion for cleaner service classes.',
          practicalUseCase:
            'Refactor a PHP 7 class to use PHP 8 constructor property promotion, match expression, and nullsafe operator.',
          codeExample: `<?php
// Constructor Property Promotion (PHP 8.0)
class User {
    public function __construct(
        public readonly int $id,
        public string $name,
        public string $email,
    ) {}
}

// Match expression (like switch, but returns a value)
$status = 2;
$label = match($status) {
    1 => "Active",
    2 => "Pending",
    3 => "Banned",
    default => "Unknown",
};

// Nullsafe operator (?->)
$city = $user?->getAddress()?->getCity() ?? "Unknown";

// Named arguments
function createOrder(string $product, int $qty = 1, float $discount = 0.0) {}
createOrder(product: "Laptop", discount: 0.1); // qty defaults to 1

// Union types
function parseId(int|string $id): string {
    return (string) $id;
}
?>`,
          exercise:
            'Rewrite a legacy PHP 5 class using PHP 8 features — add types, use match instead of switch, and apply constructor promotion.',
        },
      ],
      interviewQA: [
        {
          question: 'What are PHP Traits and when would you use them?',
          answer:
            'Traits are code reuse mechanisms for single-inheritance languages. They let you share methods across multiple unrelated classes without inheritance. Example: a Timestampable trait that adds createdAt/updatedAt logic to any model.',
        },
        {
          question: 'What is the difference between abstract class and interface?',
          answer:
            'Abstract class: can have implemented methods, properties, and constructor. A class can extend only one abstract class. Interface: only method signatures (no implementation). A class can implement multiple interfaces. Use interfaces for contracts, abstract classes when sharing implementation.',
        },
        {
          question: 'How does PHP handle memory management?',
          answer:
            'PHP uses reference counting. Each variable tracks how many references point to it. When the count reaches 0, the value is freed. PHP 5.3+ added a cycle collector to handle circular references that reference counting alone cannot free.',
        },
      ],
    },
  ],
};
