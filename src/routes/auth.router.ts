import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { checkValidFields } from "../middleware/checkValidFields";
import { SIGNUP_OPTIONAL_FIELDS, SIGNUP_REQUIRED_FIELDS } from "../utils/validFields";
import { validateBody } from "../middleware/validFields";
import { signupSchema } from "../schemas/authSchemas";
import { validateExistingUser } from "../middleware/validateExistingUser";
import { signupRateLimiter } from "../helpers/rateLimits";

const authRouter = Router()

authRouter.post('/signup', 
    signupRateLimiter,
    checkValidFields({ fields: SIGNUP_REQUIRED_FIELDS, optionalFields: SIGNUP_OPTIONAL_FIELDS }),
    validateBody(signupSchema),
    validateExistingUser,
    signup
)

export default authRouter