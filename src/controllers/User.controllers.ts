import { Controller } from "./Controller";
import { Request, Response } from "express";

export class User implements Controller {

    static getAll(req: Request, res: Response) {
        throw new Error('not implemented')
    }
}