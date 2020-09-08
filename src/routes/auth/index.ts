import express, { Request, Response } from "express";
import { AuthController } from "../../controllers";

export const router = express.Router({
    strict: true,
});

router.get("/login", (req: Request, res: Response) => {
    AuthController.login(req, res);
});
