import { prisma } from './client';

async function main() {

    await prisma.user.createMany({
        data: [
            {
                id: '1f456678-89ab-4c1a-b23d-1234567890ab',
                email: 'alice@example.com',
                password: 'hashed-password-1',
                name: 'Alice Johnson',
                imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                createdAt: new Date(),
                lastSeenAt: new Date(),
                isOnline: true,
            },
            {
                id: '2f456678-89ab-4c1a-b23d-1234567890ac',
                email: 'bob@example.com',
                password: 'hashed-password-2',
                name: 'Bob Smith',
                imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                createdAt: new Date(),
                lastSeenAt: new Date(Date.now() - 1000 * 60 * 10), // 10 min ago
                isOnline: false,
            },
            {
                id: '3f456678-89ab-4c1a-b23d-1234567890ad',
                email: 'charlie@example.com',
                password: 'hashed-password-3',
                name: 'Charlie Green',
                imageUrl: null,
                createdAt: new Date(),
                lastSeenAt: null,
                isOnline: false,
            },
            {
                id: '4f456678-89ab-4c1a-b23d-1234567890ae',
                email: 'diana@example.com',
                password: 'hashed-password-4',
                name: 'Diana Lee',
                imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
                createdAt: new Date(),
                lastSeenAt: new Date(),
                isOnline: true,
            },
        ],
    });

    await prisma.userSession.createMany({
        data: [
            {
                id: 'sess-1',
                sessionId: 'sessid-1',
                userId: '1f456678-89ab-4c1a-b23d-1234567890ab', // Alice
                startedAt: new Date(Date.now() - 1000 * 60 * 60),
                endAt: null,
            },
            {
                id: 'sess-2',
                sessionId: 'sessid-2',
                userId: '2f456678-89ab-4c1a-b23d-1234567890ac', // Bob
                startedAt: new Date(Date.now() - 1000 * 60 * 90),
                endAt: new Date(Date.now() - 1000 * 60 * 30),
            },
            {
                id: 'sess-3',
                sessionId: 'sessid-3',
                userId: '1f456678-89ab-4c1a-b23d-1234567890ab', // Alice again
                startedAt: new Date(Date.now() - 1000 * 60 * 200),
                endAt: new Date(Date.now() - 1000 * 60 * 120),
            },
        ],
    });

    await prisma.meeting.createMany({
        data: [
            {
                id: 'meet-1',
                title: 'Team Sync',
                description: 'Weekly team catch-up',
                scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                duration: 60,
                status: 'UPCOMING',
                hostId: '1f456678-89ab-4c1a-b23d-1234567890ab', // Alice
                isLive: false,
            },
            {
                id: 'meet-2',
                title: 'Design Review',
                scheduledAt: new Date(Date.now() - 1000 * 60 * 90),
                duration: 45,
                status: 'COMPLETED',
                startedAt: new Date(Date.now() - 1000 * 60 * 90),
                endedAt: new Date(Date.now() - 1000 * 60 * 45),
                hostId: '2f456678-89ab-4c1a-b23d-1234567890ac', // Bob
                isLive: false,
            },
            {
                id: 'meet-3',
                title: 'Live Dev Handoff',
                scheduledAt: new Date(Date.now() - 1000 * 60 * 10),
                startedAt: new Date(Date.now() - 1000 * 60 * 10),
                status: 'LIVE',
                isLive: true,
                hostId: '3f456678-89ab-4c1a-b23d-1234567890ad', // Charlie
            },
            {
                id: 'meet-4',
                title: 'Cancelled Sync',
                description: 'No one showed up',
                scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
                duration: 30,
                status: 'COMPLETED',
                hostId: '4f456678-89ab-4c1a-b23d-1234567890ae', // Diana
                startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
                endedAt: new Date(Date.now() - 1000 * 60 * 60 * 23.5),
                isLive: false,
            },
        ],
    });

    await prisma.meetingParticipant.createMany({
        data: [
            {
                id: 'part-1',
                userId: '3f456678-89ab-4c1a-b23d-1234567890ad', // Charlie
                meetingId: 'meet-1',
                email: 'charlie@example.com',
                assignedBy: '1f456678-89ab-4c1a-b23d-1234567890ab',
                role: 'ATTENDEE',
                joinedAt: null,
            },
            {
                id: 'part-2',
                userId: '4f456678-89ab-4c1a-b23d-1234567890ae', // Diana
                meetingId: 'meet-2',
                email: 'diana@example.com',
                assignedBy: '2f456678-89ab-4c1a-b23d-1234567890ac',
                role: 'CO_HOST',
                joinedAt: new Date(Date.now() - 1000 * 60 * 85),
                leftAt: new Date(Date.now() - 1000 * 60 * 50),
            },
            {
                id: 'part-3',
                userId: '3f456678-89ab-4c1a-b23d-1234567890ad', // Charlie
                meetingId: 'meet-3',
                role: 'HOST',
                assignedBy: '3f456678-89ab-4c1a-b23d-1234567890ad',
            },
            {
                id: 'part-4',
                userId: '2f456678-89ab-4c1a-b23d-1234567890ac', // Bob
                meetingId: 'meet-3',
                role: 'VIEWER',
                assignedBy: '3f456678-89ab-4c1a-b23d-1234567890ad',
            },
            {
                id: 'part-5',
                meetingId: 'meet-3',
                email: 'guest@example.com',
                assignedBy: '3f456678-89ab-4c1a-b23d-1234567890ad',
                role: 'ATTENDEE',
            },
            {
                id: 'part-6',
                userId: '3f456678-89ab-4c1a-b23d-1234567890ad', // Charlie
                meetingId: 'meet-2',
                role: 'ATTENDEE',
                assignedBy: '2f456678-89ab-4c1a-b23d-1234567890ac',
            },
        ],
    });

    await prisma.chatMessage.createMany({
        data: [
            {
                id: 'msg-1',
                meetingId: 'meet-2',
                senderId: '4f456678-89ab-4c1a-b23d-1234567890ae', // Diana
                content: 'Hi everyone!',
            },
            {
                id: 'msg-2',
                meetingId: 'meet-2',
                senderId: '2f456678-89ab-4c1a-b23d-1234567890ac', // Bob
                content: 'Let’s begin.',
            },
            {
                id: 'msg-3',
                meetingId: 'meet-3',
                senderId: '3f456678-89ab-4c1a-b23d-1234567890ad',
                content: 'Hello everyone, let’s get started.',
            },
            {
                id: 'msg-4',
                meetingId: 'meet-3',
                senderId: '2f456678-89ab-4c1a-b23d-1234567890ac',
                content: 'Sure thing!',
            },
            {
                id: 'msg-5',
                meetingId: 'meet-3',
                senderId: '3f456678-89ab-4c1a-b23d-1234567890ad',
                content: 'Today we’ll review backend APIs and deployment.',
            },
        ],
    });

    await prisma.transcript.create({
        data: {
            id: 'trans-1',
            meetingId: 'meet-2',
            content: 'Welcome to the design review. We discussed layout improvements...',
        },
    });

    await prisma.recording.createMany({
        data: [{
            id: 'rec-1',
            meetingId: 'meet-2',
            format: 'MP4',
            size: 104857600,
            quality: 'P720',
            url: 'https://example.com/recordings/rec-1.mp4',
        },
        {
            id: 'rec-2',
            meetingId: 'meet-2',
            format: 'MP3',
            size: 2048000,
            quality: 'P480',
            url: 'https://example.com/audio/rec-2.mp3',
        },
        {
            id: 'rec-3',
            meetingId: 'meet-3',
            format: 'MP4',
            size: 209715200,
            quality: 'P1080',
            url: 'https://example.com/video/rec-3.mp4',
        },]
    });

    await prisma.summary.create({
        data: {
            id: 'sum-1',
            meetingId: 'meet-2',
            keyPoints: ['Reviewed new design spec', 'Agreed on color scheme'],
            actionItems: ['Finalize figma mockups', 'Update design tokens'],
            sentiment: 'Positive',
            attendanceRate: '75%',
            content: 'This meeting covered essential UI improvements and was productive.',
        },
    });
}

main()
    .then(() => console.log('🌱 Users seeded'))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());