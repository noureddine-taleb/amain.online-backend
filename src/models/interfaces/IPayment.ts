import { Document } from "mongoose";
import { IBill } from "./IBill";

export interface IPayment extends Document {
    billID: IBill['_id']
    createdAt: Date
    amount: number
}