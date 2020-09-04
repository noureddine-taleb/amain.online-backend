import { MProject } from "../models/Project.model"
import { MUser } from "../models/User.model"
import { MPayment } from "../models/Payment.model"
import { MBill } from "../models/Bill.model"

export const resolvers = {
    Query: {
        projects: async (_: any, args: any) => MProject.find(args).populate('createdByID').sort('-createdAt'),
        users: (_: any, args: any) => MUser.find(args).sort('-createdAt'),
        // payments: (_: any, args: any) => MPayment.find(args).populate('billID').populate('createdByID'),
        // bills: (_: any, args: any) => MBill.find(args).populate('userID').populate('createdByID').populate('projectID'),
    }
}
