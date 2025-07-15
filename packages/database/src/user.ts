import { generateUsername } from "unique-username-generator";
import { prisma } from "./client";
import { AddGoogleUserProps } from "@infinityMeet/types";


/**
 * Creates a new user in the database along with an initial session.
 *
 * @param name - The user's name. If not provided, a random username will be generated.
 * @param email - The user's email address.
 * @param password - The user's hashed password.
 *
 * @returns A promise that resolves to an object containing the created user's ID, name, email,
 * and the first associated session ID.
 *
 * @example
 * const user = await createUser("Alice", "alice@example.com", "hashed-password");
 * // {
 * //   id: 'user-id',
 * //   name: 'Alice',
 * //   email: 'alice@example.com',
 * //   sessionId: 'session-id'
 * // }
 */

export async function createUser(name: string, email: string, password: string) {
    const user = await prisma.user.create({
        data: {
            name: name || generateUsername("_", 0, 10),
            email,
            password,
            sessions: {
                create: {
                    startedAt: new Date(),
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            sessions: {
                select: {
                    sessionId: true
                }
            }
        }
    });

    const formatted = {
        ...user,
        sessionId: user.sessions[0]?.sessionId, // extract the one session
    };

    return formatted;
}

/**
 * Finds a user by their email address.
 *
 * @param email - The email of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not.
 */

export async function findUser(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user;
}

/**
 * Creates a new user from Google OAuth data and initializes a session.
 *
 * @param sessionData - An object containing the Google user info: sub (ID), name, email, and picture.
 * @returns A promise that resolves to an object with the user's ID, name, email, and sessionId.
 */

export async function createGoogleUser(sessionData: AddGoogleUserProps) {
    const user = await prisma.user.create({
        data: {
            id: sessionData.sub,
            name: sessionData.name,
            email: sessionData.email,
            password: sessionData.name,
            imageUrl: sessionData.picture,
            sessions: {
                create: {
                    startedAt: new Date(),
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            sessions: {
                select: {
                    sessionId: true
                }
            }
        }
    });

    const formatted = {
        ...user,
        sessionId: user.sessions[0]?.sessionId, // extract the one session
    };

    return formatted;
}

/**
 * Logs a user in by creating a new user session.
 *
 * @param userId - The ID of the user to log in.
 * @returns A promise that resolves to the newly created session object.
 */

export async function logUserIn(userId: string) {
    const sessionData = await prisma.userSession.create({
        data: {
            userId,
        }
    });

    return sessionData
}

/**
 * Logs a user out by marking the end of a session.
 *
 * @param sessionId - The ID of the session to end.
 * @returns A promise that resolves when the session is updated.
 */

export async function logUserOut(sessionId: string) {
    await prisma.userSession.update({
        where: {
            sessionId
        },
        data: {
            endAt: new Date()
        }
    });
}

/**
 * Retrieves the most recent session for a given user.
 *
 * @param userId - The ID of the user whose session is being queried.
 * @returns A promise that resolves to the latest user session or null if none exist.
 */

export async function getUserSession(userId: string) {
    const sessionData = await prisma.userSession.findFirst({
        where: {
            userId
        }, orderBy: {
            startedAt: "desc"
        }
    })

    return sessionData;

}

