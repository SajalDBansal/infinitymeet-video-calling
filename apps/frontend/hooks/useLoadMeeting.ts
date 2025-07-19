import { MeetingParticipantType, UserType } from "@infinityMeet/types";
import { useMeetingStore } from "./useMeetingStore";
import { useCallback } from "react";
import { FullMeetingType } from "@infinityMeet/database";

export function useLoadMeeting(meeting: FullMeetingType) {
    const {
        setMetadata,
        setHost,
        setParticipants,
        setMessages,
        setTranscript,
        setRecordings,
        setSummary,
    } = useMeetingStore();

    return useCallback(() => {
        if (!meeting) return;

        // 1. Set base metadata
        setMetadata({
            id: meeting.id,
            title: meeting.title,
            description: meeting.description,
            scheduledAt: meeting.scheduledAt,
            duration: meeting.duration || 0,
            status: meeting.status,
            createdAt: meeting.createdAt,
            startedAt: meeting.startedAt,
            endedAt: meeting.endedAt,
            isLive: meeting.isLive,
            hostId: meeting.hostId,
            pariticipantsCounts: meeting.participants.length,
            host: meeting.host?.name || "Unknown",
        });

        // 2. Set host
        const host: UserType = {
            id: meeting.hostId,
            email: meeting.host?.email ?? undefined,
            name: meeting.host?.name ?? undefined,
            imageUrl: meeting.host?.imageUrl ?? undefined,
            createdAt: meeting.host?.createdAt ?? undefined,
            updatedAt: meeting.host?.updatedAt ?? undefined,
            lastSeenAt: meeting.host?.lastSeenAt ?? undefined,
            isOnline: meeting.host?.isOnline ?? undefined,
            password: "undefined",
        };

        setHost(host);

        // 3. Set participants with type safety
        const participants: MeetingParticipantType[] = meeting.participants.map((p) => ({
            id: p.id,
            userId: p.userId ?? undefined,
            meetingId: p.meetingId,
            email: p.email ?? undefined,
            assignedBy: p.assignedBy ?? undefined,
            role: p.role,
            joinedAt: p.joinedAt ?? undefined,
            leftAt: p.leftAt ?? undefined,
            user: p.user
                ? {
                    ...p.user,
                    name: p.user.name ?? undefined,
                    imageUrl: p.user.imageUrl ?? undefined,
                    lastSeenAt: p.user.lastSeenAt ?? undefined,
                }
                : undefined,
            assignedByUser: p.assignedByUser
                ? {
                    ...p.assignedByUser,
                    name: p.assignedByUser.name ?? undefined,
                    imageUrl: p.assignedByUser.imageUrl ?? undefined,
                    lastSeenAt: p.assignedByUser.lastSeenAt ?? undefined,
                }
                : undefined,
        }));

        setParticipants(participants);

        // 4. Other properties
        setMessages(
            meeting.messages.map((message) => ({
                ...message,
                sender: message.sender
                    ? {
                        ...message.sender,
                        name: message.sender.name ?? undefined,
                        imageUrl: message.sender.imageUrl ?? undefined,
                        lastSeenAt: message.sender.lastSeenAt ?? undefined,
                    }
                    : undefined,
            }))
        );

        setTranscript(meeting.transcript ?? null);
        setRecordings(meeting.recordings);

        setSummary(
            meeting.summary
                ? {
                    ...meeting.summary,
                    content: meeting.summary.content ?? "", // Convert null to empty string
                }
                : null
        );

    }, [meeting]);
}
