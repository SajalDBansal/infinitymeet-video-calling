
import { NEXT_AUTH } from "@infinityMeet/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MeetingLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/signin");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default MeetingLayout;

