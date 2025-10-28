'use server'
import { prisma } from '@/lib/db'

export const getLocations = async () => {
  try {
    const data = await prisma.location.findMany()
    return { data }
  } catch (error) {
    console.log(error)
  }
}
