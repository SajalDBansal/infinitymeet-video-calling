import { Button } from "components/ui/button"
import Link from "next/link"

export const Experience = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-none dark:bg-white/4 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#312e81] to-[#701a75] opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"></div>

                    <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Ready to Experience the Future?
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
                            Join thousands of professionals who have already upgraded their virtual meeting experience with InfinityMeet.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/signup">
                                <Button
                                    variant="secondary"
                                    size="xl"
                                >
                                    Sign Up for Free
                                </Button>
                            </Link>
                            <Link href="/features">
                                <Button
                                    variant="secondary"
                                    size="xl"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}