import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}


// Middleware to verify a regular user
export async function verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        const token: string | undefined = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Token not provided" });
        }

        const userData = await verifyTokenAndGetUser(token);

        next();
    } catch (error: any) {
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message || "Internal Server Error" });
    }
}

// Middleware to verify an admin user
export async function verifyAdmin(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        const token: string | undefined = req.headers.authorization
        console.log("token",token)
        if (!token) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Token not provided" });
        }

        const userData = await verifyTokenAndGetUser(token);

        if (userData?.role !== "admin") {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Unauthorized" });
        }

        next();
    } catch (error: any) {
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message || "Internal Server Error" });
    }
}

// Helper function to verify token and fetch user data
async function verifyTokenAndGetUser(token: string) {
    if (!token) {
        throw { status: StatusCodes.UNAUTHORIZED, message: "Token not provided" };
    }
    
    
    try {
        const decodedToken = jwt.verify(
            token.slice(7),
            process.env.JWT_SECRET_KEY || ""
        ) as DecodedToken;

        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        
        const userData = await User.findById(objectId);
        if (!userData) {
            throw { status: StatusCodes.UNAUTHORIZED, message: "Invalid token" };
        }

        return userData;
    } catch (error) {
        console.log(error)
        throw { status: StatusCodes.UNAUTHORIZED, message: "Invalid token", };
    }
}
