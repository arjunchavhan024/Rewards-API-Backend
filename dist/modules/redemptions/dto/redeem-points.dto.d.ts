import { RewardType } from '../schemas/redemption.schema';
export declare class RedeemPointsDto {
    userId: string;
    pointsToRedeem: number;
    rewardType: RewardType;
    rewardDetails: string;
    rewardValue: number;
}
