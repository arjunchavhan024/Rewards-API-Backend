import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsModule } from './modules/rewards/rewards.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { RedemptionsModule } from './modules/redemptions/redemptions.module';
import { UsersModule } from './modules/users/users.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    UsersModule,
    RewardsModule,
    TransactionsModule,
    RedemptionsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}