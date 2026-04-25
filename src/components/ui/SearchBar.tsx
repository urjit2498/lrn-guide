import { useAppStore } from '@/store/appStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.65 10.65z" />
      </svg>
      <input
        type="search"
        placeholder="Search topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:border-brand-400 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all"
      />
    </div>
  );
}
