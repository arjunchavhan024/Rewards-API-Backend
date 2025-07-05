import { RedemptionsService } from './redemptions.service';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
export declare class RedemptionsController {
    private readonly redemptionsService;
    constructor(redemptionsService: RedemptionsService);
    redeemPoints(redeemPointsDto: RedeemPointsDto): Promise<{
        success: boolean;
        data: import("./schemas/redemption.schema").Redemption;
        message: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<any>>;
    findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<any>>;
}
