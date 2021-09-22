import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import studentService from "./student.service";
import { IStudent } from "./student.types";

const router = Router();

router.post("/", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.body as IStudent;
        const result = await studentService.create(user);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const response = await studentService.getOne(id);
        res.send(new ResponseHandler(response));
    } catch (e) {
        next(e);
    }
});

router.get("/", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await studentService.get();
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

export default router;