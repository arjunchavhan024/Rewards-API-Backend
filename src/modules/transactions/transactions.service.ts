import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse, PaginationMeta } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';
import { RewardsService } from '../rewards/rewards.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private usersService: UsersService,
    private rewardsService: RewardsService,
  ) {
    this.seedTransactions();
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { userId, amount, category, pointsEarned } = createTransactionDto;

    // Validate user exists
    await this.usersService.findById(userId);

    // Calculate points if not provided (1 point per dollar)
    const calculatedPoints = pointsEarned ?? Math.floor(amount);

    const transaction = new this.transactionModel({
      userId,
      amount,
      category,
      pointsEarned: calculatedPoints,
    });

    const savedTransaction = await transaction.save();

    // Add points to user's reward account
    await this.rewardsService.addPoints(userId, calculatedPoints);

    return savedTransaction;
  }

  async findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<Transaction[]>> {
    const { page, limit } = paginationDto;

    // Validate user exists
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

    const meta: PaginationMeta = {
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

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Transaction[]>> {
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

    const meta: PaginationMeta = {
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

  private async seedTransactions(): Promise<void> {
    const count = await this.transactionModel.countDocuments();
    if (count === 0) {
      const users = await this.usersService.findAll();
      const categories = ['Food', 'Shopping', 'Gas', 'Entertainment', 'Travel', 'Utilities'];
      
      const mockTransactions = [];
      
      for (const user of users) {
        for (let i = 0; i < 10; i++) {
          const amount = Math.floor(Math.random() * 200) + 10;
          const category = categories[Math.floor(Math.random() * categories.length)];
          const pointsEarned = Math.floor(amount * 0.1); // 10% of amount as points
          
          mockTransactions.push({
            userId: user._id,
            amount,
            category,
            pointsEarned,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          });
        }
      }

      await this.transactionModel.insertMany(mockTransactions);
      console.log('Mock transactions seeded successfully');

      // Update reward points for all users
      for (const user of users) {
        const userTransactions = mockTransactions.filter(t => t.userId.toString() === user._id.toString());
        const totalPoints = userTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);
        await this.rewardsService.addPoints(user._id.toString(), totalPoints);
      }
    }
  }
}