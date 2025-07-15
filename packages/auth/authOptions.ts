import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUser, createUser, logUserIn, createGoogleUser, getUserSession } from "@infinityMeet/database";
import { NextAuthOptions } from "next-auth";

export const NEXT_AUTH: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: any, req) {
                const { email, password, name } = credentials;
                // checks for existing user

                const existingUser = await findUser(email);
                if (existingUser) {
                    const isValidPassword = await bcrypt.compare(password, existingUser.password);
                    if (!isValidPassword) return null;
                    const sessionData = await logUserIn(existingUser.id);
                    return {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        sessionId: sessionData.sessionId,
                    };
                }

                // creates new user

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await createUser(name, email, hashedPassword);
                return {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    sessionId: newUser.sessionId,
                };

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        signIn: async ({ account, profile }: any) => {
            if (account.provider === "google") {
                const isExistingUser = await findUser(profile.email);
                if (!isExistingUser) {
                    await createGoogleUser(profile);
                } else {
                    await logUserIn(isExistingUser.id);
                }
            }
            return true;
        },
        jwt: async ({ token, user, account }: any) => {
            if (user && account?.provider === "google") {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                const latestSession = await getUserSession(user.id);
                if (latestSession) {
                    token.sessionId = latestSession.sessionId;
                }
            }

            if (user && account?.provider === "credentials") {
                token.id = user.id;
                token.sessionId = user.sessionId;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.sessionId = token.sessionId;
            }

            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    }

}