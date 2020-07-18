import { Controller } from "./Controller";
import { Request, Response } from "express";

export class Project implements Controller {

    static create(req: Request, res: Response) {
        throw new Error('not implemented')
    }

    static getAll(req: Request, res: Response) {
        throw new Error('not implemented')
    }
}