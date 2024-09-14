import { asyncErrorHandler } from '../utils/asyncHandler'
import { StatusCodes } from 'http-status-codes'
import { Response, Request } from 'express';
import User from '../models/user'

export const listAllUsers = asyncErrorHandler(async (req: Request, res: Response) => {

    const RegistedUsers = await User.find();

    if (!RegistedUsers) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: "Users not found",
                success: false
            });
    }

    return res
        .status(StatusCodes.OK)
        .json({
            Users: RegistedUsers,
            success: true
        });
})

export const assignRole = asyncErrorHandler(async (req: Request, res: Response) => {
    const { id: userId } = req.params;

    const user = await User.findById(
        userId
    );

    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: "User not found",
                success: false
            });
    }

    user.role = user.role === "admin" ? "member" : "admin";
    await user.save();
    
    return res
        .status(StatusCodes.OK)
        .json({
            message: "Role assigned success.",
            success: true
        });
})