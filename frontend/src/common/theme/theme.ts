import { createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    minWidth: '20rem',
                },
            },
            defaultProps: {
                margin: 'dense',
                fullWidth: true,
            },
        },
    },
});
