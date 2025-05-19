import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    createEvent(createEventDto: CreateEventDto): Promise<import("./schema/event.schema").Event>;
    getAllEvents(): Promise<import("./schema/event.schema").Event[]>;
    getEventById(id: string): Promise<import("./schema/event.schema").Event>;
    updateEvent(id: string, updateEventDto: CreateEventDto): Promise<import("./schema/event.schema").Event>;
    deleteEvent(id: string): Promise<{
        message: string;
    }>;
}
