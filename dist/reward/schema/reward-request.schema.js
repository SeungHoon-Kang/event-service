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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRequestSchema = exports.RewardRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RewardRequest = class RewardRequest {
    userId;
    eventId;
    rewardId;
    status;
    requestedAt;
    reason;
};
exports.RewardRequest = RewardRequest;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], RewardRequest.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], RewardRequest.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], RewardRequest.prototype, "rewardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'PENDING' }),
    __metadata("design:type", String)
], RewardRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], RewardRequest.prototype, "requestedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], RewardRequest.prototype, "reason", void 0);
exports.RewardRequest = RewardRequest = __decorate([
    (0, mongoose_1.Schema)({ collection: 'reward_requests', timestamps: true })
], RewardRequest);
exports.RewardRequestSchema = mongoose_1.SchemaFactory.createForClass(RewardRequest);
//# sourceMappingURL=reward-request.schema.js.map