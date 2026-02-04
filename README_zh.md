# Arcane Club (中文文档)

这是一个基于 **Express.js**、**Next.js** 和 **PostgreSQL** 构建的现代化全栈社区论坛应用。

Arcane Club 提供了一个强大的在线社区平台，包含用户认证、丰富的内容管理、实时互动以及功能全面的管理后台。

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0-blue.svg)

## ✨ 主要功能

- **🔐 用户认证系统**
  - 安全的登录与注册（包含滑动验证码保护）。
  - 基于 JWT 的会话管理。
  - 个性化用户主页和头像上传。
  - 集成 "Bing 每日一图" 作为精美的认证页面背景。

- **📝 内容管理**
  - 发帖、编辑和删除帖子。
  - 支持富文本/Markdown 编辑。
  - 评论系统（支持楼中楼）。
  - 结构化的版块（Boards）和分类（Categories）管理。

- **🛡️ 管理员后台**
  - **仪表盘统计**: 系统活跃度概览。
  - **用户管理**: 管理用户账号及角色（普通用户/版主/管理员）。
  - **内容审核**: 管理帖子、评论及违禁词过滤。
  - **系统设置**: 动态配置网站名称、描述、Logo 以及导航栏菜单。
  - **CMS 页面**: 内置 Markdown 编辑器，可创建自定义静态页面（如关于我们、服务条款）。

- **🎨 现代 UI/UX**
  - 基于 **Next.js 16** (App Router) 和 **React 19** 构建。
  - 使用 **Tailwind CSS** 进行样式设计。
  - 采用 **Shadcn UI** (Radix UI) 组件库。
  - 完全响应式设计，适配移动端与桌面端。

## 🛠️ 技术栈

### 后端 (Backend)
- **运行环境**: Node.js
- **框架**: Express.js
- **语言**: TypeScript
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **安全**: Helmet, BCrypt, JWT
- **图片处理**: Jimp

### 前端 (Frontend)
- **框架**: Next.js 16
- **库**: React 19
- **样式**: Tailwind CSS
- **UI 组件**: Shadcn UI / Radix UI
- **表单**: React Hook Form, Zod
- **网络请求**: Axios

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) (v18 或更高版本)
- [PostgreSQL](https://www.postgresql.org/) (v14 或更高版本)
- [npm](https://www.npmjs.com/)

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/arcane-club/arcaneclub.git
   cd arcane-club
   ```

2. **安装后端依赖**
   ```bash
   npm install
   ```

3. **安装前端依赖**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **数据库设置**
   - 创建一个 PostgreSQL 数据库 (例如 `arcane_club`)。
   - 配置环境变量 (参考下方说明)。
   - 同步数据库结构：
     ```bash
     npx prisma db push
     # 或者
     npx prisma migrate dev
     ```
   - (可选) 填充初始数据：
     ```bash
     npx prisma db seed
     ```

### 配置说明

在项目根目录创建 `.env` 文件（参考 `.env.example`）：

```env
# Server
PORT=3000
BACKEND_PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/arcane_club?schema=public"

# Auth
JWT_SECRET="your-super-secret-key"

# Uploads
UPLOAD_DIR="public/uploads"
```

### 启动项目

1. **启动后端服务器**
   ```bash
   npm run dev
   ```
   后端将在 `http://localhost:5000` 运行。

2. **启动前端开发服务器** (新建一个终端窗口)
   ```bash
   cd frontend
   npm run dev
   ```
   前端将在 `http://localhost:3000` 运行。

## 📄 许可证

本项目采用 MIT 许可证。
