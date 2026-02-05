# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)

| Method | Endpoint | Description | Body Parameters |
|:-------|:---------|:------------|:----------------|
| POST | `/send-code` | Send verification code to email | `{ "email": "user@example.com", "type": "REGISTER" }` |
| POST | `/register` | Register a new user | `{ "email": "...", "code": "...", "password": "..." }` |
| POST | `/login` | Login user | `{ "email": "...", "password": "..." }` |

## Users (`/users`)

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| GET | `/profile/me` | Get current user profile | Yes |
| PUT | `/profile/me` | Update profile (supports multipart/form-data for `avatar`, `backgroundImage`) | Yes |
| POST | `/deploy` | Deploy custom HTML page (multipart/form-data `htmlFile`) | Yes |
| GET | `/:identifier/profile` | Get public user profile (by ID or Username) | No |
| GET | `/:id/likes` | Get posts liked by user | No |
| GET | `/:id/favorites` | Get posts favorited by user | No |

## Content (`/`)

### Posts & Comments
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| GET | `/posts` | Get posts list (Query: `page`, `limit`, `sort`, `boardId`) | No |
| GET | `/posts/:id` | Get post detail | Optional |
| POST | `/posts` | Create a new post | Yes |
| GET | `/posts/:postId/comments` | Get comments for a post | No |
| POST | `/posts/:postId/comments` | Add a comment | Yes |
| POST | `/posts/:id/report` | Report a post | Yes |

### Interactions
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| POST | `/posts/:postId/like` | Toggle like on a post | Yes |
| POST | `/posts/:postId/favorite` | Toggle favorite on a post | Yes |

### General
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/categories` | Get all categories and boards |
| GET | `/sidebar` | Get sidebar data (hot posts, etc.) |

## Admin (`/admin`)
*Requires Admin Role*

- `GET /stats`: Dashboard statistics
- `GET /users`: Manage users
- `GET /posts`: Manage posts
- `POST /boards`: Create boards
- ... (See `adminRoutes.ts` for full list)
