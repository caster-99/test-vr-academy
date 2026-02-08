import { ReactNode } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import MuiInputLabel, { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';

// ==============================|| INPUT LABEL ||============================== //

interface BInputLabelProps extends MuiInputLabelProps {
    horizontal?: boolean;
}

const BInputLabel = styled(MuiInputLabel, {
    shouldForwardProp: (prop) => prop !== 'horizontal'
})<BInputLabelProps>(({ theme, horizontal }) => ({
    color: (theme as any).vars?.palette.text.primary || theme.palette.text.primary,
    fontWeight: 500,
    marginBottom: horizontal ? 0 : 8
}));

interface InputLabelProps extends MuiInputLabelProps {
    children?: ReactNode;
    horizontal?: boolean;
}

export default function InputLabel({ children, horizontal = false, ...others }: InputLabelProps) {
    return (
        <BInputLabel horizontal={horizontal} {...others}>
            {children}
        </BInputLabel>
    );
}
