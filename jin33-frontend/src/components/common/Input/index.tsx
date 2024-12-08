import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: TextFieldProps['variant'];
}

const Input: React.FC<InputProps> = ({ variant = 'outlined', ...props }) => {
  return <TextField variant={variant} {...props} />;
};

export default Input;
