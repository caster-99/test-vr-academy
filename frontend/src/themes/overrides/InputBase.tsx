import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - INPUT BASE ||============================== //

export default function InputBase(theme: Theme) {
    return {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: (theme as any).vars.palette.text.dark,
                    '&::placeholder': {
                        color: (theme as any).vars.palette.text.secondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        }
    };
}
