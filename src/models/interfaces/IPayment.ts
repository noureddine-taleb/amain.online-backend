import { Document } from "mongoose";
import { IBill } from "./IBill";
import { IUserDocument } from "./IUser";

export interface IPayment extends Document {
    billID: IBill['_id']
    amount: number
    createdByID: IUserDocument['_id']
    createdAt: Date
}