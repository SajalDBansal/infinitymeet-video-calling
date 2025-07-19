import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatTimeMeeting } from "@infinityMeet/util-function"
import { MeetingParticipantType } from "@infinityMeet/types"

export const Participants = () => {
    const meeting = useMeetingStore((state) => state.metadata);
    const participants = useMeetingStore((state) => state.participants);
    return (
        <Card className="p-6 gap-3">
            <h3 className="text-lg font-semibold mb-2">
                {meeting?.status === "LIVE" ? 'Live Participants' : 'Participants'} ({meeting?.pariticipantsCounts})
                {meeting?.status === "LIVE" && (
                    <span className="ml-2 inline-flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    </span>
                )}
            </h3>
            <div className="space-y-3">
                {participants?.map((participant: MeetingParticipantType, key) => (
                    <div key={key} className="flex items-center space-x-3">
                        {participant.user?.imageUrl ? (
                            <img
                                src={participant.user?.imageUrl}
                                alt={participant.user?.name}
                                className="h-10 w-10 rounded-full"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 text-center flex justify-center items-center">
                                {participant.user?.name?.[0] ?? "?"}
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="font-medium">{participant.user?.name}</p>
                            <p className="text-sm opacity-70">{participant.user?.email}</p>
                            {participant.joinedAt && (
                                <p className="text-xs opacity-50">
                                    Joined at {formatTimeMeeting(participant.joinedAt)}
                                </p>
                            )}
                            {meeting?.status === "LIVE" && (
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="flex items-center text-xs text-green-500">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></div>
                                        Online
                                    </span>
                                    {participant.role === "HOST" && (
                                        <span className="text-xs opacity-50">
                                            • Active now
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        {participant.userId === meeting?.hostId && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                Host
                            </span>
                        )}
                        {meeting?.status === "LIVE" && participant.userId === meeting.hostId && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 ml-2">
                                Live
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    )
}