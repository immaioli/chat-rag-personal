interface SocialButtonProps {
    href: string;
    title: string;
    children: React.ReactNode;
}

export function SocialButton({ href, title, children }: SocialButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className="flex items-center justify-center size-8 rounded-lg bg-gray-100 dark:bg-[#283039] text-gray-500 dark:text-[#9dabb9] hover:bg-[#137fec] hover:text-white dark:hover:bg-[#137fec] dark:hover:text-white transition-all hover:scale-110"
        >
            {children}
        </a>
    );
}