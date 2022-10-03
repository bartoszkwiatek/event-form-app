import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Toolbar,
} from '@mui/material';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../../router/routes';

export const Sidebar = (): ReactElement => {
    return (
        <Paper
            elevation={0}
            square
            component="aside"
            sx={{
                width: 240,
                flexShrink: 0,
            }}
        >
            <Toolbar />
            <Divider />
            <List component="nav">
                {[routes.create, routes.list].map(({ title, path }) => (
                    <ListItem key={title} disablePadding>
                        <ListItemButton component={NavLink} to={path}>
                            <ListItemText>{title}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};
