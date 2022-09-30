import { Router } from 'express';
import { validationResult } from 'express-validator';

import { RootController } from 'src/controllers/RootController';

import { ServerError } from '../common/errors';
import { eventIdValidator, eventsBodyValidator, validatorErrorFormater } from './validator';

export function createRouter({ eventsController }: RootController): Router {
    return Router()
        .get('/events', (req, res, next) =>
            eventsController
                .list()
                .then(response => {
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.json(response);
                })
                .catch(next),
        )
        .post('/events', ...eventsBodyValidator, (req, res, next) => {
            const errors = validationResult(req).formatWith(validatorErrorFormater);

            if (!errors.isEmpty()) return res.status(422).send(errors.mapped());

            return eventsController
                .create(req.body)
                .then(response => {
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.status(201).json(response);
                })
                .catch(next);
        })
        .get('/events/:eventId', ...eventIdValidator, (req, res, next) => {
            const errors = validationResult(req).formatWith(validatorErrorFormater);

            if (!errors.isEmpty()) return res.status(422).send(errors.mapped());
            if (!req.params?.eventId) return res.status(404); // it should be handled by validation but it seems typescript is having troubles here

            return eventsController
                .findOne(req.params.eventId)
                .then(response => {
                    if (response instanceof ServerError)
                        return res.status(response.statusCode).send(response);
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.json(response);
                })
                .catch(next);
        })
        .delete('/events/:eventId', ...eventIdValidator, (req, res, next) => {
            const errors = validationResult(req).formatWith(validatorErrorFormater);

            if (!errors.isEmpty()) return res.status(422).send(errors.mapped());
            if (!req.params?.eventId) return res.status(404); // it should be handled by validation but it seems typescript is having troubles here

            return eventsController
                .delete(req.params.eventId)
                .then(response => {
                    if (response instanceof ServerError)
                        return res.status(response.statusCode).send(response);
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.json(response);
                })
                .catch(next);
        })
        .put('/events/:eventId', ...eventIdValidator, ...eventsBodyValidator, (req, res, next) => {
            const errors = validationResult(req).formatWith(validatorErrorFormater);

            if (!errors.isEmpty()) return res.status(422).send(errors.mapped());
            if (!req.params?.eventId) return res.status(404); // it should be handled by validation but it seems typescript is having troubles here

            return eventsController
                .update(req.params.eventId, req.body)
                .then(response => {
                    if (response instanceof ServerError)
                        return res.status(response.statusCode).send(response);
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.json(response);
                })
                .catch(next);
        });
}
