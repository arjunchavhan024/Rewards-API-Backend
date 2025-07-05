"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("../transactions/schemas/transaction.schema");
const redemption_schema_1 = require("../redemptions/schemas/redemption.schema");
let AnalyticsService = class AnalyticsService {
    constructor(transactionModel, redemptionModel) {
        this.transactionModel = transactionModel;
        this.redemptionModel = redemptionModel;
    }
    async getRewardsDistribution() {
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
    async getOverallStats() {
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(redemption_schema_1.Redemption.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map