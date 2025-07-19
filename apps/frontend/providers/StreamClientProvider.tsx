"use client";
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { tokenProvider } from "actions/stream.actions";
import { Loader } from "components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export function StreamClientProvider({ children }: { children: React.ReactNode }) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") return;
        if (!session?.user?.id) return;
        if (!apiKey) throw new Error("Missing stream API key");

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: session.user.id,
            },
            tokenProvider: tokenProvider
        });

        setVideoClient(client);
    }, [session?.user?.id, status]);

    if (!session) {
        return (
            <div>
                {children}
            </div>
        )
    }

    if (!videoClient) return <Loader />; // or show a loader

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};