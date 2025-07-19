"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Button } from "components/ui/button";
import { useRouter } from "next/navigation";

export const EndCallButton = () => {

    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const LocalParticipant = useLocalParticipant();
    const router = useRouter();

    const isMeetingOwner = LocalParticipant && call?.state.createdBy && LocalParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    return (
        <div className="flex items-center gap-2">
            <Button
                className="rounded-2xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={async () => {
                    call.endCall();
                    router.push("/");
                }}
            >
                End call for everyone
            </Button>
        </div>
    )
}