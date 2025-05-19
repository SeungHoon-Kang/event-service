import { Model } from 'mongoose';
import { Event, EventDocument } from '../event/schema/event.schema';
import { User } from '../user/schema/user.schema';
import { UserLogin } from '../user/schema/user-login.schema';
import { EventUserDocument } from './schema/event-user.schema';
import { Reward, RewardDocument } from './schema/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
export declare class RewardService {
    private eventModel;
    private userModel;
    private userLoginModel;
    private rewardModel;
    private eventUserModel;
    constructor(eventModel: Model<EventDocument>, userModel: Model<User>, userLoginModel: Model<UserLogin>, rewardModel: Model<RewardDocument>, eventUserModel: Model<EventUserDocument>);
    createReward(createRewardDto: CreateRewardDto): Promise<Reward>;
    findRewardAll(): Promise<Reward[]>;
    checkAutoReward(userId: string): Promise<{
        eligible: boolean;
        rewardId?: string;
        rewardTitle?: string;
        eventId?: string;
        eventTitle?: string;
        message: string;
        failedCondition?: string;
    }[]>;
    checkRewardConditions(userId: string, rewardCondition: string): Promise<boolean>;
    private checkConsecutiveLoginDays;
    private checkCumulativeLoginDays;
    private checkSpecificDateLogin;
    private checkReturningUser;
    private checkNewUser;
    findActiveEvents(): Promise<EventDocument[]>;
    findAllByUser(userId: string): Promise<EventUserDocument[]>;
    findHistory(): Promise<{
        userId: string;
        loginId?: string;
        eventId: string;
        eventTitle: string;
        rewardTitle: string;
        rewardedAt: Date;
    }[]>;
    findEventById(eventId: string): Promise<Event | null>;
    remove(id: string): Promise<void>;
}
