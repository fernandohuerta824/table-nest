import express from 'express'
import type { Request, Response, NextFunction, } from 'express';
import dotenv from 'dotenv'
import authRouter from './routes/auth.router';
import { ErrorResponse } from './classes/errors';
dotenv.config();

const app = express()

app.use(express.json())

app.use('/working', async (req, res) => {
    res.json({ message: 'working' })
})
app.use('/auth', authRouter)

app.use((
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    throw new ErrorResponse('NotFound', 'Resource not availble or found', 404)
})

app.use((
    error: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const err = error instanceof ErrorResponse
        ? error
        : new ErrorResponse(
              error.name || 'ServerError',
              error.message || 'Something went wrong',
              error.status || 500
        );
    res.status(err.status).json({
        ...err,
    })
})

export default app