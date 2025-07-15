import { Button } from "components/ui/button";
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore"
import { BookmarkCheck, ChevronDown, ChevronUp, FileText, Sparkles } from "lucide-react"
import { useState } from "react";

export const Summary = () => {
    const [showContent, setShowContent] = useState(false);
    const summary = useMeetingStore((state) => state.summary);
    return (
        <Card className="p-6 gap-3">
            <div className="flex items-center space-x-2 mb-2">
                <BookmarkCheck className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Meeting Summary</h2>
            </div>

            <div className="space-y-4">
                <div className="pl-2">
                    <h3 className="font-medium mb-2">Key Points</h3>
                    <ul className="space-y-1 pl-2">
                        {summary?.keyPoints.map((point: string, index: number) => (
                            <li key={index} className="flex items-start space-x-3">
                                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="opacity-80 text-sm">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pl-2">
                    <h3 className="font-medium mb-2">Action Items</h3>
                    <ul className="space-y-1 pl-2">
                        {summary?.actionItems.map((item: string, index: number) => (
                            <li key={index} className="flex items-start space-x-3">
                                <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className=" opacity-80 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Show AI Summary</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowContent(!showContent)}
                    >
                        {showContent ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {showContent ? 'Hide' : 'Show'}
                    </Button>
                </div>

                {showContent && (
                    <div className="rounded-lg p-4 border">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                            {summary?.content}
                        </pre>
                    </div>
                )}
            </div>
        </Card>
    )
}