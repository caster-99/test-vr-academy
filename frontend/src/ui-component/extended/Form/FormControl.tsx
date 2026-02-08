import { ElementType, ReactNode } from 'react';

// material-ui
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MUIFormControl from '@mui/material/FormControl';

// ==============================|| FORM CONTROL ||============================== //

interface FormControlProps {
    captionLabel?: string;
    formState?: string;
    iconPrimary?: ElementType;
    iconSecondary?: ElementType;
    placeholder?: string;
    textPrimary?: string;
    textSecondary?: string;
}

export default function FormControl({
    captionLabel,
    formState,
    iconPrimary,
    iconSecondary,
    placeholder,
    textPrimary,
    textSecondary
}: FormControlProps) {
    const primaryIcon = iconPrimary ? (
        <InputAdornment position="start">
            {Object.assign(Object.create(iconPrimary), { fontSize: 'small', sx: { color: 'grey.700' } })}
        </InputAdornment>
    ) : null;
    // Wait, the way they used icons is as components.
    const IconPrimary = iconPrimary;
    const renderPrimaryIcon = IconPrimary ? <IconPrimary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const IconSecondary = iconSecondary;
    const renderSecondaryIcon = IconSecondary ? <IconSecondary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const errorState = formState === 'error';

    return (
        <MUIFormControl fullWidth error={errorState}>
            <InputLabel>{captionLabel}</InputLabel>
            <OutlinedInput
                placeholder={placeholder}
                type="text"
                label={captionLabel}
                startAdornment={
                    <>
                        {renderPrimaryIcon && <InputAdornment position="start">{renderPrimaryIcon}</InputAdornment>}
                        {textPrimary && (
                            <>
                                <InputAdornment position="start">{textPrimary}</InputAdornment>
                                <Divider sx={{ height: 28, m: 0.5, mr: 1.5 }} orientation="vertical" />
                            </>
                        )}
                    </>
                }
                endAdornment={
                    <>
                        {renderSecondaryIcon && <InputAdornment position="end">{renderSecondaryIcon}</InputAdornment>}
                        {textSecondary && (
                            <>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <InputAdornment position="end">{textSecondary}</InputAdornment>
                            </>
                        )}
                    </>
                }
            />
        </MUIFormControl>
    );
}
