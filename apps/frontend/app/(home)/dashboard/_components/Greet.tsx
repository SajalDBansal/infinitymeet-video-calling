
import { NEXT_AUTH } from "@infinityMeet/auth";
import { getServerSession } from "next-auth"

export default async function Greet() {
    const session = await getServerSession(NEXT_AUTH);

    return (
        <div className="mb-8">
            <h1
                className="text-3xl font-bold"
            >
                Welcome, {session?.user?.name.toUpperCase()}
            </h1>
            <p className="opacity-80 mt-2">
                Manage your meetings and join conferences from your personal dashboard.
            </p>
        </div>
    )
}