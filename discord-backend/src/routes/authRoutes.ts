import AuthController from "../controllers/authController";

import express from "express";

const router = express.Router();

router.post("/register", AuthController.login);
router.post("/login", AuthController.register);

export default router;
