# Project Management Application

A full-stack project management web application built with Next.js, TypeScript, Prisma, and SQLite. The application supports project and task management, role-based access control, team collaboration, and a full audit trail.

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI, shadcn/ui
- **Authentication**: NextAuth.js v5 (credentials + OAuth)
- **Database**: SQLite via Prisma ORM
- **Drag and Drop**: dnd-kit
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand

## Features

- User registration and login with hashed passwords
- Role-based access control (Admin, Manager, User)
- Project creation and management
- Kanban board with drag-and-drop task ordering
- Task priorities: Low, Medium, High, Urgent
- Task statuses: Backlog, To Do, In Progress, Review, Done
- Threaded comments on tasks
- Team member invitations and management
- Audit log tracking all create, update, delete, and assignment actions
- Dark and light theme support

## Database Schema

The main entities are:

| Entity | Description |
|---|---|
| User | Application users with roles |
| Account | OAuth provider accounts |
| Session | Active user sessions |
| Project | Top-level containers for tasks |
| ProjectMember | User membership in a project with role |
| Task | Work items with status, priority, assignee |
| Comment | Threaded comments on tasks |
| AuditLog | Immutable record of all significant actions |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and set DATABASE_URL and AUTH_SECRET

# Apply database migrations
npx prisma migrate dev

# Seed the database with sample data
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite file path, e.g. `file:./dev.db` |
| `AUTH_SECRET` | Random secret for NextAuth.js session encryption |
| `AUTH_GITHUB_ID` | GitHub OAuth App client ID (optional) |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App client secret (optional) |

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  (auth)/             # Login and registration pages
  (dashboard)/        # Protected dashboard pages
  api/                # API route handlers
components/           # Shared UI components
  ui/                 # shadcn/ui base components
  board/              # Kanban board components
features/             # Feature modules (co-located actions, queries, schemas)
  auth/
  projects/
  tasks/
  comments/
  members/
  audit/
hooks/                # Custom React hooks
lib/                  # Utilities, auth config, database client
prisma/               # Prisma schema and seed script
public/               # Static assets
styles/               # Global styles
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed the database |
| `npm run db:drop` | Drop the database |

## Branch Structure

| Branch | Purpose |
|---|---|
| `main` | Stable production-ready code |
| `develop` | Integration branch for completed features |
| `feature/auth` | User authentication and authorization |
| `feature/projects` | Project creation and management |
| `feature/tasks` | Task CRUD and status management |
| `feature/kanban-board` | Drag-and-drop kanban board |
| `feature/comments` | Threaded comments on tasks |
| `feature/members` | Team member invitations and roles |
| `feature/audit-log` | Audit trail logging |
| `feature/ui-components` | Shared UI component library |
| `feature/dark-mode` | Theme switching support |
| `feature/database-schema` | Prisma schema and migrations |
| `staging` | Pre-production testing environment |
| `1version` | Initial working version |
