import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (callId: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) return;

        const id = Array.isArray(callId) ? callId[0] : callId;

        const loadCall = async () => {
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: { id: id } // <-- use 'id' instead of 'callId'
                });

                if (calls.length > 0) setCall(calls[0]);
            } catch (error) {
                console.error("Failed to fetch call:", error);
            } finally {
                setIsCallLoading(false);
            }
        };

        loadCall();

    }, [callId, client]);

    return { call, isCallLoading };
}