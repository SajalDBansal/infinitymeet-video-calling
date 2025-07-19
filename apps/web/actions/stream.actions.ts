"use server";

import { NEXT_AUTH } from "@infinityMeet/auth";
import { StreamClient } from "@stream-io/node-sdk";
import { getServerSession } from "next-auth";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user.id) throw new Error("No userID found");
    if (!apiKey) throw new Error("Missing stream API key");
    if (!apiSecret) throw new Error("Missing stream API secret");

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.floor(Date.now() / 1000) + 3600;
    const iat = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({
        user_id: session.user.id,
        exp,
        iat,
    });

    return token;
}