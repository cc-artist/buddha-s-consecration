# 赛博佛祖 Web 应用部署计划

## 项目概述

- **前端**：Next.js 16.0.1 应用（端口 3000）
- **后端**：Express.js 应用（端口 3001）
- **管理界面**：`backend/admin.html`（后端内置）

## 一、云服务器准备

### 1. 服务器选型
- **推荐配置**：2核4G内存，50G磁盘空间
- **操作系统**：Ubuntu 20.04 LTS 或 CentOS 8+
- **网络**：公网IP，安全组开放 3000、3001 端口

### 2. 环境安装

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 Git
sudo apt install -y git

# 安装 PM2 进程管理器
npm install -g pm2

# 安装 Nginx（可选，用于反向代理）
sudo apt install -y nginx
```

## 二、项目部署

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

# 构建前端
npm run build

# 安装后端依赖
cd ../backend
npm install
```

### 3. 环境配置

#### 前端环境变量 (`cyber-buddha-blessing/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://<服务器IP>:3001/api/v1
NEXT_PUBLIC_APP_ENV=production
```

#### 后端环境变量 (`backend/.env`)

```env
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=http://<服务器IP>:3000,http://localhost:3000
SESSION_SECRET=your-secure-secret-key
API_PREFIX=/api/v1
```

### 4. 启动服务

#### 直接启动（开发环境）

```bash
# 启动后端
cd backend
npm start

# 启动前端
cd ../cyber-buddha-blessing
npm start
```

#### 使用 PM2 管理进程（生产环境推荐）

```bash
# 全局安装 PM2
npm install -g pm2

# 启动后端
cd backend
npm start

# 启动前端
cd ../cyber-buddha-blessing
npm start

# 查看服务状态
pm2 status
```

## 三、后端管理界面访问

### 1. 直接访问
- **地址**：`http://<服务器IP>:3001/admin.html`
- **登录凭据**：
  - 用户名：`admin`
  - 密码：`admin123`

### 2. 域名访问（推荐）

#### 配置 Nginx 反向代理

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

    # 后端管理界面
    location /admin {
        proxy_pass http://localhost:3001;
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
}
```

#### 访问链接
- **前端**：`http://your-domain.com`
- **后端管理**：`http://your-domain.com/admin/admin.html`
- **API**：`http://your-domain.com/api/v1`

### 3. HTTPS 配置（生产环境推荐）

#### 安装 Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### 获取 SSL 证书

```bash
sudo certbot --nginx -d your-domain.com
```

#### 自动更新证书

```bash
sudo systemctl enable certbot.timer
```

#### HTTPS 访问链接
- **前端**：`https://your-domain.com`
- **后端管理**：`https://your-domain.com/admin/admin.html`
- **API**：`https://your-domain.com/api/v1`

## 四、后端管理界面使用指南

### 1. 登录流程
1. 访问管理界面地址
2. 输入管理员凭据（默认：admin/admin123）
3. 点击「登录」按钮
4. 成功登录后进入管理界面

### 2. 核心功能

#### 服务状态监控
- 实时显示后端服务运行状态
- 统计寺庙数量、咨询预约数、支付订单数

#### 寺庙管理
- **获取寺庙列表**：查看所有寺庙信息
- **查询单个寺庙**：根据ID查询特定寺庙
- **初始化寺庙数据**：重置寺庙数据为默认值

#### 咨询预约管理
- **查看预约列表**：管理所有咨询预约
- **查询预约详情**：根据ID查看单个预约
- **创建新预约**：手动添加咨询预约

#### 支付订单管理
- **查看订单列表**：管理所有支付订单
- **查询订单详情**：根据ID查看单个订单
- **创建新订单**：手动创建支付订单

#### 跨境支付管理
- **获取支付平台**：查看可用的跨境支付平台
- **初始化跨境支付**：创建国际支付订单

### 3. 安全配置

#### 修改默认密码
1. 编辑 `backend/src/config/mockData.js` 文件
2. 修改管理员凭据
3. 重启后端服务

#### IP 访问限制

在 Nginx 配置中添加 IP 白名单：

```nginx
location /admin {
    allow 192.168.1.0/24;  # 允许的IP范围
    deny all;  # 拒绝其他所有IP
    
    proxy_pass http://localhost:3001;
    # 其他代理配置...
}
```

## 五、服务管理

### 1. 常用命令

```bash
# 查看服务状态
pm2 status

# 查看服务日志
pm2 logs

# 重启服务
pm2 restart all

# 停止服务
pm2 stop all

# 查看服务监控
pm2 monit
```

### 2. 服务自启动

```bash
# 生成启动脚本
pm2 save

# 设置系统自启动
pm2 startup
```

## 六、故障排除

### 1. 常见问题

#### 服务无法启动
- 检查端口是否被占用：`lsof -i :3000` 和 `lsof -i :3001`
- 检查依赖是否安装完整：`npm install`
- 检查环境变量配置：`cat .env`

#### 管理界面无法访问
- 检查后端服务是否运行：`pm2 status backend`
- 检查防火墙是否开放端口：`sudo ufw status`
- 检查 Nginx 配置是否正确：`sudo nginx -t`

#### 登录失败
- 检查管理员凭据是否正确
- 检查后端服务日志：`pm2 logs backend`
- 检查会话配置是否正确

### 2. 日志查看

```bash
# 前端日志
pm2 logs frontend

# 后端日志
pm2 logs backend

# Nginx 日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 七、性能优化

### 1. 前端优化
- 启用 Gzip 压缩
- 配置浏览器缓存
- 使用 CDN 加速静态资源

### 2. 后端优化
- 配置 Express 中间件压缩
- 启用 HTTP 缓存
- 优化数据库查询

### 3. 服务器优化
- 配置 swap 空间（内存不足时）
- 调整系统参数
- 启用防火墙

## 八、访问链接汇总

| 服务 | 直接访问 | 域名访问 | HTTPS访问 |
|------|----------|----------|-----------|
| 前端应用 | `http://<服务器IP>:3000` | `http://your-domain.com` | `https://your-domain.com` |
| 后端管理 | `http://<服务器IP>:3001/admin.html` | `http://your-domain.com/admin/admin.html` | `https://your-domain.com/admin/admin.html` |
| 后端API | `http://<服务器IP>:3001/api/v1` | `http://your-domain.com/api/v1` | `https://your-domain.com/api/v1` |
| 健康检查 | `http://<服务器IP>:3001/health` | `http://your-domain.com/admin/health` | `https://your-domain.com/admin/health` |

## 九、部署验证

### 部署完成后验证步骤

1. **前端访问**：打开 `http://<服务器IP>:3000` 确认前端正常加载
2. **后端健康检查**：访问 `http://<服务器IP>:3001/health` 确认后端服务运行正常
3. **管理界面登录**：访问 `http://<服务器IP>:3001/admin.html` 并登录
4. **功能验证**：在管理界面中测试各功能模块
5. **API 测试**：测试核心 API 端点是否正常响应

### 验证命令

```bash
# 测试前端
curl -I http://<服务器IP>:3000

# 测试后端健康检查
curl http://<服务器IP>:3001/health

# 测试 API 端点
curl http://<服务器IP>:3001/api/v1/temples
```

## 十、版本管理

### 部署版本记录
- **前端版本**：Next.js 16.0.1
- **后端版本**：Express.js 最新稳定版
- **管理界面版本**：v1.0.0

### 升级流程
1. 拉取最新代码：`git pull origin main`
2. 更新依赖：`npm install`
3. 重新构建：`npm run build`
4. 重启服务：`pm2 restart all`

---

**部署完成后，您可以通过以下链接访问后端管理界面：**
- **默认地址**：`http://<服务器IP>:3001/admin.html`
- **登录凭据**：admin/admin123（建议生产环境修改）

**如有任何部署问题，请参考本计划文档的故障排除部分或联系技术支持。**