# jin33.ai 开发规范 (2024版)

## 一、文档说明

### 1. 版本信息
- 文档版本：1.0.1
- 更新日期：2024-12-06
- 适用范围：jin33.ai项目 


### 2. 重要原则
- 以实际代码为准
- 保持简单直接
- 确保可维护性
- 注重代码质量

## 二、开发环境规范

### 1. 环境要求
- Node.js：22.12.0 (LTS)
  * 安装方式：官网下载或nvm管理
  * 环境变量配置：确保node和npm命令可用
  * 版本检查：`node -v` 和 `npm -v`

- npm：10.9.0
  * 源配置：使用淘宝镜像源
  * 配置命令：`npm config set registry https://registry.npmmirror.com`
  * 必要全局包：
    - typescript
    - eslint
    - prettier
    - pm2

- 用户操作系统：Windows 11 x64 (64位)


### 2. 开发工具配置
- cursor ide：
  * 版本要求：最新稳定版
  * 必要配置：
    - 文件自动保存
    - 格式化工具：Prettier
    - 代码检查：ESLint
    - 终端：集成系统终端

- 必装插件配置：
  * ESLint：
    - 配置文件：.eslintrc.js
    - 规则继承：airbnb-typescript
    - 自动修复：保存时自动修复

  * Prettier：
    - 配置文件：.prettierrc
    - 基础设置：
      ```json
      {
        "semi": true,
        "singleQuote": true,
        "tabWidth": 2,
        "printWidth": 100
      }
      ```

  * TypeScript：
    - 配置文件：tsconfig.json
    - 严格模式：启用
    - 类型检查：强制

  * Git Lens：
    - 提交历史：启用
    - 行历史：启用
    - 分支对比：启用

### 3. 项目结构规范
- 目录命名：
  * 全小写
  * 多词用连字符
  * 简短明确
  * 例如：user-auth, data-models

- 文件命名：
  * 组件：PascalCase.tsx
  * 工具：camelCase.ts
  * 样式：组件名.styles.ts
  * 类型：组件名.types.ts
  * 测试：组件名.test.ts
  * 常量：UPPER_SNAKE_CASE.ts

- 代码组织：
  * 相关文件放在同一目录
  * 测试文件与源文件同目录
  * 样式文件与组件文件同目录
  * 类型定义文件集中管理

### 4. 编码规范
- TypeScript规范：
  * 类型定义：
    - 优先使用interface
    - 必要时使用type
    - 避免any类型
    ```typescript
    // 正确示例
    interface UserData {
      id: string;
      name: string;
      age: number;
    }

    // 避免使用
    type AnyData = any;
    ```

  * 函数定义：
    - 明确参数��型
    - 明确返回值类型
    - 使用函数声明而非表达式
    ```typescript
    // 正确示例
    function calculateTotal(items: CartItem[]): number {
      return items.reduce((sum, item) => sum + item.price, 0);
    }

    // 避免使用
    const calculate = (items) => items.reduce((sum, item) => sum + item.price, 0);
    ```

- React规范：
  * 组件定义：
    - 使用函数组件
    - 使用TypeScript
    - 明确Props类型
    ```typescript
    interface ButtonProps {
      label: string;
      onClick: () => void;
      disabled?: boolean;
    }

    const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
      return (
        <button onClick={onClick} disabled={disabled}>
          {label}
        </button>
      );
    };
    ```

  * Hooks使用：
    - 遵循Hooks规则
    - 合理使用依赖数组
    - 避免过度使用useEffect
    ```typescript
    // 正确示例
    const [data, setData] = useState<DataType>([]);
    useEffect(() => {
      fetchData().then(setData);
    }, []);

    // 避免使用
    useEffect(() => {
      // 频繁更新的状态
    }, [频繁变化的依赖]);
    ```

### 5. 版本控制规范
- 分支管理
  * main：生产环境分支
    - 只接受合并请求
    - 必须通过CI/CD
    - 需要代码审��

  * develop：开发环境分支
    - 功能开发的基础分支
    - 日常开发合并目标
    - 定期合并到main

  * feature/*：功能分支
    - 基于develop创建
    - 完成后合并回develop
    - 命名规范：feature/功能名称

  * hotfix/*：紧急修复分支
    - 基于main创建
    - 修复后同时合并到main和develop
    - 命名规范：hotfix/问题描述

- 提交规范：
  * 提交信息格式：
    ```
    <type>(<scope>): <subject>

    <body>

    <footer>
    ```

  * type类型：
    - feat：新功能
    - fix：修复bug
    - docs：文档更新
    - style：代码格式
    - refactor：重构
    - test：测试相关
    - chore：构建相关

  * scope：影响范围
    - global：全局变更
    - module：模块名称
    - component：组件名称

  * subject：简短描述
    - 不超过50个字符
    - 使用现在时态
    - 首字母小写
    - 结尾不加句号

## 三、项目结构规范

### 1. 前端结构
```typescript
frontend/
├── src/
│   ├── components/     # 组件目录
│   │   ├── common/    # 通用组件
│   │   └── business/  # 业务组件
│   ├── pages/         # 页面组件
│   ├── hooks/         # 自定义钩子
│   ├── services/      # API服务
│   ├── utils/         # 工函数
│   ├── types/         # 类型定义
│   ├── store/         # 状态管理
│   ├── theme/         # 主题配置
│   └── routes.tsx     # 路由配置
```

### 2. 目录说明
- components：
  * common - 可复用的通用组件
  * business - 特定业务场景的组件
- pages：完整的页面组件
- hooks：可复用的自定义钩子
- services：API服务和接口调用
- utils：通用工具函数
- types：TypeScript类型定义
- store：Redux状态管理
- theme：主题相关配置
- routes.tsx：路由配置文件

### 2. 后端结构
```typescript
backend/
├── src/
│   ├── controllers/   # 控制器层
│   ├── services/      # 业务逻辑层
│   ├── models/        # 数据模型层
│   ├── middleware/    # 中间件
│   └── utils/         # 工具函数
```

## 四、代码规范

### 1. 命名规范
- 文件命名：
  * 组件：PascalCase.tsx
  * 工具：camelCase.ts
  * 类型：camelCase.types.ts
  * 样式：PascalCase.styles.ts

- 变量命名：
  * 组件：PascalCase
  * 函数：camelCase
  * 常量：UPPER_SNAKE_CASE
  * 接口：IPascalCase

### 2. 代码风格
- 使用TypeScript严格模式
- 使用ESLint + Prettier
- 遵循函数式编程原则
- 保持代码简洁清晰

### 3. 注释规范
- 组件必须包含JSDoc注释
- 复杂逻辑必须添加说明
- 关键函数必须说明用途
- TODO必须标注负责人

### 6. 代码质量规范
函数复杂度：不超过15行。复杂功能可适当超出，但要确保可读性和可维护性。
文件大小：不超过500行。超过时可拆分模块，避免耦合过高。
函数参数数量：不超过4个。超出时使用对象传参，避免超过5个参数。
嵌套层级：不超过4层。深层次嵌套应拆分成独立函数或提前返回。
这些限制是为了整洁和可维护性而设定的，对于复杂功能，可以以此为原则适度调整，确保代码依然清晰易懂且易于维护。

- 代码重复控制：
  * 重复代码段：不超过10行
  * 重复阈值：3次以上需重构
  * 通用逻辑：抽取为Hook或工具函数

- 命名规范：
  ```typescript
  // 变量命名
  const userId: string;              // 普通变量：camelCase
  const MAX_RETRY_COUNT = 3;         // 常量：UPPER_SNAKE_CASE
  const [isLoading, setIsLoading]    // 状态：is/has/should前缀

  // 函数命名
  function handleClick() {}          // 事件处理：handle前缀
  function fetchUserData() {}        // 数据请求：fetch/get/post前缀
  function validateEmail() {}        // 验证函数：validate/check前缀

  // 组件命名
  const UserProfile = () => {}       // 组件：PascalCase
  const withAuth = () => {}          // HOC：with前缀
  const useUser = () => {}           // Hook：use前缀
  ```

### 7. React最佳实践
- 组件设计：
  ```typescript
  // 正确示例：组件职责单一
  const UserAvatar: React.FC<{
    url: string; 
    alt: string;
    size?: 'small' | 'medium' | 'large';
    fallbackUrl?: string;
  }> = ({
    url, 
    alt, 
    size = 'medium',
    fallbackUrl = '/default-avatar.png'
  }) => {
    const [imgSrc, setImgSrc] = useState(url);
    
    // 处理图片加载失败
    const handleError = () => {
      setImgSrc(fallbackUrl);
    };

    return (
      <img 
        src={imgSrc} 
        alt={alt} 
        className={`avatar avatar-${size}`}
        onError={handleError}
      />
    );
  };

  // 错误示例：组件职责过重
  const UserCard = () => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    // 处理用户数据、文章数据、评论等多个职责
  };
  ```

- 性能优化：
  ```typescript
  // 使用React.memo避免不必要的重渲染
  const ExpensiveComponent = React.memo(({data}) => {
    return <div>{/* 复杂的渲染逻辑 */}</div>;
  });

  // 使用useMemo缓存计算结果
  const memoizedValue = useMemo(() =>
    computeExpensiveValue(deps), [deps]
  );

  // 使用useCallback缓存回调函数
  const memoizedCallback = useCallback(() => {
    doSomething(deps);
  }, [deps]);
  ```

- 状态管理：
  ```typescript
  // 本地状态：useState
  const [count, setCount] = useState(0);

  // 复杂状态：useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 共享状态：Redux
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  ```

### 8. TypeScript最佳实践
- 类型定义：
  ```typescript
  // 通用类型
  type ID = string | number;
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;

  // 工具类型使用
  type ReadOnly = Readonly<UserData>;
  type Partial = Partial<UserData>;
  type Pick = Pick<UserData, 'id' | 'name'>;

  // 类型保护
  function isError(error: unknown): error is Error {
    return error instanceof Error;
  }
  ```

- 泛型使用：
  ```typescript
  // 通用组件
  interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  }

  // 通用Hook
  function useAsync<T>(
    asyncFn: () => Promise<T>,
    deps: DependencyList = []
  ): {
    data: T | null;
    loading: boolean;
    error: Error | null;
  } {
    // 实现略
  }
  ```

### 9. API请求规范
- 请求封装：
  ```typescript
  // API请求基础配置
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
      }
      return Promise.reject(error);
    }
  );
  ```

- 错误处理：
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
    return useCallback((error: unknown) => {
      if (error instanceof APIError) {
        // 处理API错误
      } else if (error instanceof Error) {
        // 处理其他错误
      }
    }, []);
  }
  ```

### 10. 测试规范
- 单元测试：
  ```typescript
  // 组件测试
  describe('Button', () => {
    it('renders correctly', () => {
      render(<Button label="Click me" />);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const onClick = jest.fn();
      render(<Button label="Click me" onClick={onClick} />);
      fireEvent.click(screen.getByText('Click me'));
      expect(onClick).toHaveBeenCalled();
    });
  });

  // Hook测试
  describe('useUser', () => {
    it('fetches user data', async () => {
      const { result } = renderHook(() => useUser(1));
      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });
    });
  });
  ```

- 集成测试：
  ```typescript
  // API集成测试
  describe('UserAPI', () => {
    it('fetches user successfully', async () => {
      const user = await UserAPI.getUser(1);
      expect(user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String)
      });
    });
  });
  ```

## 五、版本控制规范

### 1. Git工作流
- 分支策略：
  * main：生产环境
  * develop：开发环境
  * feature/*：功能开发
  * hotfix/*：紧急修复

- 提交规范：
  * feat：新功能
  * fix：修复bug
  * docs：文档更新
  * style：代码格式
  * refactor：重构
  * test：测试相关
  * chore：构建相关

## 六、测试规范

### 1. 测试流程
- 新功能开发测试流程：
  * 开前：确定测范和关键点
  * 开发：实时自测功能点
  * 提交前：完整功能测试
  * 部署后：线上验证

- 功能修改测试流程：
  * 定位问题范围
  * 验证修改影响
  * 回归测试
  * 确认修复效果

### 2. 测试工具
- GitHub Actions：
  * 代码质量自动检查
  * 类型检查
  * 构建测试
  * 依赖完整性检查

- 开发辅助工具：
  * Postman：API测试
  * Chrome DevTools：前端调试
  * React Developer Tools：组件调试
  * Redux DevTools：状态管理调试

### 3. 测试重点
- 功能测试：
  * 核心业务流程
  * 数据处理逻辑
  * 异常处理机制
  * 用户交互响应

- 性能测试：
  * 页面加载时间
  * 接口响应速度
  * 资源占用情况
  * 内存使用状况



## 七、安全规范

### 1. 代码安全
- 输入验证
- SQL注入护
- XSS防护
- CSRF防护

### 2. 数据安全
- 敏感数据加密
- 密码安全存储
- API密钥保护
- 数据备份策略

## 八、技术实现以下性能标准：

### 1. 前端性能
- 首屏加载时间 < 2s
- 页面切换时间 < 300ms
- 静态资源加载时间 < 1s
- 页面交互响应时间 < 100ms
- 内存占用合理（< 200MB）

### 2. 后端性能
- API响应时间 < 200ms
- WebSocket连接延迟 < 100ms
- 数据库查询时间 < 50ms
- 并发处理能力 > 1000/s
- CPU使用率 < 80%
- 内存使用率 < 70%

### 3. 网络性能
- CDN响应时间 < 100ms
- DNS解析时间 < 100ms
- TCP连接时间 < 100ms
- SSL握手时间 < 200ms
- 网络传输压缩率 > 60%

### 4. 优化要求
#### 4.1 前端优化
- 实现延迟加载和按需加载
- 使用代码拆分和Tree Shaking
- 图片和静态资源压缩
- 合理使用缓存策略
- 优化组件渲染性能

#### 4.2 后端优化
- 实现数据库索引优化
- 使用Redis缓存热点数据
- 实现并发��求控制
- 使用Gzip压缩响应数据
- 优化数据库查询

#### 4.3 网络优化
- 使用CDN加速静态资源
- 启用HTTP/2支持
- 实现DNS预解析
- 配置合理的缓存策略
- 实现负载均衡

## 九、文档规范

### 1. 开发必要文档
- README.md
- API文档
- 部署文档
- 测试文档

### 2. 项目规范文档要求
- 及时更新
- 简洁清晰
- 示例完整
- 版本对应

## 十、发布规范

### 1. 技术文档发布规则
### 1. 版本号管理规则
- 主版本号：不兼容的API修改 (例如: 2.0.0)
- 次版本号：向下兼容的功能性新增 (例如: 1.1.0)
- 修订号：向下兼容的问题修正 (例如: 1.0.1)

### 2. 技术发布流程
- 版本号更新
- 更新日志生成
- 代码审查通过
- 测试通过
- 技术文档更新
- 创建Git标签
- 部署发布

## 项目规范文档修改规范

1. 修改范围：
   - 不允许随意修改核心规范
   - 允许补充具体实现细节
   - 允许优化规范说明
   - 允许更新版本要求

2. 修改核：
   - 提出修改建议
   - 评估对开发的影响
   - 确保向后兼容性
   - 团队讨论确认

3. 变更记录：
   - 在文档底部记录变更
   - 包含变更时间
   - 说明变更内容
   - 注释变更原因

# 项目规范变更记录

## 变更模板
每次规范变更必须包含以下信息：
1. 变更日期
2. 变更内容
3. 变更原因
4. 影响评估
5. 兼容性说明


## 规范稳定性承诺
1. 核心规范保持稳定
   - 代码质量标准
   - 安全规范要求
   - 测试覆盖要求

2. 可调整范围
   - 目录组织方式
   - 文件命名方式
   - 工具使用方式

3. 调整流程
   - 提出调整建议
   - 评估影响范围
   - 团队讨论确认
   - 记录变更历史
   - 更新规范文档

4. 维护责任
   - 规范稳定性
   - 定期审查规范执行情况
   - 收集开发过程中的反馈
   - 适时优化调整规范




### 11. 自动化工具链配置
- ESLint配置：
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

- Prettier配置：
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "printWidth": 100,
    "trailingComma": "es5",
    "bracketSpacing": true
  }
  ```

- TypeScript配置：
  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
      "lib": ["DOM", "DOM.Iterable", "ESNext"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "allowJs": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "forceConsistentCasingInFileNames": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }
  ```

- 自动化脚本
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "test": "jest",
    "validate": "npm-run-all --parallel lint test build"
  }
}
```

### 13. Git Hooks
```bash
#!/bin/sh
# .husky/pre-commit

npm run lint-staged
```

```json
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

### 14. 持续集成
```yaml
# .github/workflows/main.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run validate
```



这些配置确保：
1. 代码提交前自动检查
2. 保存时自动格式化
3. 持续集成自动测试
4. 统一的编码风格
5. 严格的类型检查

开发者只需要克隆项目并安装依赖，所有工具链都会自动配置和运行。