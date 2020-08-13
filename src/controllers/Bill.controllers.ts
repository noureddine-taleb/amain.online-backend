import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MBill } from "../models/Bill.model";
import { DateFormat } from "../helpers/helpers.helpers";
import { create } from 'html-pdf';

export class CBill implements Controller {

    static async create(req: Request, res: Response) {
        const { userID, projectID, quantity, createdByID, createdAt } = req.body
        const bill = new MBill()
        bill.userID = userID
        bill.projectID = projectID
        bill.quantity = quantity
        bill.createdByID = createdByID
        bill.createdAt = createdAt
        await bill.save()
        return res.json({}).status(204)
    }

    static async getAll(req: Request, res: Response) {
        const query = req.params
        const bills = await MBill.find(query)
        return res.json({ bills })
    }

    static async getOne(req: Request, res: Response) {
        const _id = req.params._id
        const isPDF = req.query.pdf
        const bill = await MBill.findOne({ _id })
                                .populate('userID')
                                .populate('projectID')
                                .lean() as any
        
        if(isPDF){
            bill.createdAt = new Date(bill.createdAt);
            bill.deadline = new Date(bill.createdAt);
            (bill.deadline as Date).setDate((bill.deadline as Date).getDate() + 15)
            
            bill.createdAt = DateFormat(bill.createdAt)
            bill.deadline = DateFormat(bill.deadline)

            bill.cfees = 10
            bill.penalty = 0
            bill.total = bill.cfees + bill.penalty + (bill.projectID.fees * bill.quantity)

            return res.render('bill',{ bill }, (err, html) => {
                create(html
                    ,{ 
                        "orientation": "landscape",
                }
                    ).toStream((err, stream) => {
                    stream.pipe(res);
                })
            })
        }else{
            return res.json({ bill })
        }
    }
}