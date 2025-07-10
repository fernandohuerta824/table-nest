import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(3, 'The first name must be at least 3 characters long').max(50, 'The first name must be at most 50 characters long'),
    username: z.string().min(3, 'The username must be at least 3 characters long').max(50, 'The username must be at most 50 characters long'),
})