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
exports.RedemptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const redemption_schema_1 = require("./schemas/redemption.schema");
const users_service_1 = require("../users/users.service");
const rewards_service_1 = require("../rewards/rewards.service");
let RedemptionsService = class RedemptionsService {
    constructor(redemptionModel, usersService, rewardsService) {
        this.redemptionModel = redemptionModel;
        this.usersService = usersService;
        this.rewardsService = rewardsService;
    }
    async redeemPoints(redeemPointsDto) {
        const { userId, pointsToRedeem, rewardType, rewardDetails, rewardValue } = redeemPointsDto;
        await this.usersService.findById(userId);
        const currentPoints = await this.rewardsService.getPointsByUserId(userId);
        if (currentPoints < pointsToRedeem) {
            throw new common_1.BadRequestException(`Insufficient points. You have ${currentPoints} points, but need ${pointsToRedeem} points.`);
        }
        await this.rewardsService.deductPoints(userId, pointsToRedeem);
        const redemption = new this.redemptionModel({
            userId,
            pointsRedeemed: pointsToRedeem,
            rewardType,
            rewardDetails,
            rewardValue,
        });
        const savedRedemption = await redemption.save();
        return savedRedemption;
    }
    async findByUserId(userId, paginationDto) {
        const { page, limit } = paginationDto;
        await this.usersService.findById(userId);
        const skip = (page - 1) * limit;
        const [redemptions, totalItems] = await Promise.all([
            this.redemptionModel
                .find({ userId })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.redemptionModel.countDocuments({ userId }).exec(),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        const meta = {
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
        return {
            success: true,
            data: redemptions,
            meta,
        };
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;
        const [redemptions, totalItems] = await Promise.all([
            this.redemptionModel
                .find()
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.redemptionModel.countDocuments().exec(),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        const meta = {
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
        return {
            success: true,
            data: redemptions,
            meta,
        };
    }
};
exports.RedemptionsService = RedemptionsService;
exports.RedemptionsService = RedemptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(redemption_schema_1.Redemption.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        rewards_service_1.RewardsService])
], RedemptionsService);
//# sourceMappingURL=redemptions.service.js.map