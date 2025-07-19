"use client";

import { FetchedMeetingType } from "@infinityMeet/types";
import { MeetingHead } from "./MeetingHead";
import { useEffect } from "react";
import { MeetingInfo } from "./MeetingInfo";
import { Summary } from "./Summary";
import { Recording } from "./Recording";
import { Transcript } from "./Transcript";
import { Messages } from "./Messages";
import { Actions } from "./Actions";
import { Participants } from "./Participants";
import { LiveStats } from "./LiveStats";
import { Stats } from "./Stats";
import { useLoadMeeting } from "hooks/useLoadMeeting";
import { FullMeetingType } from "@infinityMeet/database";

export default function MeetingDetails({ meeting }: { meeting: FullMeetingType }) {
    const loadMeeting = useLoadMeeting(meeting);
    useEffect(() => { loadMeeting() }, [loadMeeting]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

            <MeetingHead />

            {/* Page Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* main content */}
                <div className="lg:col-span-2 space-y-6">

                    <MeetingInfo />

                    {/* Completed Meeting Features */}
                    {meeting.status === "COMPLETED" && (
                        <>
                            {/* AI Summary */}
                            {meeting.summary && (
                                <Summary />
                            )}

                            {/* Recordings */}
                            {meeting.recordings && (
                                <Recording />
                            )}

                            {/* Transcript */}
                            {meeting.transcript && (
                                <Transcript />
                            )}
                        </>
                    )}

                </div>

                {/* side content*/}
                <div className="space-y-6">
                    <Actions />

                    {/* Participants */}
                    <Participants />

                    {/* Live Meeting Stats */}
                    {meeting.status === "LIVE" && (
                        <LiveStats />
                    )}

                    {/* Meeting Stats */}
                    {meeting.status === "COMPLETED" && meeting.summary && (
                        <Stats />
                    )}

                    {/* Meeting Chats */}
                    {meeting.status === "COMPLETED" && meeting.messages && (
                        <Messages />
                    )}

                </div>

            </div>

        </div>
    )
}
