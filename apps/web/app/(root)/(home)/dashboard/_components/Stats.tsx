import { Card } from "components/ui/card";
import { Clock, UserPlus, Video } from "lucide-react";

export default function Stats() {
    return (
        <div
        >
            <h2 className="text-xl font-semibold mb-4">Stats & Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="px-6 py-4 gap-y-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Total Meetings</h3>
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Video className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-green-500 mt-2 flex items-center">
                        <span>↑ 12% from last month</span>
                    </p>
                </Card>

                <Card className="px-6 py-4 gap-y-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Meeting Hours</h3>
                        <div className="p-2 rounded-lg bg-teal-500/10">
                            <Clock className="h-5 w-5 text-teal-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">36.5</p>
                    <p className="text-sm text-green-500 mt-2 flex items-center">
                        <span>↑ 8% from last month</span>
                    </p>
                </Card>

                <Card className="px-6 py-4 gap-y-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Participants</h3>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <UserPlus className="h-5 w-5 text-purple-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">128</p>
                    <p className="text-sm text-green-500 mt-2 flex items-center">
                        <span>↑ 18% from last month</span>
                    </p>
                </Card>
            </div>
        </div>
    )
}