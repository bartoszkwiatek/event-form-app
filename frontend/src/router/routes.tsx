import { EventList } from '../modules/eventList/components/EventList';
import { EventForm } from '../modules/eventForm/components/EventForm';

type RouteObject = {
    name: string;
    path: string;
    element: JSX.Element;
};

export const routes: RouteObject[] = [
    {
        name: 'Browse events',
        path: '/list',
        element: <EventList />,
    },
    {
        name: 'Create event',
        path: '/create',
        element: <EventForm />,
    },
];
