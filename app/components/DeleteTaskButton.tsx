'use client'

import { Button } from '@/components/ui/button'

export default function DeleteTaskButton({ id }: { id: string }) {
  async function onDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!confirm('Delete task?')) return
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    // simple refresh to re-fetch server data
    window.location.reload()
  }

  return (
    <form onSubmit={onDelete}>
      <Button type="submit" variant="destructive">Delete</Button>
    </form>
  )
}
