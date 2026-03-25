import ReactMarkdown from 'react-markdown';

interface MarkdownBlockProps {
    content: string;
}

export function MarkdownBlock({ content }: MarkdownBlockProps) {
    return (
        <ReactMarkdown
            components={{
                a: ({ node, ...props }) => <a {...props} className="text-blue-500 hover:text-blue-400 underline" target="_blank" rel="noopener noreferrer" />,
                p: ({ node, ...props }) => <p {...props} className="m-0 leading-relaxed" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 m-0 space-y-0" />,
                li: ({ node, ...props }) => <li {...props} className="m-0" />
            }}
        >
            {content}
        </ReactMarkdown>
    );
}