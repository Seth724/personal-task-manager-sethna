'use client'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditTask() {
  const router = useRouter()
  const params = useParams() as { id: string }
  const [task, setTask] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/tasks', { cache: 'no-store' })
      const data = await res.json()
      setTask(data.tasks.find((t: any) => t.id === params.id))
    })()
  }, [params.id])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = Object.fromEntries(fd.entries())
    await fetch(`/api/tasks/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    router.push('/tasks')
  }

  if (!task) return <div className="p-6">Loading…</div>

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader><CardTitle>Edit Task</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Input name="title" defaultValue={task.title} required />
              <Textarea name="description" defaultValue={task.description ?? ''} />
              <Input name="dueDate" type="date" defaultValue={task.dueDate ? task.dueDate.slice(0,10) : ''} />
              <Select name="priority" defaultValue={task.priority}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select name="status" defaultValue={task.status}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={()=>history.back()}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
