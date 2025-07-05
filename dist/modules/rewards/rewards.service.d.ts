import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { UsersService } from '../users/users.service';
export declare class RewardsService {
    private rewardModel;
    private usersService;
    constructor(rewardModel: Model<RewardDocument>, usersService: UsersService);
    getPointsByUserId(userId: string): Promise<number>;
    addPoints(userId: string, points: number): Promise<Reward>;
    deductPoints(userId: string, points: number): Promise<Reward>;
    findByUserId(userId: string): Promise<Reward>;
}
