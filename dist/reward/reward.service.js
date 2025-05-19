"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_schema_1 = require("../event/schema/event.schema");
const user_schema_1 = require("../user/schema/user.schema");
const user_login_schema_1 = require("../user/schema/user-login.schema");
const event_user_schema_1 = require("./schema/event-user.schema");
const reward_schema_1 = require("./schema/reward.schema");
const dayjs = require("dayjs");
let RewardService = class RewardService {
    eventModel;
    userModel;
    userLoginModel;
    rewardModel;
    eventUserModel;
    constructor(eventModel, userModel, userLoginModel, rewardModel, eventUserModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
        this.userLoginModel = userLoginModel;
        this.rewardModel = rewardModel;
        this.eventUserModel = eventUserModel;
    }
    async createReward(createRewardDto) {
        try {
            const newReward = new this.rewardModel(createRewardDto);
            return await newReward.save();
        }
        catch (err) {
            console.error('보상 내용 저장 에러:', err);
            throw err;
        }
    }
    async findRewardAll() {
        return this.rewardModel.find().exec();
    }
    async checkAutoReward(userId) {
        const rewardedEvents = await this.eventUserModel
            .find({ userId })
            .distinct('eventId')
            .exec();
        const events = await this.eventModel
            .find({
            isActive: true,
            _id: { $nin: rewardedEvents },
        })
            .exec();
        const results = [];
        for (const event of events) {
            let allConditionsMet = true;
            let failedCondition = '';
            for (const reward of event.rewards) {
                const conditionMet = await this.checkRewardConditions(userId, reward.rewardCondition);
                if (!conditionMet) {
                    allConditionsMet = false;
                    failedCondition = reward.rewardCondition;
                    break;
                }
            }
            if (!allConditionsMet) {
                results.push({
                    eligible: false,
                    message: '조건을 만족하지 않아 보상을 받을 수 없습니다.',
                    failedCondition,
                    eventTitle: event.title,
                    eventId: event._id.toString(),
                });
                continue;
            }
            for (const reward of event.rewards) {
                const existingReward = await this.eventUserModel
                    .findOne({
                    userId,
                    eventId: event._id,
                })
                    .exec();
                if (existingReward) {
                    continue;
                }
                const rewardInfo = await this.rewardModel
                    .findById(reward.rewardId)
                    .exec();
                results.push({
                    eligible: true,
                    rewardId: reward.rewardId.toString(),
                    rewardTitle: rewardInfo?.name || '제목 없음',
                    eventId: event._id.toString(),
                    eventTitle: event.title,
                    message: '보상 지급 대상입니다.',
                });
                await this.eventUserModel.create({
                    userId,
                    eventId: event._id,
                    rewardedAt: new Date(),
                });
            }
        }
        if (results.length === 0) {
            return [
                {
                    eligible: false,
                    message: '조건을 만족하지 않아 보상을 받을 수 없습니다.',
                },
            ];
        }
        return results;
    }
    async checkRewardConditions(userId, rewardCondition) {
        switch (rewardCondition) {
            case 'CONSECUTIVE_LOGIN_3_DAYS':
                return this.checkConsecutiveLoginDays(userId, 3);
            case 'CUMULATIVE_LOGIN_7_DAYS':
                return this.checkCumulativeLoginDays(userId, 7);
            case 'SPECIFIC_DATE_LOGIN':
                return this.checkSpecificDateLogin(userId);
            case 'RETURNING_USER':
                return this.checkReturningUser(userId);
            case 'NEW_USER':
                return this.checkNewUser(userId);
            default:
                throw new common_1.BadRequestException('Unknown reward condition');
        }
    }
    async checkConsecutiveLoginDays(userId, days) {
        const today = dayjs().startOf('day');
        const datesToCheck = [];
        for (let i = 0; i < days; i++) {
            datesToCheck.push(today.subtract(i, 'day').toDate());
        }
        for (const date of datesToCheck) {
            const start = dayjs(date).startOf('day').toDate();
            const end = dayjs(date).endOf('day').toDate();
            const loginCount = await this.userLoginModel.countDocuments({
                userId,
                loginAt: { $gte: start, $lte: end },
            });
            if (loginCount === 0)
                return false;
        }
        return true;
    }
    async checkCumulativeLoginDays(userId, days) {
        const distinctLoginDays = await this.userLoginModel
            .aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: {
                        year: { $year: '$loginAt' },
                        month: { $month: '$loginAt' },
                        day: { $dayOfMonth: '$loginAt' },
                    },
                },
            },
            { $count: 'loginDaysCount' },
        ])
            .exec();
        const count = distinctLoginDays.length > 0 ? distinctLoginDays[0].loginDaysCount : 0;
        return count >= days;
    }
    async checkSpecificDateLogin(userId) {
        const today = dayjs().startOf('day').toDate();
        const endOfToday = dayjs().endOf('day').toDate();
        const eventDate = today;
        if (!dayjs().isSame(eventDate, 'day')) {
            return false;
        }
        const loginCount = await this.userLoginModel.countDocuments({
            userId,
            loginAt: { $gte: today, $lte: endOfToday },
        });
        return loginCount > 0;
    }
    async checkReturningUser(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user || !user.lastLoginAt)
            return false;
        const oneYearAgo = dayjs().subtract(1, 'year').toDate();
        return user.lastLoginAt < oneYearAgo;
    }
    async checkNewUser(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user || !user.createdAt)
            return false;
        const daysSinceSignup = dayjs().diff(dayjs(user.createdAt), 'day');
        return daysSinceSignup <= 30;
    }
    async findActiveEvents() {
        return this.eventModel.find({ isActive: true }).exec();
    }
    async findAllByUser(userId) {
        return this.eventUserModel.find({ userId }).populate('eventId').exec();
    }
    async findHistory() {
        const eventUsers = await this.eventUserModel
            .find()
            .populate('eventId')
            .lean()
            .exec();
        const rewardHistories = [];
        for (const item of eventUsers) {
            const event = item.eventId;
            if (!event)
                continue;
            let rewardTitle = '보상 정보 없음';
            if (event.rewards && event.rewards.length > 0) {
                const rewardId = event.rewards[0].rewardId;
                const reward = await this.rewardModel.findById(rewardId).lean().exec();
                rewardTitle = reward?.name || rewardTitle;
            }
            const userIdStr = item.userId.toString();
            const user = await this.userModel.findById(userIdStr).lean().exec();
            const loginId = user?.loginId || 'Unknown';
            rewardHistories.push({
                userId: userIdStr,
                loginId,
                eventId: event._id.toString(),
                eventTitle: event.title,
                rewardTitle,
                rewardedAt: item.rewardedAt,
            });
        }
        return rewardHistories;
    }
    async findEventById(eventId) {
        return this.eventModel.findById(eventId).exec();
    }
    async remove(id) {
        await this.eventModel.findByIdAndDelete(id).exec();
    }
};
exports.RewardService = RewardService;
exports.RewardService = RewardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_login_schema_1.UserLogin.name)),
    __param(3, (0, mongoose_1.InjectModel)(reward_schema_1.Reward.name)),
    __param(4, (0, mongoose_1.InjectModel)(event_user_schema_1.EventUser.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RewardService);
//# sourceMappingURL=reward.service.js.map