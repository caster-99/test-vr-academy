import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// teachers routing
const TeacherList = Loadable(lazy(() => import('views/teachers/TeacherList')));
const TeacherCreate = Loadable(lazy(() => import('views/teachers/TeacherCreate')));

// courses routing
const CourseList = Loadable(lazy(() => import('views/courses/CourseList')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
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
