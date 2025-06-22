import express, { Router } from "express";
import AuthController from "../../../controller/globals/auth/authController";
import asyncErrorHandler from "../../../services/asyncErrorHandler";

const router: Router = express.Router();

router.route("/register").post(asyncErrorHandler(AuthController.registerUser));
router.route("/login").post(asyncErrorHandler(AuthController.loginUser));
export default router;
