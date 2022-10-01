import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Outlet } from 'react-router-dom';

import { theme } from './common/theme/theme';
import { Sidebar } from './modules/sidebar/Sidebar';

function App() {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <aside>
                        <Sidebar />
                    </aside>
                    <main>
                        <Outlet />
                    </main>
                </ThemeProvider>
            </LocalizationProvider>
        </>
    );
}

export default App;
