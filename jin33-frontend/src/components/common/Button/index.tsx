import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return (
    <MuiButton
      {...props}
      variant="contained"
      color={variant === 'primary' ? 'primary' : 'secondary'}
    />
  );
};

export default Button;
