import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import userService from "./user.service";
import { ICredentials, IUser } from "./user.types";
import { CreateUserValidator, LoginValidator } from './user.validations';
const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const response = await userService.getById(id);
    res.send(new ResponseHandler(response));
  } catch (e) {
    next(e);
  }
});

router.post(
  "/register",CreateUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = req.body as IUser;

      const result = await userService.create(student);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const response = await userService.getByEmail(email);
      res.send(new ResponseHandler(response));
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/login",LoginValidator,
  async (req: Request,res: Response, next: NextFunction) => {
    try {
      const credentials = req.body as ICredentials;

      const result = await userService.login(credentials);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
