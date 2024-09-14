import express, { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { validateHandler } from "../middlewares/ValidateHanlder";
import {
    loginSchema,
    registerSchema,
} from "../dtos/auth-dtos";
const router = express.Router();


router.post(
    "/register",
    registerSchema,
    validateHandler,
    (req: Request, res: Response, next: NextFunction) => {
        registerUser(req, res, next);
    }
);
router.post(
    "/login",
    loginSchema,
    validateHandler,
    (req: Request, res: Response, next: NextFunction) => {
        loginUser(req, res, next);
    }
);

export const authRoutes = router;