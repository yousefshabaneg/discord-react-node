import { NextFunction, Request, Response } from "express";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/AppError";
import User from "../models/user";
import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

class AuthMiddleware {
  static protect = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // 1) Getting token and check if it's there...
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(
          new AppError("Unauthorized, please log in to get access.", 401)
        );
      }

      // 2) Verification token...
      const decodedToken = await User.verifyToken(token);

      // 3) Check if user still exists...
      if (!decodedToken) {
        return next(new AppError("This user doest not longer exist", 401));
      }

      // GRANT ACCESS TO PROTECTED ROUTE...
      req.user = decodedToken;
      res.locals.user = decodedToken;

      next();
    }
  );

  static verifyTokenSocket = async (socket: Socket, next: any) => {
    const token = socket.handshake.auth?.token;
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      socket.user = decoded;
    } catch (err: any) {
      const socketError = new AppError(
        "Invalid token. Please log in again",
        401
      );
      return next(socketError);
    }
    next();
  };
}

export default AuthMiddleware;
