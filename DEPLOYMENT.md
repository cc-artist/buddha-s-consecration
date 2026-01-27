# 赛博佛祖 Web 应用部署指南

## 项目结构

- **前端**：Next.js 应用，运行在端口 3000
- **后端**：Express.js 应用，运行在端口 3001
- **管理界面**：位于 `backend/admin.html`

## 部署准备

### 云服务器要求
- Node.js 16+ 和 npm
- 安全组开放 3000 和 3001 端口

## 部署步骤

### 1. 克隆代码

```bash
git clone https://github.com/cc-artist/Buddha-s-consecration.git
cd Buddha-s-consecration
```

### 2. 安装依赖

```bash
# 安装前端依赖
cd cyber-buddha-blessing
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 3. 构建前端

```bash
cd ../cyber-buddha-blessing
npm run build
```

### 4. 启动服务

#### 使用 PM2 管理进程（推荐）

```bash
# 全局安装 PM2
npm install -g pm2

# 启动后端
cd backend
pm start

# 启动前端（生产模式）
cd ../cyber-buddha-blessing
pm run start
```

## 访问链接

- **前端应用**：`http://<服务器IP>:3000`
- **后端API**：`http://<服务器IP>:3001/api/v1`
- **健康检查**：`http://<服务器IP>:3001/health`
- **后端管理界面**：`http://<服务器IP>:3001/admin.html`

## 环境配置

### 前端环境变量 (`cyber-buddha-blessing/.env.local`)

```
NEXT_PUBLIC_API_URL=http://<服务器IP>:3001/api/v1
NEXT_PUBLIC_APP_ENV=production
```

### 后端环境变量 (`backend/.env`)

```
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=http://<服务器IP>:3000,http://localhost:3000
SESSION_SECRET=your-secret-key
API_PREFIX=/api/v1
```

## 后端管理界面

### 访问方式
- **默认链接**：`http://<服务器IP>:3001/admin.html`
- **域名访问**：`http://your-domain.com:3001/admin.html`（如果配置了域名）
- **HTTPS访问**：`https://your-domain.com/admin.html`（如果配置了Nginx反向代理和SSL）

### 认证系统
- **登录页面**：访问管理界面时自动跳转
- **默认凭据**：
  - 用户名：`admin`
  - 密码：`admin123`
- **凭据配置**：可在 `backend/src/config/mockData.js` 中修改
- **会话管理**：登录状态保持1小时，支持自动登出

### 功能模块
1. **服务状态监控**
   - 实时显示服务运行状态
   - 统计寺庙数量、咨询预约数、支付订单数

2. **寺庙管理**
   - 获取完整寺庙列表
   - 查询单个寺庙详情
   - 初始化寺庙数据

3. **咨询预约管理**
   - 查看所有咨询预约
   - 查询单个预约详情
   - 创建新的咨询预约

4. **支付订单管理**
   - 查看所有支付订单
   - 查询单个订单详情
   - 创建新的支付订单

5. **跨境支付管理**
   - 支持PAYPEL和PINGPONG支付平台
   - 初始化跨境支付流程
   - 管理国际支付订单

6. **API接口文档**
   - 完整的API端点列表
   - 请求方法和功能说明
   - 接口调用示例

### 安全建议
- **生产环境**：修改默认管理员密码
- **访问控制**：限制管理界面的IP访问
- **HTTPS**：配置SSL证书加密传输
- **定期更新**：保持依赖包和系统更新

## 部署自动化

### 使用部署脚本

```bash
# 运行部署脚本
chmod +x deploy.sh
./deploy.sh
```

### 创建部署包

```bash
# 创建部署包
npm run deploy:package
```

## 生产环境优化

### 1. 反向代理（推荐）

使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端应用
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端API
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端管理界面
    location /admin.html {
        proxy_pass http://localhost:3001/admin.html;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. SSL 证书

使用 Let's Encrypt 获取免费 SSL 证书，启用 HTTPS。

### 3. 数据库配置

如需持久化存储，可配置 MongoDB 或 MySQL 数据库。

## 故障排除

### 常见问题

1. **端口被占用**：
   ```bash
   lsof -i :3000
   kill <进程ID>
   ```

2. **依赖安装失败**：
   ```bash
   npm cache clean --force
   npm install
   ```

3. **环境变量问题**：
   确保 `.env` 文件配置正确，重启服务。

## 监控与维护

- 使用 PM2 监控进程状态：`pm2 status`
- 查看应用日志：`pm2 logs`
- 定期更新依赖：`npm update`

---

**版本**：1.0.0
**更新日期**：2026-01-27