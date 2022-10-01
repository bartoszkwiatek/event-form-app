import { EventList } from '../modules/eventList/components/EventList';
import { EventForm } from '../modules/eventForm/components/EventForm';
import { Event } from '../modules/eventList/components/Event';
import { NotFound } from '../common/components/NotFound';

type RouteObject = Record<
    string,
    {
        title: string;
        path: string;
        element: JSX.Element | React.ReactNode;
    }
>;

export const routes: RouteObject = {
    list: {
        title: 'Event list',
        path: 'list',
        element: <EventList />,
    },
    details: {
        title: 'Event details',
        path: 'list/:id',
        element: <Event />,
    },
    create: {
        title: 'Create event',
        path: '/create',
        element: <EventForm />,
    },
    edit: {
        title: 'Edit event',
        path: '/edit/:id',
        element: <EventForm />,
    },
    notFound: {
        title: 'Not found',
        path: '*',
        element: <NotFound />,
    },
};
