import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import App from '../App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: routes.map(({ path, element }) => ({ path, element })),
    },
]);
