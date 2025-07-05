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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./schemas/transaction.schema");
const users_service_1 = require("../users/users.service");
const rewards_service_1 = require("../rewards/rewards.service");
let TransactionsService = class TransactionsService {
    constructor(transactionModel, usersService, rewardsService) {
        this.transactionModel = transactionModel;
        this.usersService = usersService;
        this.rewardsService = rewardsService;
        this.seedTransactions();
    }
    async create(createTransactionDto) {
        const { userId, amount, category, pointsEarned } = createTransactionDto;
        await this.usersService.findById(userId);
        const calculatedPoints = pointsEarned !== null && pointsEarned !== void 0 ? pointsEarned : Math.floor(amount);
        const transaction = new this.transactionModel({
            userId,
            amount,
            category,
            pointsEarned: calculatedPoints,
        });
        const savedTransaction = await transaction.save();
        await this.rewardsService.addPoints(userId, calculatedPoints);
        return savedTransaction;
    }
    async findByUserId(userId, paginationDto) {
        const { page, limit } = paginationDto;
        await this.usersService.findById(userId);
        const skip = (page - 1) * limit;
        const [transactions, totalItems] = await Promise.all([
            this.transactionModel
                .find({ userId })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.transactionModel.countDocuments({ userId }).exec(),
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
            data: transactions,
            meta,
        };
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;
        const [transactions, totalItems] = await Promise.all([
            this.transactionModel
                .find()
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.transactionModel.countDocuments().exec(),
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
            data: transactions,
            meta,
        };
    }
    async seedTransactions() {
        const count = await this.transactionModel.countDocuments();
        if (count === 0) {
            const users = await this.usersService.findAll();
            const categories = ['Food', 'Shopping', 'Gas', 'Entertainment', 'Travel', 'Utilities'];
            const mockTransactions = [];
            for (const user of users) {
                for (let i = 0; i < 10; i++) {
                    const amount = Math.floor(Math.random() * 200) + 10;
                    const category = categories[Math.floor(Math.random() * categories.length)];
                    const pointsEarned = Math.floor(amount * 0.1);
                    mockTransactions.push({
                        userId: user._id,
                        amount,
                        category,
                        pointsEarned,
                        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                    });
                }
            }
            await this.transactionModel.insertMany(mockTransactions);
            console.log('Mock transactions seeded successfully');
            for (const user of users) {
                const userTransactions = mockTransactions.filter(t => t.userId.toString() === user._id.toString());
                const totalPoints = userTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);
                await this.rewardsService.addPoints(user._id.toString(), totalPoints);
            }
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        rewards_service_1.RewardsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map