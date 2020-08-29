import { MProject } from "../models/Project.model"
import { MUser } from "../models/User.model"
import { MPayment } from "../models/Payment.model"
import { MBill } from "../models/Bill.model"

export const resolvers = {
    Query: {
        projects: async (_: any, args: any) => {
            const res = MProject.find({...args, _populate: undefined})
            if(args._populate?.length){
                for(const p of args._populate){
                    await res.populate(p)
                    console.log({p})
                }
            }
            return res;
        },
        users: (_: any, args: any) => MUser.find(args),
        payments: (_: any, args: any) => MPayment.find(args),
        bills: (_: any, args: any) => MBill.find(args),
    }
}
