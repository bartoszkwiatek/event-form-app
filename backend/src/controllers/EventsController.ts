import { Model } from 'mongoose';

import { IEvent } from '../models/events';

type EventBody = Pick<
    IEvent,
    'title' | 'shortDescription' | 'fullDescription' | 'email' | 'location' | 'eventDate'
>;

export type EventData = EventBody & { id: string };

export type ShortEventData = Omit<EventData, 'fullDescription'>;

class EventsController {
    constructor(private model: Model<IEvent>) {}

    public async create(data: EventBody): Promise<EventData | Error> {
        try {
            const { _id, title, shortDescription, fullDescription, email, eventDate, location } =
                await this.model.create(data);
            return {
                id: _id,
                title,
                shortDescription,
                fullDescription,
                email,
                eventDate,
                location,
            };
        } catch (error) {
            return error as Error;
        }
    }
    public async list(): Promise<ShortEventData[] | Error> {
        try {
            const events = await this.model.find({});

            return events.map(({ _id, title, shortDescription, email, eventDate, location }) => ({
                id: _id,
                title,
                shortDescription,
                email,
                eventDate,
                location,
            }));
        } catch (error) {
            return error as Error;
        }
    }
}

export default EventsController;
