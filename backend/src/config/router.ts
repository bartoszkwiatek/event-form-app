import { Router } from 'express';

import { RootController } from 'src/controllers/RootController';

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
        .post('/events', (req, res, next) =>
            eventsController
                .create(req.body)
                .then(response => {
                    if (response instanceof Error) return res.status(500).send(response);
                    return res.status(201).json(response);
                })
                .catch(next),
        );
}
