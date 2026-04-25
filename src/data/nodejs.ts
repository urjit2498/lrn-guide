import { Topic } from '@/types';

export const nodejsTopic: Topic = {
  id: 'nodejs',
  name: 'Node.js',
  icon: '🟢',
  color: 'bg-green-100 dark:bg-green-900/30',
  textColor: 'text-green-700 dark:text-green-300',
  borderColor: 'border-green-300 dark:border-green-700',
  description: 'Node.js runs JavaScript on the server — fast, non-blocking, and great for APIs and real-time apps.',
  levels: [
    {
      level: 'beginner',
      intro: 'Understand what Node is, how it differs from browser JS, and build your first server.',
      sections: [
        {
          title: 'What is Node.js?',
          explanation:
            'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It lets you run JavaScript outside the browser — on your computer or a server. Node is single-threaded but handles thousands of concurrent requests by using an "event loop" (non-blocking I/O).',
          realWorldExample:
            'Netflix uses Node.js for its UI layer. When 1 million users stream simultaneously, Node handles all the API calls efficiently because it does not wait for one request to finish before handling the next.',
          practicalUseCase:
            'Create a simple HTTP server that responds with "Hello, World!" using Node\'s built-in http module.',
          codeExample: `// server.js — no framework, pure Node
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

// Run: node server.js`,
          exercise:
            'Extend the server to return different text based on the URL path (/about, /contact, 404 for unknown paths).',
        },
        {
          title: 'npm & Modules',
          explanation:
            'npm (Node Package Manager) is the largest software registry in the world. Modules let you split code into files and share code between files. CommonJS (require/module.exports) is the traditional module system. ESM (import/export) is the modern standard.',
          realWorldExample:
            'Every modern web project uses npm. Running "npm install" downloads all dependencies listed in package.json. express, lodash, axios — all npm packages.',
          practicalUseCase:
            'Create a utility module that exports helper functions, and import it into your main file.',
          codeExample: `// utils/math.js
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };

// index.js
const { add, multiply } = require('./utils/math');
console.log(add(3, 4));      // 7
console.log(multiply(3, 4)); // 12

// Modern ESM syntax (add "type": "module" to package.json)
export const add = (a, b) => a + b;
import { add } from './utils/math.js';`,
          exercise:
            'Build a simple CLI tool using npm\'s readline module that asks the user for two numbers and prints their sum.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the event loop in Node.js?',
          answer:
            'The event loop is what makes Node non-blocking. Node offloads I/O operations (file reads, DB queries, network calls) to the OS. When complete, the OS notifies Node, which queues the callback and processes it. This means one thread handles many concurrent operations.',
        },
        {
          question: 'What is the difference between require and import?',
          answer:
            'require is CommonJS (synchronous, dynamic). import/export is ES Modules (static, tree-shakeable, asynchronous loading). Node supports both. New projects should use ES Modules. Libraries shipping for browser + Node often provide both.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Build REST APIs with Express, handle async with Promises/async-await, and connect to databases.',
      sections: [
        {
          title: 'Express.js — Building APIs',
          explanation:
            'Express is the most popular Node.js framework. It is minimal and flexible. You define routes, add middleware, and handle requests/responses. Most Node APIs are built with Express or a framework based on it (like NestJS or Fastify).',
          realWorldExample:
            'Uber\'s early backend was Node + Express. When you book a ride, the mobile app sends POST /rides to an Express API which validates, stores, and sends the request to nearby drivers.',
          practicalUseCase:
            'Build a REST API with Express for a "todos" resource: GET all, GET one, POST, PUT, DELETE.',
          codeExample: `import express from 'express';
const app = express();
app.use(express.json()); // Parse JSON bodies

const todos = [{ id: 1, text: 'Learn Node.js', done: false }];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  Object.assign(todo, req.body);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const idx = todos.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  todos.splice(idx, 1);
  res.status(204).end();
});

app.listen(3000, () => console.log('API running on :3000'));`,
          exercise:
            'Add input validation middleware that returns 400 if "text" is missing or empty in the POST body.',
        },
        {
          title: 'Async/Await & Error Handling',
          explanation:
            'Node is asynchronous — most operations (DB queries, file reads, API calls) return Promises. async/await is the cleanest way to work with Promises. Always wrap async Express handlers in try/catch or use a wrapper utility.',
          realWorldExample:
            'A checkout API: await product.findById(id), await cart.update(user, item), await payment.charge(card, amount), await email.send(receipt) — each step waits for the previous, with error handling at each stage.',
          practicalUseCase:
            'Refactor a callback-based file reader to use async/await. Add proper error handling.',
          codeExample: `import { readFile, writeFile } from 'fs/promises';

// Clean async/await with proper error handling
async function processFile(inputPath, outputPath) {
  try {
    const content = await readFile(inputPath, 'utf-8');
    const processed = content.toUpperCase();
    await writeFile(outputPath, processed);
    console.log('Done!');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found:', inputPath);
    } else {
      throw err; // Re-throw unexpected errors
    }
  }
}

// Express async error handling wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}));`,
          exercise:
            'Build a function that reads multiple files in parallel (Promise.all) and returns all their contents.',
        },
      ],
      interviewQA: [
        {
          question: 'What is middleware in Express?',
          answer:
            'Middleware is a function with (req, res, next) signature. It runs between the request arriving and the route handler responding. Common uses: authentication, logging, body parsing, CORS, error handling. next() passes control to the next middleware.',
        },
        {
          question: 'What is the difference between process.nextTick and setImmediate?',
          answer:
            'process.nextTick callbacks run before the next event loop iteration (before I/O). setImmediate callbacks run in the "check" phase of the current event loop iteration (after I/O). nextTick is effectively higher priority.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Authentication, real-time with WebSockets, microservices patterns, and production deployment.',
      sections: [
        {
          title: 'JWT Authentication',
          explanation:
            'JWT (JSON Web Token) is the standard for API authentication. On login, the server signs a token containing the user ID. The client sends this token with every request in the Authorization header. The server verifies the signature — no database lookup needed.',
          realWorldExample:
            'Every mobile app API uses JWT. The Instagram app stores a JWT locally. With each API call it sends the token and the server instantly knows who you are without querying the database.',
          practicalUseCase:
            'Build a /auth/login endpoint that returns a JWT, and protect /api/profile with a middleware that validates the token.',
          codeExample: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET!;

// Login — returns JWT
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(auth.slice(7), SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/api/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});`,
          exercise:
            'Implement token refresh: a /auth/refresh endpoint that accepts a valid JWT and returns a new one with a fresh expiry.',
        },
      ],
      interviewQA: [
        {
          question: 'What is clustering in Node.js and why is it used?',
          answer:
            'Node.js runs on a single thread, but modern servers have multiple CPU cores. The cluster module lets you spawn multiple Node processes (workers) that share the same port. This utilises all CPU cores and improves throughput. PM2 automates this with the "cluster mode".',
        },
        {
          question: 'What are streams in Node.js?',
          answer:
            'Streams process data in chunks rather than loading everything into memory. They are ideal for large files, video streaming, and network data. Types: Readable (file read), Writable (file write), Duplex (TCP socket), Transform (compress, encrypt). Pipe connects them: readStream.pipe(gzip).pipe(writeStream).',
        },
      ],
    },
  ],
};
