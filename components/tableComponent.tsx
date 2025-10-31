import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableComponent({
  columns,
  renderRow,
  data,
}: {
  columns: { accessor: string; name: string; className: string }[]
  renderRow: any
  data: {
    id: number
    name: string
    locationType: string
    code: string
    parentId: number | null
  }[]
}) {
  return (
    <Table className='bg-card rounded-lg'>
      <TableHeader className='p-2'>
        <TableRow>
          {columns.map((col) => {
            return (
              <TableHead key={col.accessor} className={col.className}>
                {col.name}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{data.map((items) => renderRow(items))}</TableBody>
    </Table>
  )
}
