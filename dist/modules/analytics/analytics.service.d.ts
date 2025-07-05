import { Model } from 'mongoose';
import { TransactionDocument } from '../transactions/schemas/transaction.schema';
import { RedemptionDocument } from '../redemptions/schemas/redemption.schema';
export declare class AnalyticsService {
    private transactionModel;
    private redemptionModel;
    constructor(transactionModel: Model<TransactionDocument>, redemptionModel: Model<RedemptionDocument>);
    getRewardsDistribution(): Promise<any>;
    private getOverallStats;
}
