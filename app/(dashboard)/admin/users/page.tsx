import { TableComponent } from '@/components/tableComponent'
import TableSearch from '@/components/tableSearch'
import { TableCell, TableRow } from '@/components/ui/table'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { items_per_page } from '@/lib/settings'
import { Edit2, Trash2 } from 'lucide-react'
import { UserDialog } from './dialog'

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const { page, ...qureyParams } = await searchParams
  const p = page ? parseInt(page) : 1

  let query: Prisma.UserWhereInput = {
    role: 'user',
  }

  if (qureyParams) {
    for (let [key, value] of Object.entries(qureyParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query = {
              role: 'user',
              OR: [
                { name: { contains: `${value}`, mode: 'insensitive' } },
                { username: { contains: `${value}`, mode: 'insensitive' } },
                { email: { contains: `${value}`, mode: 'insensitive' } },
              ],
            }
            break

          default:
            break
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: query,
      take: items_per_page,
      skip: items_per_page * (p - 1),
    }),
    prisma.user.count({
      where: query,
    }),
  ])

  const columns = [
    {
      accessor: 'name',
      name: 'Name',
      className: '',
    },
    {
      accessor: 'username',
      name: 'Username',
      className: '',
    },
    {
      accessor: 'email',
      name: 'Email',
      className: '',
    },
    {
      accessor: 'address',
      name: 'Address',
      className: '',
    },
    {
      accessor: 'actions',
      name: 'Actions',
      className: 'text-right',
    },
  ]
  const renderRow = (items: {
    id: string
    name: string
    displayUsername: string
    email: string
    address: string
  }) => {
    return (
      <TableRow key={items.id}>
        <TableCell>{items.name}</TableCell>
        <TableCell>{items.displayUsername}</TableCell>
        <TableCell>{items.email}</TableCell>
        <TableCell>{items.address}</TableCell>
        <TableCell className='flex items-center gap-4 justify-end'>
          <button>
            <Trash2 size={20} className='text-red-500' />
          </button>
          <button>
            <Edit2 />
          </button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='p-4'>
      <div className='bg-card p-4 rounded-xl'>
        <div className='flex justify-between items-center mb-4 max-md:flex-col'>
          <h1 className='text-2xl font-bold'>Customers</h1>
          <div className='flex items-center gap-2 max-md:flex-col mt-2'>
            <TableSearch />
            <div className='self-end'>
              <UserDialog />
            </div>
          </div>
        </div>
        <TableComponent columns={columns} data={data} renderRow={renderRow} />
      </div>
    </div>
  )
}

export default UsersPage
