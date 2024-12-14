import { Alert, Box, CircularProgress, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { useChat } from '@/hooks/useChat';

const ChatPage: React.FC = () => {
    const { messages, loading, error, sendMessage, clearError } = useChat();
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        await sendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void handleSendMessage();
        }
    };

    return (
        <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
            {error && (
                <Alert severity="error" onClose={clearError} sx={{ m: 1 }}>
                    {error}
                </Alert>
            )}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '80%',
                                p: 2,
                                bgcolor: message.isUser ? 'primary.light' : 'background.paper',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >
                            {message.content}
                        </Box>
                    </Box>
                ))}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Box>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="输入消息..."
                        variant="outlined"
                        size="small"
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={loading || !inputValue.trim()}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatPage; 