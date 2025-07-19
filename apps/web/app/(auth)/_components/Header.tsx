"use client";

import { LogOut, Moon, Sun, User, Video } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "components/ui/button";
import { useParams, usePathname } from "next/navigation";
import { useScrollTop } from "hooks/useScrollTop";

export const Header = () => {
    const { setTheme } = useTheme();
    const scrolled = useScrollTop();
    const pathname = usePathname();
    return (
        <header className={`z-50 bg-white dark:bg-[#1F1F1F] fixed top-0 transition-colors border-gray-200 dark:border-white/10 w-full
        ${scrolled ? "border-b shadow-sm" : "shadow-none"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            InfinityMeet
                        </span>
                    </Link>

                    {/* Auth section & theme */}
                    <div className="flex items-center space-x-4">
                        {/* theme */}
                        <Button
                            onClick={() => setTheme(theme => (theme === "dark" ? "light" : "dark"))}
                            className="py-2 px-3 rounded-lg bg-gray-100 dark:bg-white/4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/7 transition-colors"
                        >
                            <span>
                                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 hidden dark:block" />
                                <Moon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                            </span>
                        </Button>

                        <div className="flex justify-center items-center space-x-2 text-sm">

                            {pathname === "/signup" ? (
                                <>
                                    <p>Already have an account?</p>
                                    <Link href={"/signin"}
                                        className="text-blue-500 underline hover:no-underline font-bold"
                                    >Sign In</Link>
                                </>
                            ) : (
                                <>
                                    <p>New to Zoom?</p>
                                    <Link href={"/signup"}
                                        className="text-blue-500 underline hover:no-underline font-bold"
                                    >Signup for free</Link>
                                </>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </header>
    )
}