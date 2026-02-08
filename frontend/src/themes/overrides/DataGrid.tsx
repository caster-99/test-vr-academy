import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - DATA GRID ||============================== //

export default function DataGrid(theme: Theme) {
    return {
        MuiDataGrid: {
            defaultProps: {
                rowHeight: 54
            },
            styleOverrides: {
                root: {
                    borderWidth: 0,

                    '& .MuiDataGrid-columnHeader--filledGroup': {
                        borderBottomWidth: 0
                    },

                    '& .MuiDataGrid-columnHeader--emptyGroup': {
                        borderBottomWidth: 0
                    },

                    '& .MuiFormControl-root>.MuiInputBase-root': {
                        backgroundColor: `${(theme as any).vars.palette.background.default} !important`,
                        borderColor: `${(theme as any).vars.palette.divider} !important`
                    }
                },
                withBorderColor: {
                    borderColor: (theme as any).vars.palette.divider
                },
                toolbarContainer: {
                    '& .MuiButton-root': {
                        paddingLeft: '16px !important',
                        paddingRight: '16px !important'
                    }
                },
                columnHeader: {
                    color: (theme as any).vars.palette.grey[600],
                    paddingLeft: 24,
                    paddingRight: 24
                },
                footerContainer: {
                    '&.MuiDataGrid-withBorderColor': {
                        borderBottom: 'none'
                    }
                },
                columnHeaderCheckbox: {
                    paddingLeft: 0,
                    paddingRight: 0
                },
                cellCheckbox: {
                    paddingLeft: 0,
                    paddingRight: 0
                },
                cell: {
                    borderWidth: 1,
                    paddingLeft: 24,
                    paddingRight: 24,
                    borderColor: (theme as any).vars.palette.divider,

                    '&.MuiDataGrid-cell--withRenderer > div': {
                        ' > .high': {
                            background: (theme as any).vars.palette.success.light
                        },
                        '& > .medium': {
                            background: (theme as any).vars.palette.warning.light
                        },
                        '& > .low': {
                            background: (theme as any).vars.palette.error.light
                        }
                    }
                }
            }
        }
    };
}
