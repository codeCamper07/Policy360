import { TableComponent } from '@/components/tableComponent'
import TableSearch from '@/components/tableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { Edit2Icon, Trash2 } from 'lucide-react'
import { LocationDialog } from './dialog'

const LocationPage = async ({ searchParams }: { searchParams: any }) => {
  const { page, order, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1

  let query: Prisma.LocationWhereInput = {}

  if (queryParams) {
    for (let [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query = {
              OR: [
                { name: { contains: `${value}`, mode: 'insensitive' } },
                { locationType: { contains: `${value}`, mode: 'insensitive' } },
                { code: { contains: `${value}`, mode: 'insensitive' } },
              ],
            }
            break
          default:
            break
        }
      }
    }
  }

  const data = await prisma.location.findMany({
    where: query,
    take: 10,
    skip: 10 * (p - 1),
  })

  const columns = [
    {
      accessor: 'Id',
      name: 'Location Id',
      className: '',
    },
    {
      accessor: 'location',
      name: 'Location',
      className: '',
    },
    {
      accessor: 'category',
      name: 'Category',
      className: '',
    },
    {
      accessor: 'code',
      name: 'Code',
      className: '',
    },
    {
      accessor: 'parentId',
      name: 'ParentId',
      className: '',
    },
    {
      accessor: 'actions',
      name: 'Actions',
      className: 'text-right',
    },
  ]

  const renderRow = (items: {
    id: number
    name: string
    locationType: string
    code: string
    parentId: number | null
  }) => {
    return (
      <TableRow key={items.id}>
        <TableCell>{items.id}</TableCell>
        <TableCell>{items.name}</TableCell>
        <TableCell>{items.locationType}</TableCell>
        <TableCell>{items.code}</TableCell>
        <TableCell>{items.parentId}</TableCell>
        <TableCell className='flex items-center gap-4 justify-end'>
          <button>
            <Trash2 size={20} className='text-red-500' />
          </button>
          <button>
            <Edit2Icon size={20} />
          </button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='p-4'>
      <div className='bg-card py-5 px-5 rounded-xl'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Service Locations</h1>
          <div className='flex gap-2 items-center'>
            <TableSearch />
            <LocationDialog />
          </div>
        </div>
        <TableComponent columns={columns} renderRow={renderRow} data={data} />
      </div>
    </div>
  )
}

export default LocationPage
