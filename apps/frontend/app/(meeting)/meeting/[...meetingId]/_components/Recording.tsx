import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore"
import { RecordingType } from "@infinityMeet/types"
import { Download, Play, Video } from "lucide-react"

export const Recording = () => {
    const recordings = useMeetingStore((state) => state.recordings);

    const downloadRecording = (quality: string) => {
        // In a real app, this would trigger a download
        console.log(`Downloading ${quality} recording...`);
    };

    const converT0MB = (bytes: number): number => {
        const mb = bytes / (1024 * 1024);
        return parseFloat(mb.toFixed(2));
    }

    return (
        <Card className="p-6 gap-3">
            <div className="flex items-center space-x-2 mb-4">
                <Video className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Recordings</h2>
            </div>

            <div className="space-y-3">
                {recordings.map((recording: RecordingType, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 dark:bg-white/4 rounded-lg border">
                        <div>
                            <p className="font-medium">{recording.quality}</p>
                            <div className="text-sm opacity-70 flex space-x-2">
                                <p>
                                    {converT0MB(recording.size)} MB
                                </p>
                                <p>•</p>
                                <p>{recording.format}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                <Play size={16} />
                                Play
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadRecording(recording.quality)}
                            >
                                <Download size={16} />
                                Download
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}