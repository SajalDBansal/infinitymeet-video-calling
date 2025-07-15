"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card";
import { Input } from "components/ui/input"
import { LinkIcon, Plus, Users, Video } from "lucide-react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Join() {
    const [meetingId, setMeetingId] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            setError("Please sign in to join a meeting");
        }
    }, [session.status]);


    const handleJoinMeeting = (e: React.FormEvent) => {
        e.preventDefault();

        if (session.status === "unauthenticated") {
            router.push("/signin");
            return;
        }

        if (!meetingId.trim()) {
            setError('Please enter a meeting ID');
            return;
        }

        if (!userName.trim()) {
            setError('Please enter your name');
            return;
        }

        // In a real app, we would validate the meeting ID exists
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full">
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Join a Meeting</h2>
                        <p className="mt-2 text-light-text dark:text-dark-text opacity-80">
                            Enter a meeting ID to join an existing conference
                        </p>
                    </div>

                    <Card className="backdrop-blur-lg p-8">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleJoinMeeting} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="meetingId" className="text-sm flex gap-x-2 font-semibold">
                                    <LinkIcon size={16} className="text-gray-500" />
                                    Meeting ID
                                </label>
                                <Input
                                    id="meetingId"
                                    type="text"
                                    placeholder="Enter meeting ID"
                                    value={meetingId}
                                    onChange={(e) => setMeetingId(e.target.value)}
                                    className="p-5"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="userName" className="text-sm flex gap-x-2 font-semibold">
                                    <Users size={16} className="text-gray-500" />
                                    Your Name
                                </label>
                                <Input
                                    id="userName"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="p-5"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                className="p-5 w-full"
                                onClick={handleJoinMeeting}
                            >
                                <Video size={16} />
                                Join Meeting
                            </Button>
                        </form>

                        <div className="text-center border-t border-light-border dark:border-dark-border pt-6">
                            <p className="text-sm text-light-text dark:text-dark-text mb-4">
                                Don't have a meeting ID?
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/create")}
                            >
                                <Plus size={16} />
                                Create New Meeting
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    )
}