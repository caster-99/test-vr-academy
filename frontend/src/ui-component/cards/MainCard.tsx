import { forwardRef, ReactNode, Ref } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// constant
const headerStyle = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends Omit<CardProps, 'title' | 'content'> {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  sx?: CardProps['sx'];
  title?: ReactNode | string;
  headerSX?: CardHeaderProps['sx'];
}

const MainCard = forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      headerSX = {},
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.divider,
          ':hover': {
            boxShadow: boxShadow ? shadow || defaultShadow : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={{ ...headerStyle, ...headerSX }} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ ...headerStyle, ...headerSX }}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
