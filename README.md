# Arcane Club

[English](./README.md) | [简体中文](./README_zh.md)

Arcane Club is a modern, full-stack forum and community platform built with **Next.js**, **Express.js**, and **PostgreSQL**. Ideally designed for scalability, performance, and developer experience.

## 🌟 Features

- **Modern Frontend**: Built with Next.js 15+, TailwindCSS, and Shadcn/UI.
- **Robust Backend**: Express.js with TypeScript, following a clean Layered Architecture.
- **Database**: PostgreSQL with Prisma ORM for type-safe database access.
- **Authentication**: Secure JWT-based authentication.
- **Content Management**: Markdown support, rich text editing, and image uploads.
- **Admin Dashboard**: Comprehensive admin tools for user and content management.

## 📚 Documentation

- [API Documentation](./docs/API.md)

## 🛠 Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Shadcn/UI
- **State/Form**: React Hook Form, Zod
- **HTTP Client**: Axios

### Backend (`/backend`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 18
- **ORM**: Prisma
- **Validation**: Zod
- **Security**: Helmet, CORS, BCrypt, JWT

## 📂 Project Structure

This project is organized as a monorepo:

```
.
├── backend/            # Express.js API Server
│   ├── src/            # Source code
│   ├── prisma/         # Database schema and migrations
│   └── package.json
├── frontend/           # Next.js Client Application
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   └── package.json
├── package.json        # Root workspace configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arcane-Cloud/arcane-club.git
   cd arcane-club
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   **Backend**:
   Copy `backend/.env.example` to `backend/.env` and fill in your database credentials and secrets.
   ```bash
   cp backend/.env.example backend/.env
   ```

   **Frontend**:
   Create `frontend/.env.local` (or copy example if available) and configure the API URL.
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > frontend/.env.local
   ```

4. **Database Setup**
   ```bash
   # Navigate to backend to run migrations
   npm run db:migrate --workspace=@arcane-club/backend
   # Or using the root script if configured, or directly:
   cd backend && npx prisma migrate dev
   ```

5. **Seed Database (Optional)**
   ```bash
   cd backend && npx prisma db seed
   ```

### Running the Project

You can run both frontend and backend concurrently from the root:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### Production Deployment

For production environments, it is recommended to build the project and run it using the optimized artifacts.

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Database Migration**
   Ensure your production database is ready and run migrations:
   ```bash
   npm run db:migrate --workspace=@arcane-club/backend
   ```

3. **Start the application**
   ```bash
   npm start
   ```
   *Note: In a real-world production setup, you might want to run backend and frontend services separately (e.g., using PM2 for backend and Vercel/Docker for frontend).*

## 🔧 Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `SMTP_HOST` | Email server host |
| `SMTP_USER` | Email user |
| `SMTP_PASS` | Email password |

### Frontend (`frontend/.env.local`)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL of the backend API |

## 🤝 Contributing

Contributions are welcome! Please read our [Contribution Guidelines](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
