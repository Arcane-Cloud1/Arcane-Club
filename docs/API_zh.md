# API 文档

基础 URL: `http://localhost:5000/api`

## 认证 (`/auth`)

| 方法 | 接口路径 | 描述 | 请求体参数 |
|:-------|:---------|:------------|:----------------|
| POST | `/send-code` | 发送邮箱验证码 | `{ "email": "user@example.com", "type": "REGISTER" }` |
| POST | `/register` | 注册新用户 | `{ "email": "...", "code": "...", "password": "..." }` |
| POST | `/login` | 用户登录 | `{ "email": "...", "password": "..." }` |

## 用户 (`/users`)

| 方法 | 接口路径 | 描述 | 需要认证 |
|:-------|:---------|:------------|:-----|
| GET | `/profile/me` | 获取当前用户个人资料 | 是 |
| PUT | `/profile/me` | 更新资料 (支持 `avatar`, `backgroundImage` 文件上传) | 是 |
| POST | `/deploy` | 部署自定义 HTML 页面 (上传 `htmlFile`) | 是 |
| GET | `/:identifier/profile` | 获取公开用户信息 (通过 ID 或用户名) | 否 |
| GET | `/:id/likes` | 获取用户点赞的帖子 | 否 |
| GET | `/:id/favorites` | 获取用户收藏的帖子 | 否 |

## 内容 (`/`)

### 帖子与评论
| 方法 | 接口路径 | 描述 | 需要认证 |
|:-------|:---------|:------------|:-----|
| GET | `/posts` | 获取帖子列表 (参数: `page`, `limit`, `sort`, `boardId`) | 否 |
| GET | `/posts/:id` | 获取帖子详情 | 可选 |
| POST | `/posts` | 发布新帖子 | 是 |
| GET | `/posts/:postId/comments` | 获取帖子评论 | 否 |
| POST | `/posts/:postId/comments` | 发表评论 | 是 |
| POST | `/posts/:id/report` | 举报帖子 | 是 |

### 互动
| 方法 | 接口路径 | 描述 | 需要认证 |
|:-------|:---------|:------------|:-----|
| POST | `/posts/:postId/like` | 点赞/取消点赞 | 是 |
| POST | `/posts/:postId/favorite` | 收藏/取消收藏 | 是 |

### 通用
| 方法 | 接口路径 | 描述 |
|:-------|:---------|:------------|
| GET | `/categories` | 获取所有分类和板块 |
| GET | `/sidebar` | 获取侧边栏数据 (热门帖子等) |

## 管理员 (`/admin`)
*需要管理员权限*

- `GET /stats`: 仪表盘统计
- `GET /users`: 用户管理
- `GET /posts`: 帖子管理
- `POST /boards`: 创建板块
- ... (完整列表见 `adminRoutes.ts`)
