import { Model } from 'mongoose';
import { Redemption, RedemptionDocument } from './schemas/redemption.schema';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';
import { RewardsService } from '../rewards/rewards.service';
export declare class RedemptionsService {
    private redemptionModel;
    private usersService;
    private rewardsService;
    constructor(redemptionModel: Model<RedemptionDocument>, usersService: UsersService, rewardsService: RewardsService);
    redeemPoints(redeemPointsDto: RedeemPointsDto): Promise<Redemption>;
    findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<Redemption[]>>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Redemption[]>>;
}
