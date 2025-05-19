import { Document } from 'mongoose';
export type RewardRequestDocument = RewardRequest & Document;
export declare class RewardRequest {
    userId: string;
    eventId: string;
    rewardId: string;
    status: string;
    requestedAt: Date;
    reason?: string;
}
export declare const RewardRequestSchema: import("mongoose").Schema<RewardRequest, import("mongoose").Model<RewardRequest, any, any, any, Document<unknown, any, RewardRequest, any> & RewardRequest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RewardRequest, Document<unknown, {}, import("mongoose").FlatRecord<RewardRequest>, {}> & import("mongoose").FlatRecord<RewardRequest> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
