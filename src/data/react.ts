import { Topic } from '@/types';

export const reactTopic: Topic = {
  id: 'react',
  name: 'React',
  icon: '⚛️',
  color: 'bg-cyan-100 dark:bg-cyan-900/30',
  textColor: 'text-cyan-700 dark:text-cyan-300',
  borderColor: 'border-cyan-300 dark:border-cyan-700',
  description: 'React is a JavaScript library for building fast, interactive user interfaces using components.',
  levels: [
    {
      level: 'beginner',
      intro: 'Understand what React is, why it exists, and how to build your first components.',
      sections: [
        {
          title: 'What is React and Why Use It?',
          explanation:
            'React is a JavaScript library made by Meta (Facebook). Instead of directly manipulating the HTML page (which is slow), React keeps a "virtual" copy of the page in memory. When data changes, React figures out the minimum DOM updates needed — making UIs fast.',
          realWorldExample:
            'Facebook, Instagram, WhatsApp Web, Airbnb, Netflix — all use React. The "Like" button that updates instantly without a page reload is React in action.',
          practicalUseCase:
            'Create a simple counter button. Click it and the number goes up — no page reload.',
          codeExample: `import { useState } from 'react';

export function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
          exercise:
            'Build a traffic light component with three buttons (red, yellow, green) that change the displayed colour.',
        },
        {
          title: 'Components & Props',
          explanation:
            'A component is like a custom HTML element you build yourself. Props are like HTML attributes — they pass data into a component from the outside. Components should be pure: same props → same output.',
          realWorldExample:
            'A product card on Amazon is a component. The same Card component is reused for every product — only the props (title, price, image) differ.',
          practicalUseCase:
            'Build a ProfileCard component that accepts name, role, and avatar props and renders a card UI.',
          codeExample: `// Define the component
interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
}

export function ProfileCard({ name, role, avatarUrl }: ProfileCardProps) {
  return (
    <div className="card">
      <img src={avatarUrl} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// Use the component
function App() {
  return (
    <ProfileCard
      name="Alice Smith"
      role="Senior Developer"
      avatarUrl="/alice.jpg"
    />
  );
}`,
          exercise:
            'Create a ProductList that maps over an array of products and renders a ProductCard for each one.',
        },
        {
          title: 'useState — Managing Component State',
          explanation:
            'State is data that changes over time. When state changes, React re-renders the component automatically. useState is a hook that creates a piece of state inside a component.',
          realWorldExample:
            'A shopping cart icon that shows item count — when you add a product, the count state increases and the icon re-renders with the new number.',
          practicalUseCase:
            'Build a simple todo list — add items via an input, display them, and mark them as done.',
          codeExample: `import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggle = (id: number) =>
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggle(todo.id)}
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          exercise:
            'Add a delete button to each todo item and a "Clear completed" button that removes all done todos.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the Virtual DOM?',
          answer:
            'The Virtual DOM is a lightweight in-memory copy of the real DOM. When state changes, React creates a new virtual DOM, compares it with the previous one (diffing), and only updates the parts of the real DOM that actually changed. This is faster than updating the full DOM.',
        },
        {
          question: 'What is JSX?',
          answer:
            'JSX is a syntax extension that lets you write HTML-like code inside JavaScript/TypeScript. It is compiled by Babel/SWC into React.createElement() calls. JSX is not required but makes component code much more readable.',
        },
        {
          question: 'What is the difference between state and props?',
          answer:
            'Props are passed from parent to child (read-only, like function arguments). State is managed inside the component (can change, like local variables). When either changes, React re-renders the component.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Learn hooks deeply, data fetching, context, and how to structure larger apps.',
      sections: [
        {
          title: 'useEffect — Side Effects',
          explanation:
            'Side effects are anything that reaches outside the component: API calls, timers, event listeners, localStorage. useEffect lets you run code after the component renders. The dependency array controls when it runs.',
          realWorldExample:
            'When you open a GitHub profile page, the component mounts and useEffect fires an API call to fetch the user\'s repos. The page shows a spinner while loading, then displays the data.',
          practicalUseCase:
            'Fetch a list of users from JSONPlaceholder API and display them in a card grid.',
          codeExample: `import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers]   = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    // AbortController cleans up the fetch if component unmounts
    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(setUsers)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // Cleanup on unmount
  }, []); // [] = run once on mount

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name} — {u.email}</li>)}
    </ul>
  );
}`,
          exercise:
            'Add a search input that filters the user list on the client side. Then add a "Refresh" button that re-fetches the data.',
        },
        {
          title: 'Custom Hooks',
          explanation:
            'Custom hooks are functions that start with "use" and encapsulate reusable logic. Instead of repeating fetch/loading/error code in every component, you extract it into a hook like useFetch(url).',
          realWorldExample:
            'Most production apps have a useAuth() hook that returns the current user, login(), and logout() functions. Any component that needs auth just calls useAuth().',
          practicalUseCase:
            'Convert the UserList fetch logic into a reusable useFetch<T>(url) hook.',
          codeExample: `import { useState, useEffect } from 'react';

// Generic reusable fetch hook
export function useFetch<T>(url: string) {
  const [data, setData]     = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        return r.json();
      })
      .then(setData)
      .catch(err => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage — much cleaner!
function Posts() {
  const { data, loading, error } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage message={error} />;
  return <PostList posts={data!} />;
}`,
          exercise:
            'Build a useLocalStorage<T>(key, defaultValue) hook that reads/writes a value to localStorage and keeps it in sync with state.',
        },
        {
          title: 'Context API — Sharing State',
          explanation:
            'Context lets you share state across many components without passing props through every level (prop drilling). Think of it like a global store that any component can tap into.',
          realWorldExample:
            'A theme toggle (dark/light mode) uses Context. The ThemeProvider wraps the entire app and any component — no matter how deep — can call useTheme() to read or change the theme.',
          practicalUseCase:
            'Build a ThemeContext that toggles between dark and light mode across the whole app.',
          codeExample: `import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — makes usage ergonomic
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// Any component anywhere in the tree
function Navbar() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Current: {theme}</button>;
}`,
          exercise:
            'Build a CartContext that stores cart items and exposes addItem, removeItem, and clearCart functions.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the dependency array in useEffect?',
          answer:
            '[] means run only once on mount. [value] means re-run whenever "value" changes. No array means run after every render. The cleanup function returned from useEffect runs before the next effect and on unmount.',
        },
        {
          question: 'What is prop drilling and how do you avoid it?',
          answer:
            'Prop drilling is passing props through multiple component levels just to get data to a deeply nested component. Solutions: Context API (built-in), Zustand, or Redux for global state.',
        },
        {
          question: 'What is the difference between useMemo and useCallback?',
          answer:
            'useMemo memoizes a computed value — it recomputes only when dependencies change. useCallback memoizes a function reference — useful when passing callbacks to child components to prevent unnecessary re-renders.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Performance patterns, testing, state management with Zustand, and production best practices.',
      sections: [
        {
          title: 'Performance Optimisation',
          explanation:
            'React re-renders a component whenever its state or props change. Sometimes this causes unnecessary renders of child components. React.memo, useMemo, and useCallback let you skip re-renders when the data hasn\'t changed.',
          realWorldExample:
            'A data table with 1000 rows uses React.memo on the row component. Without it, typing in a search input causes all 1000 rows to re-render on every keystroke. With memo, only the rows that actually changed re-render.',
          practicalUseCase:
            'Profile a React app in DevTools, find the slowest component, and optimise it with React.memo and useCallback.',
          codeExample: `import { memo, useCallback, useMemo } from 'react';

// memo — skip re-render if props haven't changed
const ExpensiveRow = memo(function Row({ item, onDelete }) {
  console.log('Row rendered:', item.id);
  return (
    <tr>
      <td>{item.name}</td>
      <td><button onClick={() => onDelete(item.id)}>Delete</button></td>
    </tr>
  );
});

function Table({ items }) {
  const [filter, setFilter] = useState('');

  // useCallback — stable function reference across renders
  const handleDelete = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []); // no deps — never recreated

  // useMemo — only re-compute when items or filter change
  const filtered = useMemo(
    () => items.filter(i => i.name.includes(filter)),
    [items, filter]
  );

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <table>
        {filtered.map(item => (
          <ExpensiveRow key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </table>
    </>
  );
}`,
          exercise:
            'Use the React DevTools Profiler to measure render count before and after adding React.memo to a component.',
        },
        {
          title: 'Zustand — Lightweight Global State',
          explanation:
            'Zustand is a small state management library. Unlike Redux, there is no boilerplate. You define a store with state and actions, and any component subscribes to exactly the slice it needs.',
          realWorldExample:
            'This very app uses Zustand to store the selected topic, chat messages, dark mode preference, and bookmarks — all in one simple store accessible from any component.',
          practicalUseCase:
            'Build a Zustand cart store with add, remove, and clear actions. Use it in two different components.',
          codeExample: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number) => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  // persist — automatically saves to localStorage
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return { items: state.items.map(i =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            )};
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),
      removeItem: (id) =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-storage' }
  )
);

// Usage in any component — no Provider needed!
function CartIcon() {
  const count = useCartStore(state => state.items.length);
  return <span>🛒 {count}</span>;
}`,
          exercise:
            'Add an updateQty(id, qty) action to the cart store and build a quantity stepper component (+/-) for each cart item.',
        },
      ],
      interviewQA: [
        {
          question: 'When should you use useReducer instead of useState?',
          answer:
            'useReducer is better when state logic is complex (multiple sub-values that depend on each other), when the next state depends on the previous state in non-trivial ways, or when you want to colocate state transitions in one place for clarity.',
        },
        {
          question: 'How does React\'s reconciliation algorithm work?',
          answer:
            'React compares the old and new virtual DOM trees (diffing). It assumes elements of different types produce different trees (heuristic). The "key" prop helps React identify which list items changed, were added, or removed — without it, React falls back to order-based comparison which causes bugs.',
        },
        {
          question: 'What is code splitting and how do you implement it in React?',
          answer:
            'Code splitting breaks the JS bundle into smaller chunks loaded on demand. In React: use React.lazy + Suspense to lazily import components. The router-level splitting (import each page lazily) is the most impactful technique.',
        },
      ],
    },
  ],
};
