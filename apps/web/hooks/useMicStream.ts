import { useEffect, useState } from "react";

export function useMicStream(selectedMicrophone: string, enabled: boolean) {
    const [micStream, setMicStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        async function startMic() {
            if (!enabled) return;
            try {
                if (micStream) {
                    micStream.getTracks().forEach(track => track.stop());
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: selectedMicrophone ? { deviceId: selectedMicrophone } : true,
                });
                setMicStream(stream);
            } catch (error) {
                console.error("Error accessing microphone:", error);
            }
        }

        if (enabled && selectedMicrophone) {
            startMic();
        } else {
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
                setMicStream(null);
            }
        }

        return () => {
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line
    }, [enabled, selectedMicrophone]);

    return { micStream };
}