import { Document } from "mongoose";
import { IProject } from "./IProject";
import { IUserDocument } from "./IUser";

export interface ITreasury extends Document {
    name: string
    desc: string
    amount: number
    projectID: IProject['_id']
    createdByID: IUserDocument['_id']
    createdAt: Date
}