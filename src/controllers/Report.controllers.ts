import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MPayment } from "../models/Payment.model";
import { MTreasury } from "../models/Treasury";
import { MProject } from "../models/Project.model";

export class CReport implements Controller {

    static async getAll(req: Request, res: Response) {

        // get each project and total earns
        const reports = await MPayment
        .aggregate()
        .lookup({ from: 'bills', localField: 'billID', foreignField: '_id', as: 'billID'})
        .group({ _id: '$billID.projectID', earn: { $sum: '$amount' } })
        
        // serialize data that is because any payment has exacly one bill
        for(const r of reports)
            r._id = r._id?.[0]

        // populate project id field
        await MProject.populate(reports, { path: '_id' })

        // add other data from treasury
        for(const r of reports){
            r.earn |= 0 // fallback to 0 if key is not set
            r.lost |= 0 // fallback to 0 if key is not set

            // calc earn
            r.earn += (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , projectID: r._id._id })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0

            // calc lost
            r.lost += (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , projectID: r._id._id })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0

            // we need only name to save bandwidth
            r.project = r._id.name
            delete r._id
        }

        // 'other' transactions
        reports.push({
            project: '<other>',
            
            // calc earn
            earn : (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , name: '<other>' })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0,
            
            // calc lost
            lost : (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , name: '<other>' })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0
        })

        // calc balance
        let total = 0;
        for(const r of reports){
            r.balance = r.earn + r.lost
            total += r.balance
        }

        return res.json({ reports, total })
    }

}