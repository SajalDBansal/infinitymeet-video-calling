import { generateUsername } from "unique-username-generator";
import { prisma } from "./client";
import { AddGoogleUserProps } from "@infinityMeet/types";

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

export async function findUser(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user;
}

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

export async function logUserIn(userId: string) {
    const sessionData = await prisma.userSession.create({
        data: {
            userId,
        }
    });

    return sessionData
}

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

