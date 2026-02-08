import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs(theme: Theme) {
    return {
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    borderBottom: '1px solid',
                    borderColor: (theme as any).vars.palette.grey[200]
                }
            }
        }
    };
}
