import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export const SubpageHeader = ({ children }: { children: PropsWithChildren['children'] }) => {
    return (
        <Typography
            variant="h4"
            component="h3"
            sx={{
                padding: 1,
                paddingBottom: 0,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: 'inline-block',
            }}
        >
            {children}
        </Typography>
    );
};
