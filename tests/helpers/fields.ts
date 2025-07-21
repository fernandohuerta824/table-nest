import { z } from "zod"

export const testSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(50, 'Username must be at most 50 characters long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    firstName: z.string()
        .min(3, 'First name must be at least 3 characters long')
        .max(50, 'First name must be at most 50 characters long'),
    lastName: z.string()
        .min(3, 'Last name must be at least 3 characters long')
        .max(50, 'Last name must be at most 50 characters long')
        .optional()
        .refine(val => val !== '', { message: 'Last name cannot be empty string' }),
    email: z.string()
        .email('Email is not valid')
        .optional(),
    phoneNumber: z.string()
        .regex(/^\+?\d{7,15}$/, 'Phone number must be a valid international number')
        .optional(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .regex(/(?=.*\d)/, 'Password must contain at least one number')
        .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (!data.email && !data.phoneNumber) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'At least one contact method (email or phone number) is required',
        });
    }

    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
        });
    }
})

export const requiredFields = {
    username: 'user1',
    firstName: 'firstName1',
    password: '12345678Abc@',
    confirmPassword: '12345678Abc@'
}

export const optionalFields = {
    lastName: 'lastName1',
    email: 'email1@example.com',
    phoneNumber: '1234567890'
}

export const requiredFieldsArray = [
    'username',
    'firstName',
    'password',
    'confirmPassword'
]

export const optionalFieldsArray = [
    'lastName',
    'email',
    'phoneNumber'
]