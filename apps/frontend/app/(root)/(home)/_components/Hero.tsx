import { Button } from "components/ui/button"
import { Globe, Shield, Users, Video } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-none dark:bg-white/4  py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Connect, Collaborate,{' '}
                            <span className="text-blue-600 dark:text-blue-400">Create</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Experience seamless video conferencing with advanced features like live transcription,
                            whiteboard collaboration, and AI-powered meeting insights.
                        </p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Link href="/join">
                            <Button variant="default" size="lg">
                                <Video className="mr-2" size={20} />
                                Start Meeting
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline" size="lg">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Unlimited Participants
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Host meetings with any number of participants without restrictions.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Enterprise Security
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                End-to-end encryption and enterprise-grade security features.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full mb-4">
                                <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Global Reach
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Connect with anyone, anywhere with our global infrastructure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}