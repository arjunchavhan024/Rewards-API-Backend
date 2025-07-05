import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';
import { RewardsService } from '../rewards/rewards.service';
export declare class TransactionsService {
    private transactionModel;
    private usersService;
    private rewardsService;
    constructor(transactionModel: Model<TransactionDocument>, usersService: UsersService, rewardsService: RewardsService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<Transaction[]>>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Transaction[]>>;
    private seedTransactions;
}
