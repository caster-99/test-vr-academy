import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';

const RedirectRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default RedirectRoute;