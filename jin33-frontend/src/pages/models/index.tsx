import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

const MOCK_MODELS = [
  {
    id: '1',
    name: 'GPT-3.5-Turbo',
    description: '适用于各种对话和文本生成任务的通用模型',
    tags: ['对话', '文本生成', '通用'],
    status: '可用',
  },
  {
    id: '2',
    name: 'Claude-2',
    description: '擅长长文本理解和生成的高级模型',
    tags: ['长文本', '理解', '生成'],
    status: '即将推出',
  },
  {
    id: '3',
    name: 'Llama-2',
    description: '开源大语言模型，支持多种任务',
    tags: ['开源', '通用', '可定制'],
    status: '可用',
  },
];

const ModelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredModels = MOCK_MODELS.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          模型仓库
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索模型..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredModels.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {model.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {model.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {model.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Chip
                  label={model.status}
                  color={model.status === '可用' ? 'success' : 'default'}
                  size="small"
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  disabled={model.status !== '可用'}
                >
                  {model.status === '可用' ? '立即使用' : '敬请期待'}
                </Button>
                <Button size="small">了解更多</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModelsPage;
