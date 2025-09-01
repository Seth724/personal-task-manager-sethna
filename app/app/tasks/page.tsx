
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


  const statusBadge = (s: string) =>
  s === 'DONE' ? 'badge badge-green'
  : s === 'IN_PROGRESS' ? 'badge badge-amber'
  : 'badge badge-rose';        // TODO → rose/pink

  const priorityBadge = (p: string) =>
  p === 'HIGH' ? 'badge badge-rose'
  : p === 'MEDIUM' ? 'badge badge-amber'
  : 'badge badge-green';       // LOW → green

  return (
    <>
      <Header />
      <main className="main-wrap space-y-5">
        <div className="gradient-ring card-neo p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Button asChild className="btn-primary"><Link href="/tasks/new">+ New Task</Link></Button>

          </div>

          <div className="mt-4">
            <form className="toolbar">
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
              <Button type="submit" variant="secondary" className="btn-neutral">Filter</Button>

            </form>
          </div>
        </div>

        <div className="grid gap-4">
          {tasks?.length ? tasks.map((t: any) => (
            <div key={t.id} className="gradient-ring">
              <Card className="card-neo hover:shadow-lg transition-all duration-150">
                <CardContent className="py-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{t.title}</div>
                    <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
                        <span className={statusBadge(t.status)}>Status: {t.status.replace('_',' ')}</span>
                        <span className={priorityBadge(t.priority)}>Priority: {t.priority}</span>
                        <span className="badge">Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}</span>
                    </div>

                    {t.description && (
                      <p className="mt-2 line-clamp-2 text-muted-foreground">{t.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button asChild className="btn-outline-gradient">
                      <Link href={`/tasks/${t.id}/edit`} className="btn-outline-gradient h-9 px-4">Edit</Link>
                    </Button>
                    <DeleteTaskButton id={t.id} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )) : (
            <Card className="card-neo"><CardContent className="py-8 text-center">No tasks yet.</CardContent></Card>
          )}
        </div>
      </main>
    </>
  )
}
