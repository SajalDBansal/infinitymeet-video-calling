"use client";
import { MeetingParticipantType, MeetingType } from "@infinityMeet/types"
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { ArrowLeft, Calendar, Clock, Loader, Mic, MicOff, Settings, User, Video, VideoOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useVideoStream, useMicStream } from "hooks/useMediaDevices";
import { FullMeetingType } from "@infinityMeet/database";

export const Waiting = ({ meeting, setIsConfigsSet }: { meeting: FullMeetingType, setIsConfigsSet: (value: "config" | "waiting" | "start") => void }) => {
    const session = useSession();
    const user = session.data?.user;
    const router = useRouter();
    // const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [waitingTime, setWaitingTime] = useState(0);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState('');
    const [selectedMicrophone, setSelectedMicrophone] = useState('');
    const [selectedSpeaker, setSelectedSpeaker] = useState('');

    // Simulate checking if meeting has started
    const [checkingMeetingStatus, setCheckingMeetingStatus] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            // Load user preferences from pre-meeting setup
            const preferences = localStorage.getItem('meetingPreferences');

            if (preferences) {
                const parsed = JSON.parse(preferences);
                setVideoEnabled(parsed.videoEnabled);
                setAudioEnabled(parsed.audioEnabled);
                setSelectedCamera(parsed.selectedCamera || '');
                setSelectedMicrophone(parsed.selectedMicrophone || '');
                setSelectedSpeaker(parsed.selectedSpeaker || '');
            }
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        // Start waiting timer
        const timer = setInterval(() => {
            setWaitingTime(prev => prev + 1);
        }, 1000);

        // Simulate periodic checks for meeting start
        const statusCheck = setInterval(() => {
            setCheckingMeetingStatus(true);

            // Simulate API call to check if meeting started
            setTimeout(() => {
                setCheckingMeetingStatus(false);

                // Randomly start meeting after 30 seconds for demo
                if (waitingTime > 30 && Math.random() > 0.7) {
                    // navigate(`/conference/${id}`);
                }
            }, 1000);
        }, 5000);

        return () => {
            clearInterval(timer);
            clearInterval(statusCheck);
        };
    }, [waitingTime]);

    // Use the hooks for video/mic stream management
    const { videoStream, videoRef } = useVideoStream(selectedCamera, videoEnabled);
    const { micStream } = useMicStream(selectedMicrophone, audioEnabled);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const leaveMeeting = () => {
        router.push("/dashboard");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-light-text dark:text-dark-text">Loading...</p>
                </div>
            </div>
        );
    }

    if (!meeting) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="p-12 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Meeting Not Found</h2>
                    <p className="text-light-text dark:text-dark-text opacity-80 mb-6">
                        The meeting you're trying to join doesn't exist.
                    </p>
                    <Button variant="default" onClick={() => { }}>
                        Back to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background relative">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                                Waiting for Host
                            </h1>
                            <p className="text-lg text-light-text dark:text-dark-text opacity-80">
                                The meeting hasn't started yet. Please wait for the host to begin.
                            </p>
                        </div>

                        {/* Status indicator */}
                        <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                                    Waiting Room
                                </span>
                            </div>
                            {checkingMeetingStatus && (
                                <div className="flex items-center space-x-2 ml-4">
                                    <Loader className="h-4 w-4 animate-spin text-primary-600" />
                                    <span className="text-sm text-light-text dark:text-dark-text opacity-70">
                                        Checking status...
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main waiting area */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Video preview */}
                            <Card className="p-6 gap-3">
                                <div className="relative bg-white/4 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                    {videoEnabled ? (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <VideoOff className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                                <p className="text-gray-400">Camera is disabled</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Controls overlay */}
                                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                        <button
                                            onClick={() => setVideoEnabled(!videoEnabled)}
                                            className={`p-3 rounded-full ${videoEnabled ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                                } hover:opacity-90 transition-colors`}
                                        >
                                            {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                                        </button>

                                        <button
                                            onClick={() => setAudioEnabled(!audioEnabled)}
                                            className={`p-3 rounded-full ${audioEnabled ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                                } hover:opacity-90 transition-colors`}
                                        >
                                            {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                                        </button>

                                        <button
                                            onClick={() => { }}
                                            className="p-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition-colors"
                                        >
                                            <Settings size={20} />
                                        </button>
                                    </div>
                                </div>
                            </Card>

                            {/* Waiting message */}
                            <Card className="text-center p-8 gap-3">
                                <div className="mb-6">
                                    <div className="flex items-center justify-center space-x-2 mb-4">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Waiting for the host to start the meeting
                                    </h3>
                                    <p className="opacity-80">
                                        You'll be automatically admitted when the meeting begins.
                                    </p>
                                </div>

                                <div className="bg-gray-100 dark:bg-white/4 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {formatTime(waitingTime)}
                                            </p>
                                            <p className="text-sm opacity-70">
                                                Waiting time
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="xl"
                                    onClick={leaveMeeting}
                                >
                                    <ArrowLeft size={16} />
                                    Leave Waiting Room
                                </Button>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Meeting info */}
                            <Card className="p-6 gap-3">
                                <h3 className="text-lg font-semibold mb-4 ">
                                    Meeting Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-1">
                                            {meeting.title}
                                        </h4>
                                        {meeting.description && (
                                            <p className="text-sm opacity-80">
                                                {meeting.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <User className="h-4 w-4 text-primary-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium opacity-70">
                                                Host
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {meeting.host.imageUrl ? (
                                                    <img
                                                        src={meeting.host?.imageUrl}
                                                        alt={"name"}
                                                        className="h-5 w-5 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-center flex justify-center items-center">
                                                        {meeting.host?.name?.[0] ?? "?"}
                                                    </div>
                                                )}
                                                <span className="text-sm ">
                                                    {meeting.host?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Calendar className="h-4 w-4 text-secondary-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium opacity-70">
                                                Scheduled
                                            </p>
                                            <p className="text-sm ">
                                                {formatDateTime(meeting.scheduledAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Clock className="h-4 w-4 text-accent-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium opacity-70">
                                                Duration
                                            </p>
                                            <p className="text-sm">
                                                {meeting.duration} minutes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Other participants waiting */}
                            <Card className="p-6 gap-3">
                                <h3 className="text-lg font-semibold mb-4">
                                    Also Waiting ({meeting.participants?.length})
                                </h3>

                                <div className="space-y-3">
                                    {meeting.participants?.map((participant, key: number) => (
                                        <div key={key} className="flex items-center space-x-3">
                                            {participant?.user?.imageUrl ? (
                                                <img
                                                    src={participant.user?.imageUrl}
                                                    alt={"name"}
                                                    className="h-8 w-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-center flex justify-center items-center">
                                                    {participant.user?.name?.[0] ?? "?"}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {participant.user?.name}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                                    <span className="text-xs opacity-70">
                                                        Waiting
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Tips */}
                            <Card className="p-6 gap-3">
                                <h3 className="text-lg font-semibold mb-4">
                                    While You Wait
                                </h3>

                                <div className="space-y-3 text-sm opacity-80">
                                    <div className="flex items-start space-x-3">
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Test your camera and microphone using the controls</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Check your internet connection is stable</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Prepare any materials you might need</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>You'll be automatically admitted when the host starts</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}