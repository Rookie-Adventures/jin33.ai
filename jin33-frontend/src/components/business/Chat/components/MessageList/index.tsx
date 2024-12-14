import React from 'react';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { MessageRole } from '../../../../../types/chat.types';
import type { Message } from '../../../../../types/chat.types';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((msg) => (
        <ListItem
          key={msg.id}
          sx={{
            flexDirection: 'column',
            alignItems: msg.role === MessageRole.USER ? 'flex-end' : 'flex-start',
            mb: 1
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {msg.role === MessageRole.USER ? '你' : 'AI助手'}
          </Typography>
          <Paper
            elevation={1}
            sx={{
              p: 1,
              maxWidth: '80%',
              bgcolor: msg.role === MessageRole.USER ? 'primary.light' : 'background.paper',
              color: msg.role === MessageRole.USER ? 'white' : 'text.primary'
            }}
          >
            <Typography>{msg.content}</Typography>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;
