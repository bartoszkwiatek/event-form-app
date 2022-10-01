import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        background: {
            default: grey[50],
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
                margin: 'dense',
                fullWidth: true,
            },
        },
    },
});
