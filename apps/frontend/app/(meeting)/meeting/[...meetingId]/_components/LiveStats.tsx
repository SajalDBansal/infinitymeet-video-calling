import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatDurationMeeting } from "@infinityMeet/util-function"

export const LiveStats = () => {
    const meeting = useMeetingStore((state) => state.metadata);
    return (
        <Card className="p-6 gap-3">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Live Stats</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Meeting Duration</span>
                    <span className="text-light-text dark:text-dark-text font-medium">
                        {meeting?.startedAt ? formatDurationMeeting(Math.round((new Date().getTime() - meeting.startedAt.getTime()) / 60000)) : '0m'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Active Participants</span>
                    <span className="text-light-text dark:text-dark-text font-medium">{meeting?.pariticipantsCounts}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Status</span>
                    <span className="text-green-500 font-medium flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                        Live Now
                    </span>
                </div>
            </div>
        </Card>
    )
}