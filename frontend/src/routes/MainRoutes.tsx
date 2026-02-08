import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from 'components/ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const TeacherList = Loadable(lazy(() => import('views/teachers/TeacherList')));
const TeacherCreate = Loadable(lazy(() => import('views/teachers/TeacherCreate')));
const CourseList = Loadable(lazy(() => import('views/courses/CourseList')));
const TeacherView = Loadable(lazy(() => import('views/teachers/TeacherView')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <ProtectedRoute>
            <MainLayout />
        </ProtectedRoute>
    ),
    children: [
        {
            path: '/',
            element: <Navigate to="/dashboard" replace />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'teachers',
            element: <TeacherList />
        },
        {
            path: 'teachers/:id',
            element: <TeacherView />
        },
        {
            path: 'teachers/create',
            element: <TeacherCreate />
        },
        {
            path: 'courses',
            element: <CourseList />
        }
    ]
};

export default MainRoutes;