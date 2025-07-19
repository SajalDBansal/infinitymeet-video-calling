import { Card } from "components/ui/card";
import { FileText, Languages, MessageSquare, Monitor, Settings, Presentation as PresentationChart } from "lucide-react";

export const Features = () => {
    const features = [
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Real-time messaging with file sharing and emoji reactions during meetings.'
        },
        {
            icon: FileText,
            title: 'Whiteboard',
            description: 'Collaborative whiteboard for brainstorming and visual presentations.'
        },
        {
            icon: Monitor,
            title: 'Screen Sharing',
            description: 'Share your screen, specific applications, or browser tabs seamlessly.'
        },
        {
            icon: Languages,
            title: 'Live Translation',
            description: 'Real-time transcription and translation in multiple languages.'
        },
        {
            icon: PresentationChart,
            title: 'Meeting Analytics',
            description: 'Detailed insights and analytics for your meetings and team performance.'
        },
        {
            icon: Settings,
            title: 'Custom Layouts',
            description: 'Flexible grid layouts and presentation modes for optimal viewing.'
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-[#1F1F1F]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Powerful Features for Modern Teams
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Everything you need to conduct productive meetings and collaborate effectively.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                        >
                            <Card className="p-6 h-full hover:bg-gray-50 dark:hover:bg-white/4 hover:shadow-lg transition-colors">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 dark:bg-white/9 p-3 rounded-lg mr-4">
                                        <feature.icon className="h-6 w-6 text-blue-600 dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}