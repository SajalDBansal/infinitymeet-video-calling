import { prisma } from "./client";

export default prisma;  // exports instance of prisma 
export * from "../src/generated/prisma";  // exports generated types from prisma
export * from "./user";
export * from "./meeting";