import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Settings, Delete } from '@mui/icons-material';

interface ChatHeaderProps {
  onClear?: () => void;
  onSettings?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClear, onSettings }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h6" component="div">
        AI助手
      </Typography>
      <Box>
        {onClear && (
          <IconButton onClick={onClear} size="small" sx={{ mr: 1 }}>
            <Delete />
          </IconButton>
        )}
        {onSettings && (
          <IconButton onClick={onSettings} size="small">
            <Settings />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ChatHeader;
