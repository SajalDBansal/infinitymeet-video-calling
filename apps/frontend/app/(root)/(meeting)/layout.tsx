import { Header } from "components/Header";

const MeetingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1F1F1F] transition-colors">
            <Header />
            <main className="pt-16">
                {children}
            </main>
        </div>
    )
}

export default MeetingLayout;

