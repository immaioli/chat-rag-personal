import ReactMarkdown from 'react-markdown'
import { markdownStyles } from '@/constants/styles'

interface MarkdownBlockProps {
    content: string
}

export function MarkdownBlock({ content }: MarkdownBlockProps) {
    // Process plain URLs into markdown autolinks if they aren't already wrapped
    // The regex matches 'http...' that starts at the beginning of a line or after a space/newline
    const processedContent = content.replace(/(^|\s)(https?:\/\/[^\s]+)/g, '$1<$2>')

    return (
        <ReactMarkdown
            components={{
                a: ({ node, ...props }) => (
                    <a
                        {...props}
                        className={markdownStyles.link}
                        target='_blank'
                        rel='noopener noreferrer'
                    />
                ),
                p: ({ node, ...props }) => (
                    <p
                        {...props}
                        className={markdownStyles.paragraph}
                    />
                ),
                ul: ({ node, ...props }) => (
                    <ul
                        {...props}
                        className={markdownStyles.list}
                    />
                ),
                li: ({ node, ...props }) => (
                    <li
                        {...props}
                        className={markdownStyles.listItem}
                    />
                )
            }}
        >
            {processedContent}
        </ReactMarkdown>
    )
}