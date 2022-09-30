import { Server } from 'http';
import mongoose from 'mongoose';

import { app, db } from '../index';
import EventsModel from './events';

const eventData = {
    title: 'Event title',
    shortDescription: 'Short desc',
    fullDescription: 'Full description it is',
    email: 'email@email.com',
    location: 'Online event',
    eventDate: new Date('2022-02-22'),
};

let server: Server;

beforeAll(async () => {
    await db
        .init()
        .then(
            () =>
                (server = app.listen(process.env.PORT, () =>
                    console.log(`App running on port ${process.env.PORT}`),
                )),
        );
});

afterEach(async () => {
    await db.clean();
});

afterAll(async () => {
    await db.drop();
    server.close();
});

/**
 * EventsModel
 */
describe('EventsModel', () => {
    it('create & save event successfully', async () => {
        const savedEvent = await EventsModel.create(eventData);
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedEvent._id).toBeDefined();
        expect(savedEvent.title).toBe(eventData.title);
        expect(savedEvent.shortDescription).toBe(eventData.shortDescription);
        expect(savedEvent.fullDescription).toBe(eventData.fullDescription);
        expect(savedEvent.location).toBe(eventData.location);
        expect(savedEvent.email).toBe(eventData.email);
        expect(savedEvent.eventDate).toBe(eventData.eventDate);
    });

    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert event successfully, but the field not defined in schema should be undefined', async () => {
        const modifiedEventData = {
            ...eventData,
            rating: 'Awesome',
        };
        const savedEventWithInvalidField = await EventsModel.create(modifiedEventData);
        expect(savedEventWithInvalidField._id).toBeDefined();
        // eslint-disable-next-line
        // @ts-ignore for the sake of test
        expect(savedEventWithInvalidField.rating).toBeUndefined();
    });

    // It should us tell us the errors in on email field.
    it('create event without required field should failed', async () => {
        const eventDataWithoutRequiredField = { title: 'title' };
        let err;
        try {
            await EventsModel.create(eventDataWithoutRequiredField);
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect((err as mongoose.Error.ValidationError).errors.email).toBeDefined();
    });
});
