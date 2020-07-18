import { Request, Response } from "express";

export interface Controller {
    getAll?(req: Request, res: Response): void;
    getOne?(req: Request, res: Response): void;
    create?(req: Request, res: Response): void;
    destroy?(req: Request, res: Response): void;
    update?(req: Request, res: Response): void;
}