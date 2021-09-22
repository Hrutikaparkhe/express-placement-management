import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import studentService from "./student.service";
import { IStudent, IStudentUpdate } from "./student.types";

const router = Router();

router.post("/", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const student = req.body as IStudent;
        const result = await studentService.create(student);
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

router.put("/", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const student = req.body as IStudentUpdate;
        const result = await studentService.update(student);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

export default router;