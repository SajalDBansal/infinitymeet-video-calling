"use client";

import { MeetingType } from "@infinityMeet/types";
import { useState } from "react";
import { ConfigurationSetup } from "./ConfigurationSetup";
import { Waiting } from "./Waiting";
import { Conference } from "./Conference";
import { FullMeetingType } from "@infinityMeet/database";
import { useGetCallById } from "hooks/useGetCallById";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

export const MeetingSetup = ({ meeting }: { meeting: FullMeetingType }) => {
    const [isConfigsSet, setIsConfigsSet] = useState<"config" | "waiting" | "start">("config");
    const { call, isCallLoading } = useGetCallById(meeting.id);
    const session = useSession();

    if (isCallLoading || session.status === "loading") {
        return <Loader />
    }

    return (
        <div>
            <StreamCall call={call}>
                <StreamTheme>
                    {isConfigsSet === "config" && (
                        <ConfigurationSetup meeting={meeting} setIsConfigsSet={setIsConfigsSet} />
                    )}
                    {(isConfigsSet === "waiting" && meeting.status === "UPCOMING") && (
                        <Waiting meeting={meeting} setIsConfigsSet={setIsConfigsSet} />
                    )}
                    {isConfigsSet === "start" && (
                        <Conference />
                    )}
                </StreamTheme>
            </StreamCall>
        </div>
    )
}