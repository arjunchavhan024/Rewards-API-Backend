import { Document, Types } from 'mongoose';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    userId: Types.ObjectId;
    amount: number;
    category: string;
    pointsEarned: number;
    timestamp: Date;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & {
    _id: Types.ObjectId;
}>;
