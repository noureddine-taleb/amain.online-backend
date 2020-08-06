import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MUser } from "../models/User.model";
import { HttpError } from "../helpers/helpers.helpers";
import { MBill } from "../models/Bill.model";
import multer from "multer";
import path from 'path'
import { MPayment } from "../models/Payment.model";

export class CUser implements Controller {

    static async getAll(req: Request, res: Response) {
        const query = req.params
        const users = await MUser.find(query)
        return res.json({ users })
    }

    static async self(req: Request, res: Response) {
        const _id = (<any>req)?.auth?.userID
        const user = await MUser.findOne({ _id })
        return res.json({ user: user?.getUser() })
    }

    static async login(req: Request, res: Response) {
        const { phone, password } = req.body
        const user = await MUser.findOne({ phone })
        if (!user) throw new HttpError('User Not Found', 404)
        await user.compare(password)
        return res.json({ user: user.getUser() })
    }

    static upload = multer({ dest: path.join(__dirname, '../../public/images/profiles') }).single('image')
    
    static async create(req: Request, res: Response) {
        const { name, phone, dob, password, image, createdAt } = req.body
        const user = new MUser()
        user.name = name
        user.phone = phone
        user.dob = dob
        user.password = password
        user.image = image
        user.createdAt = createdAt
        await user.save()
        return res.json({}).status(204)
    }

    static async bills(req: Request, res: Response) {
        const userID = req.params.userID || (req as any)?.auth?.userID
        const bills = await MBill
        .find({ userID })
        .populate('userID')
        .populate('projectID')
        .lean()
        for(const bill of bills){
            (<any>bill).paymentID = await MPayment.findOne({ billID: bill._id })
        }

        return res.json({ bills })
    }
}