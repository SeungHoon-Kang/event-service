import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Request } from 'express';
export declare class RewardController {
    private readonly rewardService;
    constructor(rewardService: RewardService);
    createReward(createRewardDto: CreateRewardDto): Promise<import("./schema/reward.schema").Reward>;
    getAllRewards(): Promise<import("./schema/reward.schema").Reward[]>;
    getRewardHist(): Promise<{
        userId: string;
        loginId?: string;
        eventId: string;
        eventTitle: string;
        rewardTitle: string;
        rewardedAt: Date;
    }[]>;
    requestReward(req: Request): Promise<{
        eligible: boolean;
        rewardId?: string;
        rewardTitle?: string;
        eventId?: string;
        eventTitle?: string;
        message: string;
        failedCondition?: string;
    }[]>;
    deleteEvent(id: string): Promise<{
        message: string;
    }>;
}
