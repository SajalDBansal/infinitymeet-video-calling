import { MeetingType, MeetingParticipantType } from "@infinityMeet/types";
import { useMeetingStore } from "./useMeetingStore";
import { useCallback } from "react";

export function useLoadMeeting(meeting: MeetingType) {
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
        setMetadata({
            id: meeting.id,
            title: meeting.title,
            description: meeting.description,
            scheduledAt: meeting.scheduledAt,
            duration: meeting.duration,
            status: meeting.status,
            createdAt: meeting.createdAt,
            startedAt: meeting.startedAt,
            endedAt: meeting.endedAt,
            isLive: meeting.isLive,
            hostId: meeting.hostId,
            pariticipantsCounts: meeting.participants?.length || 0,
        });
        setHost(meeting.host ?? null);
        setParticipants((meeting.participants as any as MeetingParticipantType[]) || []);
        setMessages(meeting.messages || []);
        setTranscript(meeting.transcript ?? null);
        setRecordings(meeting.recordings || []);
        setSummary(meeting.summary ?? null);
    }, [meeting]); // memoize the function
}
