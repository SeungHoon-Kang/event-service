import { Document } from 'mongoose';
export declare class UserLogin extends Document {
    userId: string;
    loginAt: Date;
}
export declare const UserLoginSchema: import("mongoose").Schema<UserLogin, import("mongoose").Model<UserLogin, any, any, any, Document<unknown, any, UserLogin, any> & UserLogin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserLogin, Document<unknown, {}, import("mongoose").FlatRecord<UserLogin>, {}> & import("mongoose").FlatRecord<UserLogin> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
