

// app/api/tasks/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/app/lib/prisma'
import { requireUser } from '@/app/lib/auth'

// GET /api/tasks (list)
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ tasks })
}

// POST /api/tasks (create)
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const data = await req.json()

  const created = await prisma.task.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description ?? null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      priority: data.priority ?? 'MEDIUM',
      status: data.status ?? 'TODO',
    },
  })
  return NextResponse.json({ task: created }, { status: 201 })
}







