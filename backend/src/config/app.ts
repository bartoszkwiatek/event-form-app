import { json } from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';

import { RootController } from 'src/controllers/RootController';

import { createRouter } from '../routes/router';

export function initApp(RootController: RootController): Express {
    const app = express();

    app.use(json());
    app.use(cors());
    app.use('/', createRouter(RootController));
    app.get('/', (_, res) => res.send('pong'));

    return app;
}

export default initApp;
