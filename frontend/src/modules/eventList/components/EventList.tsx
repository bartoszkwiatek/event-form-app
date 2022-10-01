// import './EventForm.scss';
import { useApi } from '../../../common/utils/useApi';
import { ShortEventData } from '../models/types';
import { EventListElement } from './EventListElement';

const url = new URL('http://localhost:4000/events');

export const EventList = () => {
    const { data, isLoading } = useApi<ShortEventData[]>(url);

    return (
        <div className="event-list" data-testid="event-list">
            <h2 className="event-list-title">Incoming events</h2>
            {isLoading && <p>Loading</p>}
            {data && data.map(event => <EventListElement key={event.id} eventData={event} />)}
        </div>
    );
};
