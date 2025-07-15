import { ChangeEvent } from "react";
import { signinInputsProps, signupInputsProps, z } from "@infinityMeet/validators";

export type SignupInputType = z.infer<typeof signupInputsProps>

export type SigninInputType = z.infer<typeof signinInputsProps>

export type LabledInputType = {
    lable: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export type AddGoogleUserProps = {
    sub: string,
    name: string,
    email: string,
    password: string,
    picture: string,
}

export type UserType = {
    id: string;
    email: string;
    password: string;
    name?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    lastSeenAt?: Date;
    isOnline: boolean;

    sessions?: UserSessionType[];
    meetingsHosted?: MeetingType[];
    participants?: MeetingParticipantType[];
    assignedBy?: MeetingParticipantType[];
    messages?: ChatMessageType[];
};

export type UserSessionType = {
    id: string;
    sessionId: string;
    userId: string;
    user: UserType;
    startedAt: Date;
    endAt?: Date;
};

export type MeetingType = {
    id: string;
    title: string;
    description?: string;
    scheduledAt: Date;
    duration: number;
    status: MeetingStatusType;
    createdAt: Date;
    startedAt?: Date;
    endedAt?: Date;
    isLive: boolean;

    hostId: string;
    host?: UserType;

    participants?: MeetingParticipantType[];
    messages?: ChatMessageType[];
    transcript?: TranscriptType;
    recordings?: RecordingType[];
    summary?: SummaryType;
};

export type MeetingParticipantType = {
    userId: string;
    meetingId: string;
    assignedBy?: string;
    role: ParticipantRoleType;
    joinedAt?: Date;
    leftAt?: Date;

    user?: UserType;
    meeting?: MeetingType;
    assignedByUser?: UserType;
};

export type ChatMessageType = {
    id: string;
    meetingId: string;
    senderId: string;
    content: string;
    sentAt: Date;

    meeting?: MeetingType;
    sender?: UserType;
};

export type TranscriptType = {
    id: string;
    content: string;
    meetingId: string;
    createdAt: Date;

    meeting?: MeetingType;
};

export type RecordingType = {
    id: string;
    meetingId: string;
    url: string;
    createdAt: Date;
    quality: RecordingQualityType;
    format: RecordingFormatType;
    size: number;
    meeting?: MeetingType;
};

export type SummaryType = {
    id: string;
    meetingId: string;
    keyPoints: string[];
    actionItems: string[];
    content: string;
    sentiment: string;
    attendanceRate: string;
    createdAt: Date;

    meeting?: MeetingType;
};


export type ParticipantRoleType = 'HOST' | 'CO_HOST' | 'ATTENDEE' | 'VIEWER';
export type MeetingStatusType = 'UPCOMING' | 'LIVE' | 'COMPLETED';
export type RecordingQualityType = 'P320' | 'P480' | 'P720' | 'P1080';
export type RecordingFormatType = 'MP4' | 'MP3';

export type MeetingMetadataType = {
    id: string;
    title: string;
    description?: string;
    scheduledAt: Date;
    duration: number;
    status: MeetingStatusType;
    createdAt: Date;
    startedAt?: Date;
    endedAt?: Date;
    isLive: boolean;
    hostId: string;
    pariticipantsCounts?: number;
};

export type MeetingStateType = {
    fullMeeting: MeetingType | null;
    metadata: MeetingMetadataType | null;
    host: UserType | null;
    participants: MeetingParticipantType[];
    messages: ChatMessageType[];
    transcript: TranscriptType | null;
    recordings: RecordingType[];
    summary: SummaryType | null;

    // Setters
    setFullMeeting: (meeting: MeetingType | null) => void;
    setMetadata: (metadata: MeetingMetadataType | null) => void;
    setHost: (host: UserType | null) => void;
    setParticipants: (users: MeetingParticipantType[]) => void;
    setMessages: (msgs: ChatMessageType[]) => void;
    setTranscript: (transcript: TranscriptType | null) => void;
    setRecordings: (recs: RecordingType[]) => void;
    setSummary: (summary: SummaryType | null) => void;
}