import type { CircularProgressProps } from '@mui/material';

export interface LoadingProps extends CircularProgressProps {
    overlay?: boolean;
    centered?: boolean;
    className?: string;
} 