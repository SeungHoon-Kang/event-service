import { Document, Types } from 'mongoose';
export type EventUserDocument = EventUser & Document;
export declare class EventUser {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    rewardedAt: Date;
}
export declare const EventUserSchema: import("mongoose").Schema<EventUser, import("mongoose").Model<EventUser, any, any, any, Document<unknown, any, EventUser, any> & EventUser & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventUser, Document<unknown, {}, import("mongoose").FlatRecord<EventUser>, {}> & import("mongoose").FlatRecord<EventUser> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
