'use server'
import { prisma } from '@/lib/prisma'

export const agentData = async () => {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'agent',
      },
      select: {
        displayUsername: true,
        name: true,
        email: true,
        phone: true,
        id: true,
      },
    })
    return {
      data,
    }
  } catch (error) {
    console.log(error)
  }
}
