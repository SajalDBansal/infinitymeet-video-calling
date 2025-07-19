"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useIsEditing } from "hooks/useEditMeeting";
import { useMeetingStore } from "hooks/useMeetingStore";

import { Edit, ExternalLink, Trash2, Users, Video } from "lucide-react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Actions = () => {
    const session = useSession();
    const meeting = useMeetingStore((state) => state.metadata);
    const { isEditing, toggleEditing } = useIsEditing();
    const router = useRouter();

    return (
        <Card className="p-6 gap-3">
            <h3 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">Actions</h3>
            <div className="space-y-3">
                {meeting?.status === "UPCOMING" && (
                    <Button
                        variant="default"
                        onClick={() => { router.push("/" + meeting?.id) }}
                        size="xl"
                        className="w-full"
                    >
                        <Video size={16} />
                        Start Meeting
                    </Button>
                )}

                {meeting?.status === "LIVE" && (
                    <Button
                        variant="default"
                        onClick={() => { router.push("/" + meeting?.id) }}
                        size="xl"
                        className="w-full"
                    >
                        <Video size={16} />
                        Join Now
                    </Button>
                )}

                {meeting?.status === "LIVE" && (
                    <Button
                        variant="secondary"
                        className="w-full"
                        size="xl"
                        onClick={() => { }}
                    >
                        <Users
                            size={16} />
                        View Live Participants
                    </Button>
                )}

                {meeting?.status === "COMPLETED" && (
                    <Button
                        variant="outline"
                        className="w-full"
                        size="xl"
                        onClick={() => { }}
                    >
                        <ExternalLink size={16} />
                        View Recording
                    </Button>
                )}

                {(meeting?.status === "UPCOMING" && meeting?.hostId == session.data?.user.id) && (
                    <>
                        <Button
                            variant="outline"
                            size="xl"
                            className="w-full"
                            onClick={() => toggleEditing()}
                        >
                            <Edit size={16} />
                            Edit Meeting
                        </Button>
                        <Button
                            variant="ghost"
                            size="xl"
                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <Trash2 size={16} />
                            Delete Meeting
                        </Button>
                    </>
                )}
            </div>
        </Card>
    )
}