import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { RewardsGateway } from './rewards.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    UsersModule,
  ],
  controllers: [RewardsController],
  providers: [RewardsService, RewardsGateway],
  exports: [RewardsService],
})
export class RewardsModule {}