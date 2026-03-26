import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#111418] transition-colors">
            <ChatInterface visitorId="1" />
        </main>
    );
}