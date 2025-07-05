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
exports.RedemptionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const redemptions_service_1 = require("./redemptions.service");
const redeem_points_dto_1 = require("./dto/redeem-points.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let RedemptionsController = class RedemptionsController {
    constructor(redemptionsService) {
        this.redemptionsService = redemptionsService;
    }
    async redeemPoints(redeemPointsDto) {
        const redemption = await this.redemptionsService.redeemPoints(redeemPointsDto);
        return {
            success: true,
            data: redemption,
            message: 'Points redeemed successfully',
        };
    }
    async findAll(paginationDto) {
        return this.redemptionsService.findAll(paginationDto);
    }
    async findByUserId(userId, paginationDto) {
        return this.redemptionsService.findByUserId(userId, paginationDto);
    }
};
exports.RedemptionsController = RedemptionsController;
__decorate([
    (0, common_1.Post)('redeem'),
    (0, swagger_1.ApiOperation)({ summary: 'Redeem reward points' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Points redeemed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request or insufficient points' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redeem_points_dto_1.RedeemPointsDto]),
    __metadata("design:returntype", Promise)
], RedemptionsController.prototype, "redeemPoints", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all redemptions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Redemptions retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], RedemptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get redemptions by user ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Redemptions retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], RedemptionsController.prototype, "findByUserId", null);
exports.RedemptionsController = RedemptionsController = __decorate([
    (0, swagger_1.ApiTags)('redemptions'),
    (0, common_1.Controller)('redemptions'),
    __metadata("design:paramtypes", [redemptions_service_1.RedemptionsService])
], RedemptionsController);
//# sourceMappingURL=redemptions.controller.js.map