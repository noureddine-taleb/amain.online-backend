import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MTreasury } from "../models/Treasury";

export class CTreasury implements Controller {

    static async create(req: Request, res: Response) {
        const { amount, projectID, name, desc, createdByID, createdAt } = req.body
        const treasury = new MTreasury()
        treasury.amount = amount
        treasury.name = name
        projectID && (treasury.projectID = projectID)
        treasury.desc = desc
        treasury.createdByID = createdByID
        treasury.createdAt = createdAt
        await treasury.save()
        return res.json({}).status(204)
    }

}