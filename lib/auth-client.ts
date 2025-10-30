import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth.js'
import {
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>(), usernameClient()],
})
