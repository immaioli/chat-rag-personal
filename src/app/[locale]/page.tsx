import { ChatInterface } from "@/components/chat/ChatInterface";
import { WelcomeModal } from '@/components/chat/WelcomeModal';

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#111418] transition-colors">
            <WelcomeModal/>
            <ChatInterface visitorId="1" />
        </main>
    );
}