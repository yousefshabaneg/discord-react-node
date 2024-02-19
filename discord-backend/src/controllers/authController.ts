import { NextFunction, Request, Response } from "express";
import catchAsync from "../helpers/catchAsync";
import User from "../models/user";
import AppError from "../helpers/AppError";

class AuthController {
  static login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user: any = await User.login(email, password);
    res.json({
      status: "success",
      message: "User logged successfully",
      data: user,
    });
  });

  static register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await User.create(req.body);
      res.json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    }
  );
}

export default AuthController;
