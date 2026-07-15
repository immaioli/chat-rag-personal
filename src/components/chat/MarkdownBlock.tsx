import ReactMarkdown from 'react-markdown'
import { markdownStyles } from '@/constants/styles'
import { FileText, Download } from 'lucide-react'

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
                a: ({ node, ...props }) => {
                    const isGoogleDriveLink = typeof props.href === 'string' && props.href.includes('drive.google.com/file/d/');
                    
                    if (isGoogleDriveLink) {
                        return (
                            <a
                                {...props}
                                className="inline-flex items-center gap-2 px-4 py-2 mt-2 mr-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 text-sm font-medium no-underline group shadow-sm"
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FileText className="size-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{props.children}</span>
                                <Download className="size-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                            </a>
                        );
                    }

                    return (
                        <a
                            {...props}
                            className={markdownStyles.link}
                            target='_blank'
                            rel='noopener noreferrer'
                        />
                    );
                },
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