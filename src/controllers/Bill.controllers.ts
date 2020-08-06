import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MBill } from "../models/Bill.model";

export class CBill implements Controller {

    static async create(req: Request, res: Response) {
        const { userID, projectID, quantity, createdAt } = req.body
        const bill = new MBill()
        bill.userID = userID
        bill.projectID = projectID
        bill.quantity = quantity
        bill.createdAt = createdAt
        await bill.save()
        return res.json({}).status(204)
    }

    static async getAll(req: Request, res: Response) {
        const query = req.params
        const bills = await MBill.find(query)
        return res.json({ bills })
    }
}