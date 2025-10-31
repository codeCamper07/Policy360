'use server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const signUp = async (
  username: string,
  displayUsername: string,
  name: string,
  email: string,
  password: string,
  phone: string,
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        username,
        displayUsername,
        name,
        email,
        password,
        phone,
        role: 'admin',
      },
    })
    return {
      success: true,
      message: 'successfully created user',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      message: message,
    }
  }
}

export const createAgent = async (
  username: string,
  name: string,
  email: string,
  phone: string | null,
) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    const incrementedUser = username
    await auth.api.createUser({
      body: {
        email,
        password: 'default@123',
        name,
        data: {
          username: incrementedUser,
          displayUsername: incrementedUser,
          phone: phone,
          role: 'agent',
        },
      },
    })
    return {
      success: true,
      message: 'Agent Created',
    }
  } catch (error) {
    return { success: false, message: 'Failed to create agent' }
  }
}
