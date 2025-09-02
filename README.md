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

```
/app
  /(auth)            # sign-in / sign-up routes
  /tasks             # tasks pages & server actions
  api/tasks          # RESTful Task API routes
/components          # shared UI components (Header, Footer, etc.)
/lib
  prisma.ts          # Prisma client
/prisma
  schema.prisma      # Prisma models
public               # static assets (video, icons, etc.)
```

---

## 🔐 Environment Variables

Create `.env.local` in the project root and add:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# MongoDB (Prisma)
DATABASE_URL="mongodb+srv://personal-task-manager-sethna:sethna2002@cluster0.35co99s.mongodb.net/personal-task-manager-sethna?retryWrites=true&w=majority&appName=Cluster0"


```

---

## 🧰 Quick Start

**Prereqs:** Node.js 18+ and **pnpm**, a **Clerk** project, and a **MongoDB Atlas** database.

```bash
# 1) Clone & install
git clone https://github.com/Seth724/personal-task-manager-sethna.git
cd personal-task-manager-sethna
pnpm install

# 2) Env
cp .env.example .env.local
# then fill in Clerk + DATABASE_URL values

# 3) Prisma
pnpm prisma generate
pnpm prisma db push

# 4) Run
pnpm dev    # http://localhost:3000
```

---

## 🧭 How to Use

1. Visit the site → **Sign in** with Clerk  
2. Go to **Tasks** → Add a task (title, description, due date, priority, status)  
3. **Edit / Delete** tasks in the list  
4. Use **filters** to view by status/priority  

---

## 🔌 API Endpoints (simplified)

```
GET    /api/tasks           # list tasks (supports ?status=todo)
POST   /api/tasks           # create task
PUT    /api/tasks/:id       # update task
DELETE /api/tasks/:id       # delete task
```

_All routes are protected by Clerk middleware._

---

## 📸 Screenshots


<img width="1919" height="862" alt="Screenshot 2025-09-03 014149" src="https://github.com/user-attachments/assets/d8b747fd-8102-4977-a705-3836136e3af6" />
<img width="1919" height="868" alt="Screenshot 2025-09-03 014128" src="https://github.com/user-attachments/assets/a53c1af0-4ca1-446a-a481-9bc22db76254" />
<img width="1919" height="869" alt="Screenshot 2025-09-03 014348" src="https://github.com/user-attachments/assets/7782cc1f-d5b8-49f8-b97b-3022fa237d91" />
<img width="616" height="867" alt="Screenshot 2025-09-03 014446" src="https://github.com/user-attachments/assets/78e18749-d2ce-4b37-a396-2f17b8ed82f6" />


---

## 🚢 Deployment (Vercel)

1. **Push to GitHub** (merge to `main`)  
2. Go to **Vercel → New Project → Import** the repo  
3. Framework auto-detect: **Next.js**  
4. Add **Environment Variables** (same as `.env.local`)  
5. **Deploy** — We’ll get `https://your-app.vercel.app`

---

## 🧪 Useful Scripts

```bash
pnpm dev       # run locally
pnpm build     # production build
pnpm start     # run production server
pnpm lint      # lint
```

---


## 📜 License

MIT — feel free to use, modify, and share.

---

## 🙌 Acknowledgements

- Clerk, Prisma, MongoDB Atlas, shadcn/ui, Tailwind, Next.js

