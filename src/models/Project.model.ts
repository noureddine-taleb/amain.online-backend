import mongoose, { Schema } from 'mongoose'
import { IProject } from './interfaces/IProject'

const ProjectSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        required: true,
    },

    fees: {
        type: Number,
        required: true,
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

export const MProject = mongoose.model<IProject>('Project', ProjectSchema)