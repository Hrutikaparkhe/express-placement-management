import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import campusActivityService from "./campusActivity.service";
import { ICampusActivity } from "./campusActivity.types";

const router = Router();

router.post("/", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const campusActivity = req.body as ICampusActivity;
        const result = await campusActivityService.create(campusActivity);
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
        const response = await campusActivityService.getOne(id);
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
        const result = await campusActivityService.get();
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

export default router;