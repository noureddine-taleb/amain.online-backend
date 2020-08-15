import { Document } from "mongoose";
import { IUserDocument } from "./IUser";

export interface IProject extends Document {
    name: string
    desc: string
    fees: number
    unit: string
    createdByID: IUserDocument['_id']
    createdAt: Date
}