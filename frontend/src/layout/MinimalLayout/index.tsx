import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function MinimalLayout() {
    return (
        <>
            <Typography>Minimal Layout</Typography>
            <Outlet />
        </>
    );
}
