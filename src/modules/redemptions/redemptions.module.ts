import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Redemption, RedemptionSchema } from './schemas/redemption.schema';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsController } from './redemptions.controller';
import { UsersModule } from '../users/users.module';
import { RewardsModule } from '../rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Redemption.name, schema: RedemptionSchema }]),
    UsersModule,
    RewardsModule,
  ],
  controllers: [RedemptionsController],
  providers: [RedemptionsService],
  exports: [RedemptionsService],
})
export class RedemptionsModule {}