import { Request, Response } from 'express';

export default function flash(req: Request, res: Response, next: any) {
    res.locals.success = req.flash('error');
    res.locals.error = req.flash('error');
    next();
}