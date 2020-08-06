import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MPayment } from "../models/Payment.model";
import { MBill } from "../models/Bill.model";
import { MTreasury } from "../models/Treasury";
import { MProject } from "../models/Project.model";

export class CReport implements Controller {

    static async getAll(req: Request, res: Response) {

        // get each project and total earns
        const reports = await MPayment
        .aggregate()
        .lookup({ from: 'bills', localField: 'billID', foreignField: '_id', as: 'billID'})
        .group({ _id: '$billID.projectID', earn: { $sum: '$amount' } })
        
        // serialize data
        for(const r of reports)
            r._id = r._id?.[0]
        
        // populate project id field
        MProject.populate(reports, { path: '_id' })
        
        // add other data from treasury
        for(const r of reports){
            r.earn = r.earn || 0
            r.lost = r.lost || 0

            r.earn += (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , projectID: r._id })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0

            r.lost += (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , projectID: r._id })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0

            r.project = r._id.name
            delete r._id
        }

        // 'other' transactions
        reports.push({
            project: '<other>',

            earn : (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , name: '<other>' })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0,

            lost : (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , name: '<other>' })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0
        })

        // calculate balance
        let total = 0;
        for(const r of reports){
            r.balance = r.earn + r.lost
            total += r.balance
        }

        return res.json({ reports, total })
    }

}