// import { NextResponse } from 'next/server'
// import { auth } from '@clerk/nextjs/server'
// import { prisma } from '@/app/lib/prisma'
// import { requireUser } from '@/app/lib/auth'

// export async function GET(req: Request) {
//   const { userId } = await auth()
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const user = await requireUser()
//   const { searchParams } = new URL(req.url)
//   const status = searchParams.get('status') ?? undefined
//   const priority = searchParams.get('priority') ?? undefined

//   const tasks = await prisma.task.findMany({
//     where: {
//       userId: user.id,
//       ...(status ? { status: status as any } : {}),
//       ...(priority ? { priority: priority as any } : {}),
//     },
//     orderBy: [{ dueDate: 'asc' }, { priority: 'desc' }],
//     select: { id: true, title: true, status: true, priority: true, dueDate: true, description: true },
//   })

//   return NextResponse.json({ tasks })
// }

// export async function POST(req: Request) {
//   const { userId } = await auth()
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const user = await requireUser()
//   const body = await req.json()
//   if (!body.title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 })

//   const created = await prisma.task.create({
//     data: {
//       userId: user.id,
//       title: body.title.trim(),
//       description: body.description ?? null,
//       dueDate: body.dueDate ? new Date(body.dueDate) : null,
//       priority: body.priority ?? 'MEDIUM',
//       status: body.status ?? 'TODO',
//     },
//   })

//   return NextResponse.json({ task: created }, { status: 201 })
// }

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/app/lib/prisma'
import { requireUser } from '@/app/lib/auth'

// PUT /api/tasks/[id]
export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const { id } = await ctx.params

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
export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await requireUser()
  const { id } = await ctx.params

  const owns = await prisma.task.findFirst({ where: { id, userId: user.id } })
  if (!owns) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
