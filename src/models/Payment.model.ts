import mongoose, { Schema } from 'mongoose'
import { IPayment } from './interfaces/IPayment'

const PaymentSchema : Schema = new Schema({
    billID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date()
    },
})

export const MPayment = mongoose.model<IPayment>('Payment', PaymentSchema)