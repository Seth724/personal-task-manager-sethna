# 🗂️ TaskMaster — Personal Task Manager

A modern, minimal task manager built with  
**Next.js (App Router) · Clerk Auth · Prisma + MongoDB Atlas · shadcn/ui + Tailwind CSS**

---

## 🚀 Features

- 🔐 **Authentication** with Clerk (email / OAuth) and protected routes
- ✅ **Task CRUD**: create, list, edit, delete
- 🏷️ **Status & Priority** filtering
- ⚡ **Fast UX** with server actions & optimized queries
- 🌓 **Dark mode** with `next-themes`
- 📱 **Responsive UI** using shadcn/ui + Tailwind
- 🧩 **Type-safe** codebase with TypeScript & Prisma

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui  
- **Auth**: Clerk  
- **Database**: Prisma ORM + MongoDB Atlas  
- **Tooling**: pnpm, ESLint, Prettier

---

## 📁 Project Structure (high level)


---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and **pnpm**
- **Clerk** account (Publishable + Secret keys)
- **MongoDB Atlas** database (connection string)

### 1) Clone & install
```bash
git clone https://github.com/Seth724/personal-task-manager-sethna.git
cd personal-task-manager-sethna/app
pnpm install

# 2) Env
```bash
cp .env.example .env.local
# then fill in Clerk + DATABASE_URL values

# 3) Prisma
pnpm prisma generate
pnpm prisma db push

# 4) Run
pnpm dev    # http://localhost:3000

---
🧭 How to Use

Visit the site → Sign in with Clerk

Go to Tasks → Add a task (title, description, due date, priority, status)

Edit / Delete tasks in the list

Use filters to view by status/priority

🔌 API Endpoints (simplified)
GET    /api/tasks           # list tasks (supports ?status=todo)
POST   /api/tasks           # create task
PUT    /api/tasks/:id       # update task
DELETE /api/tasks/:id       # delete task


All routes are protected by Clerk middleware.

📸 Screenshots

Replace these with your own images.

<img width="1280" alt="Home" src="YOUR_IMAGE_URL_HERE" /> <img width="1280" alt="Tasks" src="YOUR_IMAGE_URL_HERE" /> <img width="1280" alt="Edit Task" src="YOUR_IMAGE_URL_HERE" />
🚢 Deployment (Vercel)

Push to GitHub (merge to main)

Go to Vercel → New Project → Import your repo

Framework auto-detect: Next.js

Add Environment Variables (same as .env.local)

Deploy — you’ll get https://your-app.vercel.app

🧪 Useful Scripts
pnpm dev       # run locally
pnpm build     # production build
pnpm start     # run production server
pnpm lint      # lint
