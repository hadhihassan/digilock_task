import { NextFunction, Request, Response } from "express";

export const asyncErrorHandler =
    (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: any) => next(err));
    };