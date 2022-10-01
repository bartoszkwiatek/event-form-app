import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { routes } from './routes';

export const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        element: <App />,
        children: [
            {
                path: routes.list.path,
                element: routes.list.element,
            },
            {
                path: routes.details.path,
                element: routes.details.element,
            },
            {
                path: routes.create.path,
                element: routes.create.element,
            },
            {
                path: routes.edit.path,
                element: routes.edit.element,
            },
        ],
        errorElement: routes.notFound.element,
    },
]);
