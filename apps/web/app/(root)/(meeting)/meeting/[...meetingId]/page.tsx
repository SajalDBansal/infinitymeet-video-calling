import { findMeeting } from "@infinityMeet/database";
import MeetingDetails from "./_components/MeetingDetails";
import MeetingNotFound from "./_components/MeetingNotFound";

export default async function Meeting({ params }: { params: Promise<{ meetingId: string }> }) {
    const { meetingId } = await params;
    const id = Array.isArray(meetingId) ? meetingId[0] : meetingId;
    const meeting = await findMeeting(id);

    if (!meeting) {
        return <MeetingNotFound />
    }

    return (
        <MeetingDetails meeting={meeting} />
    )
}

