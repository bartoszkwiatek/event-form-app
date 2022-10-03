import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        background: {
            // default: cyan[500],
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    minWidth: '20rem',
                },
            },
            defaultProps: {
                variant: 'standard',
                margin: 'dense',
                fullWidth: true,
            },
        },
    },
});
