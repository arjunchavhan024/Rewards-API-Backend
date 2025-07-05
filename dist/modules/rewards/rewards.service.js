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
exports.RewardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reward_schema_1 = require("./schemas/reward.schema");
const users_service_1 = require("../users/users.service");
let RewardsService = class RewardsService {
    constructor(rewardModel, usersService) {
        this.rewardModel = rewardModel;
        this.usersService = usersService;
    }
    async getPointsByUserId(userId) {
        await this.usersService.findById(userId);
        const reward = await this.rewardModel.findOne({ userId }).exec();
        return reward ? reward.totalPoints : 0;
    }
    async addPoints(userId, points) {
        if (points < 0) {
            throw new common_1.BadRequestException('Points must be a positive number');
        }
        await this.usersService.findById(userId);
        const reward = await this.rewardModel.findOneAndUpdate({ userId }, { $inc: { totalPoints: points }, $set: { updatedAt: new Date() } }, { new: true, upsert: true }).exec();
        return reward;
    }
    async deductPoints(userId, points) {
        if (points < 0) {
            throw new common_1.BadRequestException('Points must be a positive number');
        }
        await this.usersService.findById(userId);
        const currentReward = await this.rewardModel.findOne({ userId }).exec();
        const currentPoints = currentReward ? currentReward.totalPoints : 0;
        if (currentPoints < points) {
            throw new common_1.BadRequestException('Insufficient points for this operation');
        }
        const reward = await this.rewardModel.findOneAndUpdate({ userId }, { $inc: { totalPoints: -points }, $set: { updatedAt: new Date() } }, { new: true }).exec();
        return reward;
    }
    async findByUserId(userId) {
        await this.usersService.findById(userId);
        const reward = await this.rewardModel.findOne({ userId }).exec();
        if (!reward) {
            return this.rewardModel.create({ userId, totalPoints: 0 });
        }
        return reward;
    }
};
exports.RewardsService = RewardsService;
exports.RewardsService = RewardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reward_schema_1.Reward.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], RewardsService);
//# sourceMappingURL=rewards.service.js.map