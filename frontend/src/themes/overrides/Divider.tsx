import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - DIVIDER ||============================== //

export default function Divider(theme: Theme) {
    return {
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: (theme as any).vars.palette.divider
                }
            }
        }
    };
}
