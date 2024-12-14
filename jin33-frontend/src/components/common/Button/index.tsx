import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { ButtonProps } from './Button.types';
import { getButtonStyles } from './Button.styles';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const theme = useTheme();
  const styles = getButtonStyles(theme);

  return (
    <MuiButton
      {...props}
      className={className}
      sx={{
        ...styles.root,
        ...(variant === 'primary' ? styles.primary : styles.secondary),
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
