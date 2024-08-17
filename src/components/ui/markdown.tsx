import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownProps = {
  value?: string;
};

const Markdown = ({ value }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="flex min-h-[80px] w-full whitespace-pre-wrap rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm [overflow-wrap:anywhere]">
            {children}
          </p>
        ),
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              customStyle={{
                margin: 0,
                padding: '0.5rem 0.75rem',
                border: '1px solid hsl(var(--input))',
                borderRadius: 'calc(var(--radius) - 2px)',
                minHeight: 80,
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
              }}
            >
              {children ? String(children).replace(/\n$/, '') : ''}
            </SyntaxHighlighter>
          ) : (
            <code
              className="flex min-h-[80px] w-full rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  );
};

export { Markdown };
