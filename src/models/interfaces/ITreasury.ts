import { Document } from "mongoose";
import { IProject } from "./IProject";

export interface ITreasury extends Document {
    name: string
    desc: string
    amount: number
    projectID: IProject['_id']
    createdAt: Date
}