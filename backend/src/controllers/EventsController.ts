import { Model } from 'mongoose';

import { IEvent } from '../models/events';

type EventBody = Pick<IEvent, 'firstName' | 'lastName' | 'email' | 'eventDate'>;

class EventsController {
    constructor(private model: Model<IEvent>) {}

    public async create(data: EventBody): Promise<EventBody | Error> {
        try {
            const { firstName, lastName, email, eventDate } = await this.model.create(data);
            return { firstName, lastName, email, eventDate };
        } catch (error) {
            return error as Error;
        }
    }
    public async list(): Promise<EventBody[] | Error> {
        try {
            const events = await this.model.find({});

            return events.map(({ firstName, lastName, email, eventDate }) => ({
                firstName,
                lastName,
                email,
                eventDate,
            }));
        } catch (error) {
            return error as Error;
        }
    }
}

export default EventsController;
