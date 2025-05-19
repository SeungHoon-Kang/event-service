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
exports.RewardController = void 0;
const common_1 = require("@nestjs/common");
const reward_service_1 = require("./reward.service");
const create_reward_dto_1 = require("./dto/create-reward.dto");
let RewardController = class RewardController {
    rewardService;
    constructor(rewardService) {
        this.rewardService = rewardService;
    }
    async createReward(createRewardDto) {
        return this.rewardService.createReward(createRewardDto);
    }
    async getAllRewards() {
        return this.rewardService.findRewardAll();
    }
    async getRewardHist() {
        return this.rewardService.findHistory();
    }
    async requestReward(req) {
        const userId = req.headers['x-user-id'];
        if (!userId || Array.isArray(userId)) {
            throw new common_1.BadRequestException('User ID not provided');
        }
        const result = await this.rewardService.checkAutoReward(userId);
        return result;
    }
    async deleteEvent(id) {
        await this.rewardService.remove(id);
        return { message: 'reward deleted successfully' };
    }
};
exports.RewardController = RewardController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reward_dto_1.CreateRewardDto]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "createReward", null);
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "getAllRewards", null);
__decorate([
    (0, common_1.Get)('/hist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "getRewardHist", null);
__decorate([
    (0, common_1.Post)('/request'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "requestReward", null);
__decorate([
    (0, common_1.Post)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "deleteEvent", null);
exports.RewardController = RewardController = __decorate([
    (0, common_1.Controller)('api/v1/reward'),
    __metadata("design:paramtypes", [reward_service_1.RewardService])
], RewardController);
//# sourceMappingURL=reward.controller.js.map