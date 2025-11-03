import { TableComponent } from '@/components/tableComponent'
import TableSearch from '@/components/tableSearch'
import { TableCell, TableRow } from '@/components/ui/table'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { Trash2 } from 'lucide-react'
import { LocationDialog } from './dialog'
import { EditLocationDialog } from './editDialog'
import PaginationComponent from '@/components/paginationComponent'
import { items_per_page } from '@/lib/settings'

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

  const [data, count] = await prisma.$transaction([
    prisma.location.findMany({
      where: query,
      take: items_per_page,
      skip: items_per_page * (p - 1),
    }),
    prisma.location.count({
      where: query,
    }),
  ])

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
          <EditLocationDialog data={items} />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='p-4'>
      <div className='bg-card py-5 px-5 rounded-xl'>
        <div className='flex items-center justify-between max-md:flex-col'>
          <h1 className='text-2xl font-bold'>Service Locations</h1>
          <div className='flex gap-2 items-center max-md:flex-col mt-2'>
            <TableSearch />
            <div className='self-end'>
              <LocationDialog />
            </div>
          </div>
        </div>
        <TableComponent columns={columns} renderRow={renderRow} data={data} />
        <PaginationComponent page={p} count={count} />
      </div>
    </div>
  )
}

export default LocationPage
