import { Github, Linkedin, Mail, Twitter, Video } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-none dark:bg-white/4 pt-20 pb-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and company info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                InfinityMeet
                            </span>
                        </Link>
                        <p className="text-sm opacity-80 mb-4">
                            Experience the future of video conferencing with our advanced, sci-fi inspired platform.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/SajalDBansal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://x.com/SAJALDUTTBANSAL" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/sajalduttbansal/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/join" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Join Meeting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <p className="flex items-center space-x-2 opacity-80 hover:opacity-100 dark:hover:font-semibold transition-colors hover:text-blue-600">
                                <Mail size={16} />
                                <Link href={"mailto:dutt.sajal2001@gmail.com"}>
                                    dutt.sajal2001@gmail.com
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border text-center text-sm text-light-text dark:text-dark-text opacity-80">
                    <p>&copy; {currentYear} InfinityMeet. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}