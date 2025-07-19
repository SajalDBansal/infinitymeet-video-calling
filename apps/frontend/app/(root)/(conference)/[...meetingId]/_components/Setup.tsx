"use client";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useEffect, useState } from "react";

export const Setup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within the StreamCall component");
    }

    useEffect(() => {
        if (isMicCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }

        return () => {
            call?.camera.disable();
            call?.microphone.disable();
        }

    }, [isMicCamToggleOn, call?.camera, call?.microphone]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <Input
                        type="checkbox"
                        checked={isMicCamToggleOn}
                        onChange={() => setIsMicCamToggleOn(!isMicCamToggleOn)}
                    />
                    join with mic and camera off
                </label>

                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}
            >
                join meeting
            </Button>
        </div>
    )
}