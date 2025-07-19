"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatDateMeeting, formatTimeMeeting } from "@infinityMeet/util-function";
import { Calendar, Check, Clock, Copy, Share, User, Users } from "lucide-react"
import { useState } from "react";
import { useIsEditing } from "hooks/useEditMeeting";
import { Input } from "components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select";

export const MeetingInfo = () => {
    const meetingData = useMeetingStore((state) => state.metadata);
    const hostData = useMeetingStore((state) => state.host);
    const [copied, setCopied] = useState(false);
    const [meetingLink] = useState(`${window.location.origin}/conference/${meetingData?.id}`);
    const { isEditing, toggleEditing } = useIsEditing();

    const copyMeetingLink = () => {
        if (meetingData) {
            navigator.clipboard.writeText(meetingLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card className="p-6 gap-3">
            <h2 className="text-xl font-semibold mb-6">Meeting Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {/* host */}
                    <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Hosted by</p>
                            <div className="flex items-center space-x-2 mt-2 ml-2">
                                {hostData?.imageUrl ? (
                                    <img
                                        src={hostData?.imageUrl}
                                        alt={hostData?.name}
                                        className="h-6 w-6 rounded-full"
                                    />
                                ) : (
                                    <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-center flex justify-center items-center">
                                        {hostData?.name?.[0] ?? "?"}
                                    </div>
                                )}
                                <span className="text-md">{hostData?.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* date & time */}
                    <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-teal-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium  opacity-70">Date & Time</p>
                            {isEditing ? (
                                <div className="space-x-2">
                                    <div className="flex items-center justify-center gap-x-3">
                                        Date
                                        <Input
                                            id="time"
                                            type="date"
                                            // value={meetingData?.scheduledAt}
                                            required
                                            onChange={(e) => { }}
                                            className="p-5 mt-2 ml-2"
                                        />

                                    </div>

                                    <div className="flex items-center justify-center gap-x-3">
                                        Time
                                        <Input
                                            id="time"
                                            type="time"
                                            // value={meetingData?.scheduledAt}
                                            required
                                            onChange={(e) => { }}
                                            className="p-5 mt-2 ml-2"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}

                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* duration */}
                    <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Duration</p>
                            {isEditing ? (
                                <div className="mt-2 ml-2">
                                    <Select >
                                        <SelectTrigger className="w-full p-5" >
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Durations</SelectLabel>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="45">45 minutes</SelectItem>
                                                <SelectItem value="60">60 minutes</SelectItem>
                                                <SelectItem value="90">90 minutes</SelectItem>
                                                <SelectItem value="120">120 minutes</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <p className="mt-2 ml-2">
                                    {meetingData?.status === "COMPLETED" && meetingData?.startedAt && meetingData.endedAt
                                        ? `${Math.round((meetingData.endedAt.getTime() - meetingData.startedAt.getTime()) / 60000)} min`
                                        : meetingData?.duration !== undefined
                                            ? `${meetingData.duration} min`
                                            : "N/A"
                                    }
                                </p>
                            )}

                        </div>
                    </div>
                    {/* participants */}
                    <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium opacity-70">Participants</p>
                            <p className="ml-2">{meetingData?.pariticipantsCounts} people</p>
                            {isEditing && (
                                <Input
                                    id="participants"
                                    type="text"
                                    placeholder="Enter email addresses"
                                    // value={participants}
                                    onChange={(e) => { }}
                                    className="p-5 ml-2 mt-2"
                                />
                            )}
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
                        value={meetingLink}
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