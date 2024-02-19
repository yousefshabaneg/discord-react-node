import AuthController from "../controllers/authController";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import express from "express";
const router = express.Router();
const validator = createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  AuthController.register
);
router.post("/login", validator.body(loginSchema), AuthController.login);

export default router;
