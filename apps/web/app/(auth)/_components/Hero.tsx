import { Card, CardContent, CardHeader } from "components/ui/card"
import { CheckCircle } from "lucide-react"

export const Hero = () => {

    const accountFeatures = ["Unlimited meetings for up to 40 minutes and 100 participants each",
        "Automated captions to help make meetings more inclusive",
        "Secure, HD - quality audio and video",
        "3 editable whiteboards",
        "Team Chat for collaboration, file sharing, and more",
        "Zoom Mail and Calendar in the Zoom app",
        "Notes for creating and sharing editable documents",
        "Screen sharing, virtual backgrounds and local recording"]

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-none dark:bg-white/4 h-full flex-col justify-center pt-20 rounded-2xl">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <img
                        src="/signup.png"
                        className="w-90 mx-auto pb-10"
                    />
                    <Card className="m-2">
                        <CardHeader className="text-center font-bold text-xl">
                            What's new in InfinityMeet
                        </CardHeader>
                        <CardContent>
                            {accountFeatures.map((feature, index) => (
                                <div className="flex items-center space-x-3 space-y-2" key={index}>
                                    <CheckCircle size={20} />
                                    <p key={index} className="text-sm text-gray-500 dark:text-gray-400">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}