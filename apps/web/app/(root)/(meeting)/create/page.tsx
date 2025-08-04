"use client";
import { createNewMeeting } from "@infinityMeet/database";
import { meetingMock } from "@infinityMeet/mocks";
import { MeetingType } from "@infinityMeet/types";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { addNewMeeting } from "actions/AddNewMeeting";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { toast } from "sonner"

export default function Create() {
    const session = useSession();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        title: "",
        link: ""
    })
    const [callDetails, setCallDetails] = useState<Call>();
    const router = useRouter();

    const createMeeting = async () => {
        if (!client || !session?.data?.user) return;

        try {
            if (!values.dateTime) {
                toast("Please select a date and time for the meeting.");
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) throw new Error("Failed to create call");

            const startAt = values.dateTime.toISOString() || new Date().toISOString();
            const description = values.description || "Random Description";
            const title = values.title || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description, title
                    }
                }
            })

            // call db to save meeting
            const meeting: MeetingType = {
                id: call.id,
                title: values.title,
                description: values.description,
                scheduledAt: values.dateTime,
                status: "UPCOMING",
                createdAt: new Date(),
                startedAt: new Date(),
                isLive: false,
                hostId: session.data?.user?.id,
                participants: [],
                duration: 0
            }

            // send meeting to db
            await addNewMeeting(meeting);

            setCallDetails(call);

            if (!values.description) {
                router.push(`/${call.id}`);
            }

            toast("Meeting created..")


        } catch (error) {
            console.log(error);
            toast("Failed to create meeting.")
        }

    }

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold ">Create a Meeting</h2>
                    <p className="mt-2 opacity-80">
                        Schedule a new meeting or start instantly
                    </p>
                </div>

                <Card className="backdrop-blur-lg p-8">
                    <Link href="#" className="mx-auto">
                        <Button
                            variant="outline"
                            className="p-5"
                            onClick={createMeeting}
                        >
                            <Plus size={16} />
                            Start an Instant Meeting
                        </Button>
                    </Link>

                    <Link href="/schedule" className="mx-auto">
                        <Button
                            variant="outline"
                            className="p-5"
                        >
                            <Calendar size={16} />
                            Schedule a Meeting
                        </Button>
                    </Link>

                </Card>
            </div>
        </div>
    )
}