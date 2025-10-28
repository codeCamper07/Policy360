import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth.js'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [inferAdditionalFields<typeof auth>()],
})
