import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import userService from "./user.service";
import { ICredentials, IUser } from "./user.types";

const router = Router();

router.post("/register", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const student = req.body as IUser;
        const result = await userService.create(student);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

// router.get("/:id", async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const email = parseInt(req.params.email);
//         const response = await userService.get(email);
//         res.send(new ResponseHandler(response));
//     } catch (e) {
//         next(e);
//     }
// });

router.post("/login", async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const credentials = req.body as ICredentials;
        const result = await userService.login(credentials);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

export default router;