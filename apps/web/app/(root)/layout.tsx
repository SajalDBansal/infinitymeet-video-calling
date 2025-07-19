import { NEXT_AUTH } from "@infinityMeet/auth";
import { getServerSession } from "next-auth";
import { StreamClientProvider } from "providers/StreamClientProvider";

export default async function ConferenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <StreamClientProvider>
                {children}
            </StreamClientProvider>
        </div>
    );
}