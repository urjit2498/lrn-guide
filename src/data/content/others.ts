import type { SpecificSectionData } from './php';
import { JS_OOP_SOLID_CONTENT } from './js-oop-solid';

const react: Record<string, SpecificSectionData> = {
  'What is React': {
    explanation:
      'React is a JavaScript library for building user interfaces through a component model. Instead of manipulating the DOM directly, you describe what the UI should look like for a given state, and React reconciles the real DOM with your description using a virtual DOM diffing algorithm. Components are functions (or classes) that accept `props` as input and return JSX — a syntax extension that looks like HTML but compiles to `React.createElement()` calls. React\'s one-way data flow means data moves down through props; events flow up through callback functions.',
    realWorldExample:
      'A live search box: each keystroke updates `const [query, setQuery] = useState("")`. React re-renders the component with the new query, runs a filter over the products array, and updates only the changed DOM nodes — not the entire page. The search results appear in under 16ms (one frame) because React batches state updates and skips unchanged components using its reconciliation algorithm.',
    practicalUseCase:
      'Build a counter component: `const [count, setCount] = useState(0)`. Add increment, decrement, and reset buttons. Open React DevTools, observe that clicking increment re-renders only the Counter component — not the parent App. Then move the count to the parent and pass it as a prop — notice you can no longer reset it locally; you must call a prop callback. This demonstrates why state placement matters in React.',
    keyPoints: [
      'React\'s virtual DOM is a JavaScript object tree that mirrors the real DOM; React diffs old and new virtual DOM to compute the minimal real DOM changes.',
      'JSX is syntactic sugar: `<Button onClick={handler}>Click</Button>` compiles to `React.createElement(Button, {onClick: handler}, "Click")`.',
      'One-way data flow: props flow down (parent to child), events flow up (child calls parent callback) — prevents the two-way binding bugs of frameworks like Angular 1.',
      'React components re-render when their state changes or their props change — `React.memo()` and `useMemo()` prevent unnecessary re-renders.',
      'Hooks (introduced React 16.8) let function components use state, effects, context, and refs — class components are largely legacy.',
      'Concurrent Mode (React 18) lets React interrupt and resume rendering to keep the UI responsive during expensive updates.',
      'React does not manage routing, state, or data fetching — you pair it with React Router, Zustand/Redux, and TanStack Query.',
    ],
    interviewQA: [
      {
        question: 'What is the virtual DOM and how does React\'s reconciliation algorithm work?',
        answer:
          'The virtual DOM is a lightweight JavaScript representation of the real DOM tree. When state changes, React creates a new virtual DOM tree and diffs it against the previous one using a heuristic algorithm (O(n) instead of the theoretical O(n³) for full tree diffing). The diff assumes: (1) Elements of different types produce different trees — if `<div>` becomes `<span>`, React destroys and rebuilds the subtree. (2) The `key` prop identifies which list items changed, moved, or were added. React then batches the minimal set of real DOM mutations needed to match the new virtual tree. This batch-update approach is faster than direct DOM manipulation on every state change.',
        use_case: 'Rendering a 1000-item sorted list: without keys, React can\'t identify which items moved and re-renders all 1000. With unique stable keys, React only moves the changed items\'s DOM nodes.',
        follow_up: 'Why should you never use array index as a key for a sortable/filterable list?',
      },
      {
        question: 'What is the difference between props and state in React?',
        answer:
          'Props are external inputs passed to a component by its parent — immutable from the component\'s perspective, like function arguments. State is internal data owned and managed by the component — mutable via `setState`/`useState`. A component can read its props but cannot modify them; only the parent that passed them can update them. State changes trigger a re-render of the component and its children. The distinction matters for component design: if two components need to share data, lift the state up to their nearest common ancestor and pass it down as props.',
        follow_up: 'When does it make sense to make a component fully "controlled" vs "uncontrolled"?',
      },
      {
        question: 'What problem does React 18\'s concurrent rendering solve?',
        answer:
          'Before React 18, rendering was synchronous and uninterruptible: starting a 200ms render blocked the main thread, making the UI feel frozen. Concurrent React can pause a render mid-way, handle a higher-priority update (like a user keystroke), then resume the paused render. This enables `useTransition()`: mark expensive state updates as "non-urgent" so React keeps the UI responsive while computing them in the background. Example: typing in a search box that filters 10,000 items — with `useTransition`, keystrokes feel instant while the filtered list updates 50–200ms later without blocking input.',
        follow_up: 'How does React 18\'s automatic batching differ from batching in React 17?',
      },
    ],
  },

  'JSX and Rendering Basics': {
    explanation:
      'JSX is a syntax extension that lets you write HTML-like code in JavaScript files. Babel compiles `<h1 className="title">Hello</h1>` to `React.createElement("h1", {className: "title"}, "Hello")`. JSX is not HTML: use `className` (not `class`), `htmlFor` (not `for`), camelCase event handlers (`onClick`), and self-close all tags (`<img />`). Expressions inside JSX use `{}`: `<p>{user.name}</p>`. JSX must have a single root element — use a `<>...</>` Fragment when you need multiple root-level elements without a wrapper div.',
    realWorldExample:
      'A product card in an e-commerce app: `<div className="card"><img src={product.imageUrl} alt={product.name} /><h2>{product.name}</h2><p>${product.price.toFixed(2)}</p><button onClick={() => addToCart(product.id)} disabled={!product.inStock}>{product.inStock ? "Add to Cart" : "Out of Stock"}</button></div>`. Every `{}` is a JavaScript expression — conditional text, function calls, method calls all work inline.',
    practicalUseCase:
      'Write a `UserCard` component that receives `{ name, email, role }` as props and renders them. Add conditional styling: if `role === "admin"` apply a gold badge. Use `&&` for conditional rendering: `{isVerified && <span>✓ Verified</span>}`. Inspect the compiled output in the browser\'s DevTools Sources to see what Babel turned your JSX into — it makes JSX feel less magical.',
    keyPoints: [
      'JSX uses `className` for CSS classes, `htmlFor` for label targets — HTML attributes that conflict with JS reserved words are renamed.',
      'Self-closing tags are required in JSX: `<br />`, `<input />`, `<img />` — not optional like in HTML5.',
      'Fragments `<>...</>` avoid unnecessary wrapper divs in the DOM — use them in list items, table rows, and conditionals.',
      'JSX expressions must evaluate to a React node — objects throw "Objects are not valid as a React child"; always convert to string first.',
      'Event handlers receive a `SyntheticEvent` — React\'s cross-browser wrapper around the native DOM event with the same API.',
      '`null`, `undefined`, `false`, and `true` render nothing in JSX — useful for conditional rendering but `0` renders as "0" (a gotcha).',
      'JSX comments: `{/* comment */}` inside JSX tags — `// comment` outside JSX, inside the function body.',
    ],
    interviewQA: [
      {
        question: 'Why does React warn when you render `0` conditionally with `&&`?',
        answer:
          'In JavaScript, `0 && <Component />` short-circuits and evaluates to `0` — not `false`. React renders `0` as the text "0" in the DOM because `0` is a valid React node (unlike `false`, `null`, `undefined`). So `{items.length && <List items={items} />}` renders "0" when the array is empty instead of rendering nothing. Fix: use explicit boolean conversion: `{items.length > 0 && <List />}` or ternary: `{items.length ? <List /> : null}`. This is the most common subtle bug in React codebases that goes unnoticed until a user reports seeing a random "0" on screen.',
        follow_up: 'Which values in JavaScript are falsy but still render as text in JSX?',
      },
      {
        question: 'What is a React Fragment and when would you use it over a wrapper div?',
        answer:
          'A Fragment (`<>...</>` or `<React.Fragment>`) groups multiple elements without adding an extra DOM node. Use fragments when: (1) A component must return multiple sibling elements but adding a wrapper div would break HTML semantics (e.g., `<td>` cells — a wrapper div inside `<tr>` is invalid HTML). (2) Extra wrapper divs break CSS layouts (Flexbox/Grid where extra elements disrupt the layout). (3) You\'re mapping a list and each item returns multiple elements — each item needs a key, so use `<React.Fragment key={id}>` (shorthand `<>` doesn\'t support the key prop).',
        follow_up: 'When must you use `<React.Fragment key={id}>` instead of the shorthand `<>`?',
      },
    ],
  },

  'State and useState': {
    explanation:
      '`useState` is a Hook that adds state to a function component. `const [value, setValue] = useState(initialValue)` returns the current state and a setter function. Calling `setValue(newValue)` schedules a re-render with the new state — React does NOT mutate state in place. For state derived from the previous state, use the functional update form: `setCount(prev => prev + 1)` — this prevents stale closure bugs in async contexts. State updates in React 18 are batched by default (inside and outside event handlers), so multiple `setState` calls in one synchronous block trigger only one re-render.',
    realWorldExample:
      'A shopping cart: `const [items, setItems] = useState<CartItem[]>([])`. Adding an item: `setItems(prev => [...prev, newItem])` — spread creates a new array (immutable update), which React uses to detect that state changed. `setItems(prev => prev.filter(i => i.id !== id))` removes by ID. Never `items.push(newItem)` — mutating state directly won\'t trigger a re-render because React checks the array reference, not its contents.',
    practicalUseCase:
      'Build a toggle button: `const [isOn, setIsOn] = useState(false)`. Use `setIsOn(prev => !prev)` — not `setIsOn(!isOn)` — to avoid stale closure issues. Then add a text input: `const [text, setText] = useState("")` with `onChange={e => setText(e.target.value)}`. Add a character count display that updates in real-time. Open React DevTools and watch state update as you type to understand the render cycle.',
    keyPoints: [
      'State updates are asynchronous and batched — `console.log(count)` immediately after `setCount(5)` still logs the old value.',
      'The functional update form `setState(prev => prev + 1)` always reads the latest state — use it when new state depends on previous state.',
      'Never mutate state directly: `state.items.push(x)` won\'t trigger re-render. Use `setState([...state.items, x])` (new array reference).',
      'Lazy initialization: `useState(() => computeExpensiveInitialValue())` — the function runs only once on mount, not on every render.',
      'Multiple `useState` calls are independent — don\'t put all state in one object unless the fields always change together.',
      'Derived state: if a value can be computed from existing state/props, compute it during render — don\'t store it in a separate `useState`.',
      'React Strict Mode double-invokes state updater functions in development to detect side effects — this is expected behavior.',
    ],
    interviewQA: [
      {
        question: 'Why should you use the functional update form of setState and when is it required?',
        answer:
          'The functional form `setState(prev => newValue)` is required when the new state depends on the previous state AND the update might be scheduled asynchronously. In event handlers, React batches updates — if you call `setCount(count + 1)` twice, both reads `count` from the closure (same value), so you get `count + 1` not `count + 2`. With functional form: `setCount(p => p + 1)` twice correctly gives `count + 2` because each call receives the latest queued state. This matters in: async callbacks (setTimeout, fetch responses), event handlers with multiple state updates, and React 18\'s concurrent mode where renders can be interrupted and retried.',
        follow_up: 'What is a stale closure in React and how does the functional setState form fix it?',
      },
      {
        question: 'What is the difference between state and derived state, and when should you use each?',
        answer:
          'State is source-of-truth data that can\'t be computed from other values. Derived state is computed from existing state or props. Anti-pattern: `const [items, setItems] = useState([])` and separately `const [itemCount, setItemCount] = useState(0)` — `itemCount` is derived state, always equal to `items.length`. This creates two sources of truth that can desync. Instead, derive it during render: `const itemCount = items.length`. React will recompute it on every render — this is free for cheap computations. For expensive derivations, use `useMemo(() => expensiveCompute(items), [items])` to cache the result between renders.',
        follow_up: 'When would you use `useReducer` instead of multiple `useState` calls?',
      },
    ],
  },

  'useEffect and Side Effects': {
    explanation:
      '`useEffect` runs after every render by default, or conditionally based on a dependency array. Side effects are operations that reach outside the component: fetching data, subscribing to WebSockets, manually updating the DOM, or starting timers. The effect returns a cleanup function that React calls before running the effect again and when the component unmounts. The dependency array controls when the effect re-runs: `[]` means run once on mount/cleanup on unmount, `[id]` means re-run when `id` changes, no array means run after every render.',
    realWorldExample:
      'A live chat component: `useEffect(() => { const ws = new WebSocket("wss://api.example.com/chat"); ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]); return () => ws.close(); }, [roomId])`. The cleanup closes the WebSocket when `roomId` changes (switches rooms) or when the component unmounts. Without the cleanup, switching rooms creates a second WebSocket connection that still pushes messages to a stale state, causing ghost messages.',
    practicalUseCase:
      'Implement a useWindowWidth hook: `useEffect(() => { const handler = () => setWidth(window.innerWidth); window.addEventListener("resize", handler); return () => window.removeEventListener("resize", handler); }, [])`. Test that the event listener is removed by unmounting the component (navigate away) and resizing — the component should no longer update. Missing the cleanup causes a memory leak that silently accumulates listeners over navigation.',
    keyPoints: [
      'An empty dependency array `[]` means "run once after mount, clean up before unmount" — not "run only once ever".',
      'Every value used inside `useEffect` that comes from props or state should be in the dependency array (React\'s exhaustive-deps ESLint rule enforces this).',
      'Don\'t call async functions directly in useEffect — define an async function inside and call it: `useEffect(() => { async function fetchData() {...} fetchData(); }, [id])`.',
      'React Strict Mode intentionally mounts → unmounts → remounts every component in development to surface missing cleanup functions.',
      'Race conditions: if the user triggers two fetches quickly, the second might resolve before the first; use an `ignore` flag in cleanup to discard stale responses.',
      'Prefer `useLayoutEffect` over `useEffect` only when you need to read/write DOM measurements before the browser paints (avoids layout flicker).',
      'Data fetching in `useEffect` is considered a "last resort" — prefer libraries like TanStack Query that handle caching, deduplication, and race conditions.',
    ],
    interviewQA: [
      {
        question: 'What causes the "Can\'t perform a state update on an unmounted component" React warning?',
        answer:
          'This warning (removed in React 18 but the underlying bug persists) fires when an async operation (fetch, setTimeout) completes after the component unmounts and tries to call `setState`. Example: component mounts, starts a fetch, user navigates away (component unmounts), fetch resolves, calls `setData(result)` — React warns because there\'s no component to update. Fix: use a cleanup flag. `useEffect(() => { let cancelled = false; fetch(url).then(data => { if (!cancelled) setData(data); }); return () => { cancelled = true; }; }, [url])`. The AbortController approach is cleaner: it actually cancels the in-flight request, saving network resources.',
        follow_up: 'How does `AbortController` work in a React fetch effect, and what does canceling a fetch actually do?',
      },
      {
        question: 'Why is it a mistake to omit a dependency from useEffect\'s dependency array?',
        answer:
          'The effect closure captures the values of props/state at the time it runs. If you omit a dependency, the effect runs with stale values from the initial render. Example: `useEffect(() => { const timer = setInterval(() => setCount(count + 1), 1000); return () => clearInterval(timer); }, [])` — `count` is always `0` inside the effect (stale closure), so `setCount(count + 1)` always sets to `1`. Fix: use functional update `setCount(c => c + 1)` (removes the stale dependency) or include `count` in the dependency array (causes the interval to reset every second, a different bug). The exhaustive-deps ESLint rule catches stale dependencies at compile time.',
        follow_up: 'When is it intentionally safe to omit a dependency from the array?',
      },
    ],
  },

  'Custom Hooks': {
    explanation:
      'Custom hooks are JavaScript functions whose names start with `use` and that call other hooks. They let you extract stateful logic out of components so it can be reused across multiple components. The key insight: custom hooks share LOGIC, not STATE — each component that calls a custom hook gets its own isolated state. A `useWindowSize` hook called in Header and Sidebar each maintains its own size state independently. Custom hooks can return anything: a value, a tuple of values, an object, a function, or nothing.',
    realWorldExample:
      'An e-commerce app has product lists, search results, and cart items that all need paginated fetching with loading/error states. Instead of duplicating `const [data, setData] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(null)` in every component, extract: `function usePaginatedFetch<T>(url: string, page: number) { ... return { data, loading, error, totalPages }; }`. Every list component uses one line instead of 15 lines of repeated fetch logic.',
    practicalUseCase:
      'Build a `useLocalStorage<T>(key: string, defaultValue: T)` hook that mirrors `useState` but persists to localStorage. On init, read `localStorage.getItem(key)` and parse JSON. On `setValue`, call `localStorage.setItem(key, JSON.stringify(newValue))`. Return `[value, setValue]` — callers use it identically to `useState`. Handle JSON parse errors (corrupted localStorage) with try-catch. This hook can now replace `useState` anywhere persistence across page reloads is needed.',
    keyPoints: [
      'Custom hooks MUST start with `use` — React\'s lint rules and the runtime use this convention to enforce rules-of-hooks checks.',
      'Each call to a custom hook creates isolated state — `useCounter()` in ComponentA and ComponentB are independent counters.',
      'Custom hooks can compose other custom hooks: `useOrderedList` can internally call `useFetch` and `useSortedArray`.',
      'Returning an object `{ data, loading, error }` is better than a tuple when the hook returns more than 2 values — named fields are self-documenting.',
      'Custom hooks should be tested independently of any component — write a test that calls the hook using `@testing-library/react`\'s `renderHook`.',
      'Don\'t over-abstract: a custom hook for one-time logic in one component is premature abstraction — extract only when you actually reuse it.',
      'Custom hooks can accept callbacks; pass them through `useCallback` to stabilize references and prevent infinite effect loops.',
    ],
    interviewQA: [
      {
        question: 'How is a custom hook different from a utility function?',
        answer:
          'A utility function is a plain JavaScript function — it cannot call hooks (`useState`, `useEffect`, `useContext`). A custom hook IS a React hook — it can call other hooks and its state is tied to the component tree (each call creates isolated state). If you need to share logic that uses React state or lifecycle, it must be a custom hook. If you\'re sharing pure computation (format a date, calculate a total), a regular function is correct. The `use` prefix isn\'t cosmetic — it tells React\'s linter to enforce the rules of hooks (only call hooks at top level, not inside conditions or loops).',
        follow_up: 'Can you use a custom hook conditionally inside a component? What happens if you do?',
      },
      {
        question: 'What is the `useReducer` hook and when would you choose it over `useState`?',
        answer:
          '`useReducer(reducer, initialState)` manages state through a pure reducer function `(state, action) => newState` — the same pattern as Redux. Choose `useReducer` when: (1) State is a complex object with multiple sub-values that change together. (2) Next state depends on the previous in complex, branching ways. (3) Multiple actions can update the same state (add item, remove item, clear cart, apply discount — all update the cart). (4) You want to move state logic out of the component body for testability (reducers are pure functions, easy to unit test). For simple counters or toggles, `useState` is cleaner.',
        follow_up: 'How would you implement a `useUndo` hook using `useReducer`?',
      },
    ],
  },
};

const nodejs: Record<string, SpecificSectionData> = {
  'What is Node.js': {
    explanation:
      'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that executes JavaScript on the server side. Unlike PHP or Python\'s threaded models, Node.js uses a single-threaded event loop with non-blocking I/O — when a database query or file read is in progress, the thread doesn\'t block waiting; it registers a callback and continues processing other requests. This model handles thousands of concurrent connections efficiently on a single thread, because most web server time is waiting for I/O, not doing CPU work.',
    realWorldExample:
      'A real-time chat server handles 10,000 simultaneous WebSocket connections on a single Node.js process using 50MB of RAM. A traditional threaded Java server would require 10,000 threads (at ~1MB stack each = 10GB RAM). Node\'s event loop accepts a new message on connection #7, forwards it to the subscribed clients, and moves on — the entire operation is microseconds of CPU with no blocking.',
    practicalUseCase:
      'Run `node -e "console.log(process.versions)"` to see V8, Node, and libuv versions. Create `server.js` with `const http = require("http"); http.createServer((req, res) => res.end("Hello")).listen(3000)`. Run it, hit it with `curl localhost:3000`. Then add `setImmediate(() => console.log("after response"))` and observe that it runs after the response is sent — event loop in action.',
    keyPoints: [
      'Node.js uses libuv for its event loop and non-blocking I/O — libuv manages the OS-level async operations and thread pool.',
      'The event loop has six phases: timers, pending callbacks, idle/prepare, poll (waits for I/O), check (setImmediate), close callbacks.',
      'Node\'s thread pool (default 4 threads) handles truly blocking operations: DNS lookups, crypto, file system, native C++ modules.',
      'npm is the default package manager; pnpm and Yarn are popular alternatives with better monorepo support and disk efficiency.',
      'Node uses CommonJS (`require`/`module.exports`) by default; ES Modules (`import`/`export`) are supported with `.mjs` files or `"type": "module"` in `package.json`.',
      'Node is single-threaded but not single-process — use `cluster` module or PM2 to run one process per CPU core for CPU-bound workloads.',
      'V8 JIT compiles hot JavaScript functions to machine code; Turbofan is V8\'s optimizing compiler for frequently-called functions.',
    ],
    interviewQA: [
      {
        question: 'How does Node.js handle 10,000 concurrent connections on a single thread?',
        answer:
          'Node\'s event loop never blocks waiting for I/O. When a request arrives and needs a database query, Node registers the query with libuv (which uses OS-level async I/O — epoll on Linux, kqueue on macOS), then immediately returns to the event loop to handle the next incoming request. When the DB responds (milliseconds later), libuv signals the event loop, which picks up the callback and resumes processing that request. The single thread is always doing CPU work; I/O waiting is offloaded to the OS. This works because web servers spend 95%+ of time waiting for I/O, not computing — one thread can serve thousands of concurrent I/O-waiting requests.',
        use_case: 'A Node.js API server can handle 50,000 req/sec of simple CRUD operations on commodity hardware — not because it\'s faster per-request, but because it doesn\'t waste threads on I/O waiting.',
        follow_up: 'What would break Node\'s concurrency model? Give a specific example of blocking the event loop.',
      },
      {
        question: 'What is the difference between `process.nextTick()`, `setImmediate()`, and `setTimeout(fn, 0)`?',
        answer:
          '`process.nextTick()` executes the callback before the event loop continues to the NEXT PHASE — it runs between the current operation and any I/O events, even before `Promise` microtasks in older Node versions. `setImmediate()` runs in the CHECK phase of the event loop — after I/O callbacks, before timers. `setTimeout(fn, 0)` runs in the TIMERS phase — after I/O, after setImmediate in some cases. Order (inside I/O callback): nextTick → Promise.then → setImmediate → setTimeout(0). Use `process.nextTick` for deferring callbacks that must run before I/O; use `setImmediate` for deferring after I/O; use `setTimeout(0)` when you need timer semantics.',
        follow_up: 'Why is overusing `process.nextTick()` in a loop dangerous?',
      },
    ],
  },

  'Event Loop and Non-blocking I/O': {
    explanation:
      'The Node.js event loop is a mechanism that allows a single-threaded program to handle concurrent operations without blocking. It cycles through phases: timers (setTimeout/setInterval callbacks), pending callbacks (OS-level errors), poll (waits for new I/O events and executes their callbacks), check (setImmediate callbacks), and close callbacks. The poll phase is where Node spends most of its time — waiting for I/O. When an I/O operation completes (the OS notifies libuv), the callback is queued and executed in the next poll or pending phase.',
    realWorldExample:
      'A Node HTTP server receives two requests simultaneously. Request A needs a database query (20ms). Request B is a simple calculation (1ms). Event loop: registers A\'s DB query with libuv → executes B immediately → returns result for B → 20ms later, libuv signals DB response for A → processes A\'s callback → sends A\'s response. Total wall time: ~21ms. A threaded server would handle both in ~20ms (parallel threads) but Node\'s approach scales to thousands of concurrent A-type requests without adding threads.',
    practicalUseCase:
      'Demonstrate event loop order: `console.log("1: sync"); setTimeout(() => console.log("4: setTimeout"), 0); Promise.resolve().then(() => console.log("3: microtask")); console.log("2: sync")`. Output order: 1 → 2 → 3 → 4. Sync code runs first, then microtasks (Promises), then macrotasks (setTimeout). Understanding this order prevents subtle async bugs where code runs in unexpected order.',
    keyPoints: [
      'Microtasks (Promise.then, queueMicrotask) run between event loop phases — they drain completely before the next phase starts.',
      'libuv\'s thread pool (4 threads by default, configurable via UV_THREADPOOL_SIZE) handles crypto, DNS, file I/O, and zlib.',
      'CPU-bound operations block the event loop — a `while(true)` loop or complex JSON.parse of 100MB blocks ALL other requests.',
      '`--inspect` flag starts the V8 inspector; connect with Chrome DevTools to profile event loop utilization and identify blocking operations.',
      'Worker threads (`worker_threads` module) move CPU work to separate threads — the solution for CPU-bound operations in Node.',
      '`async_hooks` module lets you track async operations across the event loop — used by APM tools like Datadog and New Relic.',
      'The event loop can be monitored: `blocked-at` npm package and `perf_hooks.monitorEventLoopDelay()` measure event loop lag.',
    ],
    interviewQA: [
      {
        question: 'What happens if you run CPU-intensive code in a Node.js request handler?',
        answer:
          'CPU-intensive code blocks the event loop — the single thread is busy computing and cannot accept or respond to any other requests until it finishes. Example: `app.get("/", (req, res) => { const result = heavyCpuWork(); res.json(result); })` — if `heavyCpuWork()` takes 500ms, ALL other requests queue behind it for 500ms. Solutions: (1) `worker_threads` — offload to a separate thread. (2) `child_process.fork()` — spawn a child process for the heavy work. (3) Move CPU work to a message queue (Bull + Redis) processed by worker processes. (4) If the work can be broken into chunks, use `setImmediate()` between chunks to yield to the event loop.',
        follow_up: 'How would you use worker_threads in Node.js for a CPU-intensive task like image resizing?',
      },
    ],
  },

  'Building APIs with Express': {
    explanation:
      'Express is a minimal Node.js web framework that provides routing, middleware composition, and HTTP utilities without imposing a specific architecture. Routes match HTTP method + URL pattern to handler functions. Middleware are functions with signature `(req, res, next)` that form a pipeline — each middleware either modifies the request/response or calls `next()` to pass control to the next middleware. Express middleware executes in the order it is registered: `app.use(middleware)` applies globally; `app.get("/path", middleware, handler)` applies only to that route.',
    realWorldExample:
      'A REST API for a task manager: `app.post("/tasks", validateBody(taskSchema), authenticate, async (req, res) => { const task = await Task.create(req.body); res.status(201).json({ data: task }); })`. Three middleware in sequence: `validateBody` returns 422 if the body fails Zod schema validation, `authenticate` returns 401 if no valid JWT, and the handler creates the task in the database. If any middleware calls `res.status().json()` without calling `next()`, the chain stops — the handler never runs.',
    practicalUseCase:
      'Build a `/api/products` endpoint: GET returns all products from SQLite, POST creates one, DELETE `/api/products/:id` removes by ID. Add a global error handler middleware: `app.use((err, req, res, next) => res.status(500).json({ error: err.message }))` — note the four-argument signature that Express uses to identify error handlers. Test all endpoints with `httpie` or `curl` and intentionally trigger the error handler by throwing in a route.',
    keyPoints: [
      'Express middleware order matters — `app.use(cors())` must come BEFORE route definitions or CORS headers won\'t be set on those routes.',
      'Error-handling middleware has FOUR parameters `(err, req, res, next)` — Express identifies it by function arity.',
      '`req.params` is for URL route parameters (`:id`), `req.query` for query strings (`?page=2`), `req.body` for POST/PUT body (requires `express.json()` middleware).',
      'Router — `express.Router()` creates a mini-app for grouping related routes; mount it with `app.use("/api/users", userRouter)`.',
      'Express does not handle async errors automatically — wrap async handlers in a try-catch or use `express-async-errors` package.',
      '`res.json()` sets `Content-Type: application/json` and serializes the object — don\'t call `res.end()` after it.',
      'Production Express: set `NODE_ENV=production`, use `helmet` for security headers, `compression` for gzip, and `morgan` for request logging.',
    ],
    interviewQA: [
      {
        question: 'How does Express middleware differ from route handlers?',
        answer:
          'Middleware and route handlers have the same `(req, res, next)` signature. The difference is intent: middleware modifies the request (parse body, add auth user to req, log), then calls `next()` to continue the chain. Route handlers are the terminal step — they send a response and typically don\'t call `next()`. A route handler CAN call `next()` to pass to the next route or error handler. Middleware can be mounted globally (`app.use()`) or per-route (`app.get("/path", middleware1, middleware2, handler)`). Express processes them in registration order — the pipeline model lets you compose authentication, validation, rate limiting, and logging independently and combine them per-route.',
        follow_up: 'What happens when Express middleware calls `next("route")` vs `next()` vs `next(err)`?',
      },
    ],
  },
};

const mysql: Record<string, SpecificSectionData> = {
  'What is MySQL': {
    explanation:
      'MySQL is a relational database management system (RDBMS) that stores data in tables with rows and columns, enforces relationships between tables via foreign keys, and uses SQL (Structured Query Language) for queries. Data is organized in schemas (databases), each containing tables with strongly-typed columns. MySQL uses a client-server architecture: the `mysqld` daemon runs on the server; clients connect via TCP or Unix socket and send SQL text; the server parses, optimizes, and executes the query, returning result sets. InnoDB is the default storage engine, providing ACID transactions, foreign key constraints, and row-level locking.',
    realWorldExample:
      'A blog application stores posts in a `posts` table and authors in a `users` table. A foreign key `posts.user_id → users.id` enforces that every post has a valid author. A JOIN query `SELECT posts.title, users.name FROM posts JOIN users ON posts.user_id = users.id WHERE posts.published_at > "2024-01-01"` fetches post titles with author names in one round-trip to the database — no N+1 problem. MySQL ensures the join is optimized using the index on `user_id`.',
    practicalUseCase:
      'Install MySQL locally, create a database, create a `users` table with `id INT AUTO_INCREMENT PRIMARY KEY`, `email VARCHAR(255) UNIQUE NOT NULL`, `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`. Insert 5 rows, then run `EXPLAIN SELECT * FROM users WHERE email = "test@example.com"` — observe the index type. Drop the UNIQUE index, run EXPLAIN again — see it change from "const" to "ALL" (full table scan). This demonstrates why indexes are not optional.',
    keyPoints: [
      'MySQL\'s InnoDB engine supports ACID transactions, foreign keys, and row-level locking (not table-level like MyISAM).',
      'PRIMARY KEY is always a clustered index in InnoDB — the table data is physically sorted by the PK column(s).',
      'VARCHAR stores only the actual bytes used + length prefix; CHAR pads to fixed length — use VARCHAR for variable-length strings.',
      '`AUTO_INCREMENT` generates the next PK value atomically — it does NOT reuse deleted IDs, preventing accidental foreign key mismatches.',
      'MySQL is case-insensitive for string comparisons by default with `utf8mb4_unicode_ci` collation — use `BINARY` operator or change collation for case-sensitive comparisons.',
      'MySQL 8.0 added window functions, CTEs, roles, and JSON path queries — many features previously requiring PostgreSQL.',
      'The `information_schema` database contains metadata about all databases, tables, columns, and indexes — queryable with standard SQL.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between InnoDB and MyISAM storage engines?',
        answer:
          'InnoDB (default since MySQL 5.5): supports ACID transactions, foreign key constraints, row-level locking, crash recovery via redo logs. MyISAM: no transactions, no foreign keys, table-level locking (one write locks the entire table), faster for read-heavy tables with no writes. MyISAM was historically faster for full-text search (now InnoDB supports it), and for read-only tables that never need transactions. In practice, InnoDB is almost always the right choice — MyISAM\'s table locks cause catastrophic performance under concurrent writes, and its lack of crash recovery risks data corruption on unclean shutdown.',
        follow_up: 'When would you still consider using MyISAM in 2024?',
      },
      {
        question: 'What is a covering index in MySQL?',
        answer:
          'A covering index contains all columns needed by a query — MySQL can answer the query entirely from the index B-tree without touching the actual table rows (InnoDB calls this "reading from the index directly"). Example: `SELECT email, created_at FROM users WHERE status = "active"` with index `(status, email, created_at)` — the index covers all three columns, no table lookup needed. `EXPLAIN` shows "Using index" in the Extra column. For large tables, covering indexes can eliminate the most expensive part of a query (the random I/O of reading table rows). The tradeoff: wider indexes use more disk and slow down writes.',
        follow_up: 'How does the InnoDB clustered index affect how secondary indexes are stored?',
      },
    ],
  },

  'JOINs and Relationships': {
    explanation:
      'SQL JOINs combine rows from two or more tables based on a related column. INNER JOIN returns only rows where the join condition matches in BOTH tables. LEFT JOIN returns all rows from the left table plus matching rows from the right (NULL where no match). RIGHT JOIN is the mirror. FULL OUTER JOIN (not directly in MySQL — use UNION of LEFT and RIGHT). CROSS JOIN returns every combination of rows. In MySQL, JOINs are executed by the query optimizer choosing between Nested Loop Join (NLJ) or Hash Join — the `EXPLAIN` output shows which algorithm was chosen and whether indexes are used.',
    realWorldExample:
      'An e-commerce system: `SELECT o.id, u.email, p.name, oi.quantity FROM orders o JOIN users u ON o.user_id = u.id JOIN order_items oi ON oi.order_id = o.id LEFT JOIN products p ON p.id = oi.product_id WHERE o.status = "pending"`. The LEFT JOIN on products means if a product was deleted, the order item still appears (with NULL product name) rather than disappearing from the result — critical for financial records that must show historical data.',
    practicalUseCase:
      'Create `authors` and `books` tables with a one-to-many relationship. Write four queries: INNER JOIN (only books with authors), LEFT JOIN (all books, even those without an author), RIGHT JOIN (all authors, even those with no books), and a self-join (`employees e1 JOIN employees e2 ON e1.manager_id = e2.id`) to get employee-manager pairs from a single table. Run EXPLAIN on each and observe which use index lookups vs full table scans.',
    keyPoints: [
      'INNER JOIN = intersection: only rows where the join condition matches in both tables.',
      'LEFT JOIN preserves all rows from the left table; NULL fills the right-side columns where no match exists.',
      'JOIN order in MySQL doesn\'t affect results (the optimizer can reorder) but can affect the optimizer\'s join strategy choice.',
      'Multi-table JOINs: MySQL processes them left-to-right by default, but the optimizer may reorder for efficiency.',
      'Avoid implicit cross joins: `FROM orders, users WHERE orders.user_id = users.id` is an explicit CROSS JOIN filtered to INNER JOIN semantics — use explicit JOIN syntax for clarity.',
      '`USING (column)` is shorthand for `ON t1.column = t2.column` when the join column has the same name in both tables.',
      'The N+1 query problem in ORM code is equivalent to running one query + N separate queries instead of a single JOIN.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between INNER JOIN and LEFT JOIN, and when would you choose each?',
        answer:
          'INNER JOIN: returns only rows where the join condition is satisfied in BOTH tables. If a user has no orders, they disappear from the result. LEFT JOIN: returns ALL rows from the left table (users), with NULL in order columns where no order exists. Use INNER JOIN when the related row MUST exist — joining orders to their required user. Use LEFT JOIN when the related row is optional — listing all users with their order count (users with 0 orders should show count=0, not be omitted). A LEFT JOIN with `WHERE right_table.id IS NULL` is how you find rows with NO match — e.g., users who have never placed an order.',
        follow_up: 'How do you write a query to find all users who have NEVER placed an order?',
      },
    ],
  },
};

const mongodb: Record<string, SpecificSectionData> = {
  'What is MongoDB': {
    explanation:
      'MongoDB is a document-oriented NoSQL database that stores data as BSON (Binary JSON) documents in collections rather than rows in tables. Documents in the same collection can have different fields — there is no fixed schema enforced by the database engine. MongoDB scales horizontally via sharding (distributing data across multiple servers) and provides high availability via replica sets (automatic failover). Queries use a JSON-like syntax: `db.users.find({ age: { $gt: 25 }, status: "active" })` rather than SQL.',
    realWorldExample:
      'A content management system stores blog posts. In MySQL, a post with tags, categories, and multiple authors would need 4 tables and multiple JOINs. In MongoDB, a single document stores everything: `{ title: "...", authors: [{id: 1, name: "Alice"}], tags: ["php", "api"], content: "...", metadata: { readTime: 5, views: 1203 } }`. Fetching a post is one find-by-id — no joins, no multiple queries. The tradeoff: updating "Alice" requires updating every document that embeds her name.',
    practicalUseCase:
      'Start a local MongoDB instance, connect with `mongosh`, create a `recipes` collection, insert 5 recipe documents with varying fields (some with `prepTime`, some without). Query: `db.recipes.find({ tags: "vegan" })` (arrays support equality matching on elements). Run `.explain("executionStats")` to see the full collection scan. Create an index: `db.recipes.createIndex({ tags: 1 })`. Re-run explain — see "IXSCAN" replace "COLLSCAN".',
    keyPoints: [
      'BSON (Binary JSON) extends JSON with additional types: ObjectId, Date, Decimal128, BinData — used internally by MongoDB for efficiency.',
      'ObjectId (12 bytes) is the default `_id` type — encodes creation timestamp, machine ID, process ID, and random counter.',
      'Collections don\'t enforce a schema by default; enable schema validation with `$jsonSchema` validators for critical collections.',
      'MongoDB\'s document model fits naturally for one-to-many relationships where the "many" is always accessed with the "one" (embed).',
      'Sharding distributes data across servers using a shard key; choosing the wrong shard key causes hot spots and uneven distribution.',
      'Replica sets provide 3+ copies of data; automatic election promotes a secondary to primary if the primary fails within 10–30 seconds.',
      'WiredTiger is MongoDB\'s default storage engine — provides document-level locking and compression (snappy or zlib).',
    ],
    interviewQA: [
      {
        question: 'When would you embed documents vs use references in MongoDB?',
        answer:
          'Embed when: the embedded data is always accessed with the parent (post + comments), the embedded data doesn\'t need to stand alone, and the embedded array won\'t grow unboundedly (keep documents under 16MB). Reference when: the related data is frequently accessed independently, multiple documents reference the same entity (products referenced by many orders), or the embedded data would grow without limit (a user\'s complete activity history). The golden rule: if you access the data together > 95% of the time, embed. If the referenced entity changes and you need consistency everywhere it\'s referenced, use references. Many real schemas use both patterns for different relationships.',
        follow_up: 'What are the tradeoffs of embedding user data (like author name) in every post document vs referencing the users collection?',
      },
      {
        question: 'What is the MongoDB aggregation pipeline and when is it needed?',
        answer:
          'The aggregation pipeline is a sequence of data transformation stages applied in order to a collection: `$match` (filter), `$group` (aggregate/sum/count), `$sort`, `$project` (reshape), `$lookup` (join another collection), `$unwind` (expand arrays), and more. It\'s needed when `find()` queries are insufficient: computing totals per category (`$group`), joining orders with product details (`$lookup`), calculating average values, or reshaping documents. Example: total revenue per product category requires `$match` (active orders) → `$unwind` (items array) → `$group` (by category, sum price) → `$sort` (by revenue desc).',
        follow_up: 'How does `$lookup` differ from a SQL JOIN in terms of when the join is executed?',
      },
    ],
  },
};

const laravel: Record<string, SpecificSectionData> = {
  'What is Laravel': {
    explanation:
      'Laravel is a PHP web framework following the MVC (Model-View-Controller) pattern with an opinionated, convention-over-configuration approach. It provides an Artisan CLI, Eloquent ORM, Blade templating, a migration system, a queue system, scheduled tasks, broadcasting, testing utilities, and a service container for dependency injection — all integrated out of the box. Laravel\'s service container is its core: it automatically resolves class dependencies via reflection, allowing constructor injection throughout the entire framework.',
    realWorldExample:
      'A SaaS application launches with Laravel in 2 weeks instead of 6: `php artisan make:model Subscription --migration --controller --resource --requests` generates 5 files in one command. Eloquent relationships: `$user->subscriptions()->where("active", true)->with("plan")->get()` fetches active subscriptions with their plan details in 2 SQL queries. Laravel Horizon monitors queue workers. Cashier handles Stripe billing. Passport manages OAuth. The ecosystem handles infrastructure; engineers focus on business logic.',
    practicalUseCase:
      'Bootstrap a Laravel project: `composer create-project laravel/laravel myapp`. Run `php artisan make:model Post --migration -c -r`. Add `$fillable = ["title", "body", "user_id"]` to the model, define a `belongsTo(User::class)` relationship, run `php artisan migrate`. Hit the resource controller routes with Postman. Add `php artisan tinker` and run `App\\Models\\Post::factory()->count(10)->create()` to seed test data.',
    keyPoints: [
      'Laravel\'s service container resolves type-hinted constructor dependencies automatically — no manual wiring needed for most cases.',
      'Eloquent uses Active Record pattern: the model IS the database row, containing both data and persistence methods.',
      '`php artisan` has 100+ commands — `make:model`, `migrate`, `queue:work`, `schedule:run`, `tinker` (REPL) are daily-use commands.',
      'Laravel Facades provide a static interface to services in the container: `Cache::get()`, `DB::table()`, `Auth::user()` — syntactic sugar over the container.',
      'Environment-based config: `.env` file + `config/*.php` files — `env("DB_HOST", "localhost")` reads from `.env` with a default fallback.',
      'Laravel Mix (or Vite) compiles frontend assets; Laravel Sail provides Docker development environment via one command.',
      'Laravel\'s test suite includes `RefreshDatabase` trait for rolling back DB changes after each test — full integration tests without pollution.',
    ],
    interviewQA: [
      {
        question: 'What is Laravel\'s service container and how does it differ from using `new` to create objects?',
        answer:
          'The service container is an IoC (Inversion of Control) container that automatically resolves class dependencies. With `new UserService()` you manually handle every dependency: `new UserService(new UserRepository(new DatabaseConnection($config)))`. With the container: `app(UserService::class)` automatically resolves the dependency tree through reflection. Binding `app()->bind(UserRepositoryInterface::class, MySQLUserRepository::class)` means anywhere `UserRepositoryInterface` is type-hinted, the container injects `MySQLUserRepository`. In tests, rebind with a fake: `app()->bind(UserRepositoryInterface::class, FakeUserRepository::class)` — no code changes in the service itself.',
        follow_up: 'What is the difference between `bind()`, `singleton()`, and `instance()` in Laravel\'s container?',
      },
      {
        question: 'What is the N+1 problem in Eloquent and how do you solve it?',
        answer:
          'The N+1 problem: `$posts = Post::all(); foreach ($posts as $post) { echo $post->author->name; }` — this runs 1 query to get all posts, then 1 query PER post to get the author = N+1 total queries. For 100 posts, that\'s 101 queries. Solution: eager loading with `with()`: `$posts = Post::with("author")->get()` — runs exactly 2 queries: one for all posts, one for all authors via `WHERE id IN (1, 2, 3, ...)`. Laravel Debugbar or Telescope shows the query count per request. The `$with` property on the model always eager-loads certain relationships; `withCount("comments")` appends comment counts without loading the comments themselves.',
        follow_up: 'What is lazy eager loading and when would you use it over eager loading in `with()`?',
      },
    ],
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────────────────────

  'Eloquent Relationships and N+1 Problem': {
    explanation:
      'Eloquent relationships are methods on your model that return a relationship object — `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, `hasManyThrough`, `morphMany`. By default every relationship is lazy-loaded: accessing `$post->author` executes a new SQL query each time. Inside a loop over 100 posts, this generates 101 queries (1 for posts + 100 for authors). Eager loading with `with("author")` collapses this to exactly 2 queries regardless of post count. `withCount("comments")` adds a comments_count column via a subquery without loading comment records. `withSum("items", "price")` aggregates without hydrating all items.',
    realWorldExample:
      'A SaaS dashboard lists 50 companies with their active plan name, owner email, and user count. Without optimization: `Company::all()` + `$company->plan->name`, `$company->owner->email`, `$company->users->count()` inside the loop = 151 queries. Optimized: `Company::with(["plan:id,name", "owner:id,email"])->withCount("users")->get()` = 4 queries total, regardless of how many companies exist. `with("plan:id,name")` selects only two columns from the plans table — no unnecessary data transfer.',
    practicalUseCase:
      'Install `barryvdh/laravel-debugbar` in development. Load any page that shows a list with related data. Count the queries in the Debugbar panel. Add `with()` and `withCount()` until the query count stops growing with more records. Verify with `DB::getQueryLog()` in Tinker: `DB::enableQueryLog(); Post::with("author")->get(); dd(DB::getQueryLog());`',
    keyPoints: [
      '`Post::with("author")->get()` runs 2 queries: SELECT posts; SELECT users WHERE id IN (1,2,3...). Never N+1.',
      '`withCount("comments")` adds `comments_count` to each model without loading comment objects — use this for list pages showing counts.',
      '`with("author:id,name")` eager-loads only the id and name columns — prevents fetching full author rows when you only display the name.',
      '`loadMissing("author")` on an already-fetched collection only queries if the relation is not loaded — safe to call conditionally in services.',
      '`$with = ["author"]` on the model always eager-loads that relation — useful for models where you never display them without the relation.',
      'Nested eager loading: `Post::with("author.profile", "comments.user")->get()` loads posts, their authors, each author\'s profile, all comments, and each comment\'s user in 5 queries.',
      '`belongsToMany` pivot data: add `->withPivot("quantity")` and `->withTimestamps()` to read pivot columns directly on the related model.',
    ],
    interviewQA: [
      {
        question: 'A page showing 100 products and their category names fires 101 queries. Walk me through how you identify and fix this.',
        answer:
          'Identify: install Debugbar or add `DB::listen(fn($q) => logger($q->sql))` — you\'ll see 1 SELECT for products and 100 identical SELECTs for categories. Fix: change `Product::all()` to `Product::with("category")->get()`. This replaces the 100 individual category queries with one `SELECT * FROM categories WHERE id IN (1,3,5...)` batch query. Verify the fix by checking Debugbar drops from 101 to 2 queries. Further optimize with column selection: `with("category:id,name")` if you only display the name.',
        follow_up: 'What is the difference between `with()` at query time and `load()` on a collection?',
      },
      {
        question: 'What is the difference between `hasMany` and `belongsToMany` in Eloquent?',
        answer:
          '`hasMany` is a one-to-many relationship — a User has many Posts. Posts table has a `user_id` foreign key. No pivot table needed. `belongsToMany` is many-to-many — a Post belongs to many Tags, and a Tag belongs to many Posts. Requires a `post_tag` pivot table with `post_id` and `tag_id` columns. Access pivot data with `$post->tags->first()->pivot->created_at`. Add extra pivot columns using `->withPivot("approved")`. The pivot table itself can become a full model by extending `Pivot` — useful when pivot rows have their own lifecycle (e.g., a `role_user` table where the assignment has a `granted_at` and `granted_by`).',
        follow_up: 'When would you create a Pivot model instead of using the default pivot functionality?',
      },
      {
        question: 'What does `hasManyThrough` do and when do you use it?',
        answer:
          '`hasManyThrough` shortcuts a two-hop relationship. Example: Country `hasManyThrough` Post `through` User. The Post table has `user_id`; User table has `country_id`. Without `hasManyThrough` you\'d do: `$country->users->flatMap->posts`. With it: `$country->posts()` returns all posts written by users from that country in a single JOIN query. The signature: `hasManyThrough(Post::class, User::class, "country_id", "user_id")`. Use it when you need data two models away and want to avoid loading the intermediate model into memory.',
        follow_up: 'How would you count posts per country efficiently using `hasManyThrough` and `withCount`?',
      },
    ],
  },

  'Migrations and Seeders': {
    explanation:
      'Migrations are version-controlled database schema changes. Each migration file has an `up()` method (apply the change) and a `down()` method (reverse it). Laravel tracks which migrations have run in the `migrations` table. `php artisan migrate` runs all pending migrations in order. `php artisan migrate:rollback` reverses the last batch. Schema changes should never be made directly in the database — always via migrations so every environment (local, staging, production) has the same schema. Seeders populate the database with test or default data — factories generate fake model instances using Faker.',
    realWorldExample:
      'Adding a `subscription_tier` column to `users` in production: create a migration with `$table->string("subscription_tier")->default("free")->after("email")`, run `php artisan migrate` during deployment. The default value means existing rows are updated instantly without an UPDATE statement. Rolling back is `php artisan migrate:rollback` — the `down()` method drops the column. A bad practice: modifying an existing migration that has already run in production — it breaks the `migrations` table checksum and creates schema drift.',
    practicalUseCase:
      'Create a migration: `php artisan make:migration add_stripe_customer_id_to_users_table`. Add `$table->string("stripe_customer_id")->nullable()->unique()`. Run `php artisan migrate:fresh --seed` in local to rebuild and re-seed. Create a factory: `php artisan make:factory OrderFactory`. Use `Order::factory()->count(50)->for(User::factory())->create()` in Tinker to generate realistic test data with related users.',
    keyPoints: [
      'Migration batches: migrations in the same `migrate` call share a batch number. `rollback` reverses the last batch (all migrations in that run).',
      '`nullable()` vs `->default("value")`: nullable allows NULL in the DB; default fills the column for new inserts but does not update existing rows.',
      '`->after("email")` controls column position in MySQL — has no effect in PostgreSQL (columns are always added at the end).',
      'Foreign key constraints: `$table->foreignId("user_id")->constrained()->cascadeOnDelete()` creates the FK and adds CASCADE DELETE automatically.',
      'Model factories use Faker: `"email" => fake()->unique()->safeEmail()`. `unique()` prevents duplicate emails in the same factory run.',
      '`RefreshDatabase` trait in tests uses `migrate:fresh` once then wraps each test in a transaction — fast and isolated.',
      '`php artisan migrate --pretend` shows the SQL that would run without executing it — useful for auditing production changes.',
    ],
    interviewQA: [
      {
        question: 'How do you safely add a NOT NULL column to a large production table without downtime?',
        answer:
          'Directly adding a NOT NULL column without a default to a table with millions of rows locks the table while MySQL updates every row. Safe approach: (1) Add the column as nullable: `$table->string("tier")->nullable()`. Deploy. (2) Write a job that backfills the column in chunks: `User::whereNull("tier")->chunkById(500, fn($users) => $users->each->update(["tier" => "free"]))`. Run this after deployment. (3) Create a second migration that makes it NOT NULL with a default once all rows are backfilled. This keeps the table available throughout. Alternatively, tools like gh-ost (GitHub Online Schema Transposing) shadow the table change without locks.',
        follow_up: 'How do you handle schema changes that must be backward-compatible during a rolling deployment?',
      },
      {
        question: 'What is the difference between `migrate:fresh` and `migrate:reset`?',
        answer:
          '`migrate:reset` calls the `down()` method of every migration in reverse order — it rolls back each one individually. If any `down()` method has a bug or the migration file is missing, it fails. `migrate:fresh` drops every table directly using `SHOW TABLES` + `DROP TABLE` and then re-runs all migrations from scratch — it does not call `down()` at all. `migrate:fresh` is faster and avoids broken rollback methods. Use `migrate:fresh --seed` in local/CI to get a clean known state. Never run `migrate:fresh` in production — it destroys all data.',
        follow_up: 'Why might a `down()` method be impossible to write for certain migrations?',
      },
    ],
  },

  'Authentication in Laravel': {
    explanation:
      'Laravel ships authentication as a first-class feature. For web apps, `Laravel Breeze` scaffolds session-based auth (login, register, password reset, email verification) using Blade or Inertia. For APIs, `Laravel Sanctum` issues opaque tokens stored in `personal_access_tokens` (for mobile/third-party clients) or uses encrypted session cookies (for SPAs on the same domain). `Laravel Passport` implements a full OAuth2 server for third-party integrations. The `auth` middleware redirects unauthenticated web requests; `auth:sanctum` returns a 401 JSON response for API requests. `Auth::user()` or `$request->user()` returns the authenticated model anywhere in the request lifecycle.',
    realWorldExample:
      'A mobile app authenticates: POST `/api/login` → `Auth::attempt()` verifies credentials → `$user->createToken("mobile", ["read:orders"])` issues a token with specific abilities → returns the plain-text token once. Every subsequent request sends `Authorization: Bearer {token}`. The `auth:sanctum` middleware resolves the token from `personal_access_tokens`, loads the user, and calls `$request->user()->tokenCan("read:orders")` to gate specific actions. Revoking a device: `$user->tokens()->where("name", "mobile")->delete()`.',
    practicalUseCase:
      'Install Sanctum, create a login endpoint that returns a token, protect a route with `auth:sanctum`, test with Postman. Add token abilities: issue a token with `["read:orders"]`, try to POST to an orders endpoint and verify you get 403. Issue a token with `["write:orders"]` and verify it succeeds.',
    keyPoints: [
      'Sanctum token vs SPA cookie: token for mobile/APIs (sent in Authorization header), cookie for SPAs on the same domain (httpOnly, not accessible to JS).',
      '`Auth::attempt(["email" => $email, "password" => $password])` checks credentials and starts a session — returns true/false.',
      'Token abilities (scopes): `$user->createToken("name", ["read:orders"])`. Check with `$request->user()->tokenCan("read:orders")` — returns true/false.',
      'Logout on API: `$request->user()->currentAccessToken()->delete()` revokes only the current token. `$user->tokens()->delete()` revokes all tokens (use for "logout all devices").',
      '`auth()->user()` and `$request->user()` are identical — both resolve from the current guard. Use `$request->user()` in controllers (explicit).',
      'Breeze vs Jetstream: Breeze is minimal (email/password only, Blade); Jetstream adds two-factor auth, API tokens, and team management.',
      'Email verification: `MustVerifyEmail` interface on the User model + `verified` middleware on routes that require a confirmed email.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between Laravel Sanctum and Laravel Passport?',
        answer:
          'Sanctum is lightweight — it issues opaque tokens or uses session cookies. No OAuth server, no JWT, no complex grant types. Perfect for first-party SPAs and mobile apps that your own team controls. Passport implements a full OAuth2 authorization server: authorization codes, client credentials, password grants, and personal access tokens. Use Passport when third-party developers need to authenticate on behalf of your users (like GitHub\'s OAuth app login). Sanctum is the right default for 90% of Laravel apps. Passport adds significant complexity that is only justified for public API platforms.',
        follow_up: 'Why is storing a Sanctum token in localStorage a security risk, and what is the safer alternative?',
      },
      {
        question: 'How does the `auth:sanctum` middleware decide whether to use token or session authentication?',
        answer:
          'Sanctum\'s `EnsureFrontendRequestsAreStateful` middleware checks if the request origin matches `SANCTUM_STATEFUL_DOMAINS`. If it does and a session cookie is present, Sanctum uses session-based auth — the request is treated as a first-party SPA. If the origin is not stateful or no session cookie exists, Sanctum looks for `Authorization: Bearer {token}` in the header, hashes it with SHA-256, and queries `personal_access_tokens` for a match. This dual-mode detection is automatic — the same `auth:sanctum` middleware serves both SPAs and mobile API clients without configuration changes per request.',
        follow_up: 'How does Sanctum handle CSRF protection for SPA cookie-based authentication?',
      },
    ],
  },

  'Authorization with Gates and Policies': {
    explanation:
      'Authentication answers "who are you?" Authorization answers "what are you allowed to do?" Laravel provides two tools. Gates are closures registered in `AppServiceProvider::boot()` for simple, global checks: `Gate::define("delete-post", fn(User $user, Post $post) => $user->id === $post->user_id)`. Policies are classes that group authorization logic for a specific model: `php artisan make:policy PostPolicy --model=Post`. Each method (view, create, update, delete) returns a boolean. The `can()` middleware on routes, `$request->user()->can("update", $post)` in controllers, and `@can("update", $post)` in Blade all resolve to the same Policy or Gate.',
    realWorldExample:
      'A multi-role CMS: `PostPolicy::update()` returns true if the user is the post author OR has the "editor" role. `PostPolicy::delete()` returns true only for the author or an admin. In the controller: `$this->authorize("update", $post)` — if the policy returns false, Laravel automatically returns a 403 response. No manual `if (!$user->can(...)) abort(403)` needed. In Blade: `@can("delete", $post) <button>Delete</button> @endcan` — the delete button only appears for authorized users.',
    practicalUseCase:
      'Generate `PostPolicy`, implement `update()` and `delete()` methods, register it in `AuthServiceProvider::$policies`, then call `$this->authorize("update", $post)` in the controller. Write a feature test: create a post owned by user A, authenticate as user B, call PATCH `/posts/{id}` and assert 403. Authenticate as user A and assert 200.',
    keyPoints: [
      '`Gate::define("admin-only", fn(User $u) => $u->role === "admin")` — check with `Gate::allows("admin-only")` or `@can("admin-only")` in Blade.',
      'Policy registration: `AuthServiceProvider::$policies = [Post::class => PostPolicy::class]`. Laravel auto-discovers policies in `app/Policies/` in Laravel 10+.',
      '`before()` method in a Policy runs first: `if ($user->isAdmin()) return true` — admins bypass all other policy checks.',
      'Policy responses: return `Response::deny("Only the author can delete posts.")` instead of `false` for custom error messages.',
      '`authorize()` in controllers throws `AuthorizationException` (HTTP 403) automatically — no try/catch needed.',
      '`can` middleware: `Route::put("/posts/{post}", ...)->middleware("can:update,post")` — checks the policy before the controller even runs.',
      'Super-admin pattern: override `Gate::before(fn(User $u) => $u->isSuperAdmin() ? true : null)` — `null` means "defer to the regular gate/policy".',
    ],
    interviewQA: [
      {
        question: 'What is the difference between a Gate and a Policy in Laravel?',
        answer:
          'Gates are closures for simple, ad-hoc authorization checks not tied to a specific model — e.g., `Gate::define("view-analytics", fn($user) => $user->isPremium())`. Policies are classes that group authorization logic for one Eloquent model — all authorization decisions about `Post` (view, create, update, delete, restore) live in `PostPolicy`. The distinction is organization: Gates for feature-level checks, Policies for resource-level CRUD authorization. Under the hood, `$user->can("update", $post)` checks if a Policy is registered for `Post::class` first; if not, it falls through to a matching Gate definition.',
        follow_up: 'How do you write a policy method that authorizes a guest (unauthenticated) user to view published posts?',
      },
      {
        question: 'How would you implement role-based access control in Laravel without a package?',
        answer:
          'Add a `role` column to the `users` table (enum: "admin", "editor", "viewer"). Add a `role()` helper on the User model. In Policies, check `$user->role === "admin"` or `in_array($user->role, ["admin", "editor"])`. For more granularity, create a `roles` + `permissions` + `role_user` + `role_permission` many-to-many structure, add a `hasPermission(string $perm): bool` method to User that checks the relationship, and use it in Gate definitions. For most apps, a simple `role` string column is sufficient. Reach for `spatie/laravel-permission` when you need runtime role/permission management, multiple guards, or permission caching.',
        follow_up: 'How does `spatie/laravel-permission` cache permissions and what invalidates the cache?',
      },
    ],
  },

  'Middleware and Request Pipelines': {
    explanation:
      'Every HTTP request in Laravel passes through a pipeline of middleware before reaching the controller and a return pipeline on the way out. Middleware is a class with a `handle(Request $request, Closure $next): Response` method. Calling `$next($request)` passes control to the next middleware in the chain. Code before `$next()` runs on the way in (before the controller); code after `$next()` runs on the way out (after the controller responds). Global middleware runs on every request. Route middleware is assigned to specific routes or groups. The middleware pipeline is defined in `app/Http/Kernel.php`.',
    realWorldExample:
      'Request lifecycle for `POST /api/orders` with `auth:sanctum` and `throttle:60,1` middleware: (1) `TrustProxies` normalizes the IP from load balancer headers. (2) `ValidatePostSize` rejects oversized payloads. (3) `StartSession` initializes the session. (4) `auth:sanctum` resolves the Bearer token, loads the user — if invalid, returns 401 immediately. (5) `throttle:60,1` checks Redis for this user\'s request count — if exceeded, returns 429. (6) The request reaches the controller. (7) On the return trip, `SetCacheHeaders` adds cache control headers. Each middleware is a checkpoint that can short-circuit the pipeline.',
    practicalUseCase:
      'Create a `EnsureUserIsSubscribed` middleware: check `$request->user()->subscribed()`, if not subscribed return a JSON 402 response. Register it in `Kernel.php` as `"subscribed"`. Apply it to a route group. Write a test: authenticated but unsubscribed user hits the route and gets 402; subscribed user gets through.',
    keyPoints: [
      'Before middleware: code BEFORE `return $next($request)` — runs before the controller. After middleware: code AFTER — runs after the controller returns a response.',
      'Terminable middleware: implement `terminate(Request $request, Response $response)` — runs after the response is sent to the browser (for logging, cleanup).',
      '`Kernel::$middlewarePriority` defines execution order when the same middleware is listed in multiple groups — important for auth before CSRF.',
      '`throttle:60,1` uses Redis by default — 60 requests per 1 minute per user. Custom throttle: extend `ThrottleRequests` and override `resolveRequestSignature()`.',
      'Middleware groups: `"web"` (sessions, CSRF, cookies) and `"api"` (stateless, throttle) are pre-configured. Apply groups to route files.',
      '`php artisan route:list --path=api` shows every route with its middleware chain — useful for auditing which routes lack auth.',
      'Middleware parameters: `handle($request, $next, $role)` — called as `->middleware("role:admin")` on a route.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between before middleware and after middleware in Laravel?',
        answer:
          'Before middleware executes code before passing the request to the next layer: `public function handle($request, $next) { // BEFORE CODE; return $next($request); }`. The code before `$next()` runs first — used for authentication checks, rate limiting, request transformation. After middleware executes code after the controller has responded: `$response = $next($request); // AFTER CODE; return $response;`. Used for adding response headers, logging response data, or transforming the output. A middleware can do both: validate the request coming in, then modify the response going out.',
        follow_up: 'What is a terminable middleware and when would you use it over after middleware?',
      },
      {
        question: 'How does Laravel\'s throttle middleware work internally with Redis?',
        answer:
          'The `throttle:60,1` middleware resolves a cache key from the authenticated user ID or client IP. Each request increments a Redis counter for that key with a 60-second TTL. If the counter exceeds 60, the middleware returns a 429 response with `Retry-After` and `X-RateLimit-*` headers. Redis\'s atomic INCR command prevents race conditions where two simultaneous requests might both read 59 and both think they\'re under the limit. The key resets after 60 seconds (the TTL). Custom signatures: extend `ThrottleRequests` and override `resolveRequestSignature()` to rate-limit by API key, tenant ID, or endpoint-specific logic.',
        follow_up: 'How would you implement different rate limits for free and premium API users?',
      },
    ],
  },

  'API Resources and Response Formatting': {
    explanation:
      'API Resources are transformation classes that control exactly what JSON is returned for an Eloquent model. Without them, `return $user` serializes every column including `password` and internal timestamps. With `UserResource`, you explicitly map model attributes to JSON keys: rename fields, format dates, conditionally include fields, and nest related resources. `JsonResource::toArray()` is called per model; `ResourceCollection` wraps a paginated result with metadata. The `when()` and `whenLoaded()` helpers conditionally include data without checking if relations are loaded manually.',
    realWorldExample:
      'A mobile API returns order data. `OrderResource` formats `created_at` as ISO8601, renames `net_total` to `amount`, conditionally includes `payment_method` only for admin tokens (`$this->when($request->user()->tokenCan("admin"), fn() => $this->payment_method)`), and nests `CustomerResource` and `ItemResource` collection. When the frontend team changes their expected field name from `amount` to `total_price`, you change one line in `OrderResource` — the controller is untouched.',
    practicalUseCase:
      'Create `OrderResource` that: renames `created_at` to `date`, formats price as a string with 2 decimals, includes items only when loaded (`whenLoaded("items", fn() => ItemResource::collection($this->items))`), and adds a computed `is_paid` boolean. Return `OrderResource::collection(Order::with("items")->paginate(25))` from the controller and inspect the JSON structure.',
    keyPoints: [
      '`return new UserResource($user)` wraps a single model. `return UserResource::collection($users)` wraps a collection — paginated collections include `links` and `meta` automatically.',
      '`$this->when($condition, $value)` — field is included in JSON only when condition is true. Returns `null` and omits the key when false.',
      '`$this->whenLoaded("orders", fn() => OrderResource::collection($this->orders))` — includes the relation only if it was already eager-loaded. Prevents accidental N+1 from the resource layer.',
      'Wrap all resources in a `data` key: `JsonResource::withoutWrapping()` removes the wrapping globally — useful for APIs that expect flat responses.',
      '`additional(["meta" => [...]])` chains extra data onto the response without modifying `toArray()`.',
      'Nested resources: return `new AddressResource($this->address)` inside `UserResource::toArray()` — resources compose naturally.',
      'Custom response codes: return `(new OrderResource($order))->response()->setStatusCode(201)` from the store() controller method.',
    ],
    interviewQA: [
      {
        question: 'Why should you use API Resources instead of returning Eloquent models directly?',
        answer:
          'Returning `return $user` serializes every attribute including `password`, `remember_token`, `two_factor_secret`, and any column that should never leave the server. Even with `$hidden`, you\'re relying on a model-level config rather than an explicit transformation. API Resources: (1) Explicitly whitelist what is returned — security by default. (2) Decouple your database schema from your API contract — rename a column without breaking the API. (3) Format data at the API layer (ISO8601 dates, currency strings, camelCase keys). (4) Conditionally include sensitive data based on token abilities or user role. (5) Nest related resources cleanly without manual `toArray()` calls.',
        follow_up: 'How do you add pagination metadata to an API Resource collection response?',
      },
      {
        question: 'What is `whenLoaded()` and why is it important for API Resource performance?',
        answer:
          '`whenLoaded("orders")` checks if the `orders` relationship is already in the model\'s loaded relations. If it is, it returns the resource collection. If not, it returns nothing (the key is omitted). This is critical because without it, accessing `$this->orders` inside a Resource triggers a new query per model — the resource layer itself introduces N+1 queries. By using `whenLoaded()`, the Resource never triggers lazy loading. The controller decides whether to load the relation with `with("orders")`, and the Resource respects that decision. This keeps performance optimization in the controller where it belongs.',
        follow_up: 'How would you return orders with items only for admin users in a resource?',
      },
    ],
  },

  'Service Container and Dependency Injection': {
    explanation:
      'Laravel\'s Service Container is a PHP IoC container that uses reflection to read constructor type-hints and automatically build the dependency tree. When `OrderController` type-hints `PaymentGateway`, Laravel instantiates `PaymentGateway` (and recursively resolves its own dependencies), injects it into the controller, and never requires you to call `new`. Bindings in `AppServiceProvider::register()` tell the container how to build abstract types: `app()->bind(PaymentGatewayInterface::class, StripeGateway::class)`. In tests you rebind: `app()->bind(PaymentGatewayInterface::class, FakeGateway::class)` — the controller code is never changed.',
    realWorldExample:
      'An e-commerce app has `StripeGateway` in production and `FakeGateway` in tests. `OrderController` type-hints `PaymentGatewayInterface`. `AppServiceProvider::register()` binds `StripeGateway` in production. A test calls `app()->bind(PaymentGatewayInterface::class, FakeGateway::class)` before the request — the controller receives `FakeGateway` automatically. No mock framework needed for the swap, no static method to patch. The container does the wiring. Changing from Stripe to Braintree means updating one binding — zero controller changes.',
    practicalUseCase:
      'Create `PaymentGatewayInterface` with a `charge(int $amountCents, string $token): ChargeResult` method. Implement `StripeGateway`. Bind it in `AppServiceProvider`. Inject into `CheckoutController`. Write a test that binds `FakeGateway` and asserts the controller returns 201 without hitting Stripe\'s API.',
    keyPoints: [
      '`app()->bind(Interface::class, Impl::class)` — new instance every time resolved. `app()->singleton(...)` — one instance per request lifecycle, reused.',
      '`app()->instance(Interface::class, $existingObject)` — use an already-created object as the binding (useful for testing with pre-configured mocks).',
      'Contextual binding: `$this->app->when(OrderController::class)->needs(PaymentGateway::class)->give(StripeGateway::class)` — different classes get different implementations.',
      'Auto-resolution: classes without explicit bindings are resolved via PHP Reflection — the container reads the constructor and builds dependencies recursively.',
      'Facades like `Cache::`, `DB::`, `Queue::` resolve a service from the container each call — `Cache::get("key")` = `app("cache")->get("key")`.',
      'Tagged bindings: `app()->tag([DriverA::class, DriverB::class], "exporters")` then `app()->tagged("exporters")` returns all — useful for plugin/strategy patterns.',
      '`app()->make(Foo::class)` manually resolves outside of constructor injection — use in closures, commands, or non-injectable contexts.',
    ],
    interviewQA: [
      {
        question: 'Why is constructor injection through the Service Container better than using `new ClassName()` inside methods?',
        answer:
          'With `new ClassName()` inside a method, the class is hardcoded — you cannot swap it for a fake in tests, a different implementation in staging, or mock it for unit testing. You must modify the class to change its behavior. With constructor injection: (1) The dependency is explicit and visible in the class signature. (2) The container handles instantiation — including the dependency\'s own dependencies recursively. (3) Tests rebind the interface to a fake without touching the class. (4) You can switch implementations by changing one line in `AppServiceProvider`. This is the Dependency Inversion Principle in practice: depend on abstractions, not concrete classes.',
        follow_up: 'How do you inject different implementations of the same interface into two different controllers using contextual binding?',
      },
      {
        question: 'What is the difference between `app()->bind()`, `app()->singleton()`, and `app()->instance()` in Laravel?',
        answer:
          '`bind()` registers a factory closure — every time the binding is resolved, the closure runs and returns a new instance. Use for stateless services. `singleton()` runs the closure once and stores the result — subsequent resolutions return the same object within the request lifecycle. Use for stateful services (HTTP clients, database managers, cache managers) where you want one shared instance. `instance()` registers a specific pre-created object as the binding — bypasses the factory entirely. Most useful in tests: `app()->instance(Mailer::class, $mockMailer)` registers your mock directly, ensuring the container returns it without calling any factory.',
        follow_up: 'When would using a singleton create a bug in a long-running Laravel Octane or Laravel Horizon worker?',
      },
    ],
  },

  'Laravel Collections API': {
    explanation:
      'Laravel Collections wrap PHP arrays in a fluent, chainable API with 100+ methods for transforming, filtering, grouping, and aggregating data in memory. `collect([1,2,3])` wraps an array; `Model::all()` returns a Collection automatically. Collections are lazy-evaluated in chains — `filter()`, `map()`, and `reject()` run on the full collection in memory. For truly large datasets, `LazyCollection` uses PHP Generators: `LazyCollection::make(fn() => yield from User::cursor())` processes millions of rows one at a time without loading them all into memory.',
    realWorldExample:
      'Processing an order report: `Order::with("items")->get()->groupBy("status")->map(fn($group) => ["count" => $group->count(), "total" => $group->sum("total"), "avg" => $group->avg("total")])->sortByDesc("total")`. This groups orders by status, computes count/sum/average per group, and sorts in one fluent chain — no foreach, no manual accumulator variables. In PHP without Collections this would be 20+ lines with nested loops.',
    practicalUseCase:
      'Fetch all users, group them by their subscription plan, for each group collect the top 5 by total spend, flatten to a single list, and format each user as `["name" => ..., "plan" => ..., "rank" => ...]`. Implement this using `groupBy()`, `map()`, `sortByDesc()`, `take()`, `flatten()`, and `mapWithKeys()` — all chained on a single Collection.',
    keyPoints: [
      '`filter()` keeps elements where callback returns true. `reject()` is the inverse — keeps where callback returns false.',
      '`map()` transforms each element. `flatMap()` maps and flattens one level — useful when each element produces an array of results.',
      '`groupBy("status")` returns a Collection of Collections keyed by the status value — nest `->map()` to aggregate each group.',
      '`pluck("email")` extracts one column. `pluck("name", "id")` creates a key-value Collection — fast lookup table from a query result.',
      '`first(fn($u) => $u->role === "admin")` returns the first matching element without loading all elements first.',
      'Lazy collections: `User::cursor()` + `LazyCollection::make()` — process 1M users with constant memory by yielding one at a time.',
      '`collect()->pipe(fn($c) => ...)` passes the collection to a closure and returns the result — useful for breaking very long chains into named steps.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `map()` and `transform()` in Laravel Collections?',
        answer:
          '`map()` returns a new Collection with the transformed values — the original Collection is unchanged (immutable). `transform()` modifies the Collection in-place and returns the same Collection instance (mutable). In practice, always use `map()` — mutable collections are a footgun in code where the same collection is referenced in multiple places. The one case for `transform()`: when you are intentionally replacing a large collection in-place to avoid the memory cost of creating a second copy — but this is rare and `map()` is safe by default.',
        follow_up: 'When would you use `LazyCollection` over a regular `Collection` for processing Eloquent results?',
      },
      {
        question: 'How would you implement pagination on an in-memory Collection?',
        answer:
          'Use `forPage($pageNumber, $perPage)`: `$paginated = $collection->forPage(2, 15)` returns items 16–30. This is manual pagination — you must separately track the total. For a full paginator object that generates `links()`, use `new LengthAwarePaginator($paginated, $collection->count(), 15, $pageNumber)`. In practice, prefer database-level pagination with `Model::paginate(15)` — it adds LIMIT/OFFSET in SQL and only loads one page of records. In-memory pagination is justified only when you\'ve already loaded data for other purposes (e.g., filtering a static config array) or when the dataset is too small to warrant a DB query.',
        follow_up: 'What is the performance difference between `Collection::filter()` and adding a WHERE clause to the Eloquent query?',
      },
    ],
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────────────

  'Service Providers and Bootstrapping': {
    explanation:
      'Service Providers are the central bootstrapping mechanism in Laravel. The framework itself is entirely bootstrapped through providers — `RouteServiceProvider` registers routes, `AuthServiceProvider` registers gates and policies, `EventServiceProvider` maps events to listeners. Your application\'s providers run after the framework\'s. The lifecycle is two-pass: first all `register()` methods across all providers (container bindings only — no cross-service calls), then all `boot()` methods (full framework access). Deferred providers (implementing `DeferrableProvider`) are not loaded at all until one of their declared services is actually resolved — this reduces bootstrap time for large applications.',
    realWorldExample:
      'A multi-tenant SaaS registers a `TenantServiceProvider`. `register()` binds `TenantManager` as a singleton. `boot()` adds a route macro, registers a Blade directive `@tenant`, hooks into the `Eloquent::creating` event to automatically set `tenant_id`, and registers a global query scope that filters all models by the current tenant. The entire multi-tenancy infrastructure is encapsulated in one provider — install it, register it in `config/app.php`, and every model automatically scopes to the current tenant.',
    practicalUseCase:
      'Write a `CurrencyServiceProvider` that registers a `CurrencyConverter` singleton (reads exchange rates from config), adds a Blade directive `@currency($amount, $code)` that formats money, and publishes its config via `$this->publishes([...])`. Register it in `config/app.php` and verify `@currency(1234.56, "EUR")` renders "€1,234.56" in Blade.',
    keyPoints: [
      '`register()`: ONLY container bindings. No config(), view(), auth(), event() calls — other providers may not be registered yet.',
      '`boot()`: full framework access. Register Blade directives, view composers, route macros, model observers, validators, event listeners here.',
      'Deferred providers: implement `DeferrableProvider` and return service names from `provides()` — the provider is not loaded until those services are resolved.',
      '`$this->mergeConfigFrom(__DIR__."/../config/pkg.php", "pkg")` — package default config merged with app\'s published config.',
      '`$this->publishes([...], "tag")` enables `php artisan vendor:publish --tag=tag` to copy config, migrations, and views into the app.',
      'Order in `config/app.php` providers array matters — providers boot in listed order. Dependencies must be earlier in the list.',
      '`app()->resolving(Foo::class, fn($foo, $app) => $foo->setup())` — callback fires every time Foo is resolved from the container.',
    ],
    interviewQA: [
      {
        question: 'Why does calling `Cache::get()` inside a Service Provider\'s `register()` method throw an error?',
        answer:
          'The bootstrap process runs in two passes. Pass 1: `register()` is called on all providers in order — during this pass, only the providers that have already run have their bindings available. `CacheServiceProvider` may not have run yet when your provider\'s `register()` runs, so `Cache::` (which resolves from the container) fails with "Target class [cache] does not exist". Pass 2: `boot()` runs after ALL `register()` calls have completed — at this point every service is in the container and `Cache::`, `DB::`, `Auth::`, `Event::` are all available. Rule: `register()` is for binding; `boot()` is for using.',
        follow_up: 'What is a deferred Service Provider and how does it improve application startup time?',
      },
      {
        question: 'How does a Laravel package get its Service Provider automatically registered without the app developer adding it to config/app.php?',
        answer:
          'Laravel\'s package auto-discovery reads the `extra.laravel.providers` and `extra.laravel.aliases` keys from the package\'s `composer.json`. After `composer install/update`, Laravel\'s `PackageManifest` scans all installed packages, collects these providers, and caches them in `bootstrap/cache/packages.php`. On every request, Laravel loads this cached manifest and registers those providers alongside the app\'s own providers. Package authors must add `"extra": {"laravel": {"providers": ["Vendor\\Package\\PackageServiceProvider"]}}` to their `composer.json`. Apps can opt out with `"dont-discover": ["vendor/package"]` in their own `composer.json`.',
        follow_up: 'How do you disable auto-discovery for a specific package that has a conflicting service provider?',
      },
    ],
  },

  'Repository Pattern in Laravel': {
    explanation:
      'The Repository Pattern adds an abstraction layer between your business logic and Eloquent. Instead of calling `User::where("active", true)->latest()->paginate(15)` directly in controllers, you call `$this->userRepo->getActivePaginated(15)`. The repository class owns all queries for a model. Benefits: (1) Controllers stay thin — they orchestrate, repositories query. (2) Query logic is in one place — `getActivePaginated()` is reused across controllers, commands, and jobs. (3) Testing: swap `EloquentUserRepository` for `InMemoryUserRepository` without touching controllers. In Laravel, use interface binding in the container to swap implementations.',
    realWorldExample:
      'A SaaS with complex billing logic: `BillingController` calls `$this->subscriptionRepo->getExpiringSoon(days: 7)`, `$this->subscriptionRepo->getByPlan(planId: $id)`, `$this->subscriptionRepo->countActiveByUser($userId)`. All Eloquent queries for `Subscription` are in `EloquentSubscriptionRepository`. When you switch from MySQL to a read-replica for reporting queries, you extend the repository and override the reporting methods — controller code is untouched.',
    practicalUseCase:
      'Create `UserRepositoryInterface` with `findActive(): Collection`, `findById(int $id): ?User`, `create(array $data): User`. Implement `EloquentUserRepository`. Bind in `AppServiceProvider`. Write a feature test and a unit test — the unit test binds `InMemoryUserRepository` and asserts query-free behavior.',
    keyPoints: [
      'Interface + binding: `app()->bind(UserRepoInterface::class, EloquentUserRepo::class)`. In tests: `app()->bind(UserRepoInterface::class, InMemoryUserRepo::class)`.',
      'Keep repositories focused on queries — no business logic (validation, calculations) in repositories. Business logic belongs in Service classes.',
      'Common repository methods: `findAll(array $filters)`, `findById(int $id)`, `findBy(string $col, $value)`, `create(array $data)`, `update(int $id, array $data)`, `delete(int $id)`.',
      'Repositories should not return Eloquent models in the method signature if you want true framework independence — use DTOs or value objects instead. For most Laravel apps returning Eloquent models is acceptable.',
      'Fat repositories are an anti-pattern — if a repository has 30 methods, split it by concern (OrderSearchRepository, OrderWriteRepository).',
      'Repository pattern adds indirection cost — only use it when: (1) you have complex reusable queries, (2) you need testability without DB, (3) there\'s a chance you\'ll switch data sources.',
      'For simple Laravel apps, the Service class calling Eloquent directly (without a Repository) is a valid and simpler architecture.',
    ],
    interviewQA: [
      {
        question: 'What problem does the Repository Pattern solve and when is it NOT worth adding?',
        answer:
          'Repository Pattern solves three problems: (1) Query logic scattered across controllers, commands, and jobs — the same `User::where("active", true)` is copy-pasted in 8 places, all must be updated when the logic changes. (2) Controllers that directly call Eloquent are harder to unit test without a real database. (3) Tight coupling to Eloquent makes switching ORMs or databases painful. It is NOT worth adding for: simple CRUD apps with thin controllers, apps where queries are already centralized in scopes and services, teams unfamiliar with the pattern who will implement it inconsistently, or small projects where the abstraction overhead outweighs the benefit.',
        follow_up: 'How is the Repository Pattern different from Eloquent\'s local scopes, and when would you choose one over the other?',
      },
      {
        question: 'How do you handle transactions that span multiple repositories?',
        answer:
          'Transactions should not be in repositories — a repository method represents one data access operation, not a business transaction. Transactions belong in the Service layer (or a Unit of Work): wrap multiple repository calls in `DB::transaction(function() use ($orderRepo, $inventoryRepo) { $order = $orderRepo->create($data); $inventoryRepo->deduct($order->items); })`. If one operation fails, the entire transaction rolls back — neither repository needs to know about the transaction. For even cleaner separation, inject a `TransactionManager` interface that wraps `DB::transaction()` so the service can be tested without a real database transaction.',
        follow_up: 'What is the Unit of Work pattern and how does it relate to the Repository Pattern?',
      },
    ],
  },

  'Queues and Jobs': {
    explanation:
      'Laravel queues serialize a job class (with its constructor arguments) to JSON and push it to a backend — Redis, SQS, database, or Beanstalkd. A queue worker (`php artisan queue:work`) polls the backend, deserializes the job, calls `handle()`, and ACKs success or marks failure. Jobs implement `ShouldQueue` — dispatching returns immediately to the caller while the job runs asynchronously. Key production features: `$tries` (retry count), `$backoff` (seconds between retries, supports arrays for exponential backoff), `$timeout` (kill worker if exceeded), `failed()` (called after all retries are exhausted), `ShouldBeUnique` (prevents duplicate jobs in the queue).',
    realWorldExample:
      'A subscription billing system: `ProcessRenewal` runs nightly via the Scheduler, dispatching one job per expiring subscription. Each job calls the Stripe API, marks the subscription renewed, and chains `SendReceiptEmail::dispatch()` (only fires if billing succeeds). Stripe webhook failures dispatch `HandleFailedPayment` to a "webhooks" high-priority queue — workers run `--queue=webhooks,default` so webhook jobs are processed before batch billing jobs. Laravel Horizon monitors all queues in real time and alerts when the queue depth exceeds 100 jobs.',
    practicalUseCase:
      'Create a `GenerateMonthlyReport` job with `$tries = 2`, `$timeout = 300`, and a `failed()` method that emails the admin. Dispatch it from a console command. Test with `Queue::fake()`: assert it was pushed to the "reports" queue with the correct user payload. Then run the worker with `php artisan queue:work --queue=reports` and verify the report file is created.',
    keyPoints: [
      'Job chaining: `SendInvoice::withChain([UpdateLedger::class, NotifyAccountant::class])->dispatch()` — runs sequentially, aborts on failure.',
      'Job batching: `Bus::batch([...jobs])->then(fn() => ...)->catch(fn() => ...)->dispatch()` — parallel batch with completion callbacks.',
      '`ShouldBeUnique` with `uniqueId()` returning a model ID prevents duplicate jobs for the same entity from piling up.',
      '`$backoff = [30, 120, 300]` — first retry after 30s, second after 2min, third after 5min. Exponential backoff for flaky third-party APIs.',
      '`$this->release(60)` inside `handle()` pushes the job back with a 60-second delay without counting as a failure — use for rate limiting.',
      '`failed_jobs` table captures full payload + exception on exhausted retries. `php artisan queue:retry {id}` reprocesses specific failed jobs.',
      'Queue connection vs queue name: connection = Redis/SQS/database driver; queue name = logical priority lane within that connection.',
    ],
    interviewQA: [
      {
        question: 'A payment job keeps failing after 3 retries and landing in failed_jobs. How do you diagnose and recover?',
        answer:
          'First: `php artisan queue:failed` — shows the exception, payload, and failed-at timestamp. Read the exception — is it a temporary Stripe 429 rate limit, a network timeout, or a permanent data error? If temporary: increase `$backoff` array, increase `$tries`, and use `$this->release()` with longer delays to give the external API more time. Re-run with `php artisan queue:retry {id}`. If the data is bad (missing required field): fix the underlying data, then retry. For permanent failures: the `failed()` method should alert the team and create an incident record. Implement `Throwable $exception` typing on `failed()` to access the full exception context for logging.',
        follow_up: 'How does `ShouldBeUnique` work and what happens if the lock cannot be acquired?',
      },
      {
        question: 'What is the difference between job chaining and job batching in Laravel?',
        answer:
          'Chaining (`withChain([...])`) runs jobs sequentially — Job B only starts after Job A completes successfully. If any job fails, the chain stops and subsequent jobs are not run. Useful for dependent steps: charge → send receipt → update ledger. Batching (`Bus::batch([...])`) runs jobs in parallel — all are dispatched immediately and processed concurrently by available workers. Batch callbacks (`then`, `catch`, `finally`) fire when the entire batch completes, partially fails, or finishes regardless. Useful for independent tasks: import 1000 users simultaneously, notify when all are imported. You can mix both: a batch of chains.',
        follow_up: 'How do you monitor queue health and depth in production without polling the database?',
      },
    ],
  },

  'Events and Listeners': {
    explanation:
      'Laravel Events implement the Observer/Pub-Sub pattern for decoupling business logic. An Event is a plain PHP class carrying data (`OrderPlaced($order)`). Listeners respond to events — they can be synchronous (run in the same request) or queued (pushed to the queue as a background job). Registering a listener in `EventServiceProvider::$listen` means the controller dispatching `OrderPlaced::dispatch($order)` has zero knowledge of what happens next. Adding a 5th behavior (e.g., triggering a CRM webhook) is one new Listener class — the controller never changes. Model Observers are a simplified event system for Eloquent lifecycle hooks.',
    realWorldExample:
      'An e-commerce checkout: `OrderController::store()` calls `OrderPlaced::dispatch($order)`. Four listeners fire: `DeductInventory` (synchronous — must succeed before response), `SendOrderConfirmation` (queued to "emails" queue), `NotifyWarehouseSystem` (queued — calls a third-party WMS API), `TriggerRewardPoints` (queued — awards loyalty points). The marketing team adds `TrackOrderInCRM` as a 5th listener. The checkout controller is not modified. Each listener is independently testable and independently deployable.',
    practicalUseCase:
      'Create `UserRegistered` event. Write `SendWelcomeEmail` (queued listener) and `CreateDefaultWorkspace` (synchronous listener). Register both in `EventServiceProvider`. Use `Event::fake()` in a test: assert the event was dispatched, assert both listeners are registered. Then remove `Event::fake()` — run the full integration test and assert the workspace was created in the DB and the mail was queued.',
    keyPoints: [
      'Synchronous listeners run in the same request — their exceptions bubble up and can fail the request. Queued listeners run in the background.',
      'Listeners implement `ShouldQueue` for background execution. Add `$queue = "emails"` property to route to a specific queue.',
      '`Event::dispatch(new OrderPlaced($order))` or the static shorthand `OrderPlaced::dispatch($order)` — both are equivalent.',
      'Model Observers: `php artisan make:observer ProductObserver --model=Product`. Register with `Product::observe(ProductObserver::class)` in a Service Provider `boot()`.',
      '`Event::fake()` prevents listeners from running. `Event::assertDispatched(OrderPlaced::class, fn($e) => $e->order->id === $orderId)` verifies.',
      'Auto-discovery: `Event::discover()` in `EventServiceProvider` scans all Listener classes for `#[AsListener]` attributes — removes need for manual `$listen` array.',
      'Stoppable events: return `false` from a listener to prevent subsequent listeners from running — useful for permission-gate listeners.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between Events + Listeners and just calling the service directly from the controller?',
        answer:
          'Direct calls: `$controller->store()` calls `$emailService->sendConfirmation($order)`, `$inventoryService->deduct($order)`, `$warehouseApi->notify($order)` sequentially. Problems: the controller is coupled to every downstream service, must be modified when a new downstream action is added, and all failures surface immediately to the HTTP response. Events + Listeners: `OrderPlaced::dispatch($order)` is one line. Each listener handles its concern independently. Queued listeners don\'t block the response. New behaviors are new Listener classes — zero controller changes. Trade-off: event-driven code is harder to trace ("what handles this event?"), so use `Event::getListeners(OrderPlaced::class)` or IDE plugin to navigate.',
        follow_up: 'How do you handle a failing queued listener that must not block the order from completing?',
      },
      {
        question: 'When would you use a Model Observer instead of a regular Event + Listener?',
        answer:
          'Use Model Observers when: (1) You need to hook into multiple Eloquent lifecycle events for one model (creating, created, updating, updated, deleted, restored) — an Observer consolidates them in one class instead of multiple Event+Listener pairs. (2) The behavior is tightly coupled to the model lifecycle — e.g., always generating a slug on `creating`, always invalidating cache on `updated`. Use Events+Listeners when: (1) The reaction spans multiple models or is a domain event (OrderPlaced triggers actions in Inventory, Email, CRM). (2) You need queued background processing. (3) Multiple unrelated behaviors respond to the same trigger. Observers are scoped to one model; Events are for cross-domain decoupling.',
        follow_up: 'How do you temporarily disable a Model Observer during a mass import to avoid triggering hooks for 50,000 rows?',
      },
    ],
  },

  'Task Scheduling': {
    explanation:
      'Laravel\'s task scheduler replaces a proliferation of cron jobs with a single cron entry: `* * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1`. The scheduler runs every minute; `schedule:run` checks `app/Console/Kernel.php` to see which tasks are due and runs them. Tasks are defined in `Kernel::schedule()` using a fluent API: `$schedule->command("reports:generate")->dailyAt("02:00")->withoutOverlapping()`. `withoutOverlapping()` acquires a cache lock so if a previous run is still executing, the new one is skipped — critical for long-running jobs that might run every minute.',
    realWorldExample:
      'A SaaS platform\'s Kernel::schedule(): `->command("subscriptions:renew")->daily()->at("01:00")->withoutOverlapping()->runInBackground()` runs renewal overnight. `->job(new PruneOldNotifications)->weekly()` dispatches a job to the queue. `->call(fn() => Cache::flush())->hourly()` clears cache. `->command("telescope:prune --hours=24")->daily()` prunes debug data. All these crons are in code, version-controlled, and testable — no cron tab management on servers.',
    practicalUseCase:
      'Register two scheduled tasks: one that generates a CSV report every day at 3 AM (email it on success/failure), and one that pings a health-check URL every 5 minutes using `->everyFiveMinutes()->thenPingOnSuccess($url)`. Test them with `php artisan schedule:list` and run a specific task with `php artisan schedule:run --task="reports:generate"`.',
    keyPoints: [
      '`->withoutOverlapping()` uses a cache lock (default 24h) — if the previous run is still executing, the new one is skipped entirely.',
      '`->runInBackground()` runs the command in a separate process — the scheduler does not wait for it to finish before scheduling the next task.',
      '`->onOneServer()` distributes tasks across multiple servers — only one server actually runs the task per scheduled interval (uses atomic cache locks).',
      '`->emailOutputTo("admin@example.com")` captures command output and emails it — useful for auditing nightly reports.',
      '`->before(fn() => ...)` and `->after(fn() => ...)` hooks run code before/after the scheduled task without modifying the command class.',
      '`->environments(["production"])` limits a task to specific environments — prevents nightly billing jobs from running in staging.',
      'Testing: `$schedule->command("foo")->daily()` — use `Artisan::call("schedule:run")` with Carbon::setTestNow() to simulate a specific time.',
    ],
    interviewQA: [
      {
        question: 'What happens if a scheduled command runs for 90 seconds but is scheduled every minute?',
        answer:
          'Without `withoutOverlapping()`: at minute 1 the task starts; at minute 2 the scheduler fires again and starts a SECOND instance of the task while the first is still running. By minute 10, there are 9 overlapping instances all writing to the same report file or hitting the same database rows — data corruption and resource exhaustion. With `->withoutOverlapping()`: when the scheduler fires at minute 2, it tries to acquire a cache lock. The lock is held by minute 1\'s run, so the new execution is skipped. Only one instance runs at a time. Set the lock time appropriately: `->withoutOverlapping(30)` holds the lock for 30 minutes maximum before releasing (prevents a zombie lock if the task crashes).',
        follow_up: 'How does `->onOneServer()` work in a multi-server deployment and what does it use for coordination?',
      },
      {
        question: 'How do you test that a scheduled command runs at the correct time and interval?',
        answer:
          'Use `php artisan schedule:list` to verify the next due time for each task. For unit testing, bind a spy on the scheduled command: `$this->artisan("schedule:run")` with `Carbon::setTestNow("2024-01-15 03:00:00")` to simulate 3 AM — tasks scheduled `dailyAt("03:00")` will fire. Assert with `$this->artisan("report:generate")->assertExitCode(0)`. For integration: use the `Schedule` facade — `Schedule::command("report:generate")->daily()->at("03:00")` — inspect `$schedule->events()` in a test to assert the correct frequency and time. Do not rely on system cron for testing — always drive tests through `schedule:run` with a mocked clock.',
        follow_up: 'How do you monitor scheduled tasks in production to detect when they fail silently?',
      },
    ],
  },

  'Testing with PHPUnit and Pest': {
    explanation:
      'Laravel\'s testing layer wraps PHPUnit (or Pest as a syntax layer) with HTTP simulation (`$this->getJson()`, `$this->postJson()`), database assertions (`assertDatabaseHas()`, `assertDatabaseMissing()`), and fakes for Mail, Queue, Event, Notification, and HTTP client. Feature tests test the full request lifecycle — middleware, controller, service, database — against a real database wrapped in a transaction. Unit tests test a single class in isolation. `RefreshDatabase` resets the DB between tests using transactions (fast). Pest adds expressive syntax: `it("creates an order")->assertCreated()` instead of PHPUnit\'s method-based approach.',
    realWorldExample:
      'A checkout feature test: `Queue::fake()`, `Mail::fake()`, `Http::fake(["api.stripe.com/*" => Http::response(["id" => "ch_123"])])`. POST to `/api/checkout` with valid data. Assert: 201 status, `orders` row in DB, `ProcessPayment` job dispatched with correct order ID, `OrderConfirmation` mail queued to user\'s email. All in one test — no real Stripe call, no real email, no background worker needed. This is a complete integration test of the checkout flow.',
    practicalUseCase:
      'Write three tests for a delete-post endpoint: (1) authenticated owner deletes successfully (200, DB row gone). (2) Authenticated non-owner gets 403 (DB row intact). (3) Unauthenticated request gets 401. Use `RefreshDatabase`, `User::factory()`, `Post::factory()->for($user)`, and `actingAs($user, "sanctum")`.',
    keyPoints: [
      '`RefreshDatabase` wraps each test in a DB transaction rolled back after — fast. `DatabaseMigrations` re-runs `migrate:fresh` per test — very slow, avoid.',
      '`Queue::fake()` stops jobs from executing. `Queue::assertPushed(SendEmail::class, fn($job) => $job->user->id === $id)` asserts payload.',
      '`Http::fake(["stripe.com/*" => Http::sequence()->push(["id" => "ch_1"])->push(Http::response("", 500))])` simulates success then failure.',
      'Pest syntax: `it("rejects unauthenticated requests", fn() => $this->getJson("/api/orders")->assertUnauthorized())` — same PHPUnit under the hood.',
      '`actingAs($user, "sanctum")` authenticates via Sanctum guard for API feature tests. `actingAs($user)` uses the default web guard.',
      '`$this->assertDatabaseHas("orders", ["user_id" => $user->id, "status" => "pending"])` — partial match, not full row match.',
      'Mock vs Fake: `Mail::fake()` is a test double that records calls. `$this->mock(PaymentGateway::class)` creates a Mockery mock with expectations.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between `RefreshDatabase` and `DatabaseTransactions` traits in Laravel tests?',
        answer:
          '`RefreshDatabase` runs `migrate:fresh` once for the entire test suite (on first test) and then wraps each test in a database transaction that rolls back after. This gives a clean state per test without re-running migrations repeatedly. `DatabaseTransactions` only wraps each test in a transaction without running migrations — assumes the database schema already exists. The problem: if any test uses `DB::unprepared()`, raw queries outside the transaction, or database connections that don\'t support transactions (like SQLite in WAL mode), the transaction rollback may not work correctly. `RefreshDatabase` is the safe default.',
        follow_up: 'How do you test a feature that spawns a separate database connection (e.g., a queued job) and verify its database changes?',
      },
      {
        question: 'How do you write a test that asserts EXACTLY 2 database queries were run during a request?',
        answer:
          'Use `DB::enableQueryLog()` before the action and `DB::getQueryLog()` after: `DB::enableQueryLog(); $this->getJson("/api/posts"); $queries = DB::getQueryLog(); $this->assertCount(2, $queries);`. This verifies N+1 is prevented. For a more granular assertion, loop through `$queries` and assert specific SQL patterns. A cleaner approach: create a custom assertion method in a base test class. Note: `RefreshDatabase`\'s transaction wrapping adds setup queries — call `DB::flushQueryLog()` after the test setup but before the action to get only action-related queries.',
        follow_up: 'When would you use a Mockery mock versus Laravel\'s built-in Mail::fake() for testing email sending?',
      },
    ],
  },

  'Caching, Performance, and Optimization': {
    explanation:
      'Laravel\'s cache is a unified API over Redis, Memcached, file, database, and DynamoDB. `Cache::remember("key", $ttl, fn)` returns cached data or runs the closure, stores it, and returns it. Cache tags (`Cache::tags(["products"])->flush()`) invalidate groups of related cached keys atomically — requires Redis or Memcached (file/database do not support tags). Beyond application-level caching, Laravel config/route/view caching reduces bootstrap overhead significantly in production. Query optimization — eager loading, indexes, `select()`, `chunkById()` — is usually higher-impact than adding a cache layer.',
    realWorldExample:
      'A product catalog with 10 filter combinations: cache each combination under a key `"products_" . md5(serialize($request->query()))` tagged with `["products"]`. When any product is updated, `Cache::tags(["products"])->flush()` invalidates all 10 cached variants in one call. Without tags, you\'d need to track and delete each key manually. The cache layer reduces a 400ms database query (with JOINs and filters) to a 2ms Redis read for repeat visitors — meaningful for a high-traffic catalog page.',
    practicalUseCase:
      'Profile a slow endpoint with `DB::listen()`. Identify the slowest query. Add a composite index via migration. Measure the improvement. Then add `Cache::tags(["products"])->remember(...)` to cache the result. Add `Cache::tags(["products"])->flush()` in the Product observer\'s `saved()` method. Compare response times before/after with `php artisan telescope:clear` and Telescope\'s request log.',
    keyPoints: [
      '`Cache::remember("key", 3600, fn() => heavyQuery())` — returns cached value if exists, otherwise runs closure, caches for 1 hour.',
      'Cache tags require Redis/Memcached. File and database cache drivers do NOT support tags — `Cache::tags()` throws a `BadMethodCallException`.',
      '`php artisan config:cache` merges all config files into one cached file — eliminates config file reading on every request (mandatory in production).',
      '`php artisan route:cache` compiles all routes to a single cached file — eliminates route file parsing. Must re-run after any route change.',
      '`php artisan optimize` runs config, route, and view cache in one command — run this during deployment.',
      'Thundering herd: `Cache::lock("key", 30)->block(5, fn() => ...)` prevents multiple workers regenerating the same cache simultaneously.',
      'HTTP response caching (`spatie/laravel-responsecache`) caches full rendered responses — most aggressive, invalidate carefully.',
    ],
    interviewQA: [
      {
        question: 'How do cache tags work in Redis and why can\'t you use them with the file cache driver?',
        answer:
          'When you call `Cache::tags(["products"])->put("product_list_page1", $data, 3600)`, Laravel stores: (1) The cached value at a namespaced key like `{tag_hash}:product_list_page1`. (2) A reference to that key in a Redis Set named after the tag. `Cache::tags(["products"])->flush()` reads the tag\'s Redis Set, iterates all stored keys, and DELETEs them all — one atomic operation. The file driver has no equivalent of a Redis Set for tracking which files belong to a tag. Implementing it would require a separate index file that must be locked for reads and writes — not worth the complexity. The database driver has the same limitation: no built-in atomic multi-key grouping mechanism.',
        follow_up: 'What is the thundering herd problem with Cache::remember() and how does Cache::lock() solve it?',
      },
      {
        question: 'What caching commands should you run during every Laravel production deployment?',
        answer:
          '`php artisan config:cache` — merges all `config/*.php` into `bootstrap/cache/config.php`. Without this, every request reads every config file. `php artisan route:cache` — compiles all routes to `bootstrap/cache/routes-v7.php`. Without this, every request parses web.php and api.php. `php artisan view:cache` — pre-compiles all Blade templates. Without this, Blade checks file modification timestamps and recompiles when needed. `php artisan event:cache` — caches the event-listener map from auto-discovery. Run `php artisan optimize` to execute all four in sequence. Critical: run `php artisan optimize:clear` or `php artisan cache:clear` if you change config/routes/views — stale caches serve wrong data.',
        follow_up: 'What breaks when you run `php artisan config:cache` but have `env()` calls outside of config files?',
      },
    ],
  },

  'Laravel Interview Architectures': {
    explanation:
      'Senior Laravel interviews focus on architectural decisions: when to use events vs direct service calls, when the Repository Pattern adds value vs complexity, how to design a queue system for reliability, how to handle multi-tenancy, and how to scale a Laravel app beyond a single server. These are trade-off questions — there is rarely one right answer. The ability to articulate WHY you chose an approach, what you gave up, and when you\'d choose differently is what separates senior engineers from developers who know the framework syntax.',
    realWorldExample:
      'Real architectural questions from senior Laravel interviews: "Design the queue system for a financial transaction processor that cannot lose a single job." (Answer: SQS FIFO queue, `$tries = 1` with no auto-retry, manual retry with idempotency keys, `failed()` method creates an incident, dead-letter queue monitored by PagerDuty.) "How do you handle 10,000 concurrent users hitting the same product page?" (Answer: Redis response cache with 60s TTL, CDN in front, read replicas for DB, horizontal scaling with Redis session driver.)',
    practicalUseCase:
      'Design a multi-tenant SaaS where each tenant has isolated data. Compare: (A) Separate database per tenant — complete isolation, high overhead. (B) Shared database, tenant_id column on every table with global query scope — simple but risk of scope forgetting. (C) Separate schema per tenant (PostgreSQL) — middle ground. Justify your choice for a 500-tenant SaaS with mixed enterprise and self-serve customers.',
    keyPoints: [
      'Fat controller anti-pattern: business logic in controllers makes it untestable and unreusable. Thin controllers call services; services call repositories.',
      'Service layer: `OrderService::placeOrder(array $data): Order` orchestrates validation, inventory check, payment charge, event dispatch — all in one transactional service method.',
      'Multi-tenancy approaches: `tenant_id` global scope (simplest), separate databases (most isolated, hardest to manage), subdomain-based routing to per-tenant config.',
      'Horizontal scaling: stateless Laravel (no local file sessions, no local file cache) → Redis for sessions + cache, S3 for file storage, MySQL read replica for read traffic.',
      'CQRS in Laravel: separate read models (optimized SQL views or cache) from write models (Eloquent with validation) — justified when read patterns differ dramatically from write patterns.',
      'Queue reliability: Redis queues with Horizon for visibility; SQS for guaranteed delivery at scale; never use the database driver for high-throughput queues.',
      'Event sourcing: store every state change as an immutable event log — powerful for audit trails and time-travel debugging, complex to implement correctly.',
    ],
    interviewQA: [
      {
        question: 'How would you design a Laravel system to process 1 million webhook events per day reliably?',
        answer:
          'Receive webhooks in a thin controller that validates the signature (`hash_equals()` with the provider\'s secret) and immediately returns 200 — never do processing inline. Dispatch a `ProcessWebhook` job to an SQS queue. SQS is preferred over Redis for this scale: guaranteed delivery, dead-letter queues, no data loss if a worker crashes. Use `ShouldBeUnique` with the webhook event ID as `uniqueId()` to handle provider retries (idempotency). Set `$tries = 1` — prefer moving to dead-letter queue over retrying indefinitely. Run multiple Horizon workers (`superqueue` in Supervisor) to consume in parallel. Monitor dead-letter queue depth with CloudWatch alarms. Daily: roughly 11 webhooks/second peak — 5 workers handle this comfortably.',
        follow_up: 'How do you guarantee exactly-once processing for a webhook that triggers a financial transaction?',
      },
      {
        question: 'What is the difference between a Service class and a Job in Laravel, and when would you use each?',
        answer:
          'A Service class is a synchronous PHP class with no queue concerns — it encapsulates business logic for use within the HTTP request: `OrderService::placeOrder()` validates, charges, and creates the order in the same request. A Job is a queueable unit of work that runs asynchronously in a worker process — it should be serializable (all constructor arguments must be serializable, typically Eloquent models). Use a Service when: the result is needed in the current request (you must return the order ID to the user), or the work is fast (<100ms). Use a Job when: the work is slow (email sending, PDF generation, API calls), failures should retry without affecting the user, or the work is triggered by events that fire during the request. The two are not mutually exclusive: your Service can dispatch Jobs internally.',
        follow_up: 'How do you avoid the "god class" anti-pattern when a Service class grows to 500 lines?',
      },
      {
        question: 'How would you implement multi-tenancy in a Laravel SaaS with 200 tenants?',
        answer:
          'For 200 tenants, a shared database with `tenant_id` global scope is the practical choice. Implementation: (1) Add `tenant_id` to every tenant-scoped table. (2) Create a `BelongsToTenant` trait with a `GlobalScope` that adds `WHERE tenant_id = {current_tenant_id}` to every query. (3) Resolve the current tenant in middleware from the subdomain or JWT claim and store it in a `TenantManager` singleton. (4) Override `creating` in the trait to auto-set `tenant_id`. Risk: forgetting to apply the trait to a new model exposes cross-tenant data — mitigate with a test that seeds two tenants and asserts models are isolated. Separate databases per tenant become worth it at 1000+ tenants or when compliance requires data residency guarantees. `spatie/laravel-multitenancy` is the standard package.',
        follow_up: 'How do you run database migrations across all 200 tenant databases if you choose the separate-database approach?',
      },
    ],
  },
};

const devops: Record<string, SpecificSectionData> = {
  'What is DevOps': {
    explanation:
      'DevOps is a cultural and engineering practice that integrates software development (Dev) and IT operations (Ops) to shorten the system development lifecycle while delivering high-quality software continuously. It breaks down the traditional silo where developers write code and operations teams deploy and maintain it — instead, cross-functional teams own the full lifecycle: build, test, deploy, monitor, and respond to incidents. Key pillars: CI/CD pipelines (automate build/test/deploy), Infrastructure as Code (version control your infrastructure), monitoring and observability (measure everything), and a blameless culture that treats failures as learning opportunities.',
    realWorldExample:
      'A development team pushes code to GitHub. A GitHub Actions CI pipeline runs immediately: lints, runs 500 unit tests (3 minutes), builds a Docker image, pushes it to ECR, and deploys to a staging environment. A QA engineer approves the staging deployment. CD deploys to production via blue-green deployment — 5% of traffic routes to the new version, CloudWatch monitors error rate, and if no increase in errors after 5 minutes, traffic shifts 100%. The entire process from push to production takes 15 minutes. A rollback takes 30 seconds.',
    practicalUseCase:
      'Set up a GitHub Actions workflow (`.github/workflows/ci.yml`) that triggers on pull requests: checkout code, set up Node.js, run `npm test`, and post a comment with test results. Add a `deploy.yml` workflow that triggers on merge to main: build a Docker image tagged with the git SHA, push to Docker Hub, and SSH to a server to pull and restart the container. This is a minimal but complete CI/CD pipeline.',
    keyPoints: [
      'CI (Continuous Integration): merge code frequently, run automated tests on every commit — fail fast on broken builds.',
      'CD (Continuous Delivery): every green build is releasable; Continuous Deployment goes further and auto-deploys to production.',
      'Infrastructure as Code: Terraform, Pulumi, CloudFormation — infrastructure is reproducible, reviewable, and version-controlled.',
      'The DORA metrics measure DevOps performance: deployment frequency, lead time, change failure rate, and time to restore service.',
      'Blue-green deployments maintain two production environments — traffic switches instantly; rollback is flipping back the switch.',
      'Canary deployments route a small % of traffic to the new version — reduces blast radius of bad deployments.',
      'Shift-left security: run security scanning (SAST, dependency audit) in CI, not after deployment — earlier detection = cheaper fixes.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
        answer:
          'Continuous Delivery: every passing build is automatically deployed to a staging environment and IS READY to deploy to production — but the production deployment requires a human approval/trigger. The pipeline ensures the code is always releasable. Continuous Deployment: extends this by automatically deploying every passing build all the way to production, with no human gate. CD requires very high confidence in your automated tests (high coverage, E2E tests, canary deployment monitoring). Many organizations aim for Continuous Delivery (ready to release at any time) but don\'t fully automate production deploys, keeping a human approval step for business reasons (coordinated releases, feature flags).',
        follow_up: 'What prerequisites must be in place before a team can safely do Continuous Deployment to production?',
      },
      {
        question: 'What is a blue-green deployment and what problem does it solve?',
        answer:
          'Blue-green deployment maintains two identical production environments: Blue (current live) and Green (new version). You deploy the new version to Green, run smoke tests, then switch the load balancer from Blue to Green — traffic cutover takes seconds. If Green has issues, switch back to Blue instantly — rollback is a load balancer config change, not a code redeployment. This solves two problems: (1) Zero-downtime deploys — the switch is instantaneous with no request drops. (2) Fast rollback — no waiting for a redeployment; Blue is still running. Tradeoffs: requires double the infrastructure, database schema changes must be backward-compatible with both versions simultaneously.',
        follow_up: 'How do you handle database migrations in a blue-green deployment without downtime?',
      },
    ],
  },
};

const github: Record<string, SpecificSectionData> = {
  'What is GitHub': {
    explanation:
      'GitHub is a web-based platform built on Git that provides remote repository hosting, collaboration features (pull requests, code reviews, issues), and automation via GitHub Actions. Git is the version control system; GitHub is the collaboration platform on top of it. Core workflow: developers work on branches, push to GitHub, open a Pull Request for code review, CI/CD runs automated checks, reviewers approve, code is merged to the main branch. GitHub Actions workflows automate build, test, and deployment on repository events (push, PR, release).',
    realWorldExample:
      'A team follows trunk-based development on GitHub. A developer creates branch `feature/user-auth`, pushes commits, and opens a PR. GitHub Actions runs automatically: ESLint, TypeScript type-check, Jest tests, and builds a Docker image. Two reviewers approve using a `CODEOWNERS` file that requires approval from the security team for auth-related files. Merge triggers a CD workflow that deploys to production via AWS CodeDeploy with a 5% canary rollout.',
    practicalUseCase:
      'Create a GitHub repository, add a `.github/workflows/test.yml` file that runs on every push: `on: push; jobs: test: runs-on: ubuntu-latest; steps: [uses: actions/checkout@v4, uses: actions/setup-node@v4, run: npm ci, run: npm test]`. Create a branch, push code that fails tests — observe the red CI check that blocks the PR merge. Fix the failing test, push again — green checks enable the merge.',
    keyPoints: [
      'GitHub Actions workflows are YAML files in `.github/workflows/` — triggered by events like `push`, `pull_request`, `schedule`, or `workflow_dispatch`.',
      'Protected branches: require PR reviews, passing status checks, and signed commits before allowing merges — the main defense against unreviewed code.',
      'CODEOWNERS file: `*.js @frontend-team` means any PR touching JS files requires approval from the frontend team — automatic reviewer assignment.',
      'GitHub Environments: `production` environment with required reviewers — CD workflow pauses for manual approval before deploying.',
      'Secrets: `settings → Secrets → Actions` stores API keys accessible as `${{ secrets.API_KEY }}` in workflows — never hardcode credentials.',
      'GitHub Packages hosts Docker images, npm packages, and other artifacts — tightly integrated with Actions for pushing after CI passes.',
      'Dependabot auto-creates PRs for dependency version updates and security vulnerabilities in `package.json` and other manifests.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between merge, squash merge, and rebase in GitHub pull requests?',
        answer:
          'Merge: creates a merge commit that joins the feature branch history into main — preserves all commit history, creates a clear branch record. Squash merge: combines all PR commits into one single commit on main — keeps main history clean and linear, but loses granular commit context. Rebase: rewrites the feature branch commits onto the tip of main, then fast-forwards — completely linear history, but rewrites SHA hashes (problematic for shared branches). Teams choose based on philosophy: merge for full history transparency (open source), squash for clean main history (most product teams), rebase for truly linear git log (strict teams). The strategy should be consistent — mix-and-match causes confusing histories.',
        follow_up: 'Why is force-pushing after a rebase dangerous on a branch that others have pulled?',
      },
      {
        question: 'How do you structure a GitHub Actions CI/CD pipeline for a Node.js application?',
        answer:
          'A typical pipeline has two workflows: CI triggers on `pull_request` — runs in parallel: lint (ESLint), type-check (tsc), unit tests (Jest with coverage), build (confirm the Docker image builds). CD triggers on `push` to `main` — jobs run sequentially: build Docker image tagged with git SHA, push to ECR, deploy to staging (automatic), run smoke tests against staging, deploy to production (gated by environment approval). Key actions: `actions/checkout@v4`, `actions/setup-node@v4`, `docker/build-push-action@v5`, `aws-actions/configure-aws-credentials@v4`. Cache npm dependencies with `actions/cache` keyed on `package-lock.json` hash to avoid re-downloading on every run.',
        follow_up: 'How do you prevent secrets from leaking in GitHub Actions logs?',
      },
    ],
  },
};

const agile: Record<string, SpecificSectionData> = {
  'What is Agile Methodology': {
    explanation:
      'Agile is an iterative approach to software development that delivers working software in short cycles (sprints/iterations) rather than after a long planning and implementation phase. The Agile Manifesto (2001) values: individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, responding to change over following a plan. Agile doesn\'t specify practices — it\'s a philosophy. Scrum, Kanban, SAFe, and XP are frameworks that implement Agile principles with specific roles, ceremonies, and artifacts.',
    realWorldExample:
      'A fintech startup uses Scrum: 2-week sprints, a prioritized backlog maintained by the Product Owner, daily standups (15 minutes), sprint review demos to stakeholders, and retrospectives after each sprint. The team ships a working feature every two weeks instead of a big bang release every 6 months. When a competitor launches a feature mid-sprint, the PO adds it to the next sprint backlog — the team pivots in 2 weeks, not 6 months.',
    practicalUseCase:
      'Run a mock sprint planning for a feature: write 5 user stories using "As a [user], I want [feature], so that [benefit]" format. Estimate with planning poker (Fibonacci: 1, 2, 3, 5, 8, 13). Apply "Definition of Done" to each: coded + unit tested + code reviewed + deployed to staging + acceptance criteria verified. Run a 5-minute retrospective: what went well? What to improve? One action item each — this is the Agile continuous improvement loop.',
    keyPoints: [
      'Agile ≠ Scrum: Agile is the philosophy; Scrum, Kanban, XP are frameworks that implement it differently.',
      'Sprint velocity: how many story points a team completes per sprint — used for forecasting, not as a performance metric.',
      'User story format: "As a [persona], I want [goal], so that [benefit]" — keeps development customer-focused.',
      'Definition of Done (DoD) is a team agreement on what "complete" means — prevents "done" meaning different things to different people.',
      'Backlog refinement (grooming): breaking down and estimating stories before sprint planning — usually done mid-sprint for the next sprint.',
      'Scrum Master is not a project manager — they remove impediments and facilitate Scrum events; they don\'t direct the team\'s work.',
      'WIP limits in Kanban: limiting work-in-progress forces collaboration on finishing tasks before starting new ones — reduces context switching.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between Scrum and Kanban?',
        answer:
          'Scrum uses fixed-length iterations (sprints, 1–4 weeks), committing to a sprint goal and sprint backlog at the start. Work is planned in batches; velocity tracks progress. Roles: Scrum Master, Product Owner, Developers. Kanban is continuous flow — no fixed iterations, work moves through columns (To Do → In Progress → Done) with WIP limits. No roles, no sprints, no velocity — cycle time (how long a task takes) is the key metric. Choose Scrum when you need predictability and regular stakeholder demos. Choose Kanban for support/ops teams with unpredictable work, or teams where tasks vary widely in size and can\'t be committed to sprint-length batches.',
        follow_up: 'What is Scrumban and when would a team adopt it?',
      },
    ],
  },
};

const vuejs: Record<string, SpecificSectionData> = {
  'What is Vue.js': {
    explanation:
      'Vue.js is a progressive JavaScript framework for building user interfaces. "Progressive" means you can adopt it incrementally — add a `<script>` tag to an existing page and control one widget, or build a full SPA with Vue Router and Pinia. Vue uses a reactive data system: declare `ref(0)` or `reactive({})` and any template or computed value that reads it automatically updates when it changes. Vue\'s Single File Components (SFCs, `.vue` files) co-locate template, script, and style in one file, compiled by Vite or webpack.',
    realWorldExample:
      'A product page adds a quantity picker without rewriting the page as a React SPA. Drop in Vue via CDN: `const { createApp, ref } = Vue; createApp({ setup() { const qty = ref(1); return { qty }; } }).mount("#quantity-picker")`. The template `{{ qty }}` and `@click="qty++"` buttons work reactively — Vue updates only the changed DOM nodes. This is Vue\'s "progressive enhancement" use case that React and Angular don\'t support as cleanly.',
    practicalUseCase:
      'Create a Vue 3 SFC: `<script setup> import { ref, computed } from "vue"; const items = ref([]); const addItem = (text) => items.value.push({ id: Date.now(), text }); const count = computed(() => items.value.length); </script>`. Notice the Composition API style — no `this`, no `data()` function. `ref()` wraps primitives, `.value` accesses the raw value in script. In the template, `.value` is not needed — Vue unwraps refs automatically.',
    keyPoints: [
      'Vue 3 Composition API (`setup()` / `<script setup>`) replaces Options API for complex components — better TypeScript support and logic reuse.',
      '`ref()` wraps primitive values in a reactive object; `reactive()` makes a plain object reactive — use `ref` for most cases.',
      'Computed properties `computed(() => ...)` cache their result and only re-evaluate when their reactive dependencies change.',
      'Vue directives: `v-if`/`v-else` conditionally renders, `v-for` iterates, `v-model` two-way binds, `v-show` toggles CSS display.',
      'Pinia is Vue 3\'s official state management library — replaces Vuex with a simpler composition-API-based API.',
      'Vue\'s `defineEmits` and `defineProps` in `<script setup>` provide compile-time type checking for component API contracts.',
      'Vue Devtools extension shows component tree, reactive state, Pinia stores, and event history in real-time.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between Vue 3\'s Composition API and Options API?',
        answer:
          'Options API organizes code by option type: `data()`, `methods`, `computed`, `watch`, `lifecycle hooks` — all as properties of a configuration object. Related logic for one feature (e.g., user search) is scattered across multiple options. Composition API (Vue 3) organizes by logical concern — all code for user search lives in a `useUserSearch()` composable: refs, computed, methods, and lifecycle hooks together. Composition API benefits: (1) Better TypeScript support — no `this` context issues. (2) Logic reuse via composables — like React hooks. (3) Tree-shaking — only import the Vue features you use. Options API is still valid and supported; Composition API is preferred for complex components and new projects.',
        follow_up: 'What is a Vue composable and how does it differ from a mixin?',
      },
      {
        question: 'How does Vue\'s reactivity system work differently from React\'s?',
        answer:
          'React uses immutable state: when you call `setState`, React schedules a re-render and runs the component function again, computing the new virtual DOM. Vue uses mutable reactive proxies: when you write `user.name = "Alice"` to a reactive object, Vue\'s Proxy intercepts the write, marks the component as needing an update, and schedules a DOM patch. You don\'t need to call a setter function — mutation triggers reactivity automatically. This makes Vue feel more like "plain JavaScript" but can surprise React developers who expect immutable patterns. The tradeoff: Vue\'s direct mutation is more natural but can make state changes harder to trace in large applications without the discipline of explicit state management (Pinia).',
        follow_up: 'What is Vue\'s reactivity system\'s limitation with arrays and objects, and how does Vue 3 solve it compared to Vue 2?',
      },
    ],
  },
};

const postgresql: Record<string, SpecificSectionData> = {
  'What is PostgreSQL': {
    explanation:
      'PostgreSQL is an advanced open-source relational database that extends standard SQL with features rarely found in other databases: JSONB columns with indexable JSON paths, full-text search, array types, custom operators, table inheritance, and advanced indexing types (GIN, GiST, BRIN, partial indexes, expression indexes). Unlike MySQL, PostgreSQL treats SQL standard compliance as a priority and is the database of choice for applications needing complex queries, data integrity, and extensibility. It supports ACID transactions across all operations including DDL (CREATE TABLE inside a transaction is rollback-safe).',
    realWorldExample:
      'A multi-tenant SaaS uses PostgreSQL\'s JSONB for flexible tenant metadata: `ALTER TABLE tenants ADD COLUMN config JSONB NOT NULL DEFAULT "{}"`. Querying: `SELECT * FROM tenants WHERE config @> {"plan": "enterprise"}` — the `@>` contains operator filters JSONB. With a GIN index on `config`, this is fast regardless of the JSONB structure. In MySQL, this would require a separate key-value table or a brittle `JSON_EXTRACT()` function with no GIN support.',
    practicalUseCase:
      'Create a PostgreSQL table with a JSONB column, insert documents with varying structures, and run: `SELECT id, data->>"name" AS name FROM items WHERE data @> {"active": true}`. Create a GIN index: `CREATE INDEX idx_items_data ON items USING GIN (data)`. Run EXPLAIN ANALYZE before and after — observe the index scan replacing a sequential scan. Then use `tsquery` for full-text: `SELECT * FROM articles WHERE to_tsvector("english", content) @@ to_tsquery("english", "postgres & performance")`.',
    keyPoints: [
      'PostgreSQL uses MVCC (Multi-Version Concurrency Control) — readers never block writers and writers never block readers.',
      'JSONB stores JSON in binary format with indexing support; JSON stores as raw text (no indexing, slower queries).',
      'GIN indexes support full-text search, JSONB containment queries, and array operators efficiently.',
      'Window functions: `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)` — compute running totals, rankings, and lead/lag without subqueries.',
      'CTEs (WITH clauses) are optimization fences in PostgreSQL — they execute exactly once, unlike inline subqueries that may be inlined.',
      'Partial indexes: `CREATE INDEX idx_active_users ON users (email) WHERE active = true` — smaller index, faster queries for the common case.',
      'pg_stat_statements extension tracks query performance statistics — essential for identifying slow queries in production.',
    ],
    interviewQA: [
      {
        question: 'What is MVCC in PostgreSQL and why does it matter for concurrency?',
        answer:
          'MVCC (Multi-Version Concurrency Control) means PostgreSQL keeps multiple versions of each row simultaneously. When a transaction reads data, it sees a snapshot of the database as it was at the transaction\'s start — not the current state. This means: reads never block writes (no read locks), writes never block reads (readers see the old version while a write is in progress). Each INSERT/UPDATE creates a new row version; VACUUM periodically cleans up old versions. Contrast with MySQL\'s InnoDB: it also uses MVCC, but the implementations differ. PostgreSQL\'s MVCC enables the highest isolation level (Serializable Snapshot Isolation) without the performance penalty of locks.',
        follow_up: 'What is table bloat in PostgreSQL and how does VACUUM prevent it?',
      },
      {
        question: 'When would you choose PostgreSQL over MySQL?',
        answer:
          'Choose PostgreSQL when: (1) You need JSONB with indexable queries — MySQL\'s JSON support is weaker. (2) Full-text search is a core feature — PostgreSQL\'s `tsvector`/`tsquery` is a full FTS engine. (3) Complex queries with CTEs, window functions, or recursive queries — PostgreSQL\'s query planner handles these better. (4) You need strict SQL standards compliance — PostgreSQL rejects invalid data where MySQL silently truncates. (5) You need advanced index types — GIN, GiST, partial indexes, expression indexes. (6) You need transactional DDL — rolling back a CREATE TABLE inside a transaction is PostgreSQL-specific. MySQL is a better choice when: you need read replicas with simple CRUD, you\'re using a hosting platform that optimizes for MySQL, or your team\'s expertise is MySQL.',
        follow_up: 'What is the performance difference between PostgreSQL and MySQL for simple CRUD operations?',
      },
    ],
  },
};

const manualQA: Record<string, SpecificSectionData> = {
  'What is Manual QA': {
    explanation:
      'Manual QA (Quality Assurance) is the process of evaluating software through human-executed test cases without automation tools. A QA engineer reads requirements, designs test cases covering happy paths, edge cases, negative scenarios, and boundary values, then executes them against the application — clicking, typing, navigating — and comparing actual behavior with expected behavior. Manual testing excels at usability, exploratory testing, and complex user workflows that are difficult to script. It remains essential even in highly automated teams because automation tests what you program it to test; humans discover what you didn\'t think to test.',
    realWorldExample:
      'A QA engineer tests a bank transfer feature. Automated tests verify the happy path and API contracts. Manual testing catches: the decimal point in the "amount" field changes to a comma on German locale browsers (browser locale bug automation didn\'t cover), the "Transfer" button briefly shows a success message before redirecting to an error page on slow 3G connections (race condition), and the confirmation email shows the recipient\'s name cut off after 30 characters (truncation bug). All three are exploratory discoveries — no automated test was written for these scenarios.',
    practicalUseCase:
      'Write a test case for a user registration form: Test Case ID, Title, Preconditions, Steps (numbered), Expected Result, Actual Result, Status. Cover: valid registration, email already registered (boundary), password too short (validation), special characters in name, SQL injection attempt in email field, empty form submission, extremely long input (255+ chars). This tests functional behavior, security basics, and edge cases in one test suite.',
    keyPoints: [
      'Test case components: ID, title, precondition, test steps, expected result, actual result, pass/fail status, priority, test environment.',
      'Exploratory testing has no pre-written scripts — the QA follows intuition and experience to discover unexpected behavior.',
      'Regression testing re-runs existing test cases after code changes to verify nothing previously working is now broken.',
      'Bug severity vs priority: severity = impact on the system (data loss = critical); priority = business urgency (critical bug on unused feature = low priority).',
      'Equivalence partitioning: test one value from each input partition (valid, invalid, boundary) instead of testing every possible value.',
      'Boundary value analysis: test the exact boundary and just outside it — a field accepting 1–100 should be tested at 0, 1, 100, 101.',
      'A bug report requires: steps to reproduce (exact), expected behavior, actual behavior, environment (OS, browser, version), screenshot/recording.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between verification and validation in testing?',
        answer:
          'Verification asks "Are we building the product right?" — checking that the product matches the specified requirements and design. It includes code reviews, design reviews, walkthroughs, and static analysis. Validation asks "Are we building the right product?" — checking that the product meets the user\'s actual needs. It includes acceptance testing, beta testing, and usability testing. A product can pass verification (matches the spec exactly) but fail validation (the spec was wrong — the feature doesn\'t solve the user\'s problem). QA should catch spec ambiguities during verification before development begins, reducing the cost of finding validation failures late in the cycle.',
        follow_up: 'What is the cost of fixing a bug in requirements vs fixing it in production?',
      },
      {
        question: 'How do you prioritize which test cases to run when time is limited?',
        answer:
          'Risk-based testing: identify the highest-risk areas (complex logic, recent code changes, user-facing features, payment/auth flows) and test those first. Use: (1) Code coverage reports — what code was recently modified? Test it. (2) Bug frequency — which areas have historically had the most bugs? Increased scrutiny. (3) Business impact — what features, if broken, would cause revenue loss or user churn? Test those thoroughly. (4) Smoke test first — verify the core flows work before deep testing. (5) For regression, prioritize the "happy path" of each feature — automation handles the full regression suite in parallel. The goal is maximum risk coverage in minimum time.',
        follow_up: 'What is smoke testing vs sanity testing, and when do you run each?',
      },
    ],
  },
};

const automationQA: Record<string, SpecificSectionData> = {
  'What is Automation QA': {
    explanation:
      'Automation QA uses code (scripts, frameworks) to execute test cases that would otherwise be performed manually. Tests are repeatable, faster at scale, and run as part of CI/CD pipelines — preventing regressions before every deployment. Common tools: Selenium/Playwright for browser automation (E2E), JUnit/TestNG/Pytest for unit/integration tests, RestAssured/Supertest for API testing, Appium for mobile. The key decision: what to automate. Automate stable, frequently-run regression tests. Don\'t automate: exploratory tests, tests that change every sprint, or tests that are cheaper to run manually.',
    realWorldExample:
      'An e-commerce site\'s Playwright E2E test: `test("checkout flow", async ({ page }) => { await page.goto("/products"); await page.click("[data-testid=add-to-cart-first]"); await page.click("[data-testid=checkout]"); await page.fill("[name=card-number]", "4242424242424242"); await page.click("[type=submit]"); await expect(page.locator("[data-testid=order-confirmation]")).toBeVisible(); })`. This test runs on every PR in CI, takes 8 seconds, and catches regressions in the most critical user flow before they reach production.',
    practicalUseCase:
      'Write a Playwright test for a login form: navigate to the login page, fill email and password, submit, assert that the dashboard URL is reached (`expect(page).toHaveURL("/dashboard")`). Add a negative test: invalid credentials should show an error message. Run with `npx playwright test`. View the HTML report with `npx playwright show-report`. Add `--ui` flag for the interactive Playwright UI that shows each step visually — this is the debugging tool for flaky tests.',
    keyPoints: [
      'Playwright and Cypress are the current standard for E2E browser automation — Selenium is legacy, used in enterprise Java projects.',
      'Page Object Model (POM): encapsulate page interactions in classes — `LoginPage.fillCredentials(email, password).submit()` — hides selectors from tests.',
      'Test pyramid: many unit tests (fast, cheap), fewer integration tests, even fewer E2E tests (slow, brittle) — don\'t invert the pyramid.',
      'Flaky tests fail intermittently without code changes — caused by timing issues, test data pollution, or environment instability.',
      '`data-testid` attributes on elements decouple test selectors from CSS/structure changes — tests break when behavior changes, not when styling changes.',
      'CI integration: run unit+integration tests on every commit (fast), E2E on PR merge or nightly (slower, fewer false positives).',
      'Test data management: use factories/fixtures to create test data, clean up after each test — tests must be idempotent and independent.',
    ],
    interviewQA: [
      {
        question: 'What is the Page Object Model and why is it important for maintainable automation?',
        answer:
          'POM is a design pattern that creates an object (class) representing each page or component in the UI. The class encapsulates all locators and interactions for that page: `class LoginPage { async fillEmail(email) { await this.page.fill("[data-testid=email]", email); } async submit() { await this.page.click("[type=submit]"); } }`. Test files use the page object: `await loginPage.fillEmail("user@test.com"); await loginPage.submit()`. When the email field\'s selector changes, you update it in ONE place (the POM class), not in every test that uses it. Without POM, a UI change forces updating 20+ test files.',
        follow_up: 'How do you handle components that appear on multiple pages in the Page Object Model?',
      },
      {
        question: 'What makes a test "flaky" and how do you fix it?',
        answer:
          'Flaky tests pass sometimes and fail sometimes without code changes. Common causes: (1) Timing issues — clicking a button before it\'s enabled; fix with explicit waits: `await page.waitForSelector("[data-testid=submit]:not([disabled])")`. (2) Test data pollution — test A creates data that test B unexpectedly reads; fix with isolated test data and cleanup. (3) Race conditions in async operations — fix with proper await/Promise chaining. (4) Environment flakiness — network timeouts in CI; add retries with `--retries 2` in Playwright. (5) Element ordering assumptions — sort assertions when order isn\'t guaranteed. Strategy: quarantine known flaky tests, investigate root cause, fix or delete. Flaky tests are worse than no tests — they erode trust in the test suite.',
        follow_up: 'How do you decide whether to fix or delete a consistently flaky test?',
      },
    ],
  },
};

// Aggregated export: all topics keyed by topicId
export const SPECIFIC_CONTENT: Record<string, Record<string, SpecificSectionData>> = {
  ...JS_OOP_SOLID_CONTENT,
  react,
  nodejs,
  mysql,
  mongodb,
  laravel,
  devops,
  github,
  agile,
  vuejs,
  postgresql,
  'manual-qa': manualQA,
  'automation-qa': automationQA,
};
