"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedemptionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const redemption_schema_1 = require("./schemas/redemption.schema");
const redemptions_service_1 = require("./redemptions.service");
const redemptions_controller_1 = require("./redemptions.controller");
const users_module_1 = require("../users/users.module");
const rewards_module_1 = require("../rewards/rewards.module");
let RedemptionsModule = class RedemptionsModule {
};
exports.RedemptionsModule = RedemptionsModule;
exports.RedemptionsModule = RedemptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: redemption_schema_1.Redemption.name, schema: redemption_schema_1.RedemptionSchema }]),
            users_module_1.UsersModule,
            rewards_module_1.RewardsModule,
        ],
        controllers: [redemptions_controller_1.RedemptionsController],
        providers: [redemptions_service_1.RedemptionsService],
        exports: [redemptions_service_1.RedemptionsService],
    })
], RedemptionsModule);
//# sourceMappingURL=redemptions.module.js.map