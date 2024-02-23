import { NextFunction, Request, Response } from "express";
import catchAsync from "../helpers/catchAsync";

class FriendInvitationController {
  static postInvite = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { targetEmailAddress } = req.body;
      res.json({ targetEmailAddress });
    }
  );
}

export default FriendInvitationController;
