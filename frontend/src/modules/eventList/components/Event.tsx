import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceIcon from '@mui/icons-material/Place';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { grey } from '@mui/material/colors';

import { EventData } from '../models/types';
import { useApi } from '../../../common/utils/useApi';

const url = new URL('http://localhost:4000/events');

export const Event = () => {
    const { id } = useParams<'id'>();
    const { data } = useApi<EventData>(`${url}/${id}`);

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(location.href);
    };
    return (
        data && (
            <Card data-testid="event-form" sx={{ marginBottom: 4 }}>
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share" onClick={handleShare}>
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </>
                    }
                    title={data.title}
                    subheader={new Date(data.eventDate).toLocaleString()}
                />

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
                <Divider />
                <Box display="flex">
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="space-between"
                    >
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                <CardMedia
                                    sx={{
                                        height: '200px',
                                        width: 'auto',
                                        float: 'left',
                                        marginRight: '1rem',
                                        marginBottom: '1rem',
                                    }}
                                    component="img"
                                    image="http://placekitten.com/300/200"
                                    alt="Placekitten"
                                />
                                {data.fullDescription}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{ justifyContent: 'space-between', backgroundColor: grey[100] }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                paddingLeft={1}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <PlaceIcon />
                                {data.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paddingRight={1}>
                                Added by: <Link href={`mailto:${data.email}`}>{data.email}</Link>
                            </Typography>
                        </CardActions>
                    </Box>
                </Box>
            </Card>
        )
    );
};
