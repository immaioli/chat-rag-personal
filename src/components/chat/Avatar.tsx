interface AvatarProps {
    url: string;
    showStatus?: boolean;
}

export function Avatar({ url, showStatus = false }: AvatarProps) {
    return (
        <div className="relative shrink-0 group">
            <div
                className="size-20 rounded-full bg-cover bg-center border-2 border-[#137fec] transition-colors"
                style={{ backgroundImage: `url('${url}')` }}
            ></div>
            {showStatus && (
                <div className="absolute bottom-0 right-1 size-5 bg-green-500 border-2 border-white dark:border-[#111418] rounded-full transition-colors" title="Online"></div>
            )}
        </div>
    );
}