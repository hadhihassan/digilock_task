import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { StatusCodes } from "http-status-codes";
import { RegisterDto, LoginDto } from '../dtos/auth-dtos'
import { asyncErrorHandler } from '../utils/asyncHandler';

// Register User
export const registerUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { name: username, email, password } = req.body as RegisterDto;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'User already exists', succsee: false });

    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    if (user) {
        res
            .status(StatusCodes.OK)
            .json({
                username: user.username,
                role: user.role,
                message: "Registeration successfull",
                success: true
            });
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid user', success: false });
    }
})

// Login User
export const loginUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginDto;
    
    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid email or accoun not existing.', success: false });
    }

    if (user && (await user.comparePassword(password))) {
        res.status(StatusCodes.OK)
            .json({
                username: user.username,
                role: user.role,
                token: user.getJwtToken(),
                success: true,
                message: "Successfullu logged"
            });
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid email or password' });
    }
})