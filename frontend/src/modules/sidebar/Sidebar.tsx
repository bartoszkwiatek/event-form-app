import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../../router/routes';

export const Sidebar = (): ReactElement => {
    const activeStyle = {
        textDecoration: 'underline',
    };

    return (
        <nav>
            <ul>
                {routes.map(({ name, path }) => (
                    <li key={name}>
                        <NavLink
                            to={path}
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
