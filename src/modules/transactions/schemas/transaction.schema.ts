import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, min: 0 })
  pointsEarned: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// Create indexes for better query performance
TransactionSchema.index({ userId: 1, timestamp: -1 });
TransactionSchema.index({ category: 1 });
TransactionSchema.index({ timestamp: -1 });