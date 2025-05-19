"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reward_controller_1 = require("./reward.controller");
const reward_service_1 = require("./reward.service");
const event_schema_1 = require("../event/schema/event.schema");
const user_schema_1 = require("../user/schema/user.schema");
const user_login_schema_1 = require("../user/schema/user-login.schema");
const reward_schema_1 = require("./schema/reward.schema");
const event_user_schema_1 = require("./schema/event-user.schema");
let RewardModule = class RewardModule {
};
exports.RewardModule = RewardModule;
exports.RewardModule = RewardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_schema_1.Event.name, schema: event_schema_1.EventSchema },
                { name: reward_schema_1.Reward.name, schema: reward_schema_1.RewardSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: user_login_schema_1.UserLogin.name, schema: user_login_schema_1.UserLoginSchema },
                { name: event_user_schema_1.EventUser.name, schema: event_user_schema_1.EventUserSchema },
            ]),
        ],
        controllers: [reward_controller_1.RewardController],
        providers: [reward_service_1.RewardService],
        exports: [reward_service_1.RewardService],
    })
], RewardModule);
//# sourceMappingURL=reward.module.js.map