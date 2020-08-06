import { Document } from "mongoose";

export interface IProject extends Document {
    name: string
    desc: string
    fees: number
    createdAt: Date
}