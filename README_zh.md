# Arcane Club

[English](./README.md) | [简体中文](./README_zh.md)

Arcane Club 是一个基于 **Next.js**、**Express.js** 和 **PostgreSQL** 构建的现代化全栈论坛社区平台。专为可扩展性、高性能和开发者体验而设计。

## 🌟 特性

- **现代化前端**: 基于 Next.js 15+、TailwindCSS 和 Shadcn/UI 构建。
- **稳健的后端**: 使用 TypeScript 编写的 Express.js，采用清晰的分层架构。
- **数据库**: 使用 PostgreSQL 和 Prisma ORM，提供类型安全的数据库访问。
- **身份认证**: 安全的 JWT 认证机制。
- **内容管理**: 支持 Markdown、富文本编辑和图片上传。
- **管理后台**: 完善的用户和内容管理工具。

## 📚 文档

- [API 接口文档](./docs/API_zh.md)

## 🛠 技术栈

### 前端 (`/frontend`)
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS, Shadcn/UI
- **状态/表单**: React Hook Form, Zod
- **HTTP 客户端**: Axios

### 后端 (`/backend`)
- **运行时**: Node.js
- **框架**: Express.js
- **语言**: TypeScript
- **数据库**: PostgreSQL 18
- **ORM**: Prisma
- **验证**: Zod
- **安全**: Helmet, CORS, BCrypt, JWT

## 📂 项目结构

本项目采用 Monorepo 结构组织：

```
.
├── backend/            # Express.js API 服务端
│   ├── src/            # 源代码
│   ├── prisma/         # 数据库 Schema 和迁移文件
│   └── package.json
├── frontend/           # Next.js 客户端应用
│   ├── app/            # App Router 页面
│   ├── components/     # React 组件
│   └── package.json
├── package.json        # 根工作区配置
└── README.md
```

## 🚀 快速开始

### 前置要求
- Node.js (v18 或更高版本)
- PostgreSQL (v15 或更高版本)
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/Arcane-Cloud/arcane-club.git
   cd arcane-club
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**

   **后端**:
   复制 `backend/.env.example` 为 `backend/.env` 并填写数据库连接信息和其他密钥。
   ```bash
   cp backend/.env.example backend/.env
   ```

   **前端**:
   创建 `frontend/.env.local` (如果有示例文件则复制) 并配置 API 地址。
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > frontend/.env.local
   ```

4. **数据库设置**
   ```bash
   # 在后端工作区运行迁移
   npm run db:migrate --workspace=@arcane-club/backend
   # 或者直接在 backend 目录下运行:
   cd backend && npx prisma migrate dev
   ```

5. **填充种子数据 (可选)**
   ```bash
   cd backend && npx prisma db seed
   ```

### 运行项目

你可以在根目录同时启动前端和后端服务：

```bash
npm run dev
```

- **前端**: http://localhost:3000
- **后端**: http://localhost:5000

### 生产环境部署

在生产环境中，建议构建项目并运行优化后的产物。

1. **构建项目**
   ```bash
   npm run build
   ```

2. **数据库迁移**
   确保生产环境数据库已就绪，并执行迁移：
   ```bash
   npm run db:migrate --workspace=@arcane-club/backend
   ```

3. **启动应用**
   ```bash
   npm start
   ```
   *注意：在实际生产环境中，建议分开部署前后端服务（例如后端使用 PM2 托管，前端部署到 Vercel 或使用 Docker 容器）。*

## 🔧 环境变量

### 后端 (`backend/.env`)
| 变量名 | 描述 |
|----------|-------------|
| `PORT` | 服务器端口 (默认: 5000) |
| `DATABASE_URL` | PostgreSQL 连接字符串 |
| `JWT_SECRET` | JWT 签名密钥 |
| `SMTP_HOST` | 邮件服务器主机 |
| `SMTP_USER` | 邮件用户名 |
| `SMTP_PASS` | 邮件密码 |

### 前端 (`frontend/.env.local`)
| 变量名 | 描述 |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址 |

## 🤝 贡献指南

欢迎提交贡献！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request