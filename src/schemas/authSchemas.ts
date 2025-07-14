import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(3, 'The first name must be at least 3 characters long').max(50, 'The first name must be at most 50 characters long'),
    username: z.string().min(3, 'The username must be at least 3 characters long').max(50, 'The username must be at most 50 characters long'),
    lastName: z.string().min(3, 'The last name must be at least 3 characters long').max(50, 'The last name must be at most 50 characters long').optional(),
    email: z.string().email('The email is not valid').optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(8, 'The password must be at least 8 characters long')
}).superRefine((data, ctx) => {
    if(!data.email && !data.phoneNumber) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'It is needed at least one contact metthod (email, phone number)',
            path: ["validContact"]
        })
    }
})