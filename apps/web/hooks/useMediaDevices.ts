import { useEffect, useRef, useState } from "react";

export function useVideoStream(selectedCamera: string, enabled: boolean) {
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let active = true;
        async function startVideo() {
            if (!enabled) return;
            try {
                if (videoStream) {
                    videoStream.getTracks().forEach(track => track.stop());
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: selectedCamera ? { deviceId: selectedCamera } : true,
                    audio: false,
                });
                if (!active) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
                setVideoStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error starting video preview:", error);
            }
        }

        if (enabled && selectedCamera) {
            startVideo();
        } else {
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
                setVideoStream(null);
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }

        return () => {
            active = false;
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line
    }, [enabled, selectedCamera]);

    return { videoStream, videoRef };
}

export function useMicStream(selectedMicrophone: string, enabled: boolean) {
    const [micStream, setMicStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let active = true;
        async function startMic() {
            if (!enabled) return;
            try {
                if (micStream) {
                    micStream.getTracks().forEach(track => track.stop());
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: selectedMicrophone ? { deviceId: selectedMicrophone } : true,
                });
                if (!active) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
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
            active = false;
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line
    }, [enabled, selectedMicrophone]);

    return { micStream };
} 