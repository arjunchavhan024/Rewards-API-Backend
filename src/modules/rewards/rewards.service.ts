import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    private usersService: UsersService,
  ) {}

  async getPointsByUserId(userId: string): Promise<number> {
    // Validate user exists
    await this.usersService.findById(userId);
    
    const reward = await this.rewardModel.findOne({ userId }).exec();
    return reward ? reward.totalPoints : 0;
  }

  async addPoints(userId: string, points: number): Promise<Reward> {
    if (points < 0) {
      throw new BadRequestException('Points must be a positive number');
    }

    // Validate user exists
    await this.usersService.findById(userId);

    const reward = await this.rewardModel.findOneAndUpdate(
      { userId },
      { $inc: { totalPoints: points }, $set: { updatedAt: new Date() } },
      { new: true, upsert: true },
    ).exec();

    return reward;
  }

  async deductPoints(userId: string, points: number): Promise<Reward> {
    if (points < 0) {
      throw new BadRequestException('Points must be a positive number');
    }

    // Validate user exists
    await this.usersService.findById(userId);

    const currentReward = await this.rewardModel.findOne({ userId }).exec();
    const currentPoints = currentReward ? currentReward.totalPoints : 0;

    if (currentPoints < points) {
      throw new BadRequestException('Insufficient points for this operation');
    }

    const reward = await this.rewardModel.findOneAndUpdate(
      { userId },
      { $inc: { totalPoints: -points }, $set: { updatedAt: new Date() } },
      { new: true },
    ).exec();

    return reward;
  }

  async findByUserId(userId: string): Promise<Reward> {
    // Validate user exists
    await this.usersService.findById(userId);

    const reward = await this.rewardModel.findOne({ userId }).exec();
    if (!reward) {
      // Create a new reward record if it doesn't exist
      return this.rewardModel.create({ userId, totalPoints: 0 });
    }
    return reward;
  }
}