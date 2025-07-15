import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatDurationMeeting } from "@infinityMeet/util-function";

export const Stats = () => {
    const summary = useMeetingStore((state) => state.summary);
    const meeting = useMeetingStore((state) => state.metadata);

    return (
        <Card className="p-6 gap-3">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Meeting Stats</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Duration</span>
                    <span className="text-light-text dark:text-dark-text font-medium">
                        {meeting?.startedAt && meeting?.endedAt
                            ? formatDurationMeeting(Math.round((meeting.endedAt.getTime() - meeting.startedAt.getTime()) / 60000))
                            : '0m'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Attendance</span>
                    <span className="text-light-text dark:text-dark-text font-medium">{summary?.attendanceRate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-text dark:text-dark-text opacity-70">Sentiment</span>
                    <span className={`font-medium capitalize ${summary?.sentiment === 'positive' ? 'text-green-500' :
                        summary?.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                        {summary?.sentiment}
                    </span>
                </div>
            </div>
        </Card>
    )
}