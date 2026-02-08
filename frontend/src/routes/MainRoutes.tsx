import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from 'components/ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const TeacherList = Loadable(lazy(() => import('views/teachers/TeacherList')));
const TeacherCreate = Loadable(lazy(() => import('views/teachers/TeacherCreate')));
const CourseList = Loadable(lazy(() => import('views/courses/CourseList')));

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
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'teachers',
            element: <TeacherList />
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