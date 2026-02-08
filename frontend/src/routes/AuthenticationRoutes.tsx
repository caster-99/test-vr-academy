import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import RedirectRoute from 'components/RedirectRoute';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: (
        <RedirectRoute>
            <MinimalLayout />
        </RedirectRoute>
    ),
    children: [
        {
            path: '/login',
            element: <LoginPage />
        }
    ]
};
export default AuthenticationRoutes;
