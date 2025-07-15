import { findMeeting } from "@infinityMeet/database";
import MeetingDetails from "./_components/MeetingDetails";
import MeetingNotFound from "./_components/MeetingNotFound";

export default async function Meeting({ params }: { params: { meetingId: string } }) {
    const { meetingId } = await params;
    const meeting = await findMeeting(meetingId);

    if (!meeting) {
        return <MeetingNotFound />
    }

    return (
        <MeetingDetails meeting={meeting} />
    )
}

