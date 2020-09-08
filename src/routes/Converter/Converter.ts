import express, { Request, Response } from "express";
import { converterController } from "../../controllers";

export const router = express.Router({
    strict: true,
});

router.post("/upload", (req: Request, res: Response) => {
    converterController.write(req, res);
});

router.get("/", (req: Request, res: Response) => {
    converterController.index(req, res);
});

router.get("/download", (req: Request, res: Response) => {
    converterController.readView(req, res);
});

router.get("/download/file", (req: Request, res: Response) => {
    converterController.read(req, res);
});