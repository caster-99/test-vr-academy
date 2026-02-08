import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme: Theme) {
    return {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: (theme as any).vars.palette.grey[200],

                    '&.MuiTableCell-head': {
                        fontSize: '0.875rem',
                        color: (theme as any).vars.palette.grey[900],
                        fontWeight: 500
                    }
                }
            }
        }
    };
}
