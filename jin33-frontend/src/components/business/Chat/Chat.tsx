import { Alert, Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';
import { useChat } from './hooks/useChat';

const Chat: React.FC = () => {
  const { messages, loading, error, sendMessage, clearError, clearMessages } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (): void => {
    if (!inputValue.trim()) return;
    void sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1,
      position: 'relative',
      overflow: 'hidden'
    }}
      data-testid="chat-container"
    >
      <ChatHeader onClear={clearMessages} />
      {error && (
        <Alert severity="error" onClose={clearError} sx={{ m: 1 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <MessageList messages={messages} />
        {loading && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2
          }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        disabled={loading}
      />
    </Box>
  );
};

export default Chat;
