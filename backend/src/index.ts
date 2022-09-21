import { initApp } from './config/app';
import { createRootController } from './controllers/RootController';
import { Connection } from './config/database';

const PORT = process.env.PORT || 4000;

export const db = new Connection();
const rootService = createRootController();
export const app = initApp(rootService);

if (process.env.NODE_ENV !== 'test')
    db.init().then(() => app.listen(PORT, () => console.log(`App running on port ${PORT}`)));
