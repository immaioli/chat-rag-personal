import ReactMarkdown from 'react-markdown'
import { markdownStyles } from '@/constants/styles'

interface MarkdownBlockProps {
    content: string
}

export function MarkdownBlock({ content }: MarkdownBlockProps) {
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
            {content}
        </ReactMarkdown>
    )
}