import { Document, Types } from 'mongoose';
export type RewardDocument = Reward & Document;
export declare class Reward {
    userId: Types.ObjectId;
    totalPoints: number;
    updatedAt: Date;
}
export declare const RewardSchema: import("mongoose").Schema<Reward, import("mongoose").Model<Reward, any, any, any, Document<unknown, any, Reward> & Reward & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reward, Document<unknown, {}, import("mongoose").FlatRecord<Reward>> & import("mongoose").FlatRecord<Reward> & {
    _id: Types.ObjectId;
}>;
