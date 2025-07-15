"use client";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Input } from "components/ui/input";
import { Calendar, Clock, Grid, List, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK_MEETINGS = [
    {
        id: '1',
        title: 'Product Team Standup',
        description: 'Daily team check-in',
        startTime: new Date('2025-07-10T09:00:00'),
        isActive: false,
        duration: 60,
        host: "sahaj",
        participants: ['1', '2', '3']
    },
    {
        id: '2',
        title: 'Client Presentation',
        description: 'Quarterly review with XYZ Corp',
        startTime: new Date('2025-07-10T14:00:00'),
        isActive: false,
        duration: 45,
        host: "sajal dutt bansal",
        participants: ['1', '2', '5', '8']
    },
    {
        id: '3',
        title: 'Design Review',
        description: 'Review latest UI updates',
        startTime: new Date('2025-07-11T11:00:00'),
        isActive: false,
        duration: 82,
        host: "sahaj",
        participants: ['1', '4', '7']
    },
    {
        id: '4',
        title: 'Marketing Strategy',
        description: 'Plan Q3 marketing campaigns',
        startTime: new Date('2025-07-12T13:30:00'),
        isActive: false,
        duration: 46.85,
        host: "sahaj",
        participants: ['1', '6', '9']
    }
];

export default function Previous() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Format date as "Mon, Jul 10"
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    // Format time as "9:00 AM"
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const formateDuration = (duration: number) => {
        if (duration >= 60) {
            const h = Math.floor(duration / 60);
            const m = Math.round(duration % 60);
            return `${h}h ${m}m`;
        } else if (duration % 1 !== 0) {
            const m = Math.floor(duration);
            const s = Math.round((duration % 1) * 60);
            return `${m}m ${s}s`;
        } else {
            return `${duration}m`;
        }
    }

    // Filter meetings based on search query
    const filteredMeetings = MOCK_MEETINGS.filter(meeting =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.host.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const createNewMeeting = () => {
        // In a real app, we would create a meeting and then navigate to it
    };

    return (
        <div
            className="mb-8"
        >
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h2 className="text-xl font-semibold mb-4">Previous Meetings</h2>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search meetings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Search size={16} className="text-gray-500" />
                        </div>
                    </div>

                    <div className="flex items-center rounded-lg p-1 bg-white dark:bg-white/4">
                        <button
                            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {filteredMeetings.length === 0 ? (
                <Card className="p-8 text-center">
                    <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold">No records found</h3>
                    <p className="opacity-80 mb-2">You don't have any meetings record.</p>
                    <Button
                        variant="default"
                        onClick={createNewMeeting}
                        className="mx-auto"
                        size="xl"
                    >
                        <Plus size={16} />
                        Create a Meeting
                    </Button>
                </Card>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMeetings.map((meeting) => (
                        <Card key={meeting.id} className="p-0 overflow-hidden hover:shadow-md hover:shadow-white/8 transition-shadow duration-300">
                            <div className="px-6 pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{meeting.title} &nbsp; - {meeting.host.split(" ")[0]}</h3>
                                    <div className="ml-2 flex-shrink-0">
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/4">
                                            {meeting.participants.length} Participants
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm opacity-80 mb-4">{meeting.description}</p>
                                    <div className="ml-2 flex-shrink-0">
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/4">
                                            {formateDuration(meeting.duration)}
                                        </span>
                                    </div>
                                </div>


                                <div className="flex items-center text-sm opacity-70 mb-4">
                                    <Calendar size={14} className="mr-1" />
                                    <span>{formatDate(meeting.startTime)}</span>
                                    <Clock size={14} className="ml-3 mr-1" />
                                    <span>{formatTime(meeting.startTime)}</span>
                                </div>
                            </div>

                            <div className="p-4 flex justify-between items-center border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push(`/meeting/${meeting.id}`)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => { }}
                                >
                                    Download
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 font-semibold">Meeting</th>
                                    <th className="text-left p-4 font-semibold">Participants</th>
                                    <th className="text-left p-4 font-semibold">Date & Time</th>
                                    <th className="text-left p-4 font-semibold">Duration</th>
                                    <th className="text-left p-4 font-semibold">Host</th>
                                    <th className="text-right p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMeetings.map((meeting) => (
                                    <tr key={meeting.id} className="border-b transition-colors">
                                        <td className="p-4">
                                            <div>
                                                <h4 className="font-medium">{meeting.title}</h4>
                                                <p className="text-sm opacity-70">{meeting.description}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div >
                                                <h4 className="font-medium pl-7">{meeting.participants.length}</h4>
                                                <p className="text-sm opacity-70">Participants</p>

                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{formatDate(meeting.startTime)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 opacity-70 mt-1">
                                                <Clock size={14} />
                                                <span>{formatTime(meeting.startTime)}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <h4 className="font-medium">{formateDuration(meeting.duration)}</h4>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <h4 className="font-medium">{meeting.host.split(" ")[0]}</h4>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.push(`/meeting/${meeting.id}`)}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => { }}
                                                >
                                                    Download
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    )
}