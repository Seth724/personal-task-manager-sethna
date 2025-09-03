// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter, useParams } from 'next/navigation'
// import Header from '@/components/Header'
// import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

// type Task = {
//   id: string
//   title: string
//   description?: string | null
//   dueDate?: string | null
//   priority: 'HIGH' | 'MEDIUM' | 'LOW'
//   status: 'TODO' | 'IN_PROGRESS' | 'DONE'
// }

// export default function EditTask() {
//   const router = useRouter()
//   const params = useParams() as { id: string }
//   const [task, setTask] = useState<Task | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     (async () => {
//       setLoading(true)
//       setError(null)
//       const res = await fetch(`/api/tasks/${params.id}`, { cache: 'no-store' })
//       if (!res.ok) {
//         const text = await res.text().catch(() => '')
//         setError(`Failed to load task (${res.status}): ${text || 'No body'}`)
//         setLoading(false)
//         return
//       }
//       const data = await res.json()
//       setTask(data.task)
//       setLoading(false)
//     })()
//   }, [params.id])

//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const fd = new FormData(e.currentTarget)
//     const body = Object.fromEntries(fd.entries())
//     const res = await fetch(`/api/tasks/${params.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     })
//     if (!res.ok) {
//       const text = await res.text().catch(() => '')
//       alert(`Update failed (${res.status}): ${text}`)
//       return
//     }
//     router.push('/tasks')
//   }

//   if (loading) return <div className="main-wrap">Loading…</div>
//   if (error) return <div className="main-wrap text-rose-600">{error}</div>
//   if (!task) return <div className="main-wrap">Task not found.</div>

//   return (
//     <>
//       <Header />
//       <main className="main-wrap">
//         <div className="gradient-ring card-neo p-4 md:p-6">
//           <CardHeader className="px-0 pt-0">
//             <CardTitle className="gradient-text">Edit Task</CardTitle>
//           </CardHeader>
//           <CardContent className="px-0">
//             <form className="grid gap-3" onSubmit={onSubmit}>
//               <Input name="title" defaultValue={task.title} required className="shine-on-hover" />
//               <Textarea name="description" defaultValue={task.description ?? ''} className="shine-on-hover" />
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 <Input
//                   name="dueDate"
//                   type="date"
//                   required
//                   defaultValue={task.dueDate ? task.dueDate.slice(0, 10) : ''}
//                   className="shine-on-hover"
//                 />
//                 <Select name="priority" defaultValue={task.priority}>
//                   <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Priority" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="HIGH">High</SelectItem>
//                     <SelectItem value="MEDIUM">Medium</SelectItem>
//                     <SelectItem value="LOW">Low</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select name="status" defaultValue={task.status}>
//                   <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="TODO">To do</SelectItem>
//                     <SelectItem value="IN_PROGRESS">In progress</SelectItem>
//                     <SelectItem value="DONE">Done</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex gap-2 pt-2">
//                 <button type="submit" disabled={loading} className="btn-primary">
//                   {loading ? 'Saving…' : 'Save'}
//                 </button>
//                 <button type="button" onClick={() => history.back()} className="btn-neutral">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </div>
//       </main>
//     </>
//   )
// }


'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

type Task = {
  id: string
  title: string
  description?: string | null
  dueDate?: string | null
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

export default function EditTask() {
  const router = useRouter()
  const params = useParams() as { id: string }

  // Split loading states: one for initial fetch, one for saving.
  const [task, setTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    (async () => {
      setIsPageLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/tasks/${params.id}`, { cache: 'no-store' })
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`Failed to load task (${res.status}): ${text || 'No body'}`)
        }
        const data = await res.json()
        setTask(data.task)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error while loading task')
        }
      } finally {
        setIsPageLoading(false)
      }
    })()
  }, [params.id])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)
    try {
      const fd = new FormData(e.currentTarget)
      const body = Object.fromEntries(fd.entries())

      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Update failed (${res.status}): ${text}`)
      }

      router.push('/tasks')
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('Update failed')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isPageLoading) return <div className="main-wrap">Loading…</div>
  if (error) return <div className="main-wrap text-rose-600">{error}</div>
  if (!task) return <div className="main-wrap">Task not found.</div>

  return (
    <>
      <Header />
      <main className="main-wrap">
        <div className="gradient-ring card-neo p-4 md:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="gradient-text">Edit Task</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Input name="title" defaultValue={task.title} required className="shine-on-hover" />
              <Textarea name="description" defaultValue={task.description ?? ''} className="shine-on-hover" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  name="dueDate"
                  type="date"
                  required
                  defaultValue={task.dueDate ? task.dueDate.slice(0, 10) : ''}
                  className="shine-on-hover"
                />
                <Select name="priority" defaultValue={task.priority}>
                  <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="status" defaultValue={task.status}>
                  <SelectTrigger className="shine-on-hover"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">To do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={isSaving} className="btn-primary">
                  {isSaving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={() => history.back()} className="btn-neutral">
                  Cancel
                </button>
              </div>
            </form>
          </CardContent>
        </div>
      </main>
    </>
  )
}

