# 构建阶段
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:22.12.0-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 仅安装生产依赖
RUN npm ci --only=production

# 从构建阶段复制编译后的代码
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ecosystem.config.js .

# 安装 PM2
RUN npm install pm2 -g

# 创建日志目录
RUN mkdir -p logs/pm2

# 暴露端口
EXPOSE 4000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
