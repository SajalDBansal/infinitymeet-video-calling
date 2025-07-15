import { UserType } from "@infinityMeet/types";

type MockUserMap = { [id: string]: UserType };

export const userMock: MockUserMap = {
    '1': {
        id: '1',
        email: 'john@example.com',
        password: '', // mock
        name: 'John Doe',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: new Date('2025-01-01T00:00:00'),
        updatedAt: new Date('2025-01-08T14:30:00'),
        isOnline: false
    },
    '2': {
        id: '2',
        email: 'jane@example.com',
        password: '',
        name: 'Jane Smith',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        createdAt: new Date('2025-01-01T00:00:00'),
        updatedAt: new Date('2025-01-08T14:30:00'),
        isOnline: false
    },
    '3': {
        id: '3',
        email: 'robert@example.com',
        password: '',
        name: 'Robert Johnson',
        imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        createdAt: new Date('2025-01-01T00:00:00'),
        updatedAt: new Date('2025-01-08T14:30:00'),
        isOnline: false
    },
}