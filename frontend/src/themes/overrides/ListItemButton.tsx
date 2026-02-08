import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - LIST ITEM BUTTON ||============================== //

export default function ListItemButton(theme: Theme) {
    return {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: (theme as any).vars.palette.text.primary,
                    paddingTop: '10px',
                    paddingBottom: '10px',

                    '&.Mui-selected': {
                        color: (theme as any).vars.palette.secondary.dark,
                        backgroundColor: (theme as any).vars.palette.secondary.light,
                        '&:hover': {
                            backgroundColor: (theme as any).vars.palette.secondary.light
                        },
                        '& .MuiListItemIcon-root': {
                            color: (theme as any).vars.palette.secondary.dark
                        }
                    },

                    '&:hover': {
                        backgroundColor: (theme as any).vars.palette.secondary.light,
                        color: (theme as any).vars.palette.secondary.dark,
                        '& .MuiListItemIcon-root': {
                            color: (theme as any).vars.palette.secondary.dark
                        }
                    }
                }
            }
        }
    };
}
