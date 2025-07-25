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
exports.RewardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rewards_service_1 = require("./rewards.service");
const transactions_service_1 = require("../transactions/transactions.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let RewardsController = class RewardsController {
    constructor(rewardsService, transactionsService) {
        this.rewardsService = rewardsService;
        this.transactionsService = transactionsService;
    }
    async getPoints(userId) {
        const totalPoints = await this.rewardsService.getPointsByUserId(userId);
        return {
            success: true,
            data: {
                userId,
                totalPoints,
            },
        };
    }
    async getTransactions(userId, paginationDto) {
        return this.transactionsService.findByUserId(userId, paginationDto);
    }
};
exports.RewardsController = RewardsController;
__decorate([
    (0, common_1.Get)('points/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total reward points for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Total points retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        userId: { type: 'string' },
                        totalPoints: { type: 'number' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getPoints", null);
__decorate([
    (0, common_1.Get)('transactions/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reward transactions for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transactions retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getTransactions", null);
exports.RewardsController = RewardsController = __decorate([
    (0, swagger_1.ApiTags)('rewards'),
    (0, common_1.Controller)('rewards'),
    __metadata("design:paramtypes", [rewards_service_1.RewardsService,
        transactions_service_1.TransactionsService])
], RewardsController);
//# sourceMappingURL=rewards.controller.js.map