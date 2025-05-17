import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { EventService } from './reward.service';
import { EventController } from './reward.controller';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  ],
  controllers: [EventController, RewardController],
  providers: [EventService, RewardService],
})
export class EventModule {}
