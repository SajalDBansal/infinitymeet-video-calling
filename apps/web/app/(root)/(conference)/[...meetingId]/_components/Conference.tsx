"use client";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { ChevronLeft, ChevronRight, Grid3X3, Hand, List, Maximize, Mic, MicOff, MonitorDown, MonitorSmartphone, PenTool, Send, VideoIcon, VideoOff, X, Share, FileText, MessageSquare, Users, Settings, MoreVertical, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock participants data
const MOCK_PARTICIPANTS = [
    {
        id: '1',
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        audio: true,
        video: true,
        screen: false
    },
    {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        audio: true,
        video: true,
        screen: false
    },
    {
        id: '3',
        name: 'Robert Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        audio: false,
        video: true,
        screen: false
    },
    {
        id: '4',
        name: 'Emily Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        audio: true,
        video: false,
        screen: true
    }
];

// Mock chat messages
const INITIAL_CHAT_MESSAGES = [
    {
        id: '1',
        senderId: '2',
        senderName: 'Jane Smith',
        content: 'Hello everyone, shall we begin?',
        timestamp: new Date(Date.now() - 5 * 60000) // 5 minutes ago
    },
    {
        id: '2',
        senderId: '3',
        senderName: 'Robert Johnson',
        content: 'Yes, I have the presentation ready.',
        timestamp: new Date(Date.now() - 3 * 60000) // 3 minutes ago
    },
    {
        id: '3',
        senderId: '4',
        senderName: 'Emily Wilson',
        content: 'Great! Looking forward to seeing it.',
        timestamp: new Date(Date.now() - 1 * 60000) // 1 minute ago
    }
];


export const Conference = () => {
    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter();

    const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
    const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [localAudio, setLocalAudio] = useState(true);
    const [localVideo, setLocalVideo] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'speaker' | 'gallery'>('grid');
    const [showTranscript, setShowTranscript] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [transcript, setTranscript] = useState([
        { id: '1', speaker: 'John Doe', text: 'Good morning everyone, let\'s start our meeting.', timestamp: new Date() },
        { id: '2', speaker: 'Jane Smith', text: 'Hello! I have the presentation ready.', timestamp: new Date() },
        { id: '3', speaker: 'Robert Johnson', text: 'Great, looking forward to seeing it.', timestamp: new Date() }
    ]);

    // Format timestamp for chat messages
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Toggle local audio
    const toggleAudio = () => {
        setLocalAudio(!localAudio);
        // Update participant list to reflect change
        setParticipants(prev =>
            prev.map(p => p.id === '1' ? { ...p, audio: !localAudio } : p)
        );
    };

    // Toggle local video
    const toggleVideo = () => {
        setLocalVideo(!localVideo);
        // Update participant list to reflect change
        setParticipants(prev =>
            prev.map(p => p.id === '1' ? { ...p, video: !localVideo } : p)
        );
    };

    // Toggle screen sharing
    const toggleScreenSharing = () => {
        // In a real app, we would handle screen sharing via WebRTC
        setScreenSharing(!screenSharing);
        // Update participant list to reflect change
        setParticipants(prev =>
            prev.map(p => p.id === '1' ? { ...p, screen: !screenSharing } : p)
        );
    };

    // Toggle hand raised status
    const toggleHandRaised = () => {
        setHandRaised(!handRaised);
    };

    // Send chat message
    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        const message = {
            id: (chatMessages.length + 1).toString(),
            senderId: '1',
            senderName: user?.name || 'You',
            content: newMessage,
            timestamp: new Date()
        };

        setChatMessages([...chatMessages, message]);
        setNewMessage('');
    };

    // End call and navigate back to dashboard
    const endCall = () => {
        router.push('/dashboard');
    };

    // Determine grid layout based on number of participants and view mode
    const getGridClass = (isMainView = true) => {
        const count = participants.length;

        if (viewMode === 'speaker') {
            return isMainView ? 'grid-cols-1' : 'grid-cols-1';
        }

        if (screenSharing || showWhiteboard) {
            return 'grid-cols-1 sm:grid-cols-2';
        }

        if (viewMode === 'gallery') {
            if (count <= 4) return 'grid-cols-1 sm:grid-cols-2';
            if (count <= 9) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
            return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
        }

        // Default grid view
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-1 md:grid-cols-2';
        if (count === 3 || count === 4) return 'grid-cols-1 sm:grid-cols-2';
        if (count <= 6) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="h-screen flex flex-col bg-dark-background">
            {/* Main content area */}
            <div className="flex-1 flex">
                {/* Main video area */}
                <div className={`flex-1 p-4 relative transition-all duration-300 ${(screenSharing || showWhiteboard) && !sidebarCollapsed ? 'mr-80' : ''
                    }`}>
                    {/* View mode controls */}
                    <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-white hover:bg-white/20'}`}
                            title="Grid View"
                        >
                            <Grid3X3 size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('speaker')}
                            className={`p-2 rounded ${viewMode === 'speaker' ? 'bg-primary-600 text-white' : 'text-white hover:bg-white/20'}`}
                            title="Speaker View"
                        >
                            <Maximize size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('gallery')}
                            className={`p-2 rounded ${viewMode === 'gallery' ? 'bg-primary-600 text-white' : 'text-white hover:bg-white/20'}`}
                            title="Gallery View"
                        >
                            <List size={16} />
                        </button>
                    </div>

                    {/* Screen sharing or whiteboard area */}
                    {(screenSharing || showWhiteboard) && (
                        <div className="h-full flex">
                            {/* Shared content area */}
                            <div className="flex-1 bg-gray-900 rounded-lg mr-4 flex items-center justify-center">
                                {screenSharing && (
                                    <div className="text-center text-white">
                                        <MonitorDown className="h-16 w-16 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">Screen Sharing</h3>
                                        <p className="opacity-80">John Doe is sharing their screen</p>
                                    </div>
                                )}

                                {showWhiteboard && (
                                    <div className="w-full h-full bg-white rounded-lg relative">
                                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                                            <PenTool className="h-5 w-5 text-gray-600" />
                                            <span className="text-gray-600 font-medium">Whiteboard</span>
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <div className="text-center">
                                                <PenTool className="h-16 w-16 mx-auto mb-4" />
                                                <p>Whiteboard tools would be here</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Participant thumbnails */}
                            <div className="w-48 space-y-2 overflow-y-auto">
                                {participants.map((participant) => (
                                    <div key={participant.id} className="relative h-32 bg-gray-900 rounded-lg overflow-hidden">
                                        {participant.video ? (
                                            <img
                                                src={participant.avatar}
                                                alt={participant.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
                                                    {participant.name.charAt(0)}
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 left-1 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded px-1 py-0.5">
                                            <span className="text-white text-xs">{participant.name}</span>
                                            {!participant.audio && (
                                                <MicOff size={10} className="text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Normal video grid */}
                    {!screenSharing && !showWhiteboard && (
                        <div className={`grid ${getGridClass()} gap-4 h-full`}>
                            {viewMode === 'speaker' ? (
                                <>
                                    {/* Main speaker */}
                                    <div className="relative h-full">
                                        <div className="bg-gray-900 rounded-lg h-full w-full overflow-hidden flex items-center justify-center border border-gray-800">
                                            {participants[0]?.video ? (
                                                <img
                                                    src={participants[0].avatar}
                                                    alt={participants[0].name}
                                                    className="h-64 w-64 object-cover"
                                                />
                                            ) : (
                                                <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center text-white text-4xl font-semibold">
                                                    {participants[0]?.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-md px-3 py-2">
                                                <span className="text-white text-lg font-medium">{participants[0]?.name}</span>
                                                {!participants[0]?.audio && (
                                                    <MicOff size={18} className="text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other participants thumbnails */}
                                    <div className="absolute bottom-4 right-4 flex space-x-2">
                                        {participants.slice(1, 4).map((participant) => (
                                            <div key={participant.id} className="relative w-32 h-24 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                                                {participant.video ? (
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center">
                                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
                                                            {participant.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-1 left-1 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded px-1 py-0.5">
                                                    <span className="text-white text-xs">{participant.name}</span>
                                                    {!participant.audio && (
                                                        <MicOff size={10} className="text-red-500" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // Grid and Gallery views
                                participants.map((participant) => (
                                    <div key={participant.id} className="relative h-full">
                                        <div className="bg-gray-900 rounded-lg h-full w-full overflow-hidden flex items-center justify-center border border-gray-800">
                                            {participant.video ? (
                                                <img
                                                    src={participant.avatar}
                                                    alt={participant.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-semibold">
                                                    {participant.name.charAt(0)}
                                                </div>
                                            )}
                                            {participant.screen && (
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-md">
                                                    Sharing Screen
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 left-2 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                                                <span className="text-white text-sm">{participant.name}</span>
                                                {!participant.audio && (
                                                    <MicOff size={14} className="text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Meeting info */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                        {/* <span className="text-white font-mono">ID: {meetingId}</span> */}
                        <span className="text-white font-mono">ID: {"aKJFH"}</span>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                </div>

                {/* Collapsible sidebar toggle */}
                {(showChat || showParticipants || showTranscript) && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-dark-card border border-dark-border rounded-l-lg p-2 text-white hover:bg-gray-700"
                    >
                        {sidebarCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                )}

                {/* Side panels (chat, participants, transcript) */}
                <div
                    className="bg-dark-card border-l border-dark-border overflow-hidden"
                >
                    {/* Transcript Panel */}
                    {showTranscript && !sidebarCollapsed && (
                        <div className="h-full flex flex-col">
                            <div className="p-4 border-b border-dark-border flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-dark-text">Live Transcript</h2>
                                <button
                                    onClick={() => setShowTranscript(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {transcript.map((entry) => (
                                    <div key={entry.id} className="border-l-2 border-primary-500 pl-3">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium text-white text-sm">{entry.speaker}</span>
                                            <span className="text-xs text-gray-400">{formatTime(entry.timestamp)}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm">{entry.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat Panel */}
                    {showChat && !sidebarCollapsed && (
                        <div className="h-full flex flex-col">
                            <div className="p-4 border-b border-dark-border flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-dark-text">Chat</h2>
                                <button
                                    onClick={() => setShowChat(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.senderId === '1'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-700 text-gray-100'
                                            }`}>
                                            {message.senderId !== '1' && (
                                                <div className="text-xs font-semibold mb-1">{message.senderName}</div>
                                            )}
                                            <p>{message.content}</p>
                                            <div className="text-xs opacity-70 text-right mt-1">
                                                {formatTime(message.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-dark-border">
                                <form onSubmit={sendMessage} className="flex space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="px-3"
                                    >
                                        <Send size={16} />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Participants Panel */}
                    {showParticipants && !sidebarCollapsed && (
                        <div className="h-full flex flex-col">
                            <div className="p-4 border-b border-dark-border flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-dark-text">Participants ({participants.length})</h2>
                                <button
                                    onClick={() => setShowParticipants(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <ul className="space-y-3">
                                    {participants.map((participant) => (
                                        <li key={participant.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">
                                                        {participant.name} {participant.id === '1' && '(You)'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {participant.audio ? (
                                                    <Mic size={16} className="text-green-500" />
                                                ) : (
                                                    <MicOff size={16} className="text-red-500" />
                                                )}
                                                {participant.video ? (
                                                    <VideoIcon size={16} className="text-green-500" />
                                                ) : (
                                                    <VideoOff size={16} className="text-red-500" />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls bar */}
            <div className="bg-dark-card border-t border-dark-border p-4">
                <div className="flex flex-wrap items-center justify-center md:justify-between">
                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <button
                            onClick={toggleAudio}
                            className={`p-3 rounded-full ${localAudio ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            {localAudio ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>

                        <button
                            onClick={toggleVideo}
                            className={`p-3 rounded-full ${localVideo ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            {localVideo ? <VideoIcon size={20} /> : <VideoOff size={20} />}
                        </button>

                        <button
                            onClick={toggleScreenSharing}
                            className={`p-3 rounded-full ${screenSharing ? 'bg-primary-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            {screenSharing ? <MonitorDown size={20} /> : <MonitorSmartphone size={20} />}
                        </button>

                        <button
                            onClick={() => setShowWhiteboard(!showWhiteboard)}
                            className={`p-3 rounded-full ${showWhiteboard ? 'bg-accent-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            <PenTool size={20} />
                        </button>

                        <button
                            onClick={toggleHandRaised}
                            className={`p-3 rounded-full ${handRaised ? 'bg-accent-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            <Hand size={20} />
                        </button>

                        <div className="hidden md:block">
                            <button
                                onClick={() => { }}
                                className="p-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition-colors"
                            >
                                <Share size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <button
                            onClick={() => {
                                setShowTranscript(true);
                                setShowChat(false);
                                setShowParticipants(false);
                                setSidebarCollapsed(false);
                            }}
                            className={`p-3 rounded-full ${showTranscript ? 'bg-primary-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            <FileText size={20} />
                        </button>

                        <button
                            onClick={() => {
                                setShowChat(true);
                                setShowParticipants(false);
                                setShowTranscript(false);
                                setSidebarCollapsed(false);
                            }}
                            className={`p-3 rounded-full ${showChat ? 'bg-primary-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            <MessageSquare size={20} />
                        </button>

                        <button
                            onClick={() => {
                                setShowParticipants(true);
                                setShowChat(false);
                                setShowTranscript(false);
                                setSidebarCollapsed(false);
                            }}
                            className={`p-3 rounded-full ${showParticipants ? 'bg-primary-600 text-white' : 'bg-gray-700 text-white'
                                } hover:opacity-90 transition-colors`}
                        >
                            <Users size={20} />
                        </button>

                        <div className="hidden md:block">
                            <button
                                onClick={() => { }}
                                className="p-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition-colors"
                            >
                                <Settings size={20} />
                            </button>
                        </div>

                        <div className="hidden md:block">
                            <button
                                onClick={() => { }}
                                className="p-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition-colors"
                            >
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={endCall}
                        className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        <Phone size={20} className="transform rotate-135" />
                    </button>
                </div>
            </div>
        </div>
    );
}