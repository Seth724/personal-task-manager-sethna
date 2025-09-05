'use client'
import Header from '@/components/Header'
import {  CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      <main className="main-wrap">
        <div className="gradient-ring card-neo p-4 md:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl gradient-text">New Task</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Input name="title" placeholder="e.g. Write README" required className="shine-on-hover" />
              <Textarea name="description" placeholder="Optional notes…" className="shine-on-hover" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input name="dueDate" type="date" required className="shine-on-hover" />
                <Select name="priority" defaultValue="MEDIUM">
                  <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="status" defaultValue="TODO">
                  <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">To do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Creating…' : 'Create'}</button>
                <button type="button" onClick={()=>history.back()} className="btn-neutral">Cancel</button>
              </div>

            </form>
          </CardContent>
        </div>
      </main>
    </>
  )
}



