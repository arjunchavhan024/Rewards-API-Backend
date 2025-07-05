import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, default: 0, min: 0 })
  totalPoints: number;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);

// Create indexes for better query performance
RewardSchema.index({ userId: 1 });
RewardSchema.index({ updatedAt: -1 });