import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme: Theme) {
    return {
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: (theme as any).vars.palette.grey[300]
                    }
                },
                mark: {
                    backgroundColor: (theme as any).vars.palette.background.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: (theme as any).vars.palette.primary.light
                }
            }
        }
    };
}
