import { Router } from 'express';
import { validationResult } from 'express-validator';

import { RootController } from 'src/controllers/RootController';

import { eventsValidator, validatorErrorFormater } from './validator';

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
        .post('/events', ...eventsValidator, (req, res, next) => {
            const errors = validationResult(req).formatWith(validatorErrorFormater);

            if (!errors.isEmpty()) return res.status(422).send(errors.mapped());

            return eventsController
                .create(req.body)
                .then(response => {
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.status(201).json(response);
                })
                .catch(next);
        });
}
