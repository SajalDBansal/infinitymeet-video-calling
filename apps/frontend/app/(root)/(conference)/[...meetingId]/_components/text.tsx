"use client";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "hooks/useGetCallById";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Setup } from "./Setup";
import { MeetingRoom } from "./MeetingRoom";

export const Text = ({ id }: { id: string }) => {
    const { call, isCallLoading } = useGetCallById(id);
    const session = useSession();
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    if (isCallLoading || session.status === "loading") {
        return <Loader />
    }
    return (
        <div>
            <StreamCall call={call}>
                <StreamTheme>
                    {isSetupComplete ? (
                        <MeetingRoom />
                    ) : (
                        <Setup setIsSetupComplete={setIsSetupComplete} />
                    )}
                </StreamTheme>
            </StreamCall>

        </div>
    )
}