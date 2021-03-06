import { NextFunction, Request, Response } from "express";

export default abstract class BaseUsecase {
    abstract execute(req: Request, res: Response, next: NextFunction): void;
}

