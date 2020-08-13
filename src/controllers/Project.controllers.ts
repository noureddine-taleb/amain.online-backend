import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MProject } from "../models/Project.model";

export class CProject implements Controller {

    static async create(req: Request, res: Response) {
        const { name, desc, fees, createdByID, createdAt } = req.body
        const project = new MProject()
        project.name = name
        project.desc = desc
        project.fees = fees
        project.createdByID = createdByID
        project.createdAt = createdAt
        await project.save()
        return res.json({}).status(204)
    }

    static async getAll(req: Request, res: Response) {
        const query = req.params
        const projects = await MProject.find(query)
        return res.json({ projects })
    }
}