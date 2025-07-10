import { NextFunction, Response, Request } from "express";
import z from "zod";
import { SignupUser } from "../types";
import { ValidationResponseError } from "../classes/errors";

export const validateBody = (schema: z.ZodSchema<any>) => {
  return (req: Request<{}, {}, SignupUser>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        throw new ValidationResponseError(result.error.format())
    //   return res.status(400).json({ errors: result.error.format() })
    }

    req.body = result.data
    next()
  }
}