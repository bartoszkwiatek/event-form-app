import EventsModel from '../models/events';
import EventsController from '../controllers/EventsController';

export function createRootController() {
    const eventsController = new EventsController(EventsModel);

    return {
        eventsController,
    };
}

export type RootController = ReturnType<typeof createRootController>;
