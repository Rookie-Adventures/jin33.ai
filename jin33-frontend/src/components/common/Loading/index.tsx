import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import type { CircularProgressProps } from '@mui/material';

interface LoadingProps {
  fullscreen?: boolean;
  size?: number;
  color?: CircularProgressProps['color'];
}

const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  size = 40,
  color = 'primary'
}) => {
  if (!fullscreen) {
    return <CircularProgress size={size} color={color} />;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loading;
