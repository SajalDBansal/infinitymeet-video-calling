import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { NEXT_AUTH } from "@infinityMeet/auth";

const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST };