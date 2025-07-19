import { getServerSession } from "next-auth";
import Actions from "./_components/Actions";
import Greet from "./_components/Greet";
import Previous from "./_components/Previous";
import Stats from "./_components/Stats";
import Upcoming from "./_components/Upcoming";
import { NEXT_AUTH } from "@infinityMeet/auth";
import { getAllMeetings } from "@infinityMeet/database";

export default async function Dashboard() {
    const session = await getServerSession(NEXT_AUTH);
    const meetings = await getAllMeetings(session.user.id);

    const upcomingMeetings = meetings.filter(meeting => meeting.status === "UPCOMING" || meeting.status === "LIVE");
    const pastMeetings = meetings.filter(meeting => meeting.status === "COMPLETED");

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Greet />
            <Actions />
            <Upcoming meeting={upcomingMeetings} />
            <Previous meeting={pastMeetings} />
            <Stats />
        </div>
    )
}