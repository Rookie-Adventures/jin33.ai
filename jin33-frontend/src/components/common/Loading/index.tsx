import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingProps } from './Loading.types';
import { getLoadingStyles } from './Loading.styles';

const Loading: React.FC<LoadingProps> = ({
  size = 40,
  color = 'primary',
  overlay = false,
  centered = false,
  className,
  ...props
}) => {
  const theme = useTheme();
  const styles = getLoadingStyles(theme);

  const content = (
    <Box
      data-testid="loading-container"
      className={className}
      sx={centered ? styles.centered : styles.container}
    >
      <CircularProgress
        size={size}
        color={color}
        {...props}
      />
    </Box>
  );

  if (overlay) {
    return (
      <Box
        data-testid="loading-overlay"
        sx={styles.overlay}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default Loading;
