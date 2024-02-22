import { NextFunction, Request, Response } from "express";
import catchAsync from "../helpers/catchAsync";
import User, { IUser } from "../models/user";
import AppError from "../helpers/AppError";

class AuthController {
  static login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user: IUser = await User.login(email, password);
    const token = await user.generateToken();

    res.json({
      status: "success",
      message: "User logged successfully",
      data: { ...user.toJSON(), token },
    });
  });

  static register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await User.create(req.body);
      const token = await newUser.generateToken();

      res.json({
        status: "success",
        message: "User created successfully",
        data: { ...newUser.toJSON(), token },
      });
    }
  );
}

export default AuthController;
