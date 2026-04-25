import { InterviewTopic } from './types';

export const nodejsInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is Node.js and why is it used?",
      answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript outside the browser — on a server or your computer. It is used for building fast web servers, REST APIs, real-time apps, CLI tools, and microservices. Its non-blocking I/O model makes it excellent for handling many concurrent connections.",
      example: "const http = require('http');\nconst server = http.createServer((req, res) => { res.end('Hello!'); });\nserver.listen(3000);\n// Run: node server.js",
      use_case: "Netflix switched parts of their backend to Node.js and reduced startup time by 70%. LinkedIn replaced their Rails backend with Node.js, supporting 10x more connections with 1/10th the servers.",
      follow_up: "What is the difference between Node.js and a browser JavaScript environment?"
    },
    {
      question: "What is the event loop in Node.js?",
      answer: "The event loop is what makes Node non-blocking. Node is single-threaded — it can only do one thing at a time. But I/O operations (file reads, DB queries, network calls) are offloaded to the OS via libuv. When complete, the OS notifies Node, which queues the callback in the event loop to be processed. This way, one thread handles thousands of concurrent operations without waiting.",
      example: "// Synchronous — BLOCKS the event loop\nconst data = fs.readFileSync('file.txt'); // Thread waits here\n\n// Asynchronous — NON-BLOCKING\nfs.readFile('file.txt', (err, data) => {\n  // Callback runs when file is read — event loop can do other work meanwhile\n  console.log(data);\n});\nconsole.log('This runs FIRST — file read is async');",
      use_case: "A Node.js API server handles 10,000 concurrent requests. Because each request (DB query, file read) is async, the single thread is never blocked waiting — it processes callbacks from completed operations continuously.",
      follow_up: "What are the phases of the event loop? (timers, pending callbacks, idle/prepare, poll, check, close callbacks)"
    },
    {
      question: "What is the difference between synchronous and asynchronous code in Node.js?",
      answer: "Synchronous code runs line by line, blocking execution until each operation completes. Asynchronous code starts an operation and immediately moves to the next line — a callback/promise handles the result later. In Node.js, NEVER use synchronous file or network operations in a web server — they block the single thread and prevent handling other requests.",
      example: "// SYNC — blocks entire server while reading file\napp.get('/data', (req, res) => {\n  const data = fs.readFileSync('./large-file.txt'); // ALL other requests wait!\n  res.send(data);\n});\n\n// ASYNC — non-blocking\napp.get('/data', async (req, res) => {\n  const data = await fs.promises.readFile('./large-file.txt'); // other requests handled during this\n  res.send(data);\n});",
      use_case: "A chat server with 1,000 users. If message handling is synchronous, users experience freezes. Async ensures every user gets responses without waiting for others.",
      follow_up: "What happens if you accidentally block the event loop in Node.js? What tools detect it?"
    },
    {
      question: "What is npm and what is package.json?",
      answer: "npm (Node Package Manager) is the world's largest software registry. It lets you install, share, and manage JavaScript packages. package.json is the project manifest: it lists project name, version, scripts, and dependencies (packages needed to run) and devDependencies (packages needed only during development).",
      example: "{\n  \"name\": \"my-api\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"start\": \"node server.js\",\n    \"dev\": \"nodemon server.js\",\n    \"test\": \"jest\"\n  },\n  \"dependencies\": { \"express\": \"^4.18.2\" },\n  \"devDependencies\": { \"jest\": \"^29.0.0\", \"nodemon\": \"^3.0.0\" }\n}",
      use_case: "Any Node.js project. Running 'npm install' reads package.json and downloads all dependencies into node_modules — reproducible on any machine.",
      follow_up: "What is package-lock.json and why should you commit it to version control?"
    },
    {
      question: "What is Express.js and why is it used?",
      answer: "Express.js is the most popular Node.js web framework. It is minimal and flexible — it provides routing, middleware support, and HTTP utilities without imposing rigid structure. It is the foundation for building REST APIs, web apps, and is the 'E' in MEAN/MERN stack.",
      example: "const express = require('express');\nconst app = express();\napp.use(express.json()); // middleware to parse JSON\n\napp.get('/api/users', (req, res) => res.json([{ id: 1, name: 'Alice' }]));\napp.post('/api/users', (req, res) => res.status(201).json(req.body));\n\napp.listen(3000, () => console.log('API running'));",
      use_case: "Uber's API, IBM's products, and thousands of startups use Express.js as their backend framework. Simple to start, flexible to scale.",
      follow_up: "What is the difference between Express.js and Fastify? When would you choose Fastify?"
    },
    {
      question: "What is middleware in Express.js?",
      answer: "Middleware is a function with (req, res, next) signature that sits between the incoming request and the route handler. It can read/modify req and res, end the request, or call next() to pass to the next middleware. Middleware runs in the order it is registered. Uses: authentication, logging, body parsing, CORS, rate limiting, error handling.",
      example: "// Logger middleware\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // pass to next middleware/route\n});\n\n// Auth middleware\nfunction requireAuth(req, res, next) {\n  if (!req.headers.authorization) return res.status(401).json({ error: 'Unauthorized' });\n  next();\n}\n\napp.get('/protected', requireAuth, handler); // auth runs before handler",
      use_case: "Every production Express app has middleware stack: cors() → rateLimit() → express.json() → requestLogger → routes → errorHandler.",
      follow_up: "What is the difference between app.use() and router.use()? What is the order problem in middleware?"
    },
    {
      question: "What are callbacks, Promises, and async/await in Node.js?",
      answer: "Callbacks: old-style async — pass a function that runs when the operation completes. Problem: callback hell (deeply nested callbacks). Promises: represent a future value — chain with .then()/.catch(). Better, but still chaining. async/await: syntactic sugar over Promises — write async code that looks synchronous. Use try/catch for errors.",
      example: "// Callbacks (old, avoid)\nfs.readFile('file.txt', (err, data) => {\n  if (err) return console.error(err);\n  process(data, (err, result) => { /* nested! */ });\n});\n\n// async/await (modern)\nasync function processFile() {\n  try {\n    const data = await fs.promises.readFile('file.txt');\n    const result = await process(data);\n    return result;\n  } catch (err) {\n    console.error(err);\n  }\n}",
      use_case: "All modern Node.js code uses async/await. Callbacks are found in older codebases and Node's built-in APIs (fs, http without promises wrapper).",
      follow_up: "What is Promise.all() and when do you use it vs sequential await?"
    },
    {
      question: "What is the difference between require and import in Node.js?",
      answer: "require is CommonJS (CJS) — synchronous, loads the whole module, works everywhere in Node. import is ES Modules (ESM) — static (analyzed at parse time), enables tree-shaking, async by nature. To use ESM in Node, either use .mjs extension or set 'type': 'module' in package.json. Many packages now ship ESM-only.",
      example: "// CommonJS (require)\nconst express = require('express');\nconst { readFile } = require('fs');\nmodule.exports = { myFunction };\n\n// ES Modules (import)\nimport express from 'express';\nimport { readFile } from 'fs/promises';\nexport { myFunction };",
      use_case: "New projects use ESM. Legacy codebases and most npm packages still use CommonJS. TypeScript compiles to CommonJS by default but can target ESM.",
      follow_up: "Can you mix require and import in the same file? What is 'dual package' and why do package authors need it?"
    },
    {
      question: "What are Node.js built-in modules?",
      answer: "Node.js has many built-in modules requiring no installation: fs (file system), http/https (HTTP servers/clients), path (file paths), os (operating system info), events (event emitter), stream (streaming data), crypto (cryptography), child_process (spawn subprocesses), cluster (multi-process), url (URL parsing), querystring, buffer.",
      example: "const path = require('path');\nconst os = require('os');\n\nconst fullPath = path.join(__dirname, 'uploads', 'photo.jpg');\nconsole.log(os.cpus().length);  // number of CPU cores\nconsole.log(os.freemem());      // available RAM",
      use_case: "path.join() to build file paths cross-platform (Windows vs Linux use different separators). os.cpus().length to determine how many cluster workers to spawn.",
      follow_up: "What is the difference between path.join() and path.resolve()?"
    },
    {
      question: "What is the difference between process.nextTick, setImmediate, and setTimeout?",
      answer: "process.nextTick: runs before the NEXT event loop iteration — highest priority, runs before I/O callbacks. setImmediate: runs in the 'check' phase of the CURRENT event loop iteration — after I/O callbacks. setTimeout(fn, 0): runs in the 'timers' phase of the NEXT iteration — minimum delay, not exactly 0. In practice: nextTick > setImmediate/setTimeout (order between these two depends on context).",
      example: "console.log('1 — synchronous');\n\nprocess.nextTick(() => console.log('2 — nextTick'));\nsetImmediate(() => console.log('3 — setImmediate'));\nsetTimeout(() => console.log('4 — setTimeout 0'), 0);\n\nconsole.log('5 — synchronous');\n\n// Output: 1, 5, 2, (3 or 4 — varies), (4 or 3)",
      use_case: "process.nextTick is used to ensure a callback runs after the current function completes but before any I/O — useful in library code when you need to guarantee ordering.",
      follow_up: "What is the danger of recursively calling process.nextTick()? What is 'next tick queue starvation'?"
    },
    {
      question: "What is the EventEmitter in Node.js?",
      answer: "EventEmitter is Node's implementation of the observer pattern. You emit named events and register listeners for them. Many Node built-ins (streams, HTTP server, child_process) extend EventEmitter. Custom classes can extend EventEmitter to implement publish-subscribe patterns within an application.",
      example: "const EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\nemitter.on('order:placed', (order) => {\n  console.log('Send confirmation email:', order.email);\n});\nemitter.on('order:placed', (order) => {\n  console.log('Notify warehouse:', order.items);\n});\n\nemitter.emit('order:placed', { email: 'alice@example.com', items: ['Laptop'] });",
      use_case: "An order service emits 'order:placed'. Email service, inventory service, and analytics service all listen independently — loose coupling between components.",
      follow_up: "What is the maximum number of listeners per event by default? How do you change it and why does the warning exist?"
    },
    {
      question: "What are Node.js streams?",
      answer: "Streams process data in chunks rather than loading everything into memory. Types: Readable (read from — like file read, HTTP response), Writable (write to — like file write, HTTP request), Duplex (both — like TCP socket), Transform (modify data as it passes through — like gzip compression). Streams are EventEmitters. pipe() connects them.",
      example: "const fs = require('fs');\nconst zlib = require('zlib');\n\n// Compress a 10GB file using constant memory\nfs.createReadStream('huge.txt')  // Readable stream\n  .pipe(zlib.createGzip())        // Transform stream\n  .pipe(fs.createWriteStream('huge.txt.gz')) // Writable stream\n  .on('finish', () => console.log('Done — minimal memory used'));",
      use_case: "Streaming a 4K video file to thousands of users. If you loaded the entire file into memory first, the server would run out of RAM. Streams send chunks as they're read.",
      follow_up: "What is backpressure in streams and how does pipe() handle it automatically?"
    },
    {
      question: "What is the cluster module in Node.js?",
      answer: "Node.js runs on a single thread. A server with 8 CPU cores uses only 1 core by default. The cluster module lets you spawn multiple worker processes that all share the same port. The master process distributes incoming connections to workers. This utilises all CPU cores and improves throughput.",
      example: "const cluster = require('cluster');\nconst os = require('os');\n\nif (cluster.isPrimary) {\n  const cpuCount = os.cpus().length;\n  for (let i = 0; i < cpuCount; i++) {\n    cluster.fork(); // spawn worker process\n  }\n  cluster.on('exit', (worker) => {\n    console.log(`Worker ${worker.id} died — restarting`);\n    cluster.fork(); // restart dead workers\n  });\n} else {\n  // Worker process runs the server\n  require('./server');\n}",
      use_case: "PM2 (process manager) automates clustering with 'pm2 start server.js -i max' — creates one worker per CPU core and automatically restarts crashed workers.",
      follow_up: "What is the difference between clustering and worker threads? When would you use each?"
    },
    {
      question: "What is environment variables and how do you use them in Node.js?",
      answer: "Environment variables store configuration (API keys, database URLs, ports) outside the code. Never hardcode secrets — they end up in version control. Access them via process.env.VARIABLE_NAME. Use dotenv package to load .env files during development. In production, set variables in the hosting environment (server config, CI/CD, Kubernetes secrets).",
      example: "// .env (never commit this file)\nDB_HOST=localhost\nDB_PASSWORD=secret\nJWT_SECRET=my-super-secret-key\n\n// server.js\nrequire('dotenv').config();\nconst db = mysql.createConnection({ host: process.env.DB_HOST, password: process.env.DB_PASSWORD });\n\n// Always validate required variables at startup\nif (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');",
      use_case: "Same codebase runs in dev (local DB), staging (staging DB), and production (production DB) just by changing environment variables — zero code changes.",
      follow_up: "How do you handle secrets in production — environment variables vs secrets managers (AWS Secrets Manager, Vault)?"
    },
    {
      question: "What is REST API and how do you build one with Node.js?",
      answer: "REST (Representational State Transfer) is an API architecture using HTTP methods as verbs (GET=read, POST=create, PUT/PATCH=update, DELETE=delete) and URLs as nouns (resources). Stateless — each request contains everything needed. Returns JSON. Status codes communicate results (200=OK, 201=Created, 404=Not Found, 500=Error).",
      example: "// Conventional REST endpoints for 'posts' resource:\n// GET    /api/posts         → list all posts\n// GET    /api/posts/:id     → get one post\n// POST   /api/posts         → create post\n// PUT    /api/posts/:id     → replace post\n// PATCH  /api/posts/:id     → partial update\n// DELETE /api/posts/:id     → delete post\n\napp.get('/api/posts/:id', async (req, res) => {\n  const post = await Post.findById(req.params.id);\n  if (!post) return res.status(404).json({ error: 'Not found' });\n  res.json(post);\n});",
      use_case: "Every mobile app has a REST API backend. The Instagram app calls GET /api/feed to get posts, POST /api/likes/{id} to like a post.",
      follow_up: "What is the difference between REST and GraphQL? When would you choose GraphQL?"
    },
    {
      question: "How do you handle errors in Node.js and Express?",
      answer: "Node.js errors come in two forms: synchronous (thrown exceptions, caught with try/catch) and asynchronous (rejected Promises, callback errors). In Express: sync errors bubble automatically, async errors need explicit next(err) or async error handler wrappers. Always have a global error handler middleware as the last middleware.",
      example: "// Async error handler wrapper (avoids try/catch in every route)\nconst asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);\n\napp.get('/users/:id', asyncHandler(async (req, res) => {\n  const user = await User.findById(req.params.id); // if this throws, asyncHandler catches it\n  if (!user) throw Object.assign(new Error('Not found'), { status: 404 });\n  res.json(user);\n}));\n\n// Global error handler — must have 4 params\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ error: err.message });\n});",
      use_case: "Production APIs never expose stack traces to clients (security risk). The error handler logs full details and returns a clean error message.",
      follow_up: "What are uncaughtException and unhandledRejection? Should you use them to keep the server running?"
    },
    {
      question: "What is CORS and how do you handle it in Node.js?",
      answer: "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks web pages from calling APIs on a different domain. If your React app (localhost:3000) calls your API (localhost:5000), the browser blocks it. The server must respond with specific headers (Access-Control-Allow-Origin) to grant permission.",
      example: "const cors = require('cors');\n\n// Allow all origins (dev only)\napp.use(cors());\n\n// Production — restrict to specific origins\napp.use(cors({\n  origin: ['https://myapp.com', 'https://www.myapp.com'],\n  methods: ['GET', 'POST', 'PUT', 'DELETE'],\n  credentials: true, // allow cookies\n}));\n\n// Dynamic origin\napp.use(cors({\n  origin: (origin, callback) => {\n    const allowed = ['https://myapp.com', 'https://admin.myapp.com'];\n    callback(null, allowed.includes(origin));\n  }\n}));",
      use_case: "A React frontend on Vercel calling a Node.js API on AWS. Without CORS headers on the API, all browser requests are blocked.",
      follow_up: "What is the CORS preflight request (OPTIONS method) and when is it triggered?"
    },
    {
      question: "What is JWT authentication in Node.js?",
      answer: "JWT (JSON Web Token) is a compact, self-contained token for API authentication. Structure: header.payload.signature. On login, server creates and signs a JWT with a secret. Client stores it and sends it in the Authorization header with every request. Server verifies the signature — no DB lookup needed. The payload can contain user ID, role, etc.",
      example: "const jwt = require('jsonwebtoken');\n\n// Create token on login\nconst token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });\n\n// Verify middleware\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: 'Invalid token' });\n  }\n}",
      use_case: "Mobile app authentication. The app stores the JWT and sends it with every API call. Server validates it without hitting the database.",
      follow_up: "What is the difference between JWT and session-based authentication? What are JWT's security risks (signing algorithm confusion, no revocation)?"
    },
    {
      question: "What is the node_modules folder and why should you never commit it?",
      answer: "node_modules contains all installed packages — it can be hundreds of megabytes or gigabytes. You never commit it because: it's auto-generated (anyone can recreate it with npm install from package.json), it's platform-specific (some packages compile native code), it's huge (inflates repository size massively), and the package-lock.json ensures reproducible installs.",
      example: "# .gitignore (always include this)\nnode_modules/\ndist/\n.env\n.env.local\n*.log\n\n# To recreate node_modules on a new machine:\nnpm install      # installs from package.json + package-lock.json\nnpm ci           # faster, stricter — use in CI/CD, installs exact versions from lock file",
      use_case: "A new developer clones the repository. Running npm install downloads and installs all packages exactly as listed. No node_modules needed in git.",
      follow_up: "What is the difference between npm install and npm ci? Which should you use in CI/CD pipelines?"
    },
    {
      question: "What is a package-lock.json and why is it important?",
      answer: "package-lock.json records the EXACT version of every installed package and its dependencies. Without it, npm install might install slightly different package versions on different machines (because ^ and ~ in package.json allow version ranges). package-lock.json guarantees reproducible installs — same code runs on every machine and in CI.",
      example: "// package.json: \"express\": \"^4.18.0\" — allows 4.18.x, 4.19.x, etc.\n// package-lock.json records: \"express\": \"4.18.2\" — exact version\n\n// If package-lock.json exists:\nnpm install  // installs exact versions from lock file\n\n// npm ci (Continuous Integration) — STRICT\n// Fails if package-lock.json and package.json don't match\n// Always use npm ci in deployment pipelines",
      use_case: "A production deployment installs dependencies from package-lock.json. A package that worked in development (exact version) is guaranteed to be installed in production.",
      follow_up: "What is the difference between npm install, npm ci, and npm update? When would you run npm update?"
    }
  ],

  intermediate: [
    {
      question: "How does Node.js handle CPU-intensive tasks without blocking the event loop?",
      answer: "CPU-intensive work (image processing, video encoding, complex calculations) blocks the single thread. Solutions: 1. Worker Threads (worker_threads module) — run JS in separate threads with shared memory (SharedArrayBuffer). 2. Child Processes (child_process) — spawn separate Node.js processes. 3. C++ Addons (N-API) — native performance. 4. Offload to a queue + worker process. 5. Use specialized services (a Python microservice for ML work).",
      example: "const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\n\nif (isMainThread) {\n  // Main thread — start a worker\n  const worker = new Worker(__filename, { workerData: { array: bigArray } });\n  worker.on('message', result => console.log('Result:', result));\n} else {\n  // Worker thread — heavy computation\n  const result = heavyComputation(workerData.array);\n  parentPort.postMessage(result); // send back to main thread\n}",
      use_case: "A video processing API: each upload spawns a Worker Thread to transcode video. The main thread (HTTP server) stays responsive for new uploads.",
      follow_up: "What is the difference between worker_threads and child_process.fork()? What can be shared between worker threads?"
    },
    {
      question: "Explain Node.js memory management and how to prevent memory leaks.",
      answer: "Node.js uses V8's garbage collector (generational GC: new space → old space). Memory leaks occur when objects are unintentionally retained. Common causes: global variables accumulating data, event listeners never removed, closures holding large data, caches growing unbounded. Detection: monitor process.memoryUsage(), use --inspect with Chrome DevTools heap snapshot, clinic.js.",
      example: "// LEAK: event listener never removed\nconst emitter = new EventEmitter();\nfunction handleRequest() {\n  emitter.on('data', processData); // adds listener on every request!\n}\n// FIX: remove listener after use, or use .once()\nemitter.once('data', processData);\n\n// LEAK: global cache without eviction\nconst cache = {};\nfunction process(id, data) {\n  cache[id] = data; // grows forever!\n}\n// FIX: use LRU cache with size limit\nconst LRU = require('lru-cache');\nconst cache = new LRU({ max: 1000 });",
      use_case: "A Node.js server that gradually uses more and more memory over hours (memory leak) eventually runs out of RAM and crashes. Monitoring tools alert when memory growth is abnormal.",
      follow_up: "What is V8's garbage collection strategy? What does --max-old-space-size do and when would you increase it?"
    },
    {
      question: "How do you implement a caching layer in Node.js?",
      answer: "Caching strategies: in-memory (fast, lost on restart), Redis (persistent, shared across instances, best for production). Pattern: Cache-Aside (check cache → if miss, fetch DB → store in cache → return). Use appropriate TTL. Implement cache invalidation on data updates. For function-level caching, use memoization.",
      example: "const redis = require('ioredis');\nconst client = new redis();\n\nasync function getProduct(id) {\n  const key = `product:${id}`;\n  const cached = await client.get(key);\n  if (cached) return JSON.parse(cached); // cache hit\n  \n  const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);\n  await client.setex(key, 3600, JSON.stringify(product)); // cache for 1 hour\n  return product;\n}\n\n// Invalidate on update\nasync function updateProduct(id, data) {\n  await db.query('UPDATE products SET ? WHERE id = ?', [data, id]);\n  await client.del(`product:${id}`); // clear cache\n}",
      use_case: "A product detail page with 50,000 daily views. Caching the product object for 1 hour reduces database calls by 99%.",
      follow_up: "What is the cache stampede problem? How do you solve it with probabilistic early expiry or mutex locks?"
    },
    {
      question: "How do you implement input validation in a Node.js API?",
      answer: "Never trust client data. Validate at the API boundary before business logic. Libraries: Joi (schema-based, mature), Zod (TypeScript-first, type inference), express-validator (middleware-based). Validate type, format, range, required fields. Return clear error messages. Sanitize to remove/escape dangerous characters (prevent XSS, injection).",
      example: "const { z } = require('zod');\n\nconst createUserSchema = z.object({\n  name: z.string().min(2).max(100),\n  email: z.string().email(),\n  age: z.number().int().min(18).max(120),\n  role: z.enum(['user', 'admin']).default('user'),\n});\n\napp.post('/api/users', (req, res) => {\n  const result = createUserSchema.safeParse(req.body);\n  if (!result.success) {\n    return res.status(400).json({ errors: result.error.flatten() });\n  }\n  const validData = result.data; // fully typed and validated\n  // proceed with DB insert\n});",
      use_case: "A user registration API — without validation, anyone can send malformed data, injections, or invalid types that corrupt the database or crash the server.",
      follow_up: "What is the difference between validation and sanitization? Why do you need both?"
    },
    {
      question: "How do you implement rate limiting in Node.js?",
      answer: "Rate limiting restricts the number of requests from a client in a time window. Prevents abuse, DDoS, brute force. Libraries: express-rate-limit (simple, in-memory), rate-limiter-flexible (supports Redis for multi-server). Apply different limits per endpoint (login: 5/15min, API: 100/min, public: 1000/hour).",
      example: "const rateLimit = require('express-rate-limit');\nconst RedisStore = require('rate-limit-redis');\n\n// Strict login limit\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 5,                    // 5 attempts per window\n  message: { error: 'Too many login attempts — try again in 15 minutes' },\n  store: new RedisStore({ client: redisClient }), // shared across servers\n  skipSuccessfulRequests: true, // don't count successful logins\n});\n\n// General API limit\nconst apiLimiter = rateLimit({ windowMs: 60000, max: 100 });\n\napp.post('/auth/login', loginLimiter, loginHandler);\napp.use('/api', apiLimiter);",
      use_case: "Without login rate limiting, attackers can try millions of password combinations (brute force). With 5 attempts per 15 minutes, a brute force attack becomes impractical.",
      follow_up: "How does the sliding window algorithm differ from fixed window for rate limiting? What are the edge cases?"
    },
    {
      question: "What is connection pooling in Node.js database clients?",
      answer: "Creating a new database connection for every request is expensive (~100ms for TCP handshake + auth). Connection pooling maintains a pool of pre-established connections that are reused. The pool has min/max size. Idle connections stay open. When the pool is exhausted, requests queue. Most DB clients (pg, mysql2, mongoose) implement pooling automatically.",
      example: "const mysql2 = require('mysql2/promise');\n\nconst pool = mysql2.createPool({\n  host: 'localhost',\n  database: 'app',\n  user: 'root',\n  password: 'secret',\n  waitForConnections: true,\n  connectionLimit: 20,    // max 20 concurrent connections\n  queueLimit: 100,        // max 100 waiting for a connection\n  connectTimeout: 10000,  // 10 second connection timeout\n});\n\n// Pool auto-manages connections\nconst [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);\n// Connection automatically returned to pool",
      use_case: "An Express API with 100 concurrent requests. Without pooling: 100 new connections per request batch. With pooling (20 max): 20 connections reused, queue manages the rest.",
      follow_up: "How do you tune pool size? What happens when connectionLimit is too high vs too low?"
    },
    {
      question: "How do you implement file upload with Node.js?",
      answer: "Use Multer middleware for handling multipart/form-data. Configure destination (local disk or memory buffer), file size limits, and file type filters. For production, store files in cloud storage (AWS S3, GCS) not local disk (stateless servers, load balancers). Generate unique filenames to prevent collisions and path traversal.",
      example: "const multer = require('multer');\nconst storage = multer.memoryStorage(); // store in buffer\nconst upload = multer({\n  storage,\n  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max\n  fileFilter: (req, file, cb) => {\n    const allowed = ['image/jpeg', 'image/png', 'image/webp'];\n    cb(null, allowed.includes(file.mimetype));\n  }\n});\n\napp.post('/upload', upload.single('avatar'), async (req, res) => {\n  // req.file.buffer contains the file\n  const key = `avatars/${crypto.randomUUID()}.jpg`;\n  await s3.putObject({ Bucket: 'mybucket', Key: key, Body: req.file.buffer }).promise();\n  res.json({ url: `https://mybucket.s3.amazonaws.com/${key}` });\n});",
      use_case: "Profile picture upload, document upload in HR systems, media upload for social platforms.",
      follow_up: "How do you validate that a file is actually an image, not just checking the MIME type from the request (which can be spoofed)?"
    },
    {
      question: "What is GraphQL and how does it compare to REST in Node.js?",
      answer: "GraphQL is a query language for APIs. Client specifies exactly what data it needs in a single request — no over-fetching (getting too much) or under-fetching (needing multiple requests). REST uses multiple fixed endpoints. GraphQL uses a single /graphql endpoint with a schema. Node.js implementations: Apollo Server, GraphQL Yoga, Mercurius.",
      example: "// REST: multiple requests\n// GET /api/user/1 → { id, name, email, ... (all fields) }\n// GET /api/user/1/posts → separate call\n\n// GraphQL: one request, exact data\nquery {\n  user(id: 1) {\n    name\n    posts(first: 5) {\n      title\n      createdAt\n    }\n  }\n}\n// Returns exactly: { user: { name, posts: [{title, createdAt}] } }",
      use_case: "Mobile apps where bandwidth is limited benefit greatly from GraphQL — they request only the fields they display instead of downloading full objects.",
      follow_up: "What is the N+1 problem in GraphQL and how do you solve it with DataLoader?"
    },
    {
      question: "How do you handle environment-specific configuration in Node.js?",
      answer: "Use a config module that loads different values based on NODE_ENV. Libraries: node-config, convict. Always validate required config at startup with a config schema. Separate concerns: database URL, API keys, feature flags. Config hierarchy: defaults → environment overrides → secrets manager (production).",
      example: "// config/index.js\nconst config = {\n  development: { db: { host: 'localhost', pool: 5 }, logLevel: 'debug' },\n  production: { db: { host: process.env.DB_HOST, pool: 20 }, logLevel: 'error' },\n  test: { db: { host: 'localhost', pool: 1 }, logLevel: 'silent' },\n};\n\nconst env = process.env.NODE_ENV || 'development';\nmodule.exports = config[env];\n\n// Validate required production secrets\nif (env === 'production') {\n  const required = ['DB_HOST', 'JWT_SECRET', 'STRIPE_KEY'];\n  required.forEach(key => { if (!process.env[key]) throw new Error(`Missing: ${key}`); });\n}",
      use_case: "Same codebase runs with different DB hosts, log levels, and feature flags in dev/staging/production without code changes.",
      follow_up: "What is 12-factor app configuration and how does it guide Node.js config management?"
    },
    {
      question: "How do you test a Node.js API?",
      answer: "Testing layers: Unit tests (test pure functions, services — mock dependencies). Integration tests (test routes with a real or test DB). E2E tests (full request-response cycle). Tools: Jest or Mocha (test runner), Supertest (HTTP testing), Sinon/jest.fn (mocking), factories for test data. Test in isolation: reset DB between tests, mock external APIs.",
      example: "const request = require('supertest');\nconst app = require('./app');\n\ndescribe('POST /api/users', () => {\n  it('creates a user with valid data', async () => {\n    const res = await request(app)\n      .post('/api/users')\n      .send({ name: 'Alice', email: 'alice@test.com' });\n    \n    expect(res.status).toBe(201);\n    expect(res.body.data.email).toBe('alice@test.com');\n    expect(res.body.data.password).toBeUndefined(); // never return password\n  });\n\n  it('returns 400 with invalid email', async () => {\n    const res = await request(app).post('/api/users').send({ email: 'not-an-email' });\n    expect(res.status).toBe(400);\n  });\n});",
      use_case: "CI/CD pipeline runs the full test suite before every deployment. A failing test blocks deployment and alerts the developer immediately.",
      follow_up: "What is test database isolation? How do you reset state between tests (transactions, truncate, docker containers)?"
    }
  ],

  advanced: [
    {
      question: "Design a highly available Node.js microservices architecture.",
      answer: "Key components: API Gateway (routing, auth, rate limiting), Service Registry (service discovery — Consul/Kubernetes), Message Broker (async communication — Kafka/RabbitMQ), Circuit Breaker (fail fast when a service is down), Distributed Tracing (track requests across services — Jaeger/Zipkin), Centralized Logging (ELK stack). Each service owns its database. Deploy with Kubernetes for auto-scaling and health checks.",
      example: "// Circuit breaker with opossum\nconst CircuitBreaker = require('opossum');\n\nconst options = { timeout: 3000, errorThresholdPercentage: 50, resetTimeout: 30000 };\nconst breaker = new CircuitBreaker(callPaymentService, options);\n\nbreaker.fallback(() => ({ status: 'queued', message: 'Payment service unavailable' }));\nbreaker.on('open', () => logger.warn('Payment circuit OPEN — failing fast'));\nbreaker.on('halfOpen', () => logger.info('Payment circuit testing recovery'));\n\n// If 50% of calls fail within 3s window, circuit opens\n// Requests return fallback immediately until service recovers",
      use_case: "A food delivery platform: order service, payment service, notification service, and delivery service each run independently. Payment service going down should not crash the order flow — circuit breaker returns a graceful fallback.",
      follow_up: "What is the saga pattern for distributed transactions? When is 2-phase commit appropriate vs sagas?"
    },
    {
      question: "How do you diagnose and fix performance bottlenecks in a Node.js application?",
      answer: "Methodology: 1. Measure first (clinic.js, 0x flamegraph, --prof flag). 2. Identify: CPU-bound (heavy computation in hot path), memory-bound (leak or excessive allocation), I/O-bound (slow DB queries, no caching), event loop lag (blocked by sync operations). 3. Fix the specific bottleneck. 4. Measure improvement. Never optimise without profiling.",
      example: "# Profile with built-in profiler\nnode --prof server.js\n# Load test it\nab -n 10000 -c 100 http://localhost:3000/api/endpoint\n# Process the v8 log\nnode --prof-process isolate-xxxx.log > profile.txt\n\n# clinic.js (higher level)\nnpm install -g clinic\nclinic doctor -- node server.js\nclinic flame -- node server.js\n\n# Key metrics to watch:\n# - Event loop delay (clinic flame, perf_hooks)\n# - Memory heap (process.memoryUsage())\n# - CPU % per process (pm2 monit)",
      use_case: "A Node.js API handling 500 req/s is suddenly sluggish at 200 req/s. Profiling reveals a regex in the request logger is causing 40% of CPU usage on every request.",
      follow_up: "What is the RAIL model for performance? What are acceptable event loop lag values for a production API?"
    },
    {
      question: "Implement a Node.js job queue with Bull/BullMQ.",
      answer: "Job queues offload slow tasks (emails, PDF generation, image processing) to background workers. BullMQ (Redis-backed) provides: job scheduling, priority queues, rate limiting, concurrency control, retry with backoff, job events, and a dashboard (Bull Board). Producer adds jobs; Worker processes them independently of the HTTP request cycle.",
      example: "const { Queue, Worker } = require('bullmq');\nconst connection = { host: 'localhost', port: 6379 };\n\n// Producer (in your API controller)\nconst emailQueue = new Queue('emails', { connection });\nawait emailQueue.add('welcome', { userId: 42, email: 'alice@example.com' }, {\n  attempts: 3,\n  backoff: { type: 'exponential', delay: 2000 },\n  removeOnComplete: 100, // keep last 100 completed jobs\n});\n\n// Worker (separate process)\nconst worker = new Worker('emails', async (job) => {\n  await sendEmail(job.data.email, 'Welcome!', template(job.data));\n  console.log(`Job ${job.id} completed`);\n}, { connection, concurrency: 5 }); // process 5 emails simultaneously\n\nworker.on('failed', (job, err) => logger.error(`Job ${job.id} failed:`, err));",
      use_case: "User registration: API returns '201 Created' instantly while the welcome email, analytics event, and Slack notification are processed asynchronously in the background.",
      follow_up: "How does BullMQ handle job priorities? What is the difference between a queue and a priority queue in BullMQ?"
    },
    {
      question: "How do you implement real-time features with Socket.IO in Node.js?",
      answer: "Socket.IO provides WebSocket communication with fallbacks (long polling). Key concepts: events (emit/on), rooms (group sockets), namespaces (isolated channels), acknowledgements (confirm delivery). Scale across multiple servers with Redis adapter (pub/sub for cross-server event broadcasting). Authenticate via handshake middleware.",
      example: "const io = require('socket.io')(server);\nconst { createAdapter } = require('@socket.io/redis-adapter');\nio.adapter(createAdapter(pubClient, subClient)); // scale across servers\n\nio.use(async (socket, next) => {\n  const token = socket.handshake.auth.token;\n  try { socket.user = jwt.verify(token, JWT_SECRET); next(); }\n  catch { next(new Error('Authentication error')); }\n});\n\nio.on('connection', (socket) => {\n  const { userId } = socket.user;\n  socket.join(`user:${userId}`); // personal room\n  \n  socket.on('message:send', async (data) => {\n    await saveMessage(data);\n    io.to(`user:${data.recipientId}`).emit('message:received', data); // send to specific user\n  });\n});",
      use_case: "Real-time chat app, live sports scores, collaborative editing (Google Docs style), multiplayer games, live auctions.",
      follow_up: "What is the difference between Socket.IO and raw WebSockets? When would you use raw WebSockets?"
    },
    {
      question: "How do you implement request tracing and observability in Node.js?",
      answer: "Observability = Logs + Metrics + Traces. Distributed tracing: each request gets a unique trace ID propagated through all services (OpenTelemetry). Structured logging (JSON with correlation IDs) allows log aggregation. Metrics via Prometheus client. Correlation ID middleware adds trace-id to every log line and response header for end-to-end request tracking.",
      example: "const { NodeSDK } = require('@opentelemetry/sdk-node');\nconst { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');\n\nconst sdk = new NodeSDK({\n  traceExporter: new OTLPTraceExporter({ url: 'http://jaeger:4318/v1/traces' }),\n  instrumentations: [getNodeAutoInstrumentations()], // auto-instruments http, express, db\n});\nsdk.start();\n\n// Correlation ID middleware\napp.use((req, res, next) => {\n  req.traceId = req.headers['x-trace-id'] || crypto.randomUUID();\n  res.setHeader('x-trace-id', req.traceId);\n  req.log = logger.child({ traceId: req.traceId, userId: req.user?.id }); // logger with context\n  next();\n});",
      use_case: "A slow API request in production. With tracing, you follow the trace ID across the API gateway, auth service, product service, and DB query to pinpoint the 800ms database query.",
      follow_up: "What is OpenTelemetry and why is it preferred over vendor-specific SDKs (Datadog, New Relic agents)?"
    }
  ]
};
