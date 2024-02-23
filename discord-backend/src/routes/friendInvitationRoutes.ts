import Joi from "joi";
import { createValidator } from "express-joi-validation";
import express from "express";
import AuthMiddleware from "../middleware/authMiddleware";
import FriendInvitationController from "../controllers/friendInvitationController";

const router = express.Router();
const validator = createValidator({});

const postInvitationSchema = Joi.object({
  targetEmailAddress: Joi.string().email().required(),
});

router.post(
  "/invite",
  AuthMiddleware.protect,
  validator.body(postInvitationSchema),
  FriendInvitationController.postInvite
);

export default router;
