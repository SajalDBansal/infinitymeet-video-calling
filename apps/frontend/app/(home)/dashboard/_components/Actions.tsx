"use client"
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Calendar, UserPlus, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Actions() {
    const router = useRouter();

    const createButtonHandler = () => {
        console.log("create button clicked");
        router.push("/create");
    };

    const joinButtonHandler = () => {
        console.log("join button clicked");
        router.push("/join");
    };

    const scheduleButtonHandler = () => {
        console.log("schedule button clicked");
        router.push("/schedule");
    };

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
            <Card className="px-6 py-4">
                <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                        <Video className="h-6 w-6 text-blue-500" />
                    </div>
                    <Button variant="blue" size="sm" onClick={createButtonHandler}>
                        Create
                    </Button>
                </div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Start Meeting</h3>
                <p className="text-sm text-light-text dark:text-dark-text opacity-80">Create a new video conference</p>
            </Card>

            <Card className="px-6 py-4">
                <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-teal-500/10">
                        <UserPlus className="h-6 w-6 text-teal-500" />
                    </div>
                    <Button variant="teal" size="sm" onClick={joinButtonHandler}>
                        Join
                    </Button>
                </div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Join Meeting</h3>
                <p className="text-sm text-light-text dark:text-dark-text opacity-80">Enter a meeting code to join</p>
            </Card>

            <Card className="px-6 py-4">
                <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                        <Calendar className="h-6 w-6 text-purple-500" />
                    </div>
                    <Button variant="accent" size="sm" onClick={scheduleButtonHandler}>
                        Schedule
                    </Button>
                </div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Schedule Meeting</h3>
                <p className="text-sm text-light-text dark:text-dark-text opacity-80">Plan a future video conference</p>
            </Card>
        </div>
    )
}