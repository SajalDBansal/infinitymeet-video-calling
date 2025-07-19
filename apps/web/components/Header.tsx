"use client";

import { LayoutDashboard, LogOut, Moon, Sun, User, Video } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "components/ui/button";
import { usePathname } from "next/navigation";
import { useScrollTop } from "hooks/useScrollTop";
import { logSessionOut } from "actions/logSessionOut";

export const Header = () => {
    const { setTheme } = useTheme();
    const scrolled = useScrollTop();
    const session = useSession();
    const pathName = usePathname();

    const signOutHandler = async () => {
        // @ts-ignore
        await logSessionOut(session.data?.user?.sessionId);
        await signOut({ callbackUrl: "/" });
    }

    return (
        <header className={`z-50 bg-white dark:bg-[#1F1F1F] fixed top-0 transition-colors border-gray-200 dark:border-white/10 w-full
        ${scrolled ? "border-b shadow-sm" : "shadow-none"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            InfinityMeet
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`flex items-center gap-x-1 font-medium transition-colors ${pathName === "/"
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                        >
                            Home
                        </Link>
                        {session.status == "authenticated" && (
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-x-1 font-medium transition-colors ${pathName === "/dashboard"
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        )}
                        <Link
                            href="/join"
                            className={`flex items-center gap-x-1 font-medium transition-colors ${pathName === "/join"
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            <Video size={18} />
                            Join Meeting
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={() => setTheme(theme => (theme === "dark" ? "light" : "dark"))}
                            className="py-2 px-3 rounded-lg bg-gray-100 dark:bg-white/4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/7 transition-colors"
                        >
                            <span>
                                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 hidden dark:block" />
                                <Moon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                            </span>
                        </Button>


                        {session.status == "authenticated" ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <img src={session.data.user?.image || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {session.data.user?.name}
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => signOutHandler()}>
                                    <LogOut size={16} />
                                </Button>
                            </div>
                        ) : (
                            <Link href={"/signin"}>
                                <Button variant="outline" size="sm">
                                    <User size={16} className="mr-2" />
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </header>
    )
}