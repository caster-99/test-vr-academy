import { NavItemType } from 'types/menu';
import { IconUsers, IconUserPlus, IconBooks } from '@tabler/icons-react';

// constant
const icons = { IconUsers, IconUserPlus, IconBooks };

// ==============================|| MANAGEMENT MENU ITEMS ||============================== //

const management: NavItemType = {
    id: 'management',
    title: 'Gestión',
    type: 'group',
    children: [
        {
            id: 'teachers',
            title: 'Profesores',
            type: 'item',
            url: '/teachers',
            icon: icons.IconUsers,
            breadcrumbs: true
        },
        {
            id: 'create-teacher',
            title: 'Crear Profesor',
            type: 'item',
            url: '/teachers/create',
            icon: icons.IconUserPlus,
            breadcrumbs: true
        },
        {
            id: 'courses',
            title: 'Cursos',
            type: 'item',
            url: '/courses',
            icon: icons.IconBooks,
            breadcrumbs: true
        }
    ]
};

export default management;
