import { Document } from "mongoose";
import { IUserDocument } from "./IUser";
import { IProject } from "./IProject";

export interface IBill extends Document {
    userID: IUserDocument['_id']
    quantity: number
    projectID: IProject['_id']
    createdByID: IUserDocument['_id']
    createdAt: Date
}