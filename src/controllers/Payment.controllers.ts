import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MPayment } from "../models/Payment.model";
import { MBill } from "../models/Bill.model";
import { IProject } from "../models/interfaces/IProject";

export class CPayment implements Controller {

    static async create(req: Request, res: Response) {
        const { billID, createdByID, createdAt } = req.body
        const payment = new MPayment()
        payment.billID = billID
        payment.createdByID = createdByID
        payment.createdAt = createdAt
        const bill = await MBill.findOne({ _id: billID }).populate('projectID')
        payment.amount = ((bill?.projectID as IProject).fees || 0) * (bill?.quantity || 0)
        await payment.save()
        return res.json({}).status(204)
    }

    static async getAll(req: Request, res: Response) {
        const query = req.params
        const payments = await MPayment.find(query)
        return res.json({ payments })
    }
}