'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DeleteTaskButton from './DeleteTaskButton'

export default function TaskCard({ task }: { task: any }) {
  return (
    <Card className="card-elevated">
      <CardContent className="py-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="font-semibold truncate text-base">{task.title}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="mr-2">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</span>
            <Badge variant="secondary" className="mr-2">{task.status}</Badge>
            <Badge>{task.priority}</Badge>
          </div>
          {task.description ? (
            <p className="mt-2 text-sm line-clamp-2 text-slate-600">{task.description}</p>
          ) : null}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
          </Button>
          <DeleteTaskButton id={task.id} />
        </div>
      </CardContent>
    </Card>
  )
}
