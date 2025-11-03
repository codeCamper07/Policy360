import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
} as const

export const ac = createAccessControl(statement)

export const user = ac.newRole({
  project: ['create', 'update'],
})

export const admin = ac.newRole({
  project: ['create', 'update', 'delete'],
  ...adminAc.statements,
})

export const agent = ac.newRole({
  project: ['create', 'update'],
  user: ['create'], // Add specific permissions for agent role
})
