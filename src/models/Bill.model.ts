import mongoose, { Schema } from 'mongoose'
import { IBill } from './interfaces/IBill'

const BillSchema : Schema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    projectID: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date()
    },
})

export const MBill = mongoose.model<IBill>('Bill', BillSchema)