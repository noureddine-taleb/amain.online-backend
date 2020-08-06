import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    name: string
    phone: string
    dob: string
    image: string
    password: string
    _isAdmin: boolean
    createdAt: Date

    getUser(): object
    _generateToken(): string
    compare(password: string): Promise<boolean>
    hash(): Promise<void>
    isAdmin(): boolean
}

export interface IUserModel extends  Model<IUserDocument> {
    decode(token: string): Promise<object>
}