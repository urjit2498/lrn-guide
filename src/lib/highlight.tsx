/** Highlights all occurrences of `query` inside `text`. */
export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 2) return <>{text}</>;

  const q = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const idx = remaining.toLowerCase().indexOf(q);
    if (idx === -1) {
      parts.push(remaining);
      break;
    }
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(
      <mark
        key={key++}
        className="bg-yellow-200 dark:bg-yellow-800/60 text-inherit rounded-sm px-0.5"
      >
        {remaining.slice(idx, idx + query.length)}
      </mark>,
    );
    remaining = remaining.slice(idx + query.length);
  }

  return <>{parts}</>;
}

/** Generate a DOM-safe ID from a string. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}
