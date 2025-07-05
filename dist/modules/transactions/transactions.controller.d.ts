import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        success: boolean;
        data: import("./schemas/transaction.schema").Transaction;
        message: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<any>>;
    findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<any>>;
}
