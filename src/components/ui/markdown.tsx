import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { cn } from '@/lib/utils';

type MarkdownProps = {
  value?: string;
  className?: string;
};

const Markdown = ({ value, className }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={cn(
        'min-h-[158px] whitespace-pre-wrap text-sm [overflow-wrap:anywhere]',
        'prose prose-sm dark:prose-invert',
        'prose-headings:m-0 prose-headings:border-l-4 prose-headings:pl-2',
        'prose-p:m-0',
        'prose-a:m-0 prose-a:text-foreground prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline',
        'prose-pre:m-0',
        'prose-ol:m-0',
        'prose-ul:m-0',
        'prose-li:m-0',
        className,
      )}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'none',
              }}
            >
              {children ? String(children).replace(/\n$/, '') : ''}
            </SyntaxHighlighter>
          ) : (
            <code {...props}>{children}</code>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  );
};

export { Markdown };
