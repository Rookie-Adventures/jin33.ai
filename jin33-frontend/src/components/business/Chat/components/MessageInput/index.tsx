import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  disabled = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center',
      borderTop: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="输入消息..."
        variant="outlined"
        size="small"
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.default'
          }
        }}
      />
      <IconButton
        color="primary"
        onClick={onSend}
        sx={{ ml: 1 }}
        disabled={disabled || !value.trim()}
      >
        <Send />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
