import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string()
        .min(3, 'The first name must be at least 3 characters long')
        .max(50, 'The first name must be at most 50 characters long'),
    lastName: z.string()
        .min(3, 'The last name must be at least 3 characters long')
        .max(50, 'The last name must be at most 50 characters long')
        .optional()
        .refine(val => val !== '', { message: 'Last name cannot be empty string' }),
    username: z.string()
        .min(3, 'The username must be at least 3 characters long')
        .max(50, 'The username must be at most 50 characters long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string()
        .email('The email is not valid')
        .optional(),
    phoneNumber: z.string()
        .regex(/^\+?\d{7,15}$/, 'Phone number must be a valid international number')
        .optional(),
    password: z.string()
        .min(8, 'The password must be at least 8 characters long')
        .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .regex(/(?=.*\d)/, 'Password must contain at least one number')
        .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
}).superRefine((data, ctx) => {
    if (!data.email && !data.phoneNumber) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'At least one contact method (email or phone number) is required',
            path: ['contactMethod']
        });
    }
});
