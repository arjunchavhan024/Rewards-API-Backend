import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../transactions/schemas/transaction.schema';
import { Redemption, RedemptionDocument } from '../redemptions/schemas/redemption.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Redemption.name) private redemptionModel: Model<RedemptionDocument>,
  ) {}

  async getRewardsDistribution(): Promise<any> {
    const distribution = await this.transactionModel.aggregate([
      {
        $group: {
          _id: '$category',
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalPointsEarned: { $sum: '$pointsEarned' },
          avgAmount: { $avg: '$amount' },
          avgPointsEarned: { $avg: '$pointsEarned' },
        },
      },
      {
        $sort: { totalPointsEarned: -1 },
      },
    ]);

    const redemptionStats = await this.redemptionModel.aggregate([
      {
        $group: {
          _id: '$rewardType',
          totalRedemptions: { $sum: 1 },
          totalPointsRedeemed: { $sum: '$pointsRedeemed' },
          totalValue: { $sum: '$rewardValue' },
          avgPointsRedeemed: { $avg: '$pointsRedeemed' },
        },
      },
      {
        $sort: { totalPointsRedeemed: -1 },
      },
    ]);

    const overallStats = await this.getOverallStats();

    return {
      success: true,
      data: {
        categoryDistribution: distribution,
        redemptionStats,
        overallStats,
      },
    };
  }

  private async getOverallStats(): Promise<any> {
    const [transactionStats, redemptionStats] = await Promise.all([
      this.transactionModel.aggregate([
        {
          $group: {
            _id: null,
            totalTransactions: { $sum: 1 },
            totalAmount: { $sum: '$amount' },
            totalPointsEarned: { $sum: '$pointsEarned' },
            avgAmount: { $avg: '$amount' },
            avgPointsEarned: { $avg: '$pointsEarned' },
          },
        },
      ]),
      this.redemptionModel.aggregate([
        {
          $group: {
            _id: null,
            totalRedemptions: { $sum: 1 },
            totalPointsRedeemed: { $sum: '$pointsRedeemed' },
            totalValue: { $sum: '$rewardValue' },
            avgPointsRedeemed: { $avg: '$pointsRedeemed' },
          },
        },
      ]),
    ]);

    return {
      transactions: transactionStats[0] || {},
      redemptions: redemptionStats[0] || {},
    };
  }
}