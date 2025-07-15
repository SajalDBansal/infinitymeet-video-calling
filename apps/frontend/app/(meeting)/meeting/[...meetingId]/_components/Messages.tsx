import { Button } from "components/ui/button";
import { Card } from "components/ui/card"
import { useMeetingStore } from "hooks/useMeetingStore";
import { formatTimeMeeting } from "@infinityMeet/util-function";
import { ChatMessageType } from "@infinityMeet/types";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Messages = () => {
    const [showChat, setShowChat] = useState(false);
    const messages = useMeetingStore((state) => state.messages);
    return (
        <Card className="p-6 gap-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-accent-500" />
                    <h2 className="text-xl font-semibold">
                        Chat Messages ({messages?.length})
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(!showChat)}
                >
                    {showChat ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showChat ? 'Hide' : 'Show'}
                </Button>
            </div>

            {showChat && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {messages.map((message: ChatMessageType) => (
                        <div key={message.id} className="flex items-center space-x-3 p-3 dark:bg-white/4 rounded-lg">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-medium">
                                {message.sender?.name?.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-sm">
                                        {message.sender?.name}
                                    </span>
                                    <span className="text-xs opacity-50">
                                        {formatTimeMeeting(message.sentAt)}
                                    </span>
                                </div>
                                <p className="text-sm">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}