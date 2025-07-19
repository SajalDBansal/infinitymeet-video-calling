import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { LayoutList, Users } from "lucide-react";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { useSearchParams } from "next/navigation";
import { EndCallButton } from "./EndCallButton";
import { Loader } from "components/Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("personal");
    const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return <Loader />
    }

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition={"left"} />
            default:
                return <SpeakerLayout participantsBarPosition={"right"} />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className={`relative flex size-full justify-center items-center`}>
                <div className="flex size-full max-w-[1000px] items-center mx-auto">
                    <CallLayout />
                </div>
                <div className={cn(
                    "h-[calc(100vh-86px)] ml-2 transition-all duration-300",
                    showParticipants ? "block" : "hidden"
                )}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>


            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                            <LayoutList size={20} />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-black/10 rounded-2xl">
                        {["Grid", "Speaker-Left", "Speaker-Right"].map((layout, index) => (
                            <div key={index}>
                                <DropdownMenuItem className="cursor-pointer"
                                    onClick={() => {
                                        setLayout(layout.toLowerCase() as CallLayoutType);
                                    }}>
                                    {layout}
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <Button
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
                >
                    <Users size={20} className="text-white" />
                </Button>

                {!isPersonalRoom && <EndCallButton />}

            </div>
        </section>
    )
}