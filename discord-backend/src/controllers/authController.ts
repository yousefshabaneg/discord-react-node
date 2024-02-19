import { NextFunction, Request, Response } from "express";

class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Login Success");
  };

  static register = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Register Success");
  };
}

export default AuthController;
