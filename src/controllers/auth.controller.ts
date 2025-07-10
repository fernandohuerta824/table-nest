import type { Request, Response, NextFunction } from "express";
import { SignupUser } from "../types";

export async function signup (req: Request<{}, {}, SignupUser>, res: Response) {
    
}