import { InterviewTopic } from './types';

export const reactInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is React and why was it created?",
      answer: "React is a JavaScript library created by Meta (Facebook) for building user interfaces. It was created to solve the problem of keeping a complex UI in sync with changing data. Before React, developers manually updated the DOM — tedious and bug-prone. React introduced the concept of 'describe what the UI should look like given this data' and handles DOM updates automatically.",
      example: "// Old way: manual DOM manipulation\ndocument.getElementById('count').innerText = count;\n\n// React way: describe the UI, React handles DOM\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}",
      use_case: "Facebook's News Feed — thousands of posts, likes, comments updating in real time. React keeps all these UI pieces in sync with data efficiently.",
      follow_up: "What is the difference between a library (React) and a framework (Angular, Next.js)?"
    },
    {
      question: "What is the Virtual DOM and why does React use it?",
      answer: "The Virtual DOM is a lightweight JavaScript copy of the real DOM kept in memory. When state changes, React creates a new virtual DOM, compares it with the old one (this is called diffing), finds the minimum set of changes needed, and applies ONLY those changes to the real DOM. Real DOM manipulation is slow — Virtual DOM batches and minimises it.",
      example: "// When you call setState:\n// 1. React creates new Virtual DOM\n// 2. Diffs it with previous Virtual DOM\n// 3. Calculates minimal 'patch'\n// 4. Applies only that patch to real DOM\n// Result: far fewer expensive DOM operations",
      use_case: "A live dashboard updating 100 metrics per second. Without Virtual DOM diffing, every update would re-render the whole page. With it, only changed numbers are updated.",
      follow_up: "Is Virtual DOM always faster than direct DOM manipulation? When might direct DOM be faster?"
    },
    {
      question: "What is JSX?",
      answer: "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It is NOT real HTML — it gets compiled to React.createElement() calls by Babel/SWC. JSX makes component code readable. Key differences from HTML: use className instead of class, htmlFor instead of for, camelCase event names (onClick, onChange).",
      example: "// JSX\nconst element = <h1 className=\"title\">Hello, {name}!</h1>;\n\n// What it compiles to:\nconst element = React.createElement('h1', { className: 'title' }, 'Hello, ', name, '!');",
      use_case: "Every React component uses JSX. It makes templates readable — you can see the component structure at a glance instead of nested createElement() calls.",
      follow_up: "What are JSX expressions? What can and cannot go inside {}?"
    },
    {
      question: "What is the difference between a component and an element in React?",
      answer: "A component is a function (or class) — a blueprint or factory. An element is what a component returns — a plain JavaScript object describing what to render. When you write <Button />, React calls the Button function, which returns an element (a description). React then renders that element to the DOM.",
      example: "// Component — a function that RETURNS an element\nfunction Button({ label }) {\n  return <button>{label}</button>; // returns an ELEMENT\n}\n\n// Element — plain object\nconst element = <button>Click me</button>;\n// Same as: { type: 'button', props: { children: 'Click me' } }",
      use_case: "Understanding this helps debug: you pass components as props (lazy loading, HOCs), and you render elements. React DevTools shows the component tree.",
      follow_up: "What is the difference between controlled and uncontrolled components?"
    },
    {
      question: "What are props in React?",
      answer: "Props (properties) are how you pass data from a parent component to a child component. They are like function arguments. Props are READ-ONLY — the child must never modify them. If a child needs to change a value, it calls a callback function passed as a prop.",
      example: "// Parent passes props\n<UserCard name=\"Alice\" age={25} onDelete={handleDelete} />\n\n// Child receives and uses props\nfunction UserCard({ name, age, onDelete }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n      <button onClick={onDelete}>Delete</button>\n    </div>\n  );\n}",
      use_case: "A product listing page passes each product's data (name, price, image) as props to a ProductCard component — same component, different data.",
      follow_up: "What is prop drilling and why is it a problem? How do you solve it?"
    },
    {
      question: "What is state in React and how is it different from props?",
      answer: "State is data managed INSIDE a component that can change over time. When state changes, React re-renders the component. Props come from outside (parent) and are read-only. State is internal and mutable via setState/useState. Think of props as arguments passed in, state as local variables that change.",
      example: "function Counter() {\n  const [count, setCount] = useState(0); // state — internal, mutable\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\n// Props — external, read-only\n<Counter initialValue={10} /> // passed in, not changed by Counter",
      use_case: "A search box has 'query' as state (user types and it changes). The list of products might be passed as props from a parent that fetches data.",
      follow_up: "What is 'lifting state up' and when should you do it?"
    },
    {
      question: "What is useState hook?",
      answer: "useState is a React hook that adds state to a function component. It returns an array with two items: the current value, and a setter function. Calling the setter triggers a re-render with the new value. State updates may be batched and are asynchronous — you won't see the new value immediately after calling setState.",
      example: "const [name, setName] = useState(''); // initial value = ''\nconst [items, setItems] = useState([]); // array state\nconst [user, setUser] = useState(null); // object state\n\n// Update\nsetName('Alice');\nsetItems(prev => [...prev, newItem]); // functional update — safe!",
      use_case: "Toggle, form inputs, counters, modal open/close state, loading indicators — any UI that changes over time.",
      follow_up: "Why should you use the functional update form useState(prev => newValue) instead of useState(value + 1)?"
    },
    {
      question: "What is the useEffect hook?",
      answer: "useEffect lets you run code after a component renders — for side effects like API calls, timers, event listeners, or DOM manipulation. It runs after every render by default. The dependency array controls when it re-runs: [] = only on mount, [value] = when value changes. Return a cleanup function to run before the next effect or on unmount.",
      example: "useEffect(() => {\n  // Runs after render\n  document.title = `Count: ${count}`;\n}, [count]); // only re-run when count changes\n\nuseEffect(() => {\n  const timer = setInterval(() => setCount(c => c + 1), 1000);\n  return () => clearInterval(timer); // cleanup — runs on unmount\n}, []); // only on mount",
      use_case: "Fetch user data when a profile page loads. Subscribe to a WebSocket on component mount and unsubscribe on unmount.",
      follow_up: "What happens if you forget the cleanup function in a useEffect that subscribes to an event?"
    },
    {
      question: "What is a controlled component in React?",
      answer: "A controlled component is a form element where React controls the value via state. Every keystroke calls onChange which updates state, which updates the input value. This gives you complete control: you can validate on every keystroke, format input, or prevent certain characters.",
      example: "// Controlled — React controls the value\nfunction Form() {\n  const [email, setEmail] = useState('');\n  return (\n    <input\n      value={email}  // React controls this\n      onChange={e => setEmail(e.target.value)}\n    />\n  );\n}\n\n// Uncontrolled — DOM controls the value\nconst inputRef = useRef();\n<input ref={inputRef} /> // read value with inputRef.current.value",
      use_case: "Login forms use controlled inputs so you can validate format in real time and enable/disable the submit button based on validity.",
      follow_up: "When would you choose uncontrolled over controlled components?"
    },
    {
      question: "What is the key prop in React and why is it important?",
      answer: "The key prop helps React identify which items in a list changed, were added, or removed. Without keys, React has to compare list items by position — causing bugs (wrong items updating). Keys must be stable (same item always gets same key), unique among siblings, and ideally from your data (id), not array index.",
      example: "// WRONG — using index as key\n{items.map((item, index) => <li key={index}>{item}</li>)}\n// If you delete item at index 0, all keys shift — React gets confused!\n\n// CORRECT — use stable unique id from data\n{items.map(item => <li key={item.id}>{item.name}</li>)}",
      use_case: "A task list where users can delete and reorder items. Without proper keys, React may update the wrong item's checkbox state.",
      follow_up: "Why can using array index as a key cause bugs with forms? Walk through the bug."
    },
    {
      question: "What is conditional rendering in React?",
      answer: "Conditional rendering shows different UI based on conditions. Common patterns: ternary operator (condition ? A : B), logical AND (condition && <Component />), or early return. Avoid complex nested ternaries — extract to a variable or function for readability.",
      example: "// Ternary\n{isLoggedIn ? <Dashboard /> : <Login />}\n\n// Short-circuit — renders nothing if false\n{isLoading && <Spinner />}\n\n// Early return pattern\nif (error) return <ErrorPage message={error} />;\nif (isLoading) return <Spinner />;\nreturn <DataDisplay data={data} />;",
      use_case: "Show a 'Login' button if not authenticated, 'Profile' button if authenticated. Show a loading spinner while data is fetching.",
      follow_up: "What is the gotcha with {0 && <Component />}? Why does it render '0'?"
    },
    {
      question: "What are React fragments and why use them?",
      answer: "React components must return a single root element. Fragments (<> </> or <React.Fragment>) let you return multiple elements without adding an extra DOM node (like a wrapping div). This avoids unnecessary DOM nodes that break CSS (like flexbox/grid layouts needing direct children).",
      example: "// Without fragment — adds extra div that breaks table layout!\nreturn <div><td>Name</td><td>Age</td></div>;\n\n// With fragment — no extra DOM node\nreturn (\n  <>\n    <td>Name</td>\n    <td>Age</td>\n  </>\n);\n\n// Named fragment — when you need a key prop on each fragment\n{items.map(item => <React.Fragment key={item.id}><dt>{item.term}</dt><dd>{item.def}</dd></React.Fragment>)}",
      use_case: "Table row components must return <td> elements directly inside <tr>. An extra wrapping <div> would break the HTML table structure.",
      follow_up: "When do you need React.Fragment instead of the shorthand <>? (Answer: when you need a key prop)"
    },
    {
      question: "What is the difference between functional components and class components?",
      answer: "Class components use ES6 classes, have lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount), and use this.state. Functional components are plain functions, use hooks (useState, useEffect) which replaced lifecycle methods, and are simpler and shorter. React team recommends functional components for all new code.",
      example: "// Class component\nclass Timer extends React.Component {\n  state = { count: 0 };\n  componentDidMount() { this.timer = setInterval(() => this.setState(s => ({ count: s.count + 1 })), 1000); }\n  componentWillUnmount() { clearInterval(this.timer); }\n  render() { return <p>{this.state.count}</p>; }\n}\n\n// Functional equivalent — simpler!\nfunction Timer() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const t = setInterval(() => setCount(c => c + 1), 1000);\n    return () => clearInterval(t);\n  }, []);\n  return <p>{count}</p>;\n}",
      use_case: "Maintaining legacy codebases often requires understanding class components. All new React development uses functional components + hooks.",
      follow_up: "What class component lifecycle methods map to which useEffect patterns?"
    },
    {
      question: "What is prop drilling and how do you solve it?",
      answer: "Prop drilling is passing props through multiple component layers just to reach a deeply nested component that needs the data. The intermediate components don't use the props — they just pass them down. Solutions: React Context API (built-in), Zustand, Redux (external state management).",
      example: "// PROBLEM: drilling theme through 4 levels\nApp → Layout → Sidebar → MenuItem → Icon (needs theme)\n// Layout, Sidebar, MenuItem all receive theme prop they don't use!\n\n// SOLUTION: Context\nconst ThemeContext = createContext('light');\n// App wraps with ThemeContext.Provider value='dark'\n// Icon directly calls useContext(ThemeContext) — no drilling",
      use_case: "Authentication state (current user) needs to be accessible everywhere — header, sidebar, profile, settings. Context avoids passing user prop through every component.",
      follow_up: "When should you NOT use Context? What are its performance implications?"
    },
    {
      question: "What is the React Context API?",
      answer: "Context provides a way to share values (state, functions, themes) between components without prop drilling. You create a context, wrap components in a Provider with a value, and any component in the tree can access that value via useContext hook.",
      example: "const AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\n// Any component, any depth:\nfunction Navbar() {\n  const { user } = useContext(AuthContext);\n  return <p>Hello, {user?.name}</p>;\n}",
      use_case: "Theme (dark/light), language (i18n), authenticated user, shopping cart — any global state used across many components.",
      follow_up: "What is the performance issue with Context? How do you optimise it with memoisation?"
    },
    {
      question: "What is the useRef hook?",
      answer: "useRef returns a mutable object { current: value } that persists across renders without causing re-renders. Two main uses: 1. Accessing DOM elements directly (focusing an input, measuring size). 2. Storing mutable values that should not trigger re-renders (timer IDs, previous values, flags).",
      example: "// Use 1: DOM access\nfunction FocusInput() {\n  const inputRef = useRef(null);\n  useEffect(() => inputRef.current.focus(), []);\n  return <input ref={inputRef} />;\n}\n\n// Use 2: Store timer ID without triggering re-render\nfunction Timer() {\n  const timerRef = useRef(null);\n  const start = () => { timerRef.current = setInterval(tick, 1000); };\n  const stop = () => clearInterval(timerRef.current);\n}",
      use_case: "Auto-focus a login input on mount. Store the previous value of a prop for comparison. Integrate with third-party DOM libraries (chart.js, D3).",
      follow_up: "What is the difference between useRef and a regular variable declared outside the component?"
    },
    {
      question: "What is event handling in React?",
      answer: "React uses synthetic events — wrapper objects around native browser events that normalise cross-browser differences. Event names are camelCase (onClick, onChange, onSubmit). React uses event delegation — one listener at the root handles all events. You pass event handlers as functions, not strings.",
      example: "// HTML: onclick=\"handleClick()\"  ← string\n// React: onClick={handleClick}     ← function reference\n\nfunction Form() {\n  const handleSubmit = (e) => {\n    e.preventDefault(); // prevent page reload\n    console.log('submitted');\n  };\n  return <form onSubmit={handleSubmit}>...</form>;\n}",
      use_case: "Form submissions, button clicks, keyboard shortcuts, drag events — all use React's synthetic event system.",
      follow_up: "What is event pooling in React 16 and before? Why was it removed in React 17?"
    },
    {
      question: "What is a pure component in React?",
      answer: "A pure component only re-renders if its props or state actually change (shallow comparison). For class components, React.PureComponent does this automatically. For function components, React.memo() provides the same optimization. Regular components re-render any time their parent re-renders, even if props didn't change.",
      example: "// Class\nclass Item extends React.PureComponent { render() { ... } }\n\n// Function — React.memo does shallow props comparison\nconst Item = React.memo(function Item({ name, price }) {\n  console.log('Item rendered');\n  return <div>{name}: {price}</div>;\n});\n\n// Item won't re-render if parent re-renders but name & price didn't change",
      use_case: "A list of 500 product cards. Without React.memo, every parent state change (like a search input) re-renders all 500 cards. With memo, only changed cards re-render.",
      follow_up: "When does React.memo NOT help? What is referential equality and why does it matter?"
    },
    {
      question: "How do you render a list in React?",
      answer: "Use Array.map() to transform a data array into an array of JSX elements. Each element needs a unique, stable key prop. Handle empty lists gracefully. For large lists (thousands of items), consider virtualisation (react-window, react-virtual) to only render visible items.",
      example: "function ProductList({ products }) {\n  if (products.length === 0) return <p>No products found</p>;\n  \n  return (\n    <ul>\n      {products.map(product => (\n        <li key={product.id}>\n          <ProductCard product={product} />\n        </li>\n      ))}\n    </ul>\n  );\n}",
      use_case: "News feed, product catalogue, user list, search results — rendering collections of data is one of React's most common tasks.",
      follow_up: "What is list virtualisation and when would you implement it?"
    },
    {
      question: "What is the difference between React.createElement and JSX?",
      answer: "JSX is syntactic sugar — it compiles to React.createElement() calls. React.createElement(type, props, ...children) creates a React element object. Knowing this helps understand why React 17+ doesn't need 'import React from react' — the new JSX transform imports createElement automatically.",
      example: "// JSX\nconst el = <button className=\"btn\" onClick={fn}>Click</button>;\n\n// Compiled to:\nconst el = React.createElement(\n  'button',\n  { className: 'btn', onClick: fn },\n  'Click'\n);",
      use_case: "Understanding compilation helps debug transpiler errors and understand why certain JSX patterns work the way they do.",
      follow_up: "What changed in React 17's new JSX transform and why?"
    },
    {
      question: "What are React hooks rules?",
      answer: "Two rules: 1. Only call hooks at the TOP LEVEL — never inside conditionals, loops, or nested functions. React relies on call order to associate hook state with the right hook. 2. Only call hooks from React functions — function components or custom hooks. Not from regular JavaScript functions or classes.",
      example: "// WRONG — hook inside condition\nif (isLoggedIn) {\n  const [data, setData] = useState(null); // BREAKS rules!\n}\n\n// CORRECT — always at top level\nconst [data, setData] = useState(null);\nconst [error, setError] = useState(null);\n// Then use conditionally:\nif (isLoggedIn) { /* use data */ }",
      use_case: "The ESLint plugin 'eslint-plugin-react-hooks' enforces these rules automatically in all React projects.",
      follow_up: "Why does React require hooks to be called in the same order every render? What data structure does React use internally?"
    }
  ],

  intermediate: [
    {
      question: "Explain the React rendering lifecycle in detail.",
      answer: "When state/props change: 1. Render phase — React calls your component function, builds new virtual DOM, diffs with old (pure, no side effects). 2. Commit phase — React applies DOM changes, runs layout effects (useLayoutEffect), then runs passive effects (useEffect). React 18 adds concurrent features: rendering can be interrupted and restarted.",
      example: "// Order of execution:\n// 1. Component function runs (render)\n// 2. DOM mutations applied\n// 3. useLayoutEffect fires (sync, before paint)\n// 4. Browser paints\n// 5. useEffect fires (async, after paint)\n\nuseLayoutEffect(() => {\n  // Measure DOM — runs before browser paint\n  const rect = ref.current.getBoundingClientRect();\n}, []);\n\nuseEffect(() => {\n  // Side effects — runs after paint\n  fetchData();\n}, []);",
      use_case: "useLayoutEffect is used for animations and measurements that must happen before the browser paints (avoids flicker). useEffect for everything else.",
      follow_up: "What is the difference between useLayoutEffect and useEffect? When must you use useLayoutEffect?"
    },
    {
      question: "What is useMemo and when should you use it?",
      answer: "useMemo memoises a computed value — the function only re-runs when its dependencies change. Use it when: the computation is expensive (sorting/filtering large arrays, complex math), and the component re-renders frequently with the same inputs. Do NOT use it for everything — it adds overhead. Profile first, optimise second.",
      example: "// EXPENSIVE: filtering 10,000 products\nconst filteredProducts = useMemo(\n  () => products.filter(p => p.category === selectedCategory && p.price < maxPrice),\n  [products, selectedCategory, maxPrice] // only re-filter when these change\n);\n\n// NO BENEFIT: simple operations\nconst doubled = useMemo(() => count * 2, [count]); // unnecessary — just do count * 2",
      use_case: "A data table with 5,000 rows that can be filtered and sorted. Without useMemo, every keystroke in the search box triggers a full filter+sort on 5,000 items.",
      follow_up: "useMemo vs useCallback — when do you use each? What are they actually caching?"
    },
    {
      question: "What is useCallback and how does it work?",
      answer: "useCallback memoises a function reference — returns the same function object across renders if dependencies haven't changed. Without it, a new function is created every render — this breaks React.memo on child components that receive the function as a prop (new reference = new prop = re-render even if logic is same).",
      example: "// Without useCallback — new function every render, memo breaks\nconst handleDelete = (id) => deleteItem(id); // new ref each render\n<MemoizedItem onDelete={handleDelete} /> // always re-renders!\n\n// With useCallback — stable reference\nconst handleDelete = useCallback(\n  (id) => deleteItem(id),\n  [deleteItem] // only recreate if deleteItem changes\n);\n<MemoizedItem onDelete={handleDelete} /> // only re-renders if handleDelete changes",
      use_case: "A list of 100 memoised rows. The parent has an unrelated state change (like a loading indicator). Without useCallback, all 100 rows re-render. With it, they don't.",
      follow_up: "If you overuse useCallback and useMemo everywhere, what is the cost? Why is premature optimisation harmful?"
    },
    {
      question: "What is React.lazy and Suspense for code splitting?",
      answer: "React.lazy lets you dynamically import a component — its JS bundle loads only when the component is first rendered. Suspense displays a fallback (loading UI) while the lazy component's bundle is loading. This reduces initial bundle size by splitting code into chunks loaded on demand.",
      example: "// Without lazy: AdminPanel JS is in the main bundle (everyone downloads it)\nimport AdminPanel from './AdminPanel';\n\n// With lazy: AdminPanel loads only when needed\nconst AdminPanel = React.lazy(() => import('./AdminPanel'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      {isAdmin && <AdminPanel />}\n    </Suspense>\n  );\n}",
      use_case: "A dashboard app: the chart library (500KB) loads only when the Charts tab is clicked. Initial load is much faster for users who never open Charts.",
      follow_up: "How does React.lazy interact with routing? What is route-level code splitting?"
    },
    {
      question: "What is the useReducer hook and when should you use it over useState?",
      answer: "useReducer manages complex state with a reducer function (state, action) => newState. Choose useReducer over useState when: state has multiple sub-fields that change together, next state depends on previous state in complex ways, or you have many related state transitions (like a form with validation). It centralises state logic in one function.",
      example: "const initialState = { count: 0, step: 1, history: [] };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { ...state, count: state.count + state.step, history: [...state.history, state.count] };\n    case 'setStep': return { ...state, step: action.payload };\n    case 'reset': return initialState;\n    default: throw new Error('Unknown action');\n  }\n}\n\nconst [state, dispatch] = useReducer(reducer, initialState);\ndispatch({ type: 'increment' });",
      use_case: "Shopping cart (add, remove, update qty, apply coupon — many operations on one state object). Multi-step form with validation at each step.",
      follow_up: "What is the Redux pattern and how does useReducer + Context replicate it without external dependencies?"
    },
    {
      question: "What are custom hooks and how do you write one?",
      answer: "A custom hook is a function whose name starts with 'use' that calls other hooks. It extracts reusable stateful logic from components. When multiple components share the same pattern (fetch data, subscribe to events, form handling), extract it into a custom hook. Each component using the hook gets its own isolated state.",
      example: "// Custom hook: useLocalStorage\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n  \n  const setStoredValue = (newValue: T) => {\n    setValue(newValue);\n    localStorage.setItem(key, JSON.stringify(newValue));\n  };\n  \n  return [value, setStoredValue] as const;\n}\n\n// Usage in any component\nconst [theme, setTheme] = useLocalStorage('theme', 'light');",
      use_case: "useFetch(url), useDebounce(value, delay), useWindowSize(), useIntersectionObserver() — logic used in many places becomes one reusable hook.",
      follow_up: "Does each component using the same custom hook share state? (No — each gets its own isolated copy. Unless you combine with Context.)"
    },
    {
      question: "How does React's reconciliation algorithm work?",
      answer: "React's reconciliation (diffing) uses two heuristics: 1. Elements of different types (div vs span) produce completely different trees — React destroys the old and builds the new. 2. Elements of the same type update props without recreating the DOM node. Lists use the key prop to identify items across renders — without keys, React relies on position comparison which causes bugs.",
      example: "// Same type: React updates className, doesn't recreate\n// Before: <div className=\"old\">\n// After:  <div className=\"new\">\n// Result: DOM node reused, only className attribute updated\n\n// Different type: full destroy/rebuild\n// Before: <Button>   // entire tree destroyed\n// After:  <a>        // entire new tree created\n\n// Keys: React matches items by key, not position\n// [A, B, C] → [B, A, C] with keys: only positions updated, no remounts",
      use_case: "Understanding reconciliation helps debug subtle bugs where component state is unexpectedly preserved or reset when switching between views.",
      follow_up: "What is component 'unmounting'? What happens to state when a component unmounts and remounts?"
    },
    {
      question: "What is state batching in React?",
      answer: "Batching groups multiple setState calls into a single re-render for performance. In React 18, batching is automatic for all updates (event handlers, async code, setTimeout). In React 17, batching only happened in React event handlers — setState in setTimeout triggered separate re-renders.",
      example: "// React 18 — both updates batched into ONE re-render\nsetTimeout(() => {\n  setCount(c => c + 1); // ─┐ batched together\n  setFlag(true);         // ─┘ one re-render\n}, 1000);\n\n// Force NO batching (rare)\nimport { flushSync } from 'react-dom';\nflushSync(() => setCount(c => c + 1)); // immediate re-render\nflushSync(() => setFlag(true));         // second re-render",
      use_case: "A form submission handler that updates loading, error, and data state — all three changes batch into one re-render, preventing flickering.",
      follow_up: "What is flushSync() and when would you need it? What are the risks of using it?"
    },
    {
      question: "What is the Context performance problem and how do you fix it?",
      answer: "Every component consuming a Context re-renders when the Context value changes — even if the component only uses part of the value. If a Context holds a large object (user, cart, theme), one field change causes all consumers to re-render. Fixes: split contexts, memoize the context value with useMemo, or use specialized state management libraries.",
      example: "// PROBLEM: one context, everything re-renders\nconst AppContext = createContext({ user, cart, theme, notifications });\n// Updating cart re-renders all theme and notification consumers!\n\n// SOLUTION: split contexts\nconst UserContext = createContext(null);\nconst CartContext = createContext(null);\nconst ThemeContext = createContext('light');\n// Now cart changes only re-render cart consumers",
      use_case: "A global store with auth user, cart, and UI settings — splitting them prevents cart updates from flashing the header/footer.",
      follow_up: "How does Zustand solve the Context performance problem differently?"
    },
    {
      question: "What is React Server Components (RSC)?",
      answer: "React Server Components run on the server — they can fetch data directly (no useEffect/fetch), access databases/filesystem, and send only HTML to the client. They have zero client-side JavaScript. This reduces bundle size. They cannot use state, effects, or browser APIs. RSC is Next.js 13+ app directory's default.",
      example: "// Server Component — runs on server, direct DB access\nasync function ProductPage({ id }) {\n  const product = await db.products.findById(id); // direct DB access!\n  return <div>{product.name}</div>; // sends HTML, no JS\n}\n\n// Client Component — runs in browser\n'use client';\nfunction AddToCart({ productId }) {\n  const [added, setAdded] = useState(false);\n  return <button onClick={() => setAdded(true)}>Add</button>;\n}",
      use_case: "A product page in an e-commerce app. Static sections (title, description, images) are Server Components. Interactive parts (add to cart, quantity selector) are Client Components.",
      follow_up: "What is the difference between SSR (Server-Side Rendering) and React Server Components? They solve different problems."
    },
    {
      question: "How does data fetching work in React? Compare approaches.",
      answer: "Approaches in order of recommendation: 1. React Query/SWR: best-in-class — handles caching, background refresh, deduplication, pagination. 2. useEffect + fetch: manual, verbose, needs careful cleanup. 3. Framework solution (Next.js data fetching, Remix loaders). 4. React Server Components (server-only). Avoid: fetching in useEffect without cleanup, fetching in parent then drilling data down.",
      example: "// React Query — recommended\nconst { data, isLoading, error } = useQuery({\n  queryKey: ['user', userId],\n  queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),\n  staleTime: 5 * 60 * 1000, // 5 minutes\n});\n\n// useEffect — manual, more boilerplate\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch('/api/data', { signal: controller.signal })\n    .then(r => r.json()).then(setData).finally(() => setLoading(false));\n  return () => controller.abort();\n}, []);",
      use_case: "Product listings, user profiles, dashboards — any component that needs server data.",
      follow_up: "What is stale-while-revalidate caching strategy? How does React Query implement it?"
    },
    {
      question: "What is error boundary in React?",
      answer: "An Error Boundary is a class component that catches JavaScript errors in its child component tree during rendering, prevents the whole app from crashing, and shows a fallback UI. Only class components can be error boundaries (hooks don't have an equivalent, though react-error-boundary library provides a hook-friendly wrapper). They do NOT catch: async errors, event handler errors, SSR errors.",
      example: "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  \n  componentDidCatch(error, info) {\n    logErrorToSentry(error, info); // log to monitoring\n  }\n  \n  render() {\n    if (this.state.hasError) return <ErrorFallback />;\n    return this.props.children;\n  }\n}\n\n<ErrorBoundary>\n  <WidgetThatMightCrash />\n</ErrorBoundary>",
      use_case: "Wrap each major section of a dashboard in its own Error Boundary — if the Charts widget crashes, the rest of the dashboard still works.",
      follow_up: "Why can't you use try/catch to catch rendering errors in React? What errors do Error Boundaries NOT catch?"
    },
    {
      question: "What is the difference between React.memo, useMemo, and useCallback?",
      answer: "React.memo: memoises a COMPONENT — skips re-rendering if props didn't change (shallow comparison). useMemo: memoises a COMPUTED VALUE — result of a function call, recomputes only when deps change. useCallback: memoises a FUNCTION REFERENCE — same function object across renders, recomputed only when deps change. All are optimisations — profile before adding.",
      example: "// React.memo — component level\nconst Row = React.memo(({ data }) => <tr>...</tr>);\n\n// useMemo — expensive value\nconst sortedList = useMemo(() => [...list].sort(compareFn), [list]);\n\n// useCallback — stable function for memoised child\nconst handleClick = useCallback((id) => onDelete(id), [onDelete]);\n<Row data={item} onDelete={handleClick} />  // doesn't re-render because handleClick is stable",
      use_case: "Large data table: useMemo for sorting/filtering data, React.memo on rows, useCallback on event handlers passed to rows.",
      follow_up: "In what scenario do you need all three together? Build a concrete example."
    },
    {
      question: "How do you implement a global state with Zustand?",
      answer: "Zustand is a minimal state management library. You create a store with create() defining state and actions together. No Provider needed. Components subscribe to specific slices — only re-render when their slice changes. Zustand supports middleware (persist for localStorage, devtools for Redux DevTools).",
      example: "import { create } from 'zustand';\nimport { persist } from 'zustand/middleware';\n\nconst useCartStore = create(persist(\n  (set, get) => ({\n    items: [],\n    addItem: (item) => set(s => ({ items: [...s.items, item] })),\n    removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),\n    total: () => get().items.reduce((sum, i) => sum + i.price, 0),\n  }),\n  { name: 'cart' } // persists to localStorage\n));\n\n// Component — subscribes to only what it needs\nconst count = useCartStore(state => state.items.length); // only re-renders when length changes",
      use_case: "Shopping cart state shared between header (item count), cart page (full details), and checkout page (total).",
      follow_up: "Compare Zustand vs Redux Toolkit vs Context API — what are the trade-offs for each?"
    },
    {
      question: "What is concurrent rendering in React 18?",
      answer: "Concurrent rendering lets React work on multiple tasks simultaneously and interrupt low-priority renders to handle urgent updates. Key APIs: startTransition() marks an update as non-urgent (search results) so React can interrupt it if something urgent happens (typing). useTransition() and useDeferredValue() are hooks for this. This prevents UI from feeling frozen during expensive renders.",
      example: "import { useTransition, useDeferredValue } from 'react';\n\n// useTransition\nconst [isPending, startTransition] = useTransition();\nconst handleSearch = (val) => {\n  setInputValue(val); // urgent — updates input immediately\n  startTransition(() => {\n    setSearchQuery(val); // non-urgent — can be interrupted\n  });\n};\n\n// useDeferredValue\nconst deferredQuery = useDeferredValue(query);\n// deferredQuery lags behind query — expensive list renders with old value while user types",
      use_case: "A search box that filters 10,000 items. With startTransition, the input stays responsive while the list updates asynchronously.",
      follow_up: "What is tearing in concurrent rendering? How does React prevent it with useSyncExternalStore?"
    }
  ],

  advanced: [
    {
      question: "How would you architect a large-scale React application?",
      answer: "Key decisions: Feature-based folder structure (not type-based). Shared component library for UI primitives. State layers: server state (React Query/SWR), client state (Zustand/Jotai), URL state (router params), form state (React Hook Form). Code splitting at route level. Monorepo with Turborepo for micro-frontends or shared packages. Strong TypeScript types as the contract between layers.",
      example: "src/\n├── features/          # Feature-based, not type-based\n│   ├── auth/\n│   │   ├── components/\n│   │   ├── hooks/\n│   │   ├── api.ts\n│   │   └── store.ts\n│   └── products/\n├── components/ui/     # Shared design system\n├── hooks/             # Shared hooks\n├── lib/               # API clients, utils\n└── app/               # Routes",
      use_case: "A team of 20 engineers building a complex SaaS platform. Feature-based structure means engineers own vertical slices (auth, billing, dashboard) without stepping on each other.",
      follow_up: "What are micro-frontends? When would you use a monorepo with module federation?"
    },
    {
      question: "Explain React Fiber architecture.",
      answer: "React Fiber is the reconciliation engine rewrite (React 16+). Key concepts: Fiber nodes (linked list, not tree) represent components. Each fiber has a type, stateNode, child, sibling, return (parent). Work is split into units that can be paused. Two phases: render phase (interruptible — creates work-in-progress fiber tree) and commit phase (synchronous, cannot be interrupted — applies DOM changes).",
      example: "// Fiber enables:\n// 1. Time slicing — break work into small chunks, yield to browser\n// 2. Priority scheduling — urgent (user input) interrupts low-priority (data update)\n// 3. Reuse work — partially computed trees can be reused\n// 4. Error boundaries — commit phase errors are caught per fiber boundary\n\n// Simplified fiber structure:\n// { type: 'div', stateNode: DOMNode, child: fiber, sibling: fiber, return: fiberParent, effectTag: 'UPDATE' }",
      use_case: "Before Fiber, a complex render could block the main thread for 500ms, freezing all user interactions. Fiber allows React to yield and keep the page responsive.",
      follow_up: "What is the scheduler in React Fiber? How does it use MessageChannel for scheduling?"
    },
    {
      question: "How do you optimise React rendering for a list of 100,000 items?",
      answer: "Virtualisation (windowing): only render the items visible in the viewport. Libraries: react-window, react-virtual, TanStack Virtual. The technique: calculate which items are visible based on scroll position, render only those N items with absolute positioning, use a spacer element for total height. Additional: useMemo for data processing, React.memo for item components, useCallback for handlers.",
      example: "import { useVirtualizer } from '@tanstack/react-virtual';\n\nfunction BigList({ items }) {\n  const parentRef = useRef(null);\n  const virtualizer = useVirtualizer({\n    count: items.length,\n    getScrollElement: () => parentRef.current,\n    estimateSize: () => 50, // estimated row height\n  });\n  \n  return (\n    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>\n      <div style={{ height: virtualizer.getTotalSize() }}>\n        {virtualizer.getVirtualItems().map(vItem => (\n          <div key={vItem.key} style={{ position: 'absolute', top: vItem.start }}>\n            <Row data={items[vItem.index]} />\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}",
      use_case: "An analytics dashboard showing 50,000 log entries. Without virtualisation: DOM has 50k nodes, scrolling freezes. With virtualisation: DOM has ~20 nodes, perfectly smooth.",
      follow_up: "What is the difference between react-window and react-virtual? What are the limitations of windowing for tables with variable row heights?"
    },
    {
      question: "What is the Stale Closure problem in React hooks?",
      answer: "A stale closure happens when a hook's callback captures an old value of state/props and doesn't update when it changes. This commonly occurs with useEffect, setInterval, and event listeners. Solutions: add the value to the dependency array, use functional updates (setState(prev => ...)), or store the value in a ref.",
      example: "// PROBLEM: stale closure with setInterval\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(count + 1); // 'count' is captured once — always 0!\n    }, 1000);\n    return () => clearInterval(id);\n  }, []); // empty deps — never re-runs, count always stale\n}\n\n// SOLUTION 1: functional update\nsetCount(prev => prev + 1); // no closure problem — uses latest value\n\n// SOLUTION 2: useRef\nconst countRef = useRef(count);\nuseEffect(() => { countRef.current = count; }, [count]);\n// Use countRef.current inside the interval",
      use_case: "Real-time games, stock tickers, live sports scores — any interval-based UI is vulnerable to stale closures.",
      follow_up: "How do you write an ESLint rule to detect all stale closures? What does eslint-plugin-react-hooks's exhaustive-deps rule catch?"
    },
    {
      question: "How does React's Suspense work for data fetching?",
      answer: "Suspense for data fetching works through a 'throw a Promise' protocol. When a component needs data that isn't ready, it throws a Promise. React's Suspense boundary catches it, shows the fallback, and when the Promise resolves, retries rendering the component. Libraries like React Query, Relay, and Next.js implement this protocol. The component code looks synchronous even though it's async.",
      example: "// React Query with Suspense\nfunction ProductDetail({ id }) {\n  // This 'suspends' if data isn't ready — throws a Promise internally\n  const { data } = useSuspenseQuery({ queryKey: ['product', id], queryFn: fetchProduct });\n  return <h1>{data.name}</h1>; // always has data here\n}\n\n// In parent:\n<Suspense fallback={<ProductSkeleton />}>\n  <ProductDetail id={123} />\n</Suspense>\n// No loading/error checks needed inside ProductDetail!",
      use_case: "Streaming server-rendering with Suspense in Next.js: critical content renders first, sections with slower data queries stream in progressively.",
      follow_up: "What is the difference between Suspense for lazy loading and Suspense for data fetching? What is React's 'render as you fetch' pattern?"
    },
    {
      question: "How do you implement code splitting beyond route-level?",
      answer: "Beyond routes: component-level splitting (heavy chart libraries, rich text editors), feature-level splitting (admin features for non-admin users), interaction-based splitting (load chart library only when Chart tab is clicked), and prefetching (preload on hover before click). Use dynamic import() with React.lazy, or loadable-components for SSR support.",
      example: "// Load heavy library only on interaction\nconst loadChartModule = () => import('./ChartModule');\nconst Chart = React.lazy(loadChartModule);\n\n// Prefetch on hover\nfunction ChartButton() {\n  return (\n    <button\n      onMouseEnter={() => loadChartModule()} // prefetch on hover\n      onClick={() => setShowChart(true)}\n    >\n      Show Chart\n    </button>\n  );\n}\n\n// loadable-components for SSR + code splitting\nimport loadable from '@loadable/component';\nconst HeavyEditor = loadable(() => import('./RichTextEditor'), {\n  fallback: <div>Loading editor...</div>,\n});",
      use_case: "A markdown editor with a 500KB editor library. Load it only when the user clicks 'Edit'. Prefetch it when they hover 'Edit' so it's ready when they click.",
      follow_up: "How does the webpack magic comment /* webpackPrefetch: true */ work? How does it differ from /* webpackPreload: true */?"
    },
    {
      question: "Implement a custom React hook that manages WebSocket connections.",
      answer: "A WebSocket hook must handle connection lifecycle (open, close, reconnect), message handling, and cleanup. Key challenges: prevent reconnection on component re-render, clean up on unmount, handle connection drops with exponential backoff retry.",
      example: "function useWebSocket(url: string) {\n  const [messages, setMessages] = useState<string[]>([]);\n  const [status, setStatus] = useState<'connecting'|'open'|'closed'>('connecting');\n  const wsRef = useRef<WebSocket | null>(null);\n\n  useEffect(() => {\n    const ws = new WebSocket(url);\n    wsRef.current = ws;\n    ws.onopen = () => setStatus('open');\n    ws.onclose = () => setStatus('closed');\n    ws.onmessage = (e) => setMessages(prev => [...prev, e.data]);\n    return () => ws.close(); // cleanup on unmount\n  }, [url]);\n\n  const send = useCallback((msg: string) => {\n    if (wsRef.current?.readyState === WebSocket.OPEN) {\n      wsRef.current.send(msg);\n    }\n  }, []);\n\n  return { messages, status, send };\n}",
      use_case: "Real-time chat, live sports scores, collaborative document editing, stock price tickers.",
      follow_up: "How would you add exponential backoff reconnection logic to this hook?"
    }
  ]
};
