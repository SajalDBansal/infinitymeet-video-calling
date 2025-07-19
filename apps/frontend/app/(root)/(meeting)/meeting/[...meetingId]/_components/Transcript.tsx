import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { useState } from "react";

export const Transcript = () => {
    const transcript = useMeetingStore((state) => state.transcript);
    const [showTranscript, setShowTranscript] = useState(false);

    return (
        <Card className="p-6 gap-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-secondary-500" />
                    <h2 className="text-xl font-semibold">Meeting Transcript</h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTranscript(!showTranscript)}
                >
                    {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showTranscript ? 'Hide' : 'Show'}
                </Button>
            </div>

            {showTranscript && (
                <div className="rounded-lg p-4 border max-h-64 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                        {transcript?.content}
                    </pre>
                </div>
            )}
        </Card>
    )
}