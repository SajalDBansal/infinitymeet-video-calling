"use client";
import { MeetingType } from "@infinityMeet/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { useLoadMeeting } from "hooks/useLoadMeeting";
import { ArrowLeft, Calendar, CheckCircle, Clock, Mic, MicOff, RefreshCw, User, Users, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useVideoStream, useMicStream } from "hooks/useMediaDevices";
import { DeviceSelectorVideo, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { FullMeetingType } from "@infinityMeet/database";
import { formatDateMeeting, formatTimeMeeting } from "@infinityMeet/util-function";

export function ConfigurationSetup({ meeting, setIsConfigsSet }: { meeting: FullMeetingType, setIsConfigsSet: (value: "config" | "waiting" | "start") => void }) {
    const session = useSession();
    const user = session.data?.user;
    const loadMeeting = useLoadMeeting(meeting);
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // Device settings
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState('');
    const [selectedMicrophone, setSelectedMicrophone] = useState('');
    const [selectedSpeaker, setSelectedSpeaker] = useState('');

    // Device lists
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
    const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);

    // Testing states
    const [micTesting, setMicTesting] = useState(false);
    const [speakerTesting, setSpeakerTesting] = useState(false);
    const [micLevel, setMicLevel] = useState(0);

    // The videoRef is now provided by useVideoStream
    const { videoStream, videoRef } = useVideoStream(selectedCamera, videoEnabled);
    const { micStream } = useMicStream(selectedMicrophone, audioEnabled);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within the StreamCall component");
    }

    useEffect(() => {
        if (!videoEnabled) {
            call?.camera.disable();
        } else {
            call?.camera.enable();
        }

        if (!audioEnabled) {
            call?.microphone.disable();
        } else {
            call?.microphone.enable();
        }

        return () => {
            call?.camera.disable();
            call?.microphone.disable();
        }

    }, [audioEnabled, videoEnabled, call?.camera, call?.microphone]);

    const joinMeeting = () => {
        // Store user preferences
        const preferences = {
            videoEnabled,
            audioEnabled,
            selectedCamera,
            selectedMicrophone,
            selectedSpeaker
        };
        localStorage.setItem('meetingPreferences', JSON.stringify(preferences));

        // Check if user is admin/host
        const isHost = user?.id === meeting?.hostId;

        if (isHost) {
            setIsConfigsSet("start");
        } else {
            if (meeting.status === "UPCOMING") {
                setIsConfigsSet("waiting");
            } else {
                setIsConfigsSet("start");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-light-text dark:text-dark-text">Loading meeting...</p>
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
                    <Button variant="default" onClick={() => { router.push("/dashboard") }}>
                        Back to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    const isHost = user?.id === meeting?.hostId;

    return (
        <div className="min-h-screen relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => { router.back() }}
                            className="mr-4"
                        >
                            {<ArrowLeft size={16} />}
                            Back
                        </Button>
                        <h1 className="text-3xl font-bold">
                            Setup & Join Meeting
                        </h1>
                        {meeting?.status === "LIVE" && (
                            <span className="ml-2 inline-flex items-center">
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Device Setup */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Preview */}
                        <Card className="p-6 gap-3">
                            <h2 className="text-xl font-semibold mb-4">Camera Preview</h2>

                            <div className="relative bg-gray-500 dark:bg-white/4 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                                {videoEnabled ? (
                                    <div className="absolute inset-0">
                                        <VideoPreview className="max-w-[1000px] h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <VideoOff className="h-16 w-16 mx-auto mb-4" />
                                            <p className=" dark:text-gray-400 font-bold text-xl">Camera is disabled</p>
                                        </div>
                                    </div>
                                )}

                                {/* Video controls overlay */}
                                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                    <button
                                        onClick={() => setVideoEnabled(!videoEnabled)}
                                        className={`p-2 rounded-full ${videoEnabled ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                            }`}
                                    >
                                        {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                                    </button>

                                    <button
                                        onClick={() => setAudioEnabled(!audioEnabled)}
                                        className={`p-2 rounded-full ${audioEnabled ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                            }`}
                                    >
                                        {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Camera Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
                                    Camera
                                </label>
                                <Select
                                    defaultValue={selectedCamera}
                                    onValueChange={(value) => setSelectedCamera(value)}
                                    disabled={!videoEnabled}
                                >
                                    <SelectTrigger className="w-full p-5" >
                                        <SelectValue placeholder="Camera Options" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Devices</SelectLabel>
                                            <div className="pl-3 py-2">
                                                <DeviceSelectorVideo />
                                            </div>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </div>
                        </Card>

                        {/* Audio Setup */}
                        <Card className="p-6 gap-3">
                            <h2 className="text-xl font-semibold mb-4">Audio Setup</h2>

                            <div className="space-y-4">
                                {/* Microphone */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Microphone
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Select
                                            defaultValue={selectedMicrophone}
                                            onValueChange={(value) => setSelectedMicrophone(value)}
                                            disabled={!audioEnabled}
                                        >
                                            <SelectTrigger className="w-full p-5" >
                                                <SelectValue placeholder="Microphone Options" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Devices</SelectLabel>
                                                    {
                                                        microphones[0]?.deviceId === "" ?
                                                            (<SelectItem value="No microphones found" key="no-mic">
                                                                No microphones found
                                                            </SelectItem>) : (
                                                                microphones.map((mic) => (
                                                                    <SelectItem value={mic.deviceId} key={mic.deviceId}>
                                                                        {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                                                                    </SelectItem>
                                                                )))}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                // testMicrophone();
                                            }}
                                            disabled={!audioEnabled}
                                        >
                                            {micTesting ? <RefreshCw size={16} className="animate-spin" /> : <Mic size={16} />}
                                            {micTesting ? 'Testing...' : 'Test'}
                                        </Button>
                                    </div>

                                    {/* Mic level indicator */}
                                    {micTesting && (
                                        <div className="mt-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-light-text dark:text-dark-text">Level:</span>
                                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full transition-all duration-100"
                                                        style={{ width: `${Math.min(micLevel * 2, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Speaker */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
                                        Speaker
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Select
                                            defaultValue={selectedSpeaker}
                                            onValueChange={(value) => setSelectedSpeaker(value)}
                                        >
                                            <SelectTrigger className="w-full p-5" >
                                                <SelectValue placeholder="Speaker Options" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Devices</SelectLabel>
                                                    {speakers[0]?.deviceId === "" ? (
                                                        <SelectItem value="No speakers found" key="no-speaker">
                                                            No speakers found
                                                        </SelectItem>) : (
                                                        speakers.map((speaker) => (
                                                            <SelectItem value={speaker.deviceId} key={speaker.deviceId}>
                                                                {speaker.label || `Microphone ${speaker.deviceId.slice(0, 8)}`}
                                                            </SelectItem>
                                                        )))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                // testSpeaker();
                                            }}
                                            disabled={speakerTesting}
                                        >
                                            {speakerTesting ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            {speakerTesting ? 'Playing...' : 'Test'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* System Check */}
                        <Card className="p-6 gap-3">
                            <h2 className="text-xl font-semibold mb-4">System Check</h2>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="">Camera Access</span>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-green-500 text-sm">Ready</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="">Microphone Access</span>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-green-500 text-sm">Ready</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="">Internet Connection</span>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-green-500 text-sm">Stable</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="">Browser Compatibility</span>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-green-500 text-sm">Supported</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Meeting Info & Join */}
                    <div className="space-y-6">
                        {/* Meeting Details */}
                        <Card className="p-6 gap-3">
                            <h2 className="text-xl font-semibold mb-4">Meeting Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-3">{meeting.title}</h3>
                                    {meeting.description && (
                                        <p className="text-sm opacity-60">{meeting.description}</p>
                                    )}
                                </div>

                                <div className="space-y-3 ">
                                    <div className="space-y-5 flex space-x-10 items-center">
                                        <div className="flex items-start space-x-3">
                                            <User className="h-5 w-5 text-primary-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium opacity-70">Hosted by</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {meeting.host.imageUrl ? (
                                                        <img
                                                            src={meeting.host.imageUrl}
                                                            alt={"name"}
                                                            className="h-6 w-6 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-center flex justify-center items-center">
                                                            {meeting.host?.name?.[0] ?? "?"}
                                                        </div>
                                                    )}
                                                    <span className="">{meeting.host?.name}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Calendar className="h-5 w-5 text-secondary-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium opacity-70">Date & Time</p>
                                                <p >{formatDateMeeting(meeting.scheduledAt)}</p>
                                                <p >{formatTimeMeeting(meeting.scheduledAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5 flex space-x-15 ">
                                        <div className="flex items-start space-x-3">
                                            <Clock className="h-5 w-5 text-accent-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium opacity-70">Duration</p>
                                                <p >{meeting.duration} minutes</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Users className="h-5 w-5 text-primary-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium opacity-70">Participants</p>
                                                <p >{meeting.participants?.length} people</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>




                            </div>
                        </Card>

                        {/* Settings Summary */}
                        <Card className="p-6 gap-3">
                            <h2 className="text-xl font-semibold mb-4">Your Settings</h2>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span>Camera</span>
                                    <div className="flex items-center space-x-2">
                                        {videoEnabled ? (
                                            <Video className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <VideoOff className="h-4 w-4 text-red-500" />
                                        )}
                                        <span className={`text-sm ${videoEnabled ? 'text-green-500' : 'text-red-500'}`}>
                                            {videoEnabled ? 'On' : 'Off'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Microphone</span>
                                    <div className="flex items-center space-x-2">
                                        {audioEnabled ? (
                                            <Mic className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <MicOff className="h-4 w-4 text-red-500" />
                                        )}
                                        <span className={`text-sm ${audioEnabled ? 'text-green-500' : 'text-red-500'}`}>
                                            {audioEnabled ? 'On' : 'Off'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Join Button */}
                        <Card className="p-6 gap-3">
                            <div className="text-center">
                                <Button
                                    variant="default"
                                    size="xl"
                                    onClick={() => {
                                        // joinMeeting();
                                    }}
                                    className="w-full"
                                >
                                    <Video size={20} />
                                    {isHost ? 'Start Meeting' : 'Join Meeting'}
                                </Button>

                                <p className="text-xs text-light-text dark:text-dark-text opacity-70 mt-3">
                                    {isHost
                                        ? 'You will start the meeting for all participants'
                                        : 'You will enter the waiting room until the host starts the meeting'
                                    }
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}