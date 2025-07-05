import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from 'class-validator';
import { RewardType } from '../schemas/redemption.schema';

export class RedeemPointsDto {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Points to redeem', minimum: 1 })
  @IsNumber()
  @Min(1)
  pointsToRedeem: number;

  @ApiProperty({ description: 'Type of reward', enum: RewardType })
  @IsEnum(RewardType)
  rewardType: RewardType;

  @ApiProperty({ description: 'Details about the reward' })
  @IsNotEmpty()
  @IsString()
  rewardDetails: string;

  @ApiProperty({ description: 'Value of the reward', minimum: 0 })
  @IsNumber()
  @Min(0)
  rewardValue: number;
}