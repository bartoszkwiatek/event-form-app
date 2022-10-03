import { Container } from '@mui/system';

import { SubpageHeader } from '../../../common/components/SubpageHeader';
import { useApi } from '../../../common/utils/useApi';
import { ShortEventData } from '../models/types';
import { EventListElement } from './EventListElement';

const url = new URL('http://localhost:4000/events');

export const EventList = () => {
    const { data, isLoading } = useApi<ShortEventData[]>(url);

    return (
        <Container data-testid="event-list">
            <SubpageHeader>Incoming events</SubpageHeader>
            {isLoading && <p>Loading</p>}
            {data && data.map(event => <EventListElement key={event.id} eventData={event} />)}
        </Container>
    );
};
