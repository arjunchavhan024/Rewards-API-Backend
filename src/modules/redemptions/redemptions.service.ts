import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Redemption, RedemptionDocument } from './schemas/redemption.schema';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse, PaginationMeta } from '../../common/interfaces/api-response.interface';
import { UsersService } from '../users/users.service';
import { RewardsService } from '../rewards/rewards.service';

@Injectable()
export class RedemptionsService {
  constructor(
    @InjectModel(Redemption.name) private redemptionModel: Model<RedemptionDocument>,
    private usersService: UsersService,
    private rewardsService: RewardsService,
  ) {}

  async redeemPoints(redeemPointsDto: RedeemPointsDto): Promise<Redemption> {
    const { userId, pointsToRedeem, rewardType, rewardDetails, rewardValue } = redeemPointsDto;

    // Validate user exists
    await this.usersService.findById(userId);

    // Check if user has enough points
    const currentPoints = await this.rewardsService.getPointsByUserId(userId);
    if (currentPoints < pointsToRedeem) {
      throw new BadRequestException(
        `Insufficient points. You have ${currentPoints} points, but need ${pointsToRedeem} points.`
      );
    }

    // Deduct points from user's account
    await this.rewardsService.deductPoints(userId, pointsToRedeem);

    // Create redemption record
    const redemption = new this.redemptionModel({
      userId,
      pointsRedeemed: pointsToRedeem,
      rewardType,
      rewardDetails,
      rewardValue,
    });

    const savedRedemption = await redemption.save();

    return savedRedemption;
  }

  async findByUserId(userId: string, paginationDto: PaginationDto): Promise<PaginatedResponse<Redemption[]>> {
    const { page, limit } = paginationDto;

    // Validate user exists
    await this.usersService.findById(userId);

    const skip = (page - 1) * limit;

    const [redemptions, totalItems] = await Promise.all([
      this.redemptionModel
        .find({ userId })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.redemptionModel.countDocuments({ userId }).exec(),
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
      data: redemptions,
      meta,
    };
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Redemption[]>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [redemptions, totalItems] = await Promise.all([
      this.redemptionModel
        .find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.redemptionModel.countDocuments().exec(),
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
      data: redemptions,
      meta,
    };
  }
}