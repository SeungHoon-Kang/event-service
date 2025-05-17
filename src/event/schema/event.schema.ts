import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

type SchemaOptions = {
  timestamps?: boolean;
};

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true } as SchemaOptions)
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: [] })
  rewards: string[]; // Reward ID 리스트

  @Prop({ default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
