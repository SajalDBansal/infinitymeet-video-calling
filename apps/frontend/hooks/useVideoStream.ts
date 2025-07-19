import { useEffect, useState, useRef } from "react";

export function useVideoStream(selectedCamera: string, enabled: boolean) {
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
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
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line
    }, [enabled, selectedCamera]);

    return { videoStream, videoRef };
}