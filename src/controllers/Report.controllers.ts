import { Controller } from "./Controller";
import { Request, Response } from "express";
import { MPayment } from "../models/Payment.model";
import { MTreasury } from "../models/Treasury";
import { MProject } from "../models/Project.model";
import { IPayment } from "../models/interfaces/IPayment";

export class CReport implements Controller {

    static async getAll(req: Request, res: Response) {
        // final result [{*name, *earn, *lost, *balance, *quantity, *unit, stuck*}] sorted

        // get each project and total earns
        // out {...project, earn, lost=0}
        const reports = await MProject
        .aggregate()
        .lookup({ from: 'bills', localField: '_id', foreignField: 'projectID', as: 'bills'})
        
        for(const r of reports){
            r.earn = 0;
            r.lost = 0;
            r.quantity = 0;
            r.stuck = 0;
            for(const b of r.bills){
                const payment = await MPayment.findOne({ billID: b._id })
                payment ? (r.earn += payment.amount) : (r.stuck += (b.quantity * r.fees))
                r.quantity += b.quantity
            }

            delete r.bills
            delete r.desc
            delete r.fees
            delete r.createdAt
            delete r.createdByID
        }

        // add other data from treasury
        for(const r of reports){
            // calc earn
            r.earn += (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , projectID: r._id })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0

            // calc lost
            r.lost += (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , projectID: r._id })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0
        }

        // 'other' transactions
        reports.push({
            name: '<other>',
            
            // calc earn
            earn : (await MTreasury.aggregate()
            .match({ amount : { $gte: 0 } , name: '<other>' })
            .group({ _id: null, earn: { $sum: '$amount' } }))[0]?.earn || 0,
            
            // calc lost
            lost : (await MTreasury.aggregate()
            .match({ amount : { $lt: 0 } , name: '<other>' })
            .group({ _id: null, lost: { $sum: '$amount' } }))[0]?.lost || 0,

            quantity: '',
            stuck: '',
            unit: '',
        })

        // calc balance
        let total = 0;
        for(const r of reports){
            r.balance = r.earn + r.lost
            total += r.balance
        }

        const sortedReports = (reports as Array<any>).sort( (a, b) => b.balance - a.balance )
        
        return res.json({ reports: sortedReports, total })
    }

}