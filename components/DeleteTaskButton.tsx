

"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

export default function DeleteTaskButton({ id }: { id: string }) {
  async function onDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!confirm("Delete task?")) return
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    window.location.reload()
  }

  return (
    <form onSubmit={onDelete}>
      <Button type="submit" className="btn-danger">
        Delete
      </Button>
    </form>
  )
}
