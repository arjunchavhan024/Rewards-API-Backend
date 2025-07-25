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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemPointsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const redemption_schema_1 = require("../schemas/redemption.schema");
class RedeemPointsDto {
}
exports.RedeemPointsDto = RedeemPointsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RedeemPointsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Points to redeem', minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RedeemPointsDto.prototype, "pointsToRedeem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of reward', enum: redemption_schema_1.RewardType }),
    (0, class_validator_1.IsEnum)(redemption_schema_1.RewardType),
    __metadata("design:type", String)
], RedeemPointsDto.prototype, "rewardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Details about the reward' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RedeemPointsDto.prototype, "rewardDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Value of the reward', minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RedeemPointsDto.prototype, "rewardValue", void 0);
//# sourceMappingURL=redeem-points.dto.js.map