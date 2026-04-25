import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage as ChatMsg } from '@/types';
import { clsx } from 'clsx';

interface ChatMessageProps {
  message: ChatMsg;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        'flex items-start gap-2 animate-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-sm flex-shrink-0">
          🤖
        </div>
      )}

      {/* Bubble */}
      <div
        className={clsx(
          'text-sm leading-relaxed max-w-[85%]',
          isUser ? 'chat-user' : 'chat-assistant prose-code'
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) =>
                inline ? (
                  <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto my-2">
                    <code className="font-mono" {...props}>{children}</code>
                  </pre>
                ),
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
              li: ({ children }) => <li className="text-sm">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
