// import { auth } from '@clerk/nextjs/server'
// import { prisma } from './prisma'

// export async function requireUser() {
//   const { userId, sessionClaims } = await auth()
//   if (!userId) throw new Error('Unauthorized')

//   const email =
//     (Array.isArray((sessionClaims as any)?.email)
//       ? (sessionClaims as any)?.email?.[0]
//       : ((sessionClaims as any)?.email as string)) || ''

//   return prisma.user.upsert({
//     where: { clerkId: userId },
//     update: {},
//     create: { clerkId: userId, email },
//   })
// }

// import { auth, clerkClient } from '@clerk/nextjs/server'
// import { prisma } from '@/app/lib/prisma'

// export async function requireUser() {
//   const { userId } = await auth()
//   if (!userId) throw new Error('Unauthorized')

//   // Try to get an email from Clerk (may be null)
//   let email: string | null = null
//   try {
//     const u = await clerkClient.users.getUser(userId)
//     email =
//       u.primaryEmailAddress?.emailAddress ??
//       u.emailAddresses[0]?.emailAddress ??
//       null
//   } catch {
//     // ignore — email can be null
//   }

//   // 1) Already linked by clerkId?
//   let user = await prisma.user.findUnique({ where: { clerkId: userId } })
//   if (user) {
//     if (email && user.email !== email) {
//       user = await prisma.user.update({ where: { id: user.id }, data: { email } })
//     }
//     return user
//   }

//   // 2) Merge by email if we have one
//   if (email) {
//     const existing = await prisma.user.findUnique({ where: { email } })
//     if (existing) {
//       return await prisma.user.update({
//         where: { id: existing.id },
//         data: { clerkId: userId, email },
//       })
//     }
//   }

//   // 3) Create new (email can be null now)
//   return await prisma.user.create({
//     data: { clerkId: userId, email },
//   })
// }

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
