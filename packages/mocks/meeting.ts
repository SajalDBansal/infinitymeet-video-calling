import { MeetingType } from "@infinityMeet/types";

type MockMeetingMap = { [id: string]: MeetingType };

export const meetingMock: MockMeetingMap = {
    '1': {
        id: '1',
        title: 'Product Team Standup',
        description: 'Daily team check-in to discuss progress, blockers, and upcoming tasks for the product development team.',
        scheduledAt: new Date('2025-01-10T09:00:00'),
        duration: 30,
        status: 'COMPLETED',
        createdAt: new Date('2025-01-08T14:30:00'),
        startedAt: new Date('2025-01-10T06:30:00'),
        endedAt: new Date('2025-01-10T09:28:00'),
        isLive: false,
        hostId: '1',
        host: {
            id: '1',
            email: 'john@example.com',
            password: '', // mock
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            createdAt: new Date('2025-01-01T00:00:00'),
            updatedAt: new Date('2025-01-08T14:30:00'),
            isOnline: false
        },
        participants: [
            {
                userId: '1',
                meetingId: '1',
                assignedBy: '1',
                role: 'HOST',
                joinedAt: new Date('2025-01-10T09:00:00'),
                user: {
                    id: '1',
                    email: 'john@example.com',
                    password: '',
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                userId: '2',
                meetingId: '1',
                assignedBy: '1',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-10T09:01:00'),
                user: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                userId: '3',
                meetingId: '1',
                assignedBy: '1',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-10T09:02:00'),
                user: {
                    id: '3',
                    email: 'robert@example.com',
                    password: '',
                    name: 'Robert Johnson',
                    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                userId: '4',
                meetingId: '1',
                assignedBy: '1',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-10T09:03:00'),
                user: {
                    id: '4',
                    email: 'emily@example.com',
                    password: '',
                    name: 'Emily Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            }
        ],
        messages: [
            {
                id: '1',
                meetingId: '1',
                senderId: '2',
                content: 'Good morning everyone!',
                sentAt: new Date('2025-01-10T09:00:30'),
                sender: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                id: '2',
                meetingId: '1',
                senderId: '3',
                content: 'Morning! Ready for the standup',
                sentAt: new Date('2025-01-10T09:01:15'),
                sender: {
                    id: '3',
                    email: 'robert@example.com',
                    password: '',
                    name: 'Robert Johnson',
                    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                id: '3',
                meetingId: '1',
                senderId: '4',
                content: 'Hi team! 👋',
                sentAt: new Date('2025-01-10T09:01:45'),
                sender: {
                    id: '4',
                    email: 'emily@example.com',
                    password: '',
                    name: 'Emily Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                id: '4',
                meetingId: '1',
                senderId: '2',
                content: 'Thanks for offering to help with the state management Robert!',
                sentAt: new Date('2025-01-10T09:07:30'),
                sender: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                id: '5',
                meetingId: '1',
                senderId: '3',
                content: 'No problem! Happy to help',
                sentAt: new Date('2025-01-10T09:07:45'),
                sender: {
                    id: '3',
                    email: 'robert@example.com',
                    password: '',
                    name: 'Robert Johnson',
                    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            },
            {
                id: '6',
                meetingId: '1',
                senderId: '4',
                content: 'Great meeting everyone, have a productive day!',
                sentAt: new Date('2025-01-10T09:26:00'),
                sender: {
                    id: '4',
                    email: 'emily@example.com',
                    password: '',
                    name: 'Emily Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-08T14:30:00'),
                    isOnline: false
                }
            }
        ],
        transcript: {
            id: 't1',
            content: `[09:02] John Doe: Good morning everyone, let's start our daily standup.

[09:02] Jane Smith: Morning! I'll go first. Yesterday I completed the user authentication flow and started working on the dashboard components.

[09:03] Robert Johnson: Great work Jane. I finished the API endpoints for user management and I'm now working on the meeting creation functionality.

[09:04] Emily Wilson: I've been working on the UI components library and completed the button, card, and input components. Today I'll focus on the navigation components.

[09:05] John Doe: Excellent progress everyone. Any blockers?

[09:06] Jane Smith: I'm having some issues with the state management for the theme toggle. Could use some help there.

[09:07] Robert Johnson: I can help with that after the standup. I had a similar issue last week.

[09:08] Emily Wilson: No blockers on my end, everything is going smoothly.

[09:25] John Doe: Alright, let's wrap up. Great work everyone, see you tomorrow!`,
            meetingId: '1',
            createdAt: new Date('2025-01-10T09:28:00'),
        },
        recordings: [
            {
                id: 'r1',
                meetingId: '1',
                quality: 'P720',
                url: 'https://nexuscall.tech/conference/1/recording.mp4',
                createdAt: new Date('2025-01-10T09:28:00'),
                format: 'MP4',
                size: 123456789
            }, {
                id: 'r2',
                meetingId: '1',
                quality: 'P480',
                url: 'https://nexuscall.tech/conference/1/recording.mp4',
                createdAt: new Date('2025-01-10T09:28:00'),
                format: 'MP4',
                size: 123456789
            }, {
                id: 'r3',
                meetingId: '1',
                quality: 'P320',
                url: 'https://nexuscall.tech/conference/1/recording.mp4',
                createdAt: new Date('2025-01-10T09:28:00'),
                format: 'MP4',
                size: 123456789
            }
        ],
        summary: {
            id: 's1',
            meetingId: '1',
            keyPoints: [
                'Team completed user authentication flow and dashboard components',
                'API endpoints for user management are finished',
                'UI components library progress with button, card, and input components completed',
                'Jane needs help with theme toggle state management - Robert offered assistance',
                'No major blockers reported, team is on track'
            ],
            actionItems: [
                'Robert to help Jane with theme toggle state management after standup',
                'Emily to continue work on navigation components',
                'Continue with meeting creation functionality development'
            ],
            content: `The team conducted a productive sprint planning meeting focused on upcoming optimization efforts. Several key updates were shared, including resolved issues and refinements to the onboarding experience. The discussion remained solution-oriented, with all members contributing to setting clear, actionable next steps. Sentiment was overwhelmingly positive, with no critical blockers reported and strong alignment on priorities.`,
            sentiment: 'positive',
            attendanceRate: '100%', // mock
            createdAt: new Date('2025-01-10T09:28:00'),
        },
    },
    '2': {
        id: '2',
        title: 'Client Presentation',
        description: 'Quarterly review with XYZ Corp to present our progress and discuss upcoming milestones.',
        scheduledAt: new Date('2025-01-12T14:00:00'),
        duration: 60,
        status: 'LIVE',
        createdAt: new Date('2025-01-09T10:15:00'),
        startedAt: new Date('2025-07-14T09:02:00'),
        isLive: true,
        hostId: '2',
        host: {
            id: '2',
            email: 'jane@example.com',
            password: '',
            name: 'Jane Smith',
            imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
            createdAt: new Date('2025-01-01T00:00:00'),
            updatedAt: new Date('2025-01-09T10:15:00'),
            isOnline: false
        },
        participants: [
            {
                userId: '1',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:02:00'),
                user: {
                    id: '1',
                    email: 'john@example.com',
                    password: '',
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '2',
                meetingId: '2',
                assignedBy: '2',
                role: 'HOST',
                joinedAt: new Date('2025-01-12T14:00:00'),
                user: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '5',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:03:00'),
                user: {
                    id: '5',
                    email: 'michael@example.com',
                    password: '',
                    name: 'Michael Brown',
                    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '8',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:01:00'),
                user: {
                    id: '8',
                    email: 'sarah@example.com',
                    password: '',
                    name: 'Sarah Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            }
        ],
    },
    '3': {
        id: '3',
        title: 'Client Presentation',
        description: 'Quarterly review with XYZ Corp to present our progress and discuss upcoming milestones.',
        scheduledAt: new Date('2025-01-12T14:00:00'),
        duration: 60,
        status: 'LIVE',
        createdAt: new Date('2025-01-09T10:15:00'),
        startedAt: new Date('2025-07-14T09:02:00'),
        isLive: true,
        hostId: '3',
        host: {
            id: '3',
            email: 'robert@example.com',
            password: '',
            name: 'Robert Johnson',
            imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            createdAt: new Date('2025-01-01T00:00:00'),
            updatedAt: new Date('2025-01-09T10:15:00'),
            isOnline: false
        },
        participants: [
            {
                userId: '1',
                meetingId: '3',
                assignedBy: '3',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:02:00'),
                user: {
                    id: '1',
                    email: 'john@example.com',
                    password: '',
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '2',
                meetingId: '3',
                assignedBy: '3',
                role: 'HOST',
                joinedAt: new Date('2025-01-12T14:00:00'),
                user: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '5',
                meetingId: '3',
                assignedBy: '3',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:03:00'),
                user: {
                    id: '5',
                    email: 'michael@example.com',
                    password: '',
                    name: 'Michael Brown',
                    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '8',
                meetingId: '3',
                assignedBy: '3',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:01:00'),
                user: {
                    id: '8',
                    email: 'sarah@example.com',
                    password: '',
                    name: 'Sarah Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            }
        ]
    },
    '4': {
        id: '4',
        title: 'Client Presentation',
        description: 'Quarterly review with XYZ Corp to present our progress and discuss upcoming milestones.',
        scheduledAt: new Date('2025-01-12T14:00:00'),
        duration: 60,
        status: 'LIVE',
        createdAt: new Date('2025-01-09T10:15:00'),
        startedAt: new Date('2025-07-14T09:02:00'),
        isLive: true,
        hostId: '4',
        host: {
            id: '4',
            email: 'emily@example.com',
            password: '',
            name: 'Emily Wilson',
            imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            createdAt: new Date('2025-01-01T00:00:00'),
            updatedAt: new Date('2025-01-09T10:15:00'),
            isOnline: false
        },
        participants: [
            {
                userId: '1',
                meetingId: '4',
                assignedBy: '4',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:02:00'),
                user: {
                    id: '1',
                    email: 'john@example.com',
                    password: '',
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            }, {
                userId: '2',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:02:00'),
                user: {
                    id: '2',
                    email: 'jane@example.com',
                    password: '',
                    name: 'Jane Smith',
                    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '5',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:03:00'),
                user: {
                    id: '5',
                    email: 'michael@example.com',
                    password: '',
                    name: 'Michael Brown',
                    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            },
            {
                userId: '8',
                meetingId: '2',
                assignedBy: '2',
                role: 'ATTENDEE',
                joinedAt: new Date('2025-01-12T14:01:00'),
                user: {
                    id: '8',
                    email: 'sarah@example.com',
                    password: '',
                    name: 'Sarah Wilson',
                    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
                    createdAt: new Date('2025-01-01T00:00:00'),
                    updatedAt: new Date('2025-01-09T10:15:00'),
                    isOnline: false
                }
            }
        ],
    }
}