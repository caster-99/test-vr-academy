// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));

    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened;

    return (
        <>
            {/* logo & toggler button */}
            <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>

                <Avatar
                    variant="rounded"
                    sx={{
                        ...((theme as any).typography.commonAvatar),
                        ...((theme as any).typography.mediumAvatar),
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        color: (theme as any).vars?.palette.secondary.dark,
                        background: (theme as any).vars?.palette.secondary.light,
                        '&:hover': {
                            color: (theme as any).vars?.palette.secondary.light,
                            background: (theme as any).vars?.palette.secondary.dark
                        }
                    }}
                    onClick={() => handlerDrawerOpen(!drawerOpen)}
                >
                    <IconMenu2 stroke={1.5} size="20px" />
                </Avatar>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <ProfileSection />
            </Box>
        </>
    );
}
