import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function requireUser() {
  const { userId, sessionClaims } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const email =
    (Array.isArray((sessionClaims as any)?.email)
      ? (sessionClaims as any)?.email?.[0]
      : ((sessionClaims as any)?.email as string)) || ''

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId, email },
  })
}
