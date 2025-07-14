import rateLimit from "express-rate-limit";


export const signupRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        error: 'Too many signup attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});