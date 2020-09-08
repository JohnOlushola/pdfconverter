import { Request, Response } from 'express';

export default function logger(req: Request, res: Response, next: () => void) {
    console.log(`${req.method} ${req.path}`);
    next();
}