import { InterviewTopic } from './types';

export const phpInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is PHP and what is it used for?",
      answer: "PHP (PHP: Hypertext Preprocessor) is a server-side scripting language used to build dynamic websites and web applications. It runs on the server, processes logic, talks to databases, and sends HTML to the browser. The browser never sees PHP code — only the result.",
      example: "<?php echo 'Hello, World!'; ?> — this runs on the server and sends 'Hello, World!' as HTML to the browser.",
      use_case: "WordPress, Facebook's early codebase, and Laravel applications are all built in PHP. Any website that shows dynamic data (like a user's name after login) can use PHP.",
      follow_up: "What is the difference between client-side and server-side scripting?"
    },
    {
      question: "What are PHP data types?",
      answer: "PHP has 8 main data types: String (text), Integer (whole number), Float (decimal), Boolean (true/false), Array (list of values), Object (instance of a class), NULL (no value), and Resource (external resource like a DB connection).",
      example: "$name = 'Alice'; // string\n$age = 25; // integer\n$price = 9.99; // float\n$active = true; // boolean\n$items = ['a', 'b']; // array",
      use_case: "An e-commerce site uses strings for product names, floats for prices, booleans for stock availability, and arrays for a cart.",
      follow_up: "What is the difference between loosely typed and strictly typed languages? Is PHP loosely typed?"
    },
    {
      question: "What is the difference between == and === in PHP?",
      answer: "== checks value only (loose comparison). === checks both value AND type (strict comparison). This is a very common interview trap. '3' == 3 is TRUE but '3' === 3 is FALSE because one is a string and the other is an integer.",
      example: "var_dump(0 == 'a');  // true in PHP 7, false in PHP 8\nvar_dump(0 === 'a'); // always false",
      use_case: "When checking passwords or user IDs, always use === to avoid security bugs where '0' might match 0.",
      follow_up: "What changed between PHP 7 and PHP 8 regarding loose comparison with 0 and strings?"
    },
    {
      question: "What is the difference between echo and print in PHP?",
      answer: "Both output text. echo is slightly faster, can output multiple comma-separated values, and has no return value. print can only output one value and always returns 1 (so it can be used in expressions). In practice, always use echo.",
      example: "echo 'Hello', ' World'; // valid — multiple values\nprint 'Hello'; // valid\n$result = print 'Hi'; // $result = 1",
      use_case: "In templates, echo is used everywhere to output dynamic content like product names and prices.",
      follow_up: "What is printf() and how does it differ from echo?"
    },
    {
      question: "What are PHP superglobals?",
      answer: "Superglobals are built-in PHP variables that are always accessible anywhere in your script — inside functions, classes, or files — without needing the global keyword. They include: $_GET, $_POST, $_SESSION, $_COOKIE, $_SERVER, $_FILES, $_REQUEST, $_ENV, $GLOBALS.",
      example: "$name = $_POST['name']; // get form data\n$page = $_GET['page'];  // get URL parameter\n$ip   = $_SERVER['REMOTE_ADDR']; // visitor's IP",
      use_case: "$_SESSION stores logged-in user data across multiple pages. $_POST receives form submissions securely (not visible in URL).",
      follow_up: "Why is $_REQUEST considered less safe than $_GET or $_POST separately?"
    },
    {
      question: "What is the difference between include and require in PHP?",
      answer: "Both include another PHP file. The difference is in error handling: include gives a WARNING and continues execution if the file is missing. require gives a FATAL ERROR and stops execution. Use require for critical files (config, database setup) and include for optional parts (sidebars, widgets).",
      example: "require 'config.php'; // stops if missing — critical\ninclude 'ads.php';    // continues if missing — optional",
      use_case: "Database configuration is always loaded with require. Optional widget files use include.",
      follow_up: "What is include_once vs require_once and why would you use them?"
    },
    {
      question: "What is a PHP array and what types exist?",
      answer: "An array stores multiple values in one variable. PHP has 3 types: Indexed arrays (numeric keys: 0,1,2...), Associative arrays (string keys like 'name' => 'Alice'), and Multidimensional arrays (arrays inside arrays).",
      example: "$indexed = ['apple', 'banana'];\n$assoc   = ['name' => 'Alice', 'age' => 25];\n$multi   = [['id' => 1, 'name' => 'Alice'], ['id' => 2, 'name' => 'Bob']];",
      use_case: "A shopping cart is an associative array of products. Database query results are multidimensional arrays of rows.",
      follow_up: "What is the difference between array_push() and $arr[] = value?"
    },
    {
      question: "What are PHP functions and how do you define them?",
      answer: "A function is a reusable block of code. You define it once with the 'function' keyword and call it anywhere. Functions can accept parameters and return values. PHP 7+ supports type declarations for parameters and return types.",
      example: "function add(int $a, int $b): int {\n    return $a + $b;\n}\necho add(3, 4); // 7",
      use_case: "A formatCurrency($amount) function is defined once and used across cart, checkout, and invoice pages — no code duplication.",
      follow_up: "What is a recursive function? Give an example with factorial calculation."
    },
    {
      question: "What is the difference between GET and POST HTTP methods in PHP?",
      answer: "GET sends data in the URL (visible, bookmarkable, limited size ~2KB). POST sends data in the request body (not visible in URL, larger data, more secure for sensitive info). Use GET for searches/filters, POST for form submissions with passwords or personal data.",
      example: "// GET: example.com/search?query=php\n$query = $_GET['query'];\n\n// POST: form data hidden in request body\n$password = $_POST['password'];",
      use_case: "Login forms use POST (password must not appear in URL). Search filters use GET (so the URL can be shared/bookmarked).",
      follow_up: "Is POST more secure than GET? Explain why HTTPS matters for both."
    },
    {
      question: "What are PHP loops and which types exist?",
      answer: "Loops repeat code. PHP has: for (known number of iterations), while (while a condition is true), do-while (runs at least once), foreach (iterate over arrays). foreach is the most commonly used in web development.",
      example: "// foreach — best for arrays\nforeach ($products as $product) {\n    echo $product['name'];\n}\n\n// for — when you need the index\nfor ($i = 0; $i < 10; $i++) { echo $i; }",
      use_case: "Display all products from a database result: foreach ($results as $row) { ... }",
      follow_up: "What is the difference between break and continue inside a loop?"
    },
    {
      question: "What is a PHP session and how does it work?",
      answer: "A session stores user data on the server across multiple page requests. PHP creates a unique session ID, stores it in a cookie on the browser, and keeps the data in a server-side file. Each request sends the session ID and PHP retrieves the associated data.",
      example: "session_start(); // Must be first line\n$_SESSION['user_id'] = 42;\n$_SESSION['name'] = 'Alice';\n\n// On next page (also needs session_start())\necho $_SESSION['name']; // Alice",
      use_case: "After login, store user_id in session. Every protected page checks if $_SESSION['user_id'] exists — if not, redirect to login.",
      follow_up: "What is the difference between a session and a cookie? Which is more secure?"
    },
    {
      question: "What is a PHP cookie and how do you set one?",
      answer: "A cookie is a small piece of data stored in the user's browser. Unlike sessions (server-side), cookies live on the client. You set them with setcookie(). They can have an expiry date. Never store sensitive data (passwords, IDs) in cookies without encryption.",
      example: "// Set cookie that expires in 30 days\nsetcookie('theme', 'dark', time() + (30 * 24 * 60 * 60), '/');\n\n// Read it\necho $_COOKIE['theme']; // dark",
      use_case: "'Remember me' on login — store an encrypted token in a cookie valid for 30 days.",
      follow_up: "What is a secure cookie and what is the httpOnly flag?"
    },
    {
      question: "What is the null coalescing operator (??) in PHP?",
      answer: "The ?? operator returns the left value if it exists and is not null, otherwise returns the right value. It is a shorthand for isset() checks. Introduced in PHP 7.",
      example: "$name = $_GET['name'] ?? 'Guest';\n// Same as: $name = isset($_GET['name']) ? $_GET['name'] : 'Guest';",
      use_case: "When reading optional URL parameters or config values that may not exist — avoids 'undefined index' warnings.",
      follow_up: "What is the ??= operator (null coalescing assignment) introduced in PHP 7.4?"
    },
    {
      question: "What is PHP string interpolation?",
      answer: "String interpolation means embedding variables directly inside a double-quoted string. PHP replaces the variable with its value. Single-quoted strings do NOT interpolate — the variable name is printed literally.",
      example: "$name = 'Alice';\necho \"Hello, $name!\";  // Hello, Alice!  (interpolation)\necho 'Hello, $name!'; // Hello, $name! (no interpolation)",
      use_case: "Building HTML strings dynamically: echo \"<h1>Welcome, $username</h1>\";",
      follow_up: "What is the curly brace syntax {$var} used for in string interpolation?"
    },
    {
      question: "What are PHP type declarations (type hints)?",
      answer: "Type declarations let you specify what type a function parameter or return value must be. If the wrong type is passed, PHP throws a TypeError. Introduced in PHP 7. Makes code safer and self-documenting.",
      example: "function multiply(int $a, int $b): int {\n    return $a * $b;\n}\nmultiply(3, 'hello'); // TypeError in strict mode",
      use_case: "API endpoint functions use type hints to catch invalid data early before it reaches the database.",
      follow_up: "What is 'declare(strict_types=1)' and how does it affect type juggling?"
    },
    {
      question: "What is the difference between isset(), empty(), and is_null()?",
      answer: "isset() returns true if the variable exists AND is not null. empty() returns true if the variable is '', 0, '0', null, false, [], or doesn't exist. is_null() returns true only if the variable is explicitly null (throws notice if undefined).",
      example: "$a = '';\nisset($a);   // true (it exists, even though empty)\nempty($a);   // true (empty string)\nis_null($a); // false (not null — it's an empty string)",
      use_case: "Form validation: use empty() to check if a required field was submitted with a value.",
      follow_up: "Why does empty('0') return true? Is this a bug or intentional?"
    },
    {
      question: "How does PHP handle errors and exceptions?",
      answer: "PHP has two error systems: traditional errors (set_error_handler, error_reporting) and exceptions (try/catch/finally). Exceptions are objects you throw and catch. Modern PHP uses exceptions for application errors and reserves errors for fatal PHP engine issues.",
      example: "try {\n    if ($divisor === 0) throw new InvalidArgumentException('Cannot divide by zero');\n    $result = $dividend / $divisor;\n} catch (InvalidArgumentException $e) {\n    echo $e->getMessage();\n} finally {\n    echo 'This always runs';\n}",
      use_case: "Database query failures throw exceptions that are caught, logged, and returned as user-friendly error messages.",
      follow_up: "What is the difference between Exception and Error in PHP 7+?"
    },
    {
      question: "What are PHP magic methods?",
      answer: "Magic methods are special methods that start with __ (double underscore) and are called automatically by PHP in specific situations. Common ones: __construct() (object creation), __destruct() (object destruction), __get()/__set() (property access), __toString() (when object is cast to string), __call() (calling undefined method).",
      example: "class User {\n    public function __construct(private string $name) {}\n    public function __toString(): string { return $this->name; }\n}\n$u = new User('Alice');\necho $u; // Alice — calls __toString automatically",
      use_case: "__toString() lets you use objects directly in echo statements. __get() enables 'virtual' properties in Eloquent models.",
      follow_up: "What is __invoke() and when would you use it?"
    },
    {
      question: "What is the difference between abstract class and interface in PHP?",
      answer: "Abstract class: can have both implemented and abstract methods, can have properties and constructor, a class can extend only ONE abstract class. Interface: only method signatures (no implementation), no properties, a class can implement MULTIPLE interfaces. Use interfaces for contracts, abstract classes when sharing common implementation.",
      example: "interface Payable { public function pay(float $amount): bool; }\nabstract class Vehicle { abstract public function fuelType(): string; public function start(): void { echo 'Starting...'; } }\nclass Car extends Vehicle implements Payable { ... }",
      use_case: "A PaymentGateway interface is implemented by Stripe, PayPal, and Razorpay classes. Each must implement pay() but in their own way.",
      follow_up: "Can an abstract class implement an interface? Can it leave interface methods unimplemented?"
    },
    {
      question: "What is a PHP trait?",
      answer: "A trait is a mechanism for code reuse in PHP. Since PHP only supports single inheritance, traits let you include methods from multiple 'mixins' into a class without inheriting from multiple parents. Use traits for shared utility methods that don't fit into a hierarchy.",
      example: "trait Timestamps {\n    public function getCreatedAt(): string { return $this->created_at; }\n}\nclass Post { use Timestamps; }\nclass User { use Timestamps; }",
      use_case: "Laravel's SoftDeletes, Notifiable, and HasFactory are traits you add to models to unlock specific behaviour.",
      follow_up: "What happens if two traits used in the same class have methods with the same name?"
    },
    {
      question: "What is Composer in PHP?",
      answer: "Composer is PHP's package manager. It downloads and manages third-party libraries (called packages) from Packagist. It also handles autoloading so you never need manual require() calls for classes. Every modern PHP project uses Composer.",
      example: "# Install a package\ncomposer require guzzlehttp/guzzle\n\n# autoload.php loads all packages\nrequire 'vendor/autoload.php';\nuse GuzzleHttp\\Client;\n$client = new Client();",
      use_case: "Installing Laravel: 'composer create-project laravel/laravel myapp'. Every dependency is listed in composer.json and can be reproduced on any machine with 'composer install'.",
      follow_up: "What is the difference between composer install and composer update?"
    },
    {
      question: "What is PSR in PHP?",
      answer: "PSR stands for PHP Standards Recommendation — coding standards defined by the PHP-FIG group. Most important ones: PSR-1 (basic coding standard), PSR-4 (autoloading standard — class names map to file paths), PSR-12 (coding style), PSR-7 (HTTP message interfaces). All major frameworks follow PSR.",
      example: "// PSR-4: class App\\Controllers\\UserController\n// must be in file: app/Controllers/UserController.php",
      use_case: "Laravel, Symfony, and all Composer packages follow PSR-4. This is why Composer's autoloader works automatically.",
      follow_up: "What is PSR-7 and why is it important for middleware systems?"
    }
  ],

  intermediate: [
    {
      question: "Explain PHP's Object-Oriented Programming (OOP) four pillars with examples.",
      answer: "1. Encapsulation: hide internal data using private/protected, expose only necessary methods. 2. Inheritance: child class gets parent's properties/methods (class Dog extends Animal). 3. Polymorphism: same method name, different behaviour per class (each payment gateway has pay() but implements it differently). 4. Abstraction: hide complexity behind simple interfaces (you call $db->query() without knowing the SQL driver details).",
      example: "// Encapsulation\nclass BankAccount {\n    private float $balance;\n    public function deposit(float $amt): void { $this->balance += $amt; }\n    public function getBalance(): float { return $this->balance; }\n}\n\n// Inheritance\nclass SavingsAccount extends BankAccount {\n    public function addInterest(float $rate): void { $this->deposit($this->getBalance() * $rate); }\n}",
      use_case: "Laravel's Eloquent models use all four pillars: encapsulated queries, inherited base Model class, polymorphic relations, and abstraction over the database driver.",
      follow_up: "What is the SOLID principle and how does it apply to PHP OOP?"
    },
    {
      question: "What is PDO and why is it preferred over mysqli?",
      answer: "PDO (PHP Data Objects) is a database access layer that supports 12+ databases with a single, consistent API. mysqli only works with MySQL. PDO supports prepared statements, which are the safest way to prevent SQL injection. You can also switch databases (MySQL → PostgreSQL) without rewriting all your queries.",
      example: "$pdo = new PDO('mysql:host=localhost;dbname=app', 'root', 'pass');\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');\n$stmt->execute(['email' => $email]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);",
      use_case: "A startup begins with MySQL. Later they switch to PostgreSQL. With PDO, only the connection string changes — all query code stays the same.",
      follow_up: "What is PDO::FETCH_OBJ vs PDO::FETCH_ASSOC vs PDO::FETCH_CLASS?"
    },
    {
      question: "How does PHP session management work internally?",
      answer: "When session_start() is called: PHP checks for a PHPSESSID cookie. If found, it loads the session file from the server (usually /tmp/sess_xxxx). If not found, it generates a new unique ID, creates a new file, and sets the PHPSESSID cookie. $_SESSION is an in-memory array during the request; on request end, PHP serializes it back to the file.",
      example: "session_start();\n$_SESSION['cart'] = ['item1', 'item2'];\n// PHP saves this to /tmp/sess_abc123 as serialized data\n// Next request reads the file and populates $_SESSION again",
      use_case: "Multi-step checkout: user's cart, address, and payment method are stored across 3 separate pages using $_SESSION.",
      follow_up: "How would you scale sessions across multiple servers (load balancer scenario)? What is session_set_save_handler()?"
    },
    {
      question: "What are PHP namespaces and why are they important?",
      answer: "Namespaces organise code into logical groups and prevent naming collisions — just like folders for files. Without namespaces, two libraries having a 'Database' class would conflict. With namespaces (App\\Database vs Lib\\Database), they coexist. PSR-4 autoloading maps namespaces to directory paths.",
      example: "// File: app/Services/UserService.php\nnamespace App\\Services;\nuse App\\Models\\User;\nuse App\\Repositories\\UserRepository;\n\nclass UserService {\n    public function __construct(private UserRepository $repo) {}\n}",
      use_case: "Laravel organises code into App\\Http\\Controllers, App\\Models, App\\Services etc. Composer autoloads all classes via PSR-4 namespace-to-path mapping.",
      follow_up: "What is the difference between use statement and namespace declaration? What is a fully qualified class name?"
    },
    {
      question: "Explain PHP generators (yield keyword).",
      answer: "A generator is a function that yields values one at a time instead of returning them all at once. It pauses execution at each yield and resumes when the next value is requested. This uses almost no memory compared to returning a huge array because values are generated on demand.",
      example: "function generateRange(int $start, int $end): Generator {\n    for ($i = $start; $i <= $end; $i++) {\n        yield $i; // pauses here, resumes on next iteration\n    }\n}\nforeach (generateRange(1, 1_000_000) as $num) {\n    // processes 1M numbers with minimal memory\n}",
      use_case: "Processing a 10GB CSV file line by line — a generator reads and yields one line at a time instead of loading the entire file into memory.",
      follow_up: "What is the difference between a generator and an iterator? Can a generator both yield and return a value?"
    },
    {
      question: "What is PHP's static keyword and late static binding?",
      answer: "static in a method or property means it belongs to the class, not an instance — you don't need an object to call it. Late Static Binding (static::) means the call is resolved at runtime to the class that actually called it, not the class where the method was defined. self:: always refers to the class it's written in.",
      example: "class ParentModel {\n    public static function create(): static {\n        return new static(); // late static binding — creates the ACTUAL class called\n    }\n}\nclass UserModel extends ParentModel {}\n$u = UserModel::create(); // returns UserModel, not ParentModel",
      use_case: "Laravel's Eloquent uses late static binding for methods like User::find(), Post::all() — the correct child model is returned without rewriting create() in every subclass.",
      follow_up: "What is the singleton pattern and how does static help implement it?"
    },
    {
      question: "How do you prevent SQL injection in PHP?",
      answer: "Never concatenate user input into SQL strings. Always use prepared statements with parameterized queries (PDO or mysqli). The database driver separates query structure from data, so user input can never alter the SQL logic.",
      example: "// DANGEROUS — SQL injection possible\n$sql = \"SELECT * FROM users WHERE name = '$name'\";\n\n// SAFE — parameterized query\n$stmt = $pdo->prepare('SELECT * FROM users WHERE name = :name');\n$stmt->execute(['name' => $name]);\n// Even if $name = \"'; DROP TABLE users; --\" it won't execute as SQL",
      use_case: "Every login form, search, and any page that uses user input in a database query must use prepared statements.",
      follow_up: "Beyond prepared statements, what other SQL injection mitigations exist? (least privilege, WAF, input validation)"
    },
    {
      question: "What is the difference between shallow copy and deep copy of objects in PHP?",
      answer: "When you assign an object to another variable, both variables point to the same object (reference). Cloning (clone keyword) creates a shallow copy — a new object but with the same property values. For nested objects, clone only copies references to inner objects. A deep copy recursively copies all nested objects too.",
      example: "class Address { public string $city; }\nclass User { public Address $address; }\n\n$u1 = new User();\n$u1->address = new Address(); $u1->address->city = 'Mumbai';\n\n$u2 = clone $u1; // shallow — $u2->address still points to SAME Address object\n$u2->address->city = 'Delhi';\necho $u1->address->city; // Delhi — shared!",
      use_case: "When building a cart item from a template product object, you need a deep clone so modifying quantity doesn't affect the original template.",
      follow_up: "How do you implement a deep clone in PHP? What is __clone() magic method?"
    },
    {
      question: "What are anonymous functions and closures in PHP?",
      answer: "Anonymous functions (lambdas) are functions without a name, assigned to variables or passed as arguments. Closures are anonymous functions that can 'capture' variables from the surrounding scope using the 'use' keyword. Without 'use', the closure cannot access outer variables.",
      example: "// Anonymous function\n$greet = function(string $name): string { return \"Hello, $name\"; };\n\n// Closure — captures $prefix from outer scope\n$prefix = 'Dr.';\n$formatName = function(string $name) use ($prefix): string {\n    return \"$prefix $name\";\n};\necho $formatName('Smith'); // Dr. Smith",
      use_case: "usort() callback, array_map/array_filter functions, event listeners, and middleware in frameworks all use closures.",
      follow_up: "What is the difference between capturing by value (use $var) and by reference (use &$var) in a closure?"
    },
    {
      question: "What is PHP's autoloading and how does PSR-4 work?",
      answer: "Autoloading automatically includes a class file when you use the class — no manual require statements needed. PSR-4 maps namespace prefixes to directory paths. When PHP sees 'new App\\Models\\User', PSR-4 converts it to app/Models/User.php and loads it automatically. Composer generates the autoload.php that sets this up.",
      example: "// composer.json autoload config\n{\n    \"autoload\": {\n        \"psr-4\": {\n            \"App\\\\\": \"src/\"\n        }\n    }\n}\n// App\\Models\\User → src/Models/User.php (auto-loaded)",
      use_case: "In any Laravel project, all models, controllers, and services load automatically without any require/include — Composer's PSR-4 autoloader handles it all.",
      follow_up: "What does 'composer dump-autoload' do and when should you run it?"
    },
    {
      question: "Explain PHP's error levels and how to configure error reporting.",
      answer: "PHP has multiple error levels: E_ERROR (fatal, stops execution), E_WARNING (non-fatal, execution continues), E_NOTICE (minor info, like undefined variable), E_DEPRECATED (using old features), E_ALL (all errors). You control which are shown with error_reporting() and whether they display with display_errors.",
      example: "// Development — show everything\nerror_reporting(E_ALL);\nini_set('display_errors', 1);\n\n// Production — log only, don't show\nerror_reporting(E_ALL);\nini_set('display_errors', 0);\nini_set('log_errors', 1);\nini_set('error_log', '/var/log/php_errors.log');",
      use_case: "A production server must NEVER display errors to users (security risk). Errors are logged to file and monitored by tools like Sentry or Datadog.",
      follow_up: "What is set_error_handler() and how can you turn PHP errors into exceptions?"
    },
    {
      question: "What is the difference between require, require_once, include, and include_once?",
      answer: "require vs include: require stops execution on failure (fatal error); include only warns. _once variants: PHP tracks which files have already been included and skips loading them again. This prevents 'class already declared' errors when multiple files include the same dependency.",
      example: "require_once 'config.php';  // won't reload if already loaded\nrequire_once 'database.php'; // same — safe to call multiple times",
      use_case: "Before PSR-4 autoloading existed, require_once was used everywhere. Today, Composer makes it unnecessary. But it's still used in legacy codebases.",
      follow_up: "In modern PHP with Composer, when (if ever) should you manually use require/include?"
    },
    {
      question: "What is cURL in PHP and how do you use it?",
      answer: "cURL is a library for making HTTP requests from PHP — calling external APIs, downloading files, sending data to other servers. It supports GET, POST, PUT, DELETE, file uploads, headers, authentication, and HTTPS.",
      example: "$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, 'https://api.github.com/users/torvalds');\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ['User-Agent: MyApp']);\n$response = curl_exec($ch);\ncurl_close($ch);\n$data = json_decode($response, true);",
      use_case: "Integrating with payment gateways (Stripe, Razorpay), sending SMS via Twilio, or fetching weather data from OpenWeatherMap.",
      follow_up: "What is Guzzle and why is it preferred over raw cURL in modern PHP projects?"
    },
    {
      question: "What are PHP design patterns? Explain Singleton and Factory.",
      answer: "Design patterns are proven solutions to common problems. Singleton ensures only one instance of a class exists (used for DB connections). Factory creates objects without specifying exact class (used when object type varies at runtime).",
      example: "// Singleton\nclass Database {\n    private static ?Database $instance = null;\n    private function __construct() {}\n    public static function getInstance(): static {\n        if (static::$instance === null) static::$instance = new static();\n        return static::$instance;\n    }\n}\n\n// Factory\nclass PaymentFactory {\n    public static function make(string $type): PaymentInterface {\n        return match($type) { 'stripe' => new Stripe(), 'paypal' => new PayPal() };\n    }\n}",
      use_case: "Singleton: one DB connection reused across the request. Factory: selecting which payment processor to use based on user preference.",
      follow_up: "What are the downsides of the Singleton pattern? Why is dependency injection generally preferred?"
    },
    {
      question: "How does PHP handle file uploads securely?",
      answer: "Files are submitted via POST with enctype='multipart/form-data'. PHP stores them temporarily in /tmp and makes metadata available in $_FILES. Always validate: file type (using finfo, not extension), file size, and move to a non-web-accessible directory with move_uploaded_file(). Never trust the MIME type from $_FILES['type'].",
      example: "$finfo = new finfo(FILEINFO_MIME_TYPE);\n$mimeType = $finfo->file($_FILES['photo']['tmp_name']);\n\nif (!in_array($mimeType, ['image/jpeg', 'image/png'])) die('Invalid file type');\nif ($_FILES['photo']['size'] > 2 * 1024 * 1024) die('Too large');\n\nmove_uploaded_file($_FILES['photo']['tmp_name'], '/var/uploads/' . uniqid() . '.jpg');",
      use_case: "Profile picture uploads, CV uploads in job portals, document uploads in medical platforms.",
      follow_up: "Why is checking the file extension alone insufficient? What is MIME type spoofing?"
    },
    {
      question: "What is output buffering in PHP?",
      answer: "Output buffering delays sending output (HTML, text) to the browser. Instead of sending immediately, PHP stores it in a buffer. This is needed when you call header() or setcookie() after already echoing output — because HTTP headers must be sent before any body content.",
      example: "ob_start(); // start buffering\necho 'Some content';\nheader('Location: /other-page'); // works! headers not sent yet\nob_end_clean(); // discard buffer\n// OR ob_end_flush() to send buffered content",
      use_case: "Frameworks like Laravel enable output buffering globally so headers, cookies, and redirects always work regardless of where echo is called.",
      follow_up: "What is the 'headers already sent' error and how does output buffering prevent it?"
    },
    {
      question: "What are PHP fibers (PHP 8.1+)?",
      answer: "Fibers are lightweight concurrency primitives — similar to coroutines. A fiber can pause its execution (suspend) and be resumed later. Unlike generators (which only yield from one direction), fibers allow two-way communication. They are the foundation for async PHP frameworks.",
      example: "$fiber = new Fiber(function(): void {\n    $value = Fiber::suspend('first');\n    echo \"Resumed with: $value\\n\";\n});\n$val = $fiber->start(); // 'first'\n$fiber->resume('hello'); // prints 'Resumed with: hello'",
      use_case: "ReactPHP and Amp use fibers to handle thousands of concurrent HTTP requests in a single PHP process — similar to how Node.js works.",
      follow_up: "What is the difference between PHP Fibers and JavaScript Promises/async-await?"
    },
    {
      question: "What are named arguments in PHP 8?",
      answer: "Named arguments let you pass values to a function by parameter name instead of position. This means you can skip optional parameters, pass arguments in any order, and make function calls more readable.",
      example: "// Without named args — must pass all preceding optional args\narray_slice($arr, 0, 5, true);\n\n// With named args — skip to what you need\narray_slice(array: $arr, offset: 0, length: 5, preserve_keys: true);\n\n// Also useful for built-in functions with many optional params\nhtmlspecialchars(string: $html, flags: ENT_QUOTES, encoding: 'UTF-8');",
      use_case: "Makes calls to functions with many optional parameters (htmlspecialchars, str_contains, date) much clearer in codebases.",
      follow_up: "Do named arguments work with variadic functions (...$args)? What are the limitations?"
    },
    {
      question: "What is the match expression in PHP 8?",
      answer: "match is like switch but better: it uses strict comparison (===), it is an expression (returns a value), it doesn't fall through between cases, and it throws an UnhandledMatchError if no arm matches (instead of silently doing nothing).",
      example: "// switch — falls through, loose comparison, no return value\nswitch ($status) { case 1: $label = 'Active'; break; }\n\n// match — strict, returns value, no fall-through\n$label = match($status) {\n    1 => 'Active',\n    2, 3 => 'Pending',  // multiple conditions\n    default => throw new InvalidArgumentException(\"Unknown: $status\")\n};",
      use_case: "Mapping HTTP status codes to messages, converting database enum values to display labels, routing based on event type.",
      follow_up: "What happens if no match arm matches and there is no default? How is this different from switch?"
    },
    {
      question: "Explain PHP Union Types, Intersection Types, and the never return type.",
      answer: "Union Types (PHP 8.0): a parameter/return can be one of multiple types (int|string). Intersection Types (PHP 8.1): must satisfy ALL listed interfaces simultaneously (Countable&Iterator). never return type (PHP 8.1): marks functions that never return normally — they always throw an exception or call exit.",
      example: "// Union type\nfunction processId(int|string $id): void {}\n\n// Intersection type\nfunction iterateAndCount(Countable&Iterator $collection): void {}\n\n// never\nfunction alwaysThrows(string $message): never {\n    throw new RuntimeException($message);\n}",
      use_case: "Union types in Laravel request validation: a form field can accept int|null (optional numeric field). never is used in framework exception handlers.",
      follow_up: "What is the difference between mixed type and int|string|... listing all types? When is mixed appropriate?"
    },
    {
      question: "How does PHP garbage collection work?",
      answer: "PHP uses reference counting as its primary memory management. Every variable has a ref count. When count reaches 0, memory is freed immediately. For circular references (A points to B, B points to A — ref count never reaches 0), PHP has a cyclic garbage collector that runs periodically to detect and free them.",
      example: "$a = new stdClass(); // refcount = 1\n$b = $a;             // refcount = 2\nunset($a);           // refcount = 1\nunset($b);           // refcount = 0 → freed immediately\n\n// Circular reference — needs GC to clean\n$node = new stdClass();\n$node->self = $node; // refcount = 2, unset doesn't free it",
      use_case: "Long-running PHP scripts (workers, queue processors) must avoid circular references or call gc_collect_cycles() periodically to prevent memory leaks.",
      follow_up: "How do you detect memory leaks in a PHP script? What tools help (Xdebug, Blackfire, memory_get_peak_usage())?"
    },
    {
      question: "What is the SPL (Standard PHP Library)?",
      answer: "SPL is a collection of interfaces and classes built into PHP for standard data structures and algorithms. It provides: SplStack, SplQueue, SplMinHeap (data structures), SplFileObject (file iteration), SplDoublyLinkedList, and the Iterator/Countable interfaces that work with foreach.",
      example: "// SplStack — LIFO\n$stack = new SplStack();\n$stack->push('first');\n$stack->push('second');\necho $stack->pop(); // 'second'\n\n// SplFileObject — memory-efficient file reading\n$file = new SplFileObject('large.csv');\nforeach ($file as $line) { /* process line */ }",
      use_case: "Task scheduler uses SplMinHeap (priority queue) to always process the highest-priority job first.",
      follow_up: "What is the difference between SplStack and a regular array used as a stack with array_push/array_pop?"
    },
    {
      question: "What is late static binding and how is it different from self::",
      answer: "self:: always refers to the class in which the method is WRITTEN (resolved at compile time). static:: refers to the class from which the method was CALLED (resolved at runtime). This matters when child classes inherit static methods from a parent.",
      example: "class Base {\n    public static function create(): static {\n        return new static(); // runtime class\n    }\n    public static function selfCreate(): self {\n        return new self(); // always Base\n    }\n}\nclass Child extends Base {}\n$c = Child::create();     // Child instance\n$b = Child::selfCreate(); // Base instance — wrong!",
      use_case: "Laravel's Eloquent Model uses static:: throughout so that User::find() returns a User object, not a generic Model.",
      follow_up: "Can you use static:: in a non-static context? What about parent::?"
    }
  ],

  advanced: [
    {
      question: "How would you design a PHP application to handle 100,000 requests per minute?",
      answer: "At this scale: use PHP-FPM (process manager) with Nginx (not Apache). Implement Redis for session storage and caching (replace file-based sessions). Use a CDN for static assets. Implement read replicas for the database. Use a queue system (RabbitMQ/Redis) for heavy operations. Enable OPcache to cache compiled PHP bytecode. Use connection pooling for database.",
      example: "# nginx + php-fpm config key points:\npm = dynamic\npm.max_children = 50\npm.start_servers = 10\npm.min_spare_servers = 5\npm.max_spare_servers = 20\n\n# OPcache in php.ini:\nopcache.enable=1\nopcache.memory_consumption=256\nopcache.max_accelerated_files=10000",
      use_case: "A flash sale on an e-commerce site causes 100k concurrent users. Without these optimizations, PHP-FPM would run out of workers, DB connections would exhaust, and the site goes down.",
      follow_up: "How would you implement rate limiting in PHP to prevent abuse during such a spike?"
    },
    {
      question: "What is OPcache and how does it improve PHP performance?",
      answer: "PHP normally parses and compiles .php files to bytecode on every request. OPcache stores the compiled bytecode in shared memory. Subsequent requests skip parsing and compilation — just execute the cached bytecode. This typically reduces CPU usage by 40-70%.",
      example: "# php.ini\nopcache.enable=1\nopcache.memory_consumption=256       ; 256MB for bytecode\nopcache.max_accelerated_files=20000  ; max files to cache\nopcache.revalidate_freq=60           ; check for changes every 60s\nopcache.validate_timestamps=0        ; prod: disable for max speed",
      use_case: "A Laravel app has 3000+ PHP files (framework + app). Without OPcache, each request compiles all included files. With OPcache, compilation happens once — huge performance gain.",
      follow_up: "In production, why should you set opcache.validate_timestamps=0, and what deployment strategy does this require?"
    },
    {
      question: "Explain PHP-FPM and how it handles concurrent requests.",
      answer: "PHP-FPM (FastCGI Process Manager) manages a pool of PHP worker processes. Nginx passes requests to PHP-FPM via FastCGI protocol. FPM can spawn new workers on demand (dynamic mode), pre-fork workers (static mode), or use ondemand mode. Each worker handles one request at a time. The max_children setting limits concurrency.",
      example: "# Process manager modes:\n# static: fixed workers — predictable memory, best for known load\n# dynamic: workers spawn/die based on demand — best for variable load\n# ondemand: only spawn when needed — best for low traffic\n\npm = dynamic\npm.max_children = 100  # max concurrent PHP requests\npm.start_servers = 20\npm.min_spare_servers = 10\npm.max_spare_servers = 30",
      use_case: "A server with 4GB RAM, where each PHP-FPM process uses ~40MB: max_children = 4000/40 = 100 workers. Exceeding this causes requests to queue or fail.",
      follow_up: "What is PHP-FPM's slow log and how would you use it to diagnose performance issues?"
    },
    {
      question: "What is the Repository Pattern in PHP and why use it?",
      answer: "The Repository Pattern abstracts data access behind an interface. Controllers and services call repository methods (findById, create, etc.) without knowing whether the data comes from MySQL, Redis, or an API. Benefits: testable (mock the repo), swappable data sources, centralised query logic.",
      example: "interface UserRepositoryInterface {\n    public function findById(int $id): ?User;\n    public function findByEmail(string $email): ?User;\n    public function create(array $data): User;\n}\n\nclass EloquentUserRepository implements UserRepositoryInterface {\n    public function findById(int $id): ?User { return User::find($id); }\n    // ...\n}\n\n// Bind in service container:\n$app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);",
      use_case: "During testing, you bind a MockUserRepository that returns fake data — no database needed. In production, EloquentUserRepository is used.",
      follow_up: "What is the difference between Repository Pattern and Active Record Pattern (used by Eloquent)? What are the trade-offs?"
    },
    {
      question: "How do you implement caching in PHP to reduce database load?",
      answer: "Multi-layer caching strategy: 1. OPcache for PHP bytecode. 2. APCu for in-process data (same request/process). 3. Redis/Memcached for cross-request, cross-server shared cache. Pattern: cache-aside (check cache first, hit DB on miss and populate cache). Set appropriate TTLs. Implement cache invalidation strategy.",
      example: "// Cache-aside pattern with Redis\nfunction getUser(int $id, Redis $redis, PDO $db): array {\n    $key = \"user:$id\";\n    if ($cached = $redis->get($key)) return json_decode($cached, true);\n    \n    $user = $db->query(\"SELECT * FROM users WHERE id=$id\")->fetch();\n    $redis->setex($key, 3600, json_encode($user)); // TTL = 1 hour\n    return $user;\n}",
      use_case: "A product page with 10,000 views/hour fetches the same product data each time. Caching the product for 5 minutes reduces DB queries by 99%.",
      follow_up: "What is cache stampede (thundering herd problem) and how do you prevent it? (probabilistic early expiry, mutex locks)"
    },
    {
      question: "How do you implement a secure authentication system in PHP from scratch?",
      answer: "Key components: 1. Hash passwords with password_hash(pass, PASSWORD_ARGON2ID) — never MD5/SHA1. 2. Verify with password_verify(). 3. Use secure session configuration (httpOnly, secure, SameSite cookies). 4. Implement CSRF protection. 5. Rate-limit login attempts. 6. Use timing-safe comparison (hash_equals) to prevent timing attacks. 7. Regenerate session ID after login.",
      example: "// Secure password storage\n$hash = password_hash($password, PASSWORD_ARGON2ID, ['memory_cost' => 65536, 'time_cost' => 4]);\n\n// Secure session config\nini_set('session.cookie_httponly', 1);\nini_set('session.cookie_secure', 1);\nini_set('session.cookie_samesite', 'Strict');\n\n// After successful login\nsession_regenerate_id(true); // prevent session fixation\n$_SESSION['user_id'] = $user['id'];",
      use_case: "Building a banking or medical platform requires all these measures — a breach can have legal consequences.",
      follow_up: "What is a timing attack? How does hash_equals() prevent it, and why does strlen comparison fail?"
    },
    {
      question: "Explain PHP's asynchronous programming approaches.",
      answer: "PHP is traditionally synchronous (one thing at a time). To achieve async: 1. ReactPHP/Amp — event-loop based, non-blocking I/O. 2. PHP Fibers (8.1+) — cooperative multitasking. 3. pcntl_fork() — multi-processing (Unix only). 4. pthreads extension — true multithreading. 5. Queue workers — defer work to background processes.",
      example: "// ReactPHP example — non-blocking HTTP server\n$loop = React\\EventLoop\\Loop::get();\n$server = new React\\Http\\HttpServer(function (Psr\\Http\\Message\\ServerRequestInterface $request) {\n    return React\\Http\\Message\\Response::plaintext('Hello async world!');\n});\n$socket = new React\\Socket\\SocketServer('0.0.0.0:8080', [], $loop);\n$server->listen($socket);\n$loop->run();",
      use_case: "A real-time notification system with 50,000 WebSocket connections needs async PHP (ReactPHP) — traditional PHP can't hold open connections without blocking.",
      follow_up: "What is the C10K problem? How does async PHP address it compared to spawning one process per connection?"
    },
    {
      question: "How would you implement a rate limiter in PHP using Redis?",
      answer: "Rate limiting restricts how many requests a user/IP can make in a time window. Sliding window log: store timestamps of each request in a Redis sorted set. Fixed window counter: increment a key per period with TTL. Token bucket: replenish tokens at a fixed rate. Redis INCR + EXPIRE is the simplest atomic approach.",
      example: "function isRateLimited(Redis $redis, string $key, int $limit, int $windowSeconds): bool {\n    $current = $redis->incr($key);\n    if ($current === 1) $redis->expire($key, $windowSeconds); // first request sets TTL\n    return $current > $limit;\n}\n\n// Usage: 100 requests per 60 seconds per IP\n$key = 'rate_limit:' . $_SERVER['REMOTE_ADDR'];\nif (isRateLimited($redis, $key, 100, 60)) {\n    http_response_code(429);\n    die('Too many requests');\n}",
      use_case: "API endpoints (login, password reset, OTP send) are rate-limited to prevent brute force attacks. Public APIs rate-limit by API key to enforce plan limits.",
      follow_up: "What are the drawbacks of the fixed window algorithm? How does the sliding window algorithm solve them?"
    },
    {
      question: "What is PHP's Just-in-Time (JIT) compilation and what does PHP 8 bring?",
      answer: "PHP 8 introduced JIT compilation (building on OPcache). With JIT, PHP compiles bytecode to native machine code at runtime for hot code paths. This is most beneficial for CPU-intensive tasks (math, algorithms) rather than typical I/O-bound web requests. For typical Laravel/Symfony apps, the speedup is minimal — JIT helps most for scientific computing, image processing, and machine learning in PHP.",
      example: "# php.ini\nopcache.enable=1\nopcache.jit_buffer_size=256M\nopcache.jit=tracing  # best for web workloads\n# or opcache.jit=function  # simpler, good for CPU workloads",
      use_case: "A PHP application doing real-time image filtering or complex mathematical calculations (price optimization, simulations) sees significant speedup with JIT.",
      follow_up: "Why does JIT have minimal impact on typical CRUD web apps, and in what scenarios would you specifically enable it?"
    },
    {
      question: "How do you implement event sourcing in PHP?",
      answer: "Event sourcing stores the history of state changes as events (immutable facts) rather than current state. To rebuild current state, replay all events. Benefits: complete audit trail, time travel debugging, event replay for new projections. Key components: Event store (append-only log), Aggregate (rebuilds from events), Projection (read model built from events).",
      example: "// Event\nclass MoneyDeposited {\n    public function __construct(\n        public readonly string $accountId,\n        public readonly float $amount,\n        public readonly DateTimeImmutable $occurredAt,\n    ) {}\n}\n\n// Aggregate rebuilds state from events\nclass BankAccount {\n    private float $balance = 0;\n    public function apply(MoneyDeposited $event): void {\n        $this->balance += $event->amount;\n    }\n}",
      use_case: "Banking applications — every transaction is an immutable event. Auditors can replay events to see exact account history. Bugs can be traced to the exact event that caused wrong state.",
      follow_up: "What is CQRS (Command Query Responsibility Segregation) and how does it pair with event sourcing?"
    }
  ]
};
