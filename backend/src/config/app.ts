import { json } from 'body-parser';
import express, { Express } from 'express';

import { RootController } from 'src/controllers/RootController';

import { createRouter } from './router';

export function initApp(RootController: RootController): Express {
    const app = express();

    app.use(json());
    app.use('/', createRouter(RootController));
    app.get('/', (_, res) => res.send('pong'));

    return app;
}

export default initApp;
