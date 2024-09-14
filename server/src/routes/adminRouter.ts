import express, { NextFunction, Request, Response } from "express";
import { listAllUsers, assignRole } from "../controllers/adminController";
import {verifyAdmin} from '../middlewares/verifyUser'

const router = express.Router();


router.get(
    "/admin/list-user",
    verifyAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        listAllUsers(req, res, next);
    }
);
router.get(
    "/admin/assign-role-to-user/:id",
    verifyAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        assignRole(req, res, next);
    }
);


export const adminRoutes = router;