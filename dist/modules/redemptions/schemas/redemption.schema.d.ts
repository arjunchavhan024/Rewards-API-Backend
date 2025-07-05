import { Document, Types } from 'mongoose';
export type RedemptionDocument = Redemption & Document;
export declare enum RewardType {
    CASHBACK = "cashback",
    VOUCHER = "voucher",
    DISCOUNT = "discount",
    GIFT_CARD = "gift_card"
}
export declare class Redemption {
    userId: Types.ObjectId;
    pointsRedeemed: number;
    rewardType: RewardType;
    rewardDetails: string;
    rewardValue: number;
    timestamp: Date;
}
export declare const RedemptionSchema: import("mongoose").Schema<Redemption, import("mongoose").Model<Redemption, any, any, any, Document<unknown, any, Redemption> & Redemption & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Redemption, Document<unknown, {}, import("mongoose").FlatRecord<Redemption>> & import("mongoose").FlatRecord<Redemption> & {
    _id: Types.ObjectId;
}>;
