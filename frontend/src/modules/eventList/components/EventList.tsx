import { Typography } from '@mui/material';
import { Container } from '@mui/system';

import { useApi } from '../../../common/utils/useApi';
import { ShortEventData } from '../models/types';
import { EventListElement } from './EventListElement';

const url = new URL('http://localhost:4000/events');

export const EventList = () => {
    const { data, isLoading } = useApi<ShortEventData[]>(url);

    return (
        <Container data-testid="event-list">
            <Typography variant="h4" component="h3">
                Incoming events
            </Typography>
            {isLoading && <p>Loading</p>}
            {data && data.map(event => <EventListElement key={event.id} eventData={event} />)}
        </Container>
    );
};
