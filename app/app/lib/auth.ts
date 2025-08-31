import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/app/lib/prisma'

export async function requireUser() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  // Get a reliable email (may be null)
  const cu = await currentUser()
  const emailRaw =
    cu?.primaryEmailAddress?.emailAddress ??
    cu?.emailAddresses?.[0]?.emailAddress ??
    null
  const email = emailRaw?.toLowerCase() ?? null // normalize just in case

  // 1) If already linked by clerkId, keep email in sync
  const byClerk = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (byClerk) {
    if (email && byClerk.email !== email) {
      return prisma.user.update({
        where: { id: byClerk.id },
        data: { email },
      })
    }
    return byClerk
  }

  // 2) If we have an email, upsert by email to avoid duplicates/races
  if (email) {
    return prisma.user.upsert({
      where: { email },
      update: { clerkId: userId, email },
      create: { clerkId: userId, email },
    })
  }

  // 3) No email (allowed because email is optional) — upsert by clerkId
  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId, email: null },
  })
}
