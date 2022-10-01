// import './EventForm.scss';
import { exact, string } from 'prop-types';

import { ShortEventData } from '../models/types';

export const EventListElement = ({ eventData }: { eventData: ShortEventData }) => {
    return (
        <div className="event" data-testid="event-form">
            <h3 className="event-title">{eventData.title}</h3>
            <p>Added by: {eventData.email}</p>
            <p>{eventData.shortDescription}</p>
            <p>{eventData.location}</p>
            <p>{new Date(eventData.eventDate).toLocaleString()}</p>
        </div>
    );
};

EventListElement.propTypes = {
    eventData: exact({
        id: string,
        title: string,
        shortDescription: string,
        location: string,
        email: string,
        eventDate: string,
    }),
};
