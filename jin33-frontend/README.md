 
 #### 2.3 开发工具与环境
- VSCode插件:
  * ESLint: 代码质量控制
  * Prettier: 代���格式化
  * Path Intellisense: 路径自动补全
  * Bracket Pair Colorizer: 括号匹配
  * GitLens: Git增强功能
  * jest: 单元测试
  
### 1. 系统架构
系统采用前后端分离的轻量级架构设计，主要包含以下核心组件
- 前后端分离架构
  * 前端：React SPA应用
  * 后端：Node.js服务
  * 通信：RESTful API + Socket.IO
  * 存储：MongoDB + Redis
- 轻量级实现：最小化依赖、模块化设计、按需加载，确保系统轻量高效
- 高可用性保障：负载均衡、故障转移、数据备份、灾难恢复

### 2. 技术栈选型
#### 2.1 前端技术栈
- React: 18.2.0（最新稳定版）
  * 并发渲染
  * 自动批处理
  * Suspense支持
  * 服务端组件

- TypeScript: 5.3.3（最新稳定版）
  * 严格类型检查
  * JSX支持
  * 装饰器支持
  * 增量编译

- Material UI: 5.16.9（UI组件库）
  * Material Design 3 实现
  * 增强的样式引擎（Emotion）
  * 高级主题定制和 sx 属性支持
  * 完整的 React 18 特性集成
  * 增强的 TypeScript 类型支持

- 状态管理:
  * @reduxjs/toolkit: 2.0.1
  * zustand: 4.4.7

  
 // .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
 
  * ESLint：
    ```javascript
    // .eslintrc.js
    module.exports = {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
      ],
      plugins: ['@typescript-eslint', 'react', 'react-hooks'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error'
      }
    };
    ```

  * Prettier：
    ```json
    // .prettierrc
    {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "printWidth": 100,
      "trailingComma": "es5",
      "bracketSpacing": true
    }
    ```

  * TypeScript：
    ```json
    // tsconfig.json
    {
      "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
      }
    }
    ```
#### 1.1 前端完整目录结构
```
frontend/
├── src/
│   ├── components/           # 组件目录
│   │   ├── common/          # 通用组件
│   │   │   ├── Button/      
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   ├── Button.styles.ts
│   │   │   │   └── Button.test.tsx     # 测试文件直接和源码放一起
│   │   │   ├── Form/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Form.types.ts
│   │   │   │   └── Form.test.tsx
│   │   │   └── Layout/
│   │   │       ├── index.tsx
│   │   │       ├── Layout.types.ts
│   │   │       └── Layout.test.tsx
│   │   └── business/        # 业务组件
│   │       ├── Chat/
│   │       │   ├── index.tsx
│   │       │   ├── Chat.types.ts
│   │       │   ├── Chat.test.tsx
│   │       │   ├── components/     # 子组件
│   │       │   │   └── ChatInput/
│   │       │   │       ├── index.tsx
│   │       │   │       └── ChatInput.test.tsx
│   │       │   └── hooks/          # 组件专用钩子
│   │       │       ├── useChat.ts
│   │       │       └── useChat.test.ts
│   │       ├── Profile/
│   │       │   ├── index.tsx
│   │       │   └── Profile.test.tsx
│   │       └── Models/
│   │           ├── index.tsx
│   │           └── Models.test.tsx
│   ├── pages/               # 页面组件
│   │   ├── home/
│   │   │   ├── index.tsx
│   │   │   ├── Home.types.ts
│   │   │   └── Home.test.tsx
│   │   ├── chat/
│   │   │   ├── index.tsx
│   │   │   └── Chat.test.tsx
│   │   ├── models/
│   │   │   ├── index.tsx
│   │   │   └── Models.test.tsx
│   │   └── profile/
│   │       ├── index.tsx
│   │       └── Profile.test.tsx
│   ├── hooks/               # 全局钩子
│   │   ├── useChat.ts
│   │   ├── useAuth.ts
│   │   └── __tests__/       # 通用钩子的测试集中管理
│   │       ├── useChat.test.ts
│   │       └── useAuth.test.ts
│   ├── services/           # API服务
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── chat.ts
│   │   └── types/         # API类型定义
│   │       ├── index.ts
│   │       ├── api.types.ts
│   │       └── response.types.ts
│   ├── store/             # 状态管理
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── auth.slice.ts
│   │   │   └── chat.slice.ts
│   │   └── types/        # Store类型定义
│   │       └── store.types.ts
│   ├── utils/            # 工具函数
│   │   ├── format.ts
│   │   ├── validate.ts
│   │   └── __tests__/    # 工具函数的测试集中管理
│   │       ├── format.test.ts
│   │       └── validate.test.ts
│   ├── types/           # 全局类型定义
│   │   ├── index.ts     # 统一导出
│   │   ├── api.types.ts
│   │   └── models.types.ts
│   ├── theme/           # 主题配置
│   │   ├── index.ts
│   │   └── theme.types.ts
│   ├── App.tsx
│   └── routes.tsx
├── test/               # 测试配置与通用测试目录
│   ├── __tests__/     # 通用测试配置和工具
│   │   ├── setupTests.ts  # 测试环境配置
│   │   └── testUtils.ts   # 通用测试工具函数
│   └── __mocks__/     # Mock 服务和数据
│       ├── apiMocks.ts    # API Mock 数据
│       └── userMocks.ts   # 用户相关 Mock 数据
└── jest.config.ts     # Jest 主配置文件
```
### 测试文件组织规范

1. **组件/页面的测试文件**
   - 测试文件直接和源码文件放在同一目录
   - 使用 `.test.tsx` 或 `.test.ts` 后缀区分
   ```
   Button/
   ├── index.tsx           # 源代码
   ├── Button.types.ts     # 类型定义
   ├── Button.styles.ts    # 样式文件
   └── Button.test.tsx     # 测试文件
   ```

2. **`__tests__` 目录使用场景**
   - 用于存放高复用、通用性的测试相关文件
   - 主要在以下场景使用：
     ```
     utils/                  # 工具函数等高复用模块
     ├── format.ts
     ├── validate.ts
     └── __tests__/         # 集中管理复用性高的测试
         ├── format.test.ts
         └── validate.test.ts

     test/                  # 项目级的测试配置和工具
     ├── __tests__/        
     │   ├── setupTests.ts  # 测试环境配置
     │   └── testUtils.ts   # 通用测试工具函数
     └── __mocks__/        
         └── apiMocks.ts    # Mock 数据
     ```

### 测试文件命名规范

1. **组件测试**: `组件名.test.tsx`
2. **Hook 测试**: `Hook名.test.ts`
3. **工具函数测试**: `工具函数名.test.ts`
4. **Mock 文件**: `模块名Mocks.ts`

### 测试文件内容规范

1. 基本测试结构：
   ```typescript
   describe('组件/函数名', () => {
     beforeEach(() => {
       // 测试前置设置
     });

     it('应该完成某个功能', () => {
       // 测试用例
     });
   });
   ```

2. 测试用例命名必须清晰描述测试目的
3. 每个测试文件应该包含必要的注释说明
4. Mock 数据应该从 `test/__mocks__` 目录导入使用

#### 1.2 文件命名规范
- **组件目录**: 
  * 目录名: PascalCase (如 `Button/`, `UserProfile/`)
  * 入口文件: `index.tsx`
  * 类型文件: `组件名.types.ts`
  * 样式文件: `组件名.styles.ts`
  * 测试文件: `组件名.test.tsx`
  * 子组件目录: `components/`
  * 组件钩子: `hooks/`

- **页面目录**:
  * 目录名: camelCase (如 `home/`, `userProfile/`)
  * 入口文件: `index.tsx`
  * 类型文件: `页面名.types.ts`
  * 子组件目录: `components/`

- **Hooks目录**:
  * 文件名: camelCase, use前缀 (如 `useAuth.ts`)
  * 类型文件: `hooks.types.ts`

- **Services目录**:
  * 文件名: camelCase (如 `auth.ts`, `chat.ts`)
  * 类型文件: `服务名.types.ts`

- **Store目录**:
  * Slice文件: camelCase.slice.ts (如 `auth.slice.ts`)
  * 类型文件: `store.types.ts`

- **Utils���录**:
  * 文件名: camelCase (如 `format.ts`)
  * 类型文件: `utils.types.ts`

#### 1.3 类型定义规范
- 所有类型文件统一使用 `.types.ts` 后缀
- 通过 `index.ts` 统一导出
- 类型文件应与实现文件放在同一目录
- 全局类型定义放在 `src/types` 目录
- 通过 `index.ts` 统一导出

#### 2.2 变量命名
```typescript
// 变量命名示例
const userId: string;              // 普通变量：camelCase
const MAX_RETRY_COUNT = 3;         // 常量：UPPER_SNAKE_CASE
const [isLoading, setIsLoading]    // 状态：is/has/should前缀

// 函数命名示例
function handleClick() {}          // 事件处理：handle前缀
function fetchUserData() {}        // 数据请求：fetch/get/post前缀
function validateEmail() {}        // 验证函数：validate/check前缀

// 组件命名示例
const UserProfile = () => {}       // 组件：PascalCase
const withAuth = () => {}          // HOC：with前缀
const useUser = () => {}           // Hook：use前缀
```
**类型命名**

- 接口（Interface）:
  * 使用描述性名称，PascalCase
  * 示例：ApiResponse, UserService, ButtonProps

- 类型别名（Type）:
  * 使用描述性名称，PascalCase
  * 示例：ApiResponse, UserRole, ThemeColors

-  枚举（Enum）:
  * 类型名: PascalCase (如 UserRole, StatusCode)
  * 枚举值: UPPER_SNAKE_CASE (如 USER_ROLE, STATUS_CODE)
  * 示例：
    ```typescript
      enum UserRole {
      ADMIN = 'admin',
      USER = 'user',
      GUEST = 'guest'
    }
    ```
    
```

## 四、代码规范

### 1. 代码质量标准
- 函数复杂度：不超过15行
- 文件大小：不超过500行
- 函数参数：不超过4个
- 嵌套层级：不超过4层
- 代码重复：相似代码超过10行或重复3次以上需重构

### 2. TypeScript规范
#### 2.1 类型定义
```typescript
// 通用类型定义
type ID = string | number;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// 接口定义
interface User {
  id: ID;
  name: string;
  email: string;
  age?: number;
}

// 类型保护
function isUser(obj: unknown): obj is User {
  return obj !== null 
    && typeof obj === 'object'
    && 'id' in obj 
    && 'name' in obj;
}
```

#### 2.2 类型检查清单
- [ ] 避免使用any
- [ ] 函数参数和返回值都有类型声明
- [ ] 使用类型保护而不是类型断言
- [ ] 合理使用泛型
- [ ] 优先使用interface而非type

### 3. React开发规范
#### 3.1 组件开发
```typescript
// 组件示例
interface Props {
  user: User;
  onUpdate: (user: User) => void;
  className?: string;
}

const UserProfile: React.FC<Props> = ({ 
  user, 
  onUpdate,
  className 
}) => {
  // 状态管理
  const [isEditing, setIsEditing] = useState(false);
  
  // 事件处理
  const handleSubmit = useCallback(() => {
    setIsEditing(false);
    onUpdate(user);
  }, [user, onUpdate]);

  // 条件渲染
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={className}>
      {/* JSX内容 */}
    </div>
  );
};

// 导出
export default memo(UserProfile);
```

#### 3.2 Hooks使用规范
```typescript
// 自定义Hook示例
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      try {
        setLoading(true);
        const data = await api.getUser(userId);
        if (mounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (mounted && err instanceof Error) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { user, loading, error };
}
```

### 4. API开发规范
#### 4.1 请求封装
```typescript
// API基础配置
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 处理认证错误
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
```

#### 4.2 错误处理
```typescript
// 统一错误处理
class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// 错误处理Hook
function useAPIError() {
  const handleError = useCallback((error: unknown) => {
    if (error instanceof APIError) {
      // 处理API错误
      toast.error(error.message);
    } else if (error instanceof Error) {
      // 处理其他错误
      toast.error('An unexpected error occurred');
    }
  }, []);

  return { handleError };
}
```

## 五、测试规范

### 1. 测试覆盖率要求
- 业务组件：> 80%
- 工具函数：> 90%
- API接口：> 85%

### 2. 单元测试规范
```typescript
// 组件测试示例
describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com'
  };

  it('renders user information correctly', () => {
    render(<UserProfile user={mockUser} onUpdate={jest.fn()} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('handles update correctly', () => {
    const onUpdate = jest.fn();
    render(<UserProfile user={mockUser} onUpdate={onUpdate} />);
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Name' }
    });
    fireEvent.click(screen.getByText('Save'));

    expect(onUpdate).toHaveBeenCalledWith({
      ...mockUser,
      name: 'New Name'
    });
  });
});

// Hook测试示例
describe('useUser', () => {
  it('fetches user data successfully', async () => {
    const mockUser = { id: '1', name: 'Test User' };
    jest.spyOn(api, 'getUser').mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUser('1'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
```

## 六、Git工作流规范

### 1. 分支管理
- main: 主分支，只接受合并
- develop: 开发分支
- feature/*: 功能分支
- hotfix/*: 紧急修复分支

### 2. 提交信息规范
```
<type>(<scope>): <subject>

<body>

<footer>
```

type类型:
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具变动

### 3. Git Hooks配置
```bash
#!/bin/sh
# .husky/pre-commit

npm run lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests"
    ]
  }
}
```

## 七、性能规范

### 1. 性能指标
#### 1.1 前端性能
- 页面加载时间 < 2s
- 页面切换时间 < 300ms
- 静态资源加载时间 < 1s
- 页面交互响应时间 < 100ms
- 内存占用 < 200MB

#### 1.2 后端性能
- API响应时间 < 200ms
- WebSocket连接延迟 < 100ms
- 数据库查询时间 < 50ms
- 并发处理能力 > 1000/s
- CPU使用率 < 80%
- 内存使用率 < 70%

### 2. 优化要求
#### 2.1 前端优化
- 实现代码分割和懒加载
- 使用缓存策略
- 图片和资源优化
- 合理使用CDN
- 优化组件渲染性能

#### 2.2 后端优化
- 使用数据库索引
- 实现缓存机制
- 控制并发请求
- 实现数据压缩
- 优化查询性能

## 八、安全规范

### 1. 前端安全
- XSS防护
- CSRF防护
- 敏感信息加密
- 输入验证
- 安全的依赖包

### 2. 后端安全
- 身份认证
- 权限控制
- 数据加密
- SQL注入防护
- 日志审计

## 九、部署规范

### 1. 部署环境
- 开发环境(dev)
- 测试环境(test)
- 生产环境(prod)

### 2. 部署检查清单
- [ ] 环境变量配置正确
- [ ] 数据库迁移完成
- [ ] 静态资源已更新
- [ ] 日志配置正确
- [ ] 监控系统正常

### 3. 自动化部署
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

## 十、文档规范

### 1. 代码注释
```typescript
/**
 * 用户资料组件
 * @param {User} user - 用户信息
 * @param {Function} onUpdate - 更新回调
 * @returns {React.ReactElement}
 */
```

### 2. README要求
- 项目说明
- 环境要求
- 安装步骤
- 开发指南
- 部署说明