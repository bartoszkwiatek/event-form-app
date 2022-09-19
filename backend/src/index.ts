import { initApp } from './config/app';
import { createRootController } from './controllers/RootController';
import './config/database';

const PORT = process.env.PORT || 4000;

const rootService = createRootController();
const app = initApp(rootService);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
