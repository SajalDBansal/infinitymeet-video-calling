"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.prisma.user.createMany({
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
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.userSession.createMany({
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
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.meeting.createMany({
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
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.meetingParticipant.createMany({
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
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.chatMessage.createMany({
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
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.transcript.create({
                            data: {
                                id: 'trans-1',
                                meetingId: 'meet-2',
                                content: 'Welcome to the design review. We discussed layout improvements...',
                            },
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.recording.createMany({
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
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, client_1.prisma.summary.create({
                            data: {
                                id: 'sum-1',
                                meetingId: 'meet-2',
                                keyPoints: ['Reviewed new design spec', 'Agreed on color scheme'],
                                actionItems: ['Finalize figma mockups', 'Update design tokens'],
                                sentiment: 'Positive',
                                attendanceRate: '75%',
                                content: 'This meeting covered essential UI improvements and was productive.',
                            },
                        })];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return console.log('🌱 Users seeded'); })
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return client_1.prisma.$disconnect(); });
