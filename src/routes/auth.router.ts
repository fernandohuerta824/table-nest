import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { checkValidFields } from "../middleware/checkValidFields";
import { SIGNUP_FIELDS } from "../utils/validFields";
import { validateBody } from "../middleware/validFields";
import { signupSchema } from "../schemas/authSchemas";

const authRouter = Router()

authRouter.post('/signup', 
    checkValidFields(SIGNUP_FIELDS),
    validateBody(signupSchema),
    signup
)

export default authRouter