import { Card } from "components/ui/card"

export const Trust = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-[#1F1F1F]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
                        Trusted by Innovators
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto text-light-text dark:text-dark-text opacity-80">
                        See why leading companies and professionals choose InfinityMeet for their virtual collaborations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "NexusCall transformed our remote work experience. The video quality and intuitive interface are simply unmatched.",
                            author: "Sarah Johnson",
                            title: "CTO, TechFrontier",
                            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                        },
                        {
                            quote: "As a global team, we rely heavily on video conferencing. NexusCall's reliability and advanced features have made our collaborations seamless.",
                            author: "Michael Chen",
                            title: "Product Manager, InnovateCorp",
                            avatar: "https://randomuser.me/api/portraits/men/46.jpg"
                        },
                        {
                            quote: "The sci-fi inspired design isn't just for show - it's backed by seriously impressive technology. Best video platform we've used.",
                            author: "Elena Rodriguez",
                            title: "Design Director, CreativeAxis",
                            avatar: "https://randomuser.me/api/portraits/women/65.jpg"
                        }
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                        >
                            <Card className="h-full flex flex-col bg-transparent border-none shadow-none">
                                <div className="flex-grow">
                                    <p className="text-light-text dark:text-dark-text italic">"{testimonial.quote}"</p>
                                </div>
                                <div className="flex items-center mt-6 pt-6 border-t border-light-border dark:border-dark-border">
                                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                        <img src={testimonial.avatar} alt={testimonial.author} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-light-text dark:text-dark-text">{testimonial.author}</p>
                                        <p className="text-sm text-light-text dark:text-dark-text opacity-80">{testimonial.title}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}