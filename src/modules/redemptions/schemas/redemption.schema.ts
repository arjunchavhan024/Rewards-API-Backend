import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RedemptionDocument = Redemption & Document;

export enum RewardType {
  CASHBACK = 'cashback',
  VOUCHER = 'voucher',
  DISCOUNT = 'discount',
  GIFT_CARD = 'gift_card',
}

@Schema({ timestamps: true })
export class Redemption {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  pointsRedeemed: number;

  @Prop({ required: true, enum: RewardType })
  rewardType: RewardType;

  @Prop({ required: true })
  rewardDetails: string;

  @Prop({ required: true, min: 0 })
  rewardValue: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const RedemptionSchema = SchemaFactory.createForClass(Redemption);

// Create indexes for better query performance
RedemptionSchema.index({ userId: 1, timestamp: -1 });
RedemptionSchema.index({ rewardType: 1 });
RedemptionSchema.index({ timestamp: -1 });