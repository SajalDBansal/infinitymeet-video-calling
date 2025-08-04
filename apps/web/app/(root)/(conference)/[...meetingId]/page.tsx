import { findMeeting } from "@infinityMeet/database";
import { MeetingNotFound } from "./_components/MeetingNotFound";
import { MeetingSetup } from "./_components/meetingSetup";
import { CompletedMeeting } from "./_components/CompletedMeet";
import { Text } from "./_components/text";

export default async function MeetingHome({ params }: { params: Promise<{ meetingId: string }> }) {
    const { meetingId } = await params;
    const id = Array.isArray(meetingId) ? meetingId[0] : meetingId;
    const meeting = await findMeeting(id);

    if (!meeting) {
        return <MeetingNotFound />
    }

    if (meeting.status === "COMPLETED") {
        return (
            <CompletedMeeting />
        )
    }

    return (
        <MeetingSetup meeting={meeting} />
        // <Text id={meetingId} />
    )
}