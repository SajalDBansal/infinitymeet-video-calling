// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            /** Default fields: name, email, image */
            name?: string | null;
            email?: string | null;
            image?: string | null;

            /** Custom fields */
            id?: string | null;
            sessionId?: string | null;
        };
    }

    interface User {
        id: string;
        sessionId?: string;
    }
}
