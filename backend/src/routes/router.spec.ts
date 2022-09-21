import { Server } from 'http';
import request from 'supertest';

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

describe('POST: /events route to insert data', () => {
    it('should save event and respond with correct body', async () => {
        const reqBody = {
            firstName: 'Hiromu',
            lastName: 'Arakawa',
            email: 'hiromu@arakawa.com',
            eventDate: '2022-02-22',
        };

        const expectedResBody = {
            firstName: 'Hiromu',
            lastName: 'Arakawa',
            email: 'hiromu@arakawa.com',
            eventDate: '2022-02-22T00:00:00.000Z',
        };

        const res = await request(app).post('/events').send(reqBody);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expectedResBody);
    });

    it('should respond with validation error for required field', async () => {
        const reqBody = {
            lastName: 'Arakawa',
            email: 'hiromu@arakawa.com',
            eventDate: '2022-02-22',
        };

        const expectedErrorBody = {
            firstName: eventsValidatorMessages.FIRST_NAME,
        };

        const res = await request(app).post('/events').send(reqBody);

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(expectedErrorBody);
    });

    it('should respond with validation error for other errors', async () => {
        const reqBody = {
            lastName: '',
            email: 'hiromuarakawa.com',
            eventDate: '2022.02.22',
        };

        const expectedErrorBody = {
            firstName: eventsValidatorMessages.FIRST_NAME,
            lastName: eventsValidatorMessages.LAST_NAME,
            email: eventsValidatorMessages.EMAIL,
            eventDate: eventsValidatorMessages.EVENT_DATE,
        };

        const res = await request(app).post('/events').send(reqBody);

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(expectedErrorBody);
    });
});
