import mongoose, { Schema } from 'mongoose'
import { ITreasury } from './interfaces/ITreasury'

const TreasurySchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },

    projectID: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
    },

    createdByID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    createdAt: {
        type: Date,
        default: Date()
    },
})

export const MTreasury = mongoose.model<ITreasury>('Treasury', TreasurySchema)