// app/app/tasks/page.tsx
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import DeleteTaskButton from '@/components/DeleteTaskButton'
import { requireUser } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Tasks({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; priority?: string }>
}) {
  // ✅ Ensure user is signed in (avoid throwing inside requireUser)
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const sp = await searchParams
  const user = await requireUser()

  const where: any = { userId: user.id }
  if (sp.status && sp.status !== 'ALL') where.status = sp.status as any
  if (sp.priority && sp.priority !== 'ALL') where.priority = sp.priority as any

  const tasks = await prisma.task.findMany({
    where,
    orderBy: [{ dueDate: 'asc' }, { priority: 'desc' }],
    select: { id: true, title: true, status: true, priority: true, dueDate: true, description: true },
  })

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <Button asChild><Link href="/tasks/new">+ New Task</Link></Button>
          </CardHeader>
          <CardContent className="flex gap-2">
            <form className="flex gap-2">
              <input type="hidden" name="q" value="1" />
              <Select name="status" defaultValue={sp.status ?? ''}>
                <SelectTrigger className="w-40"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="TODO">To do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select name="priority" defaultValue={sp.priority ?? ''}>
                <SelectTrigger className="w-40"><SelectValue placeholder="All Priorities" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Priorities</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" variant="secondary">Filter</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {tasks?.length ? tasks.map((t: any) => (
            <Card key={t.id}>
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Status: {t.status} · Priority: {t.priority} · Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline"><Link href={`/tasks/${t.id}/edit`}>Edit</Link></Button>
                  <DeleteTaskButton id={t.id} />
                </div>
              </CardContent>
            </Card>
          )) : <Card><CardContent className="py-6">No tasks yet.</CardContent></Card>}
        </div>
      </main>
    </>
  )
}
