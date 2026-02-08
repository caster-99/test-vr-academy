import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - LIST ITEM TEXT ||============================== //

export default function ListItemText(theme: Theme) {
    return {
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: (theme as any).vars.palette.text.dark
                }
            }
        }
    };
}
