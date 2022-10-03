import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { exact, string } from 'prop-types';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import { ShortEventData } from '../models/types';

export const EventListElement = ({ eventData }: { eventData: ShortEventData }) => {
    const handleShare = () => {
        navigator.clipboard.writeText(`${location.href}/${eventData.id}`);
    };
    return (
        <Card square elevation={0} data-testid="event-form" sx={{ marginBottom: 4 }}>
            <CardHeader
                avatar={
                    <Tooltip title={`Added by: ${eventData.email}`}>
                        <Avatar aria-label="author">{eventData.email[0]}</Avatar>
                    </Tooltip>
                }
                action={
                    <>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share" onClick={handleShare}>
                            <ShareIcon />
                        </IconButton>
                    </>
                }
                title={eventData.title}
                subheader={new Date(eventData.eventDate).toLocaleString()}
            />
            <Divider />
            <Box display="flex">
                <CardMedia
                    sx={{ height: '150px', width: 'auto' }}
                    component="img"
                    image="http://placekitten.com/300/200"
                    alt="Placekitten"
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow="1"
                    justifyContent="space-between"
                >
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            {eventData.shortDescription}
                        </Typography>
                    </CardContent>
                    <CardActions
                        disableSpacing
                        sx={{ justifyContent: 'space-between', backgroundColor: grey[100] }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            paddingLeft={1}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <PlaceIcon />
                            {eventData.location}
                        </Typography>
                        <Button component={Link} to={eventData.id} aria-label="details">
                            Details
                        </Button>
                    </CardActions>
                </Box>
            </Box>
        </Card>
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
