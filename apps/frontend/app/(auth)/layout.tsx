import { NEXT_AUTH } from "@infinityMeet/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./_components/Header";

export const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(NEXT_AUTH);
    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen max-h-screen bg-gray-50 dark:bg-[#1F1F1F] transition-colors">
            <Header />
            <main className="pt-16">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout;