/* eslint-disable max-lines */
import { Server } from 'http';
import request from 'supertest';

import { ShortEventData } from 'src/controllers/EventsController';

import { app, db } from '../index';
import { eventsValidatorMessages } from './validator';

let server: Server;

beforeAll(async () => {
    await db.init().then(
        () =>
            (server = app.listen(process.env.PORT, () =>
                // eslint-disable-next-line no-console
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

const addEvent = async (reqBody: Record<string, unknown>) =>
    await request(app).post('/events').send(reqBody);

describe('POST: /events route to insert data', () => {
    it('should save event and respond with correct body', async () => {
        const reqBody = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const expectedResBody = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const res = await addEvent(reqBody);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toEqual({ ...expectedResBody, id: res.body.id });
    });

    it('should respond with validation error for required field', async () => {
        const reqBody = {
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const expectedErrorBody = {
            title: eventsValidatorMessages.TITLE,
        };

        const res = await addEvent(reqBody);

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(expectedErrorBody);
    });

    it('should respond with validation error for other errors', async () => {
        const reqBody = {
            shortDescription:
                'Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsectetur',
            fullDescription: 'Lorem',
            email: 'hiromuarakawa.com',
            location: 124,
            eventDate: '2022.02.22',
        };

        const expectedErrorBody = {
            title: eventsValidatorMessages.TITLE,
            shortDescription: eventsValidatorMessages.SHORT_DESCRIPTION,
            fullDescription: eventsValidatorMessages.FULL_DESCRIPTION,
            location: eventsValidatorMessages.LOCATION,
            email: eventsValidatorMessages.EMAIL,
            eventDate: eventsValidatorMessages.EVENT_DATE,
        };

        const res = await addEvent(reqBody);

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(expectedErrorBody);
    });
});

describe('GET: /events route to retrieve data', () => {
    it('should respond with list of events', async () => {
        const reqBody1 = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const reqBody2 = {
            title: 'Lorem event 2',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        // Add two events
        await addEvent(reqBody1);
        await addEvent(reqBody2);

        const res = await request(app).get('/events');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);

        res.body.forEach((event: ShortEventData) => {
            expect(event).toHaveProperty('id');
            expect(event).toHaveProperty('title');
            expect(event).toHaveProperty('location');
            expect(event).toHaveProperty('shortDescription');
            expect(event).toHaveProperty('email');
            expect(event).toHaveProperty('eventDate');
            expect(event).not.toHaveProperty('fullDescription');
        });
    });

    it('should respond with specific event data', async () => {
        const reqBody = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        // Add two events
        const addedEvent = await addEvent(reqBody);

        expect(addedEvent.body).toHaveProperty('id');

        const res = await request(app).get(`/events/${addedEvent.body.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toEqual(addedEvent.body);
    });

    it('should respond with not found error', async () => {
        const res = await request(app).get('/events/63371a90082b53f43ff241df');
        expect(res.statusCode).toBe(404);
    });

    it('should respond with validation error', async () => {
        const res = await request(app).get('/events/someId');
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ eventId: eventsValidatorMessages.EVENT_ID });
    });
});

describe('PUT: /events route to update data', () => {
    it('should update event data and respond with correct body', async () => {
        const reqBody1 = {
            title: 'Lorem event 1',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const reqBody2 = {
            title: 'Lorem event 2',
            shortDescription: 'Lorem ipsum dolor sit amet ',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
            email: 'ara@ara.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const expectedResBody = {
            title: 'Lorem event 2',
            shortDescription: 'Lorem ipsum dolor sit amet ',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
            email: 'ara@ara.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const res1 = await addEvent(reqBody1);
        expect(res1.statusCode).toBe(201);
        expect(res1.body).toHaveProperty('id');

        const res2 = await request(app).put(`/events/${res1.body.id}`).send(reqBody2);
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual({ ...expectedResBody, id: res1.body.id });
    });

    it('should respond with not found error', async () => {
        const reqBody = {
            title: 'Lorem event 1',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };
        const res = await request(app).put('/events/63371a90082b53f43ff241df').send(reqBody);

        expect(res.statusCode).toBe(404);
    });

    it('should respond with validation error for incorrect eventId', async () => {
        const res = await request(app).get('/events/someId');
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ eventId: eventsValidatorMessages.EVENT_ID });
    });

    it('should respond with validation error for incorrect body', async () => {
        const reqBody = {
            shortDescription:
                'Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsecteturconsectetur',
            fullDescription: 'Lorem',
            email: 'hiromuarakawa.com',
            location: 124,
            eventDate: '2022.02.22',
        };

        const expectedErrorBody = {
            title: eventsValidatorMessages.TITLE,
            shortDescription: eventsValidatorMessages.SHORT_DESCRIPTION,
            fullDescription: eventsValidatorMessages.FULL_DESCRIPTION,
            location: eventsValidatorMessages.LOCATION,
            email: eventsValidatorMessages.EMAIL,
            eventDate: eventsValidatorMessages.EVENT_DATE,
        };

        const res = await request(app).put('/events/63371a90082b53f43ff241df').send(reqBody);
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(expectedErrorBody);
    });
});

describe('DELETE: /events route to delete data', () => {
    it('should delete event data and respond with deleted event id', async () => {
        const reqBody = {
            title: 'Lorem event 1',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2019-09-18T19:00:52Z',
        };

        const res1 = await addEvent(reqBody);
        expect(res1.statusCode).toBe(201);
        expect(res1.body).toHaveProperty('id');

        const res2 = await request(app).delete(`/events/${res1.body.id}`);
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual({ id: res1.body.id });
    });

    it('should respond with not found error', async () => {
        const res = await request(app).delete('/events/63371a90082b53f43ff241df');

        expect(res.statusCode).toBe(404);
    });

    it('should respond with validation error for incorrect eventId', async () => {
        const res = await request(app).get('/events/someId');
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ eventId: eventsValidatorMessages.EVENT_ID });
    });
});
