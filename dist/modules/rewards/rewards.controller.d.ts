import { RewardsService } from './rewards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
export declare class RewardsController {
    private readonly rewardsService;
    private readonly transactionsService;
    constructor(rewardsService: RewardsService, transactionsService: TransactionsService);
    getPoints(userId: string): Promise<{
        success: boolean;
        data: {
            userId: string;
            totalPoints: number;
        };
    }>;
    getTransactions(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<any>>;
}
