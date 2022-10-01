import { Container, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { theme } from './common/theme/theme';
import { Sidebar } from './modules/sidebar/Sidebar';
import { routes } from './router/routes';

function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    useLayoutEffect(() => {
        if (pathname === '/') navigate(routes.list.path);
    });
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container sx={{ display: 'flex' }}>
                        <Sidebar />

                        <Container component="main" maxWidth="md" sx={{ margin: 4 }}>
                            <Outlet />
                        </Container>
                    </Container>
                </ThemeProvider>
            </LocalizationProvider>
        </>
    );
}

export default App;
