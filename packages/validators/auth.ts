import { z } from "zod";

export const signupInputsProps = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
})

export const signinInputsProps = z.object({
    email: z.email(),
    password: z.string().min(6),
})