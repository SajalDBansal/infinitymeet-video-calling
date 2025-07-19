"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card";
import { Input } from "components/ui/input";
import { Select } from "components/ui/select";
import { Textarea } from "components/ui/textarea";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select";
import { Calendar, Check, Clipboard, Clock, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Schedule() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('60');
    const [participants, setParticipants] = useState('');
    const [isMeetingCreated, setIsMeetingCreated] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const [copied, setCopied] = useState(false);
    const meetingLinkRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isMeetingCreated) {
            // Generate a random meeting ID
            setMeetingId(Math.random().toString(36).substring(2, 10));
        }
    }, [isMeetingCreated]);

    const handleCreateMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we would save the meeting details to a database
        setIsMeetingCreated(true);
    };

    const copyMeetingLink = () => {
        if (meetingLinkRef.current) {
            meetingLinkRef.current.select();
            navigator.clipboard.writeText(meetingLinkRef.current.value);
            toast("Meeting link copied to clipboard");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const joinMeeting = () => { };

    return (
        <div className="h-[calc(100vh-4rem)] container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="max-w-2xl mx-auto mb-5">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold ">
                        {isMeetingCreated ? 'Meeting Created' : 'Create New Meeting'}
                    </h2>
                    <p className="mt-2 opacity-80">
                        {isMeetingCreated
                            ? 'Your meeting is ready. Share the link with participants.'
                            : 'Schedule a new video conference'
                        }
                    </p>
                </div>

                <Card className="backdrop-blur-lg p-8">
                    {isMeetingCreated ? (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                    {title || 'Meeting'} is Ready
                                </h3>
                            </div>

                            <div className="rounded-lg p-2 border">
                                <p className="text-sm font-medium mb-2">Meeting ID</p>
                                <div className="flex items-center">
                                    <Input
                                        ref={meetingLinkRef}
                                        type="text"
                                        value={meetingId}
                                        readOnly
                                        className="bg-transparent"
                                    />
                                    <Button
                                        variant="ghost"
                                        className="ml-2"
                                        onClick={copyMeetingLink}
                                        aria-label="Copy meeting ID"
                                    >
                                        {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {title && (
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 opacity-70 mr-3">
                                            <Video size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Title</p>
                                            <p>{title}</p>
                                        </div>
                                    </div>
                                )}

                                {date && time && (
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 opacity-70 mr-3">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Date & Time</p>
                                            <p>{date} at {time}</p>
                                        </div>
                                    </div>
                                )}

                                {duration && (
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 opacity-70 mr-3">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Duration</p>
                                            <p>{duration} minutes</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                                <Button
                                    variant="default"
                                    onClick={joinMeeting}
                                >
                                    <Video size={16} />
                                    Start Meeting Now
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Back to Dashboard
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleCreateMeeting} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm flex gap-x-2 font-semibold">
                                    Meeting Title
                                </label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter meeting title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="p-5"
                                />
                            </div>


                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm flex gap-x-2 font-semibold">
                                    Meeting Description
                                </label>
                                <Textarea
                                    id="description"
                                    rows={5}
                                    className="p-5 h-30"
                                    placeholder="Enter meeting description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Textarea>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="date" className="text-sm flex gap-x-2 font-semibold">
                                        Date
                                    </label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        required
                                        onChange={(e) => setDate(e.target.value)}
                                        className="p-5"
                                    />

                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="time" className="text-sm flex gap-x-2 font-semibold">
                                        Time
                                    </label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={time}
                                        required
                                        onChange={(e) => setTime(e.target.value)}
                                        className="p-5"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="duration" className="text-sm flex gap-x-2 font-semibold">
                                    Duration (minutes)
                                </label>
                                <Select
                                    defaultValue={duration}
                                    onValueChange={(value) => setDuration(value)}
                                >
                                    <SelectTrigger className="w-full p-5" >
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Durations</SelectLabel>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="45">45 minutes</SelectItem>
                                            <SelectItem value="60">60 minutes</SelectItem>
                                            <SelectItem value="90">90 minutes</SelectItem>
                                            <SelectItem value="120">120 minutes</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="participants" className="text-sm flex gap-x-2 font-semibold">
                                    Invite Participants (Optional)
                                </label>
                                <Input
                                    id="participants"
                                    type="text"
                                    placeholder="Enter email addresses separated by commas"
                                    value={participants}
                                    onChange={(e) => setParticipants(e.target.value)}
                                    className="p-5"
                                />

                            </div>


                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    variant="default"
                                >
                                    <Calendar size={16} />
                                    Create Meeting
                                </Button>
                            </div>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    )
}