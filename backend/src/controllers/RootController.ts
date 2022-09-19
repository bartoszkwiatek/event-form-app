import EventsModel from 'src/models/events';
import EventsController from 'src/controllers/EventsController';

export function createRootController() {
    const eventsController = new EventsController(EventsModel);

    return {
        eventsController,
    };
}

export type RootController = ReturnType<typeof createRootController>;
