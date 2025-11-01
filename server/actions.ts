'use server'
import { Prisma } from '@/generated/prisma'
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

export const addLocation = async (
  data: Prisma.LocationUncheckedCreateInput,
) => {
  try {
    await prisma.location.create({
      data: {
        name: data.name,
        locationType: data.locationType.toUpperCase(),
        code: data.code,
        parentId: data?.parentId,
      },
    })
    return {
      success: true,
      message: 'Added Location successfully',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      message: message,
    }
  }
}
