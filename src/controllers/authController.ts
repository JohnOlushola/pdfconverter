import { Request, Response } from 'express';

class AuthController {
    public login(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        res.render('login', { layout: 'auth' });
    }
}

export default new AuthController();