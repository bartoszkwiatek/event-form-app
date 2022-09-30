import { Server } from 'http';
import request from 'supertest';

import { ShortEventData } from 'src/controllers/EventsController';

import { app, db } from '../index';
import { eventsValidatorMessages } from './validator';

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

const addEvent = async (reqBody: Record<string, unknown>) =>
    await request(app).post('/events').send(reqBody);

// eslint-disable-next-line max-lines-per-function
describe('POST: /events route to insert data', () => {
    it('should save event and respond with correct body', async () => {
        const reqBody = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2022-02-22',
        };

        const expectedResBody = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2022-02-22T00:00:00.000Z',
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
            eventDate: '2022-02-22',
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

    it('should respond with list of events', async () => {
        const reqBody1 = {
            title: 'Lorem event',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2022-02-22',
        };

        const reqBody2 = {
            title: 'Lorem event 2',
            shortDescription: 'Lorem ipsum dolor sit amet consectetur',
            fullDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
            email: 'hiromu@arakawa.com',
            location: 'Random location',
            eventDate: '2022-02-22',
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
});
