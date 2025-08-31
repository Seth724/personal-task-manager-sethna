// app/api/tasks/[id]/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/app/lib/prisma'
import { requireUser } from '@/app/lib/auth'

// GET /api/tasks/[id]
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const { id } = await ctx.params   // <-- await it

  const task = await prisma.task.findFirst({
    where: { id, userId: user.id },
    select: {
      id: true, title: true, description: true,
      status: true, priority: true, dueDate: true,
      createdAt: true, updatedAt: true,
    },
  })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ task })
}

// PUT /api/tasks/[id]
export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const { id } = await ctx.params   // <-- await it

  const owns = await prisma.task.findFirst({ where: { id, userId: user.id } })
  if (!owns) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const data = await req.json()
  const updated = await prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description ?? null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      priority: data.priority,
      status: data.status,
    },
  })
  return NextResponse.json({ task: updated })
}

// DELETE /api/tasks/[id]
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const { id } = await ctx.params   // <-- await it

  const owns = await prisma.task.findFirst({ where: { id, userId: user.id } })
  if (!owns) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
