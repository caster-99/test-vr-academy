import { ReactNode } from 'react';

// material-ui
import { styled, SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project import
import { withAlpha } from 'utils/colorUtils';

// third party
import { BrowserView, MobileView } from 'react-device-detect';
import SimpleBar from 'simplebar-react';

// root style
const RootStyle = styled(BrowserView)({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
});

// scroll bar wrapper
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': { backgroundColor: withAlpha((theme as any).vars?.palette.grey[500] || theme.palette.grey[500], 0.48) },
        '&.simplebar-visible:before': { opacity: 1 }
    },
    '& .simplebar-track.simplebar-vertical': { width: 10 },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': { height: 6 },
    '& .simplebar-mask': { zIndex: 'inherit' }
}));

// ==============================|| SIMPLE SCROLL BAR  ||============================== //

interface SimpleBarScrollProps {
    children?: ReactNode;
    sx?: SxProps<Theme>;
    [key: string]: any;
}

export default function SimpleBarScroll({ children, sx, ...other }: SimpleBarScrollProps) {
    return (
        <>
            <RootStyle>
                <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
                    {children}
                </SimpleBarStyle>
            </RootStyle>
            <MobileView>
                <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                    {children}
                </Box>
            </MobileView>
        </>
    );
}
