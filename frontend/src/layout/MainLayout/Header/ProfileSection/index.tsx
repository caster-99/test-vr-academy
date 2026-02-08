import { useEffect, useRef, useState, SyntheticEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useConfig from 'hooks/useConfig';

// assets
import User1 from 'assets/images/users/user-round.svg';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { useAppSelector } from 'store/index';
import { logout } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';

// ==============================|| PROFILE MENU ||============================== //

export default function ProfileSection() {
    const theme = useTheme();
    const {
        state: { borderRadius }
    } = useConfig();

    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent | SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                slotProps={{ label: { sx: { lineHeight: 0 } } }}
                sx={{ ml: 2, height: '48px', alignItems: 'center', borderRadius: '27px' }}
                icon={
                    <Avatar
                        src={user?.photo}
                        alt="user-images"
                        sx={{
                            ...((theme as any).typography.mediumAvatar),
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                            objectFit: 'cover'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="24px" />}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
                aria-label="user-account"
            />
            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions sx={{ overflow: 'visible' }} in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                                                    <Typography variant="h4">Bienvenido,</Typography>
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {user?.name}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 2,
                                                py: 0,
                                                height: '100%',
                                                maxHeight: 'calc(100vh - 250px)',
                                                overflowX: 'hidden',
                                                '&::-webkit-scrollbar': { width: 5 }
                                            }}
                                        >
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    borderRadius: `${borderRadius}px`,
                                                    '& .MuiListItemButton-root': { mt: 0.5 }
                                                }}
                                            >
                                                <ListItemButton sx={{ borderRadius: `${borderRadius}px` }} onClick={handleLogout}>
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="20px" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Cerrar Sesión</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
}
