import { Router } from 'express';
import { body, validationResult, ValidationError } from 'express-validator';

import { RootController } from 'src/controllers/RootController';

const validator = [
    body('firstName', 'First name should be non-empty string').isString().notEmpty(),
    body('lastName', 'Last name should be non-empty string').isString().notEmpty(),
    body('email', 'Email should be in format address@domain.com').isEmail(),
    body('eventDate', 'Date should be in format YYYY-MM-DD').exists().isDate().toDate(),
];

const validatorErrorFormater = ({ msg }: ValidationError) => msg;

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
        .post('/events', ...validator, (req, res, next) => {
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
