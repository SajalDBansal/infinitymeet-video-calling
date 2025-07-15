"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatDateMeeting, formatTimeMeeting } from "@infinityMeet/util-function";
import { Calendar, Check, Clock, Copy, Share, User, Users } from "lucide-react"
import { useState } from "react";

export const MeetingInfo = () => {
    const meetingData = useMeetingStore((state) => state.metadata);
    const hostData = useMeetingStore((state) => state.host);
    const [copied, setCopied] = useState(false);

    const copyMeetingLink = () => {
        if (meetingData) {
            navigator.clipboard.writeText(`${window.location.origin}/conference/${meetingData?.id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card className="p-6 gap-3">
            <h2 className="text-xl font-semibold mb-6">Meeting Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Hosted by</p>
                            <div className="flex items-center space-x-2 mt-2 ml-2">
                                <img
                                    src={hostData?.imageUrl}
                                    alt={hostData?.name}
                                    className="h-6 w-6 rounded-full"
                                />
                                <span className="text-md">{hostData?.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-teal-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium  opacity-70">Date & Time</p>
                            <p className="text-md mt-2 ml-2">
                                {meetingData?.scheduledAt
                                    ? formatDateMeeting(meetingData.scheduledAt)
                                    : "N/A"}
                            </p>
                            <p className="font-md ml-2">
                                {meetingData?.scheduledAt
                                    ? formatTimeMeeting(meetingData.scheduledAt)
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Duration</p>
                            <p className="mt-2 ml-2">
                                {meetingData?.status === "COMPLETED" && meetingData?.startedAt && meetingData.endedAt
                                    ? `${Math.round((meetingData.endedAt.getTime() - meetingData.startedAt.getTime()) / 60000)} min`
                                    : meetingData?.duration !== undefined
                                        ? `${meetingData.duration} min`
                                        : "N/A"
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Participants</p>
                            <p className="ml-2">{meetingData?.pariticipantsCounts} people</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meeting Link */}
            <div className="mt-4 p-4 bg-[#ffffff80] dark:bg-white/4 rounded-lg border">
                <p className="text-sm font-medium  mb-2">Meeting Link</p>
                <div className="block sm:flex items-center space-x-2">
                    <input
                        type="text"
                        value={`${window.location.origin}/conference/${meetingData?.id}`}
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent border border-light-border dark:border-dark-border rounded-md text-sm w-full"
                    />
                    <div className="flex justify-center pt-2 sm:pt-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyMeetingLink}
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy'}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            <Share size={16} />
                            Share
                        </Button>

                    </div>

                </div>
            </div>
        </Card>
    )
}