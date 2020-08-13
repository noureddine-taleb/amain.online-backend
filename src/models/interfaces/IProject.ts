import { Document } from "mongoose";
import { IUserDocument } from "./IUser";

export interface IProject extends Document {
    name: string
    desc: string
    fees: number
    createdByID: IUserDocument['_id']
    createdAt: Date
}