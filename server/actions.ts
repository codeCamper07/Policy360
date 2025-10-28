'use server'
import { prisma } from '@/lib/db'

export const agentData = async () => {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'agent',
      },
      select: {
        username: true,
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
