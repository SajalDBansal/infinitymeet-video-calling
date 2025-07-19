import { meetingMock } from "@infinityMeet/mocks";
import type { FetchedMeetingType, MeetingMetadataType, MeetingType } from "@infinityMeet/types";
import { prisma } from "./client";
import { Prisma } from "./generated/prisma";

/**
 * Creates a new meeting in the database.
 * @param meeting - The meeting object to create.
 * @returns Promise resolving to the created meeting object.
 */

export async function createNewMeeting(meeting: MeetingType) {
    const meet = await prisma.meeting.create({
        data: {
            id: meeting.id,
            title: meeting.title,
            description: meeting.description,
            scheduledAt: meeting.scheduledAt,
            status: meeting.status,
            createdAt: meeting.createdAt,
            startedAt: meeting.startedAt,
            isLive: meeting.isLive,
            hostId: meeting.hostId,
            duration: meeting.duration,
        },
    });

    return meet;
}


export async function updateMeeting(meetingId: string, meeting: any) { }

export async function deleteMeeting(meetingId: string) { }


/** 
 * Fetches all meetings for a user, including their participants, messages, and recordings.
 * @param userId - The ID of the user to fetch meetings for.
 * @returns Promise resolving to an array of MeetingMetadataType objects.
*/

export async function getAllMeetings(userId: string): Promise<MeetingMetadataType[]> {
    const meetings = await prisma.meeting.findMany({
        where: {
            OR: [
                { hostId: userId },
                { participants: { some: { userId } } },
            ],
        },
        include: {
            _count: { select: { participants: true, } },
            host: { select: { name: true } }
        }
    });

    return meetings.map((meeting) => {
        const participants = meeting._count.participants;
        return {
            id: meeting.id,
            title: meeting.title,
            description: meeting.description ?? undefined,
            scheduledAt: meeting.scheduledAt,
            duration: meeting.duration || 0,
            status: meeting.status,
            createdAt: meeting.createdAt,
            startedAt: meeting.startedAt ?? undefined,
            endedAt: meeting.endedAt ?? undefined,
            isLive: meeting.isLive,
            hostId: meeting.hostId,
            pariticipantsCounts: participants,
            host: meeting.host.name ?? "",
        };
    });

};

/**
 * Fetches meeting data by ID from MOCK_MEETING_DATA.
 * @param meetingId - The ID of the meeting to fetch.
 * @returns Promise resolving to the Meeting object or null if not found.
 */

export async function findMeeting(meetingId: string): Promise<FullMeetingType | null> {
    const meeting = await prisma.meeting.findUnique({
        where: { id: meetingId },
        include: fullMeetingInclude,
    });

    if (!meeting) return null;

    return meeting

}

export const fullMeetingInclude = Prisma.validator<Prisma.MeetingInclude>()({
    host: true,
    participants: {
        include: {
            user: true,
            assignedByUser: true,
        },
    },
    messages: {
        include: {
            sender: true,
        },
    },
    transcript: true,
    summary: true,
    recordings: true,
});

export type FullMeetingType = Prisma.MeetingGetPayload<{
    include: typeof fullMeetingInclude;
}>;
