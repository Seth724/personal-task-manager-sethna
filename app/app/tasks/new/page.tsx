'use client'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function NewTask() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const body = Object.fromEntries(fd.entries())
    await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    router.push('/tasks')
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader><CardTitle>New Task</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Input name="title" placeholder="Title" required />
              <Textarea name="description" placeholder="Description" />
              <Input name="dueDate" type="date" />
              <Select name="priority" defaultValue="MEDIUM">
                <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select name="status" defaultValue="TODO">
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>Create</Button>
                <Button type="button" variant="outline" onClick={()=>history.back()}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
