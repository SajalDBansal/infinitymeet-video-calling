"use server";

import { logUserOut } from "@infinityMeet/database";

export async function logSessionOut(sessionId: string) {
    if (!sessionId) return;

    await logUserOut(sessionId);
}
