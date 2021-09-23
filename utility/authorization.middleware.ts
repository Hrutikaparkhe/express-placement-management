import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

export const AuthGuard = (exclude: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!exclude.includes(req.path)) {
      const token = req.headers.authorization;
      if (!token) {
        throw { message: "Token Not Found", statusCode: 401 };
      }
      verify(token, process.env.SECRET_KEY || "");
    } else return next();
  };
};
