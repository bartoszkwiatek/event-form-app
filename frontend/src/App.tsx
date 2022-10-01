import { Outlet } from 'react-router-dom';

import { Sidebar } from './modules/sidebar/Sidebar';

function App() {
    return (
        <>
            <aside>
                <Sidebar />
            </aside>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
