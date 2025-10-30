'use client'

import { FileTextIcon, Loader2, PauseIcon, PlayIcon } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface Task {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'approved' | 'rejected'
  dueDate: string
  notes: string
}

type TaskActionType = 'start' | 'pause' | 'complete' | 'delete' | 'view'

const tasks: Task[] = [
  {
    id: 'TASK-001',
    title: 'Bike Insurance Claim',
    status: 'pending',
    dueDate: '2024-03-25',
    notes: 'Mr Sumanth still to provide docuementation for bike',
  },
  {
    id: 'TASK-002',
    title: 'Mr.Jerrad Paul',
    status: 'approved',
    dueDate: '2024-03-20',
    notes: 'Cheque has been issued to Mrs. Paul on 20-03-2024',
  },
  {
    id: 'TASK-003',
    title: 'Mr.Jimmy Carter',
    status: 'pending',
    dueDate: '2024-03-22',
    notes: 'Missing death certificate from client',
  },
  {
    id: 'TASK-004',
    title: 'Ms.Katharine Ferrandez',
    status: 'in-progress',
    dueDate: '2024-03-28',
    notes: 'Finalizing reports',
  },
  {
    id: 'TASK-005',
    title: 'Mr.Hiesenberg',
    status: 'rejected',
    dueDate: '2024-03-24',
    notes: 'He cooks meth with Jessi Pinkman',
  },
  {
    id: 'TASK-006',
    title: 'Mr.John Snow',
    status: 'pending',
    dueDate: '2024-03-30',
    notes: 'He knows nothing',
  },
  {
    id: 'TASK-007',
    title: 'Theft Insurance',
    status: 'approved',
    dueDate: '2024-03-19',
    notes: 'Cheque has been issued to Mr.Ashok',
  },
]

function getStatusBadge(status: Task['status']) {
  switch (status) {
    case 'pending':
      return (
        <Badge
          variant='outline'
          className='bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0'>
          Pending
        </Badge>
      )
    case 'in-progress':
      return (
        <Badge
          variant='outline'
          className='bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0'>
          In Progress
        </Badge>
      )
    case 'approved':
      return (
        <Badge
          variant='outline'
          className='bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0'>
          Approved
        </Badge>
      )
    case 'rejected':
      return (
        <Badge
          variant='outline'
          className='bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0'>
          Rejected
        </Badge>
      )
    default:
      return <Badge variant='secondary'>{status}</Badge>
  }
}

export default function Table02() {
  const [pendingAction, setPendingAction] = useState<{
    id: string
    type: TaskActionType
  } | null>(null)

  const isTaskActionPending = (action: TaskActionType, taskId: string) =>
    pendingAction?.id === taskId && pendingAction.type === action

  const isTaskBusy = (taskId: string) => pendingAction?.id === taskId

  const handleAction = (task: Task, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType })
    setTimeout(() => {
      setPendingAction(null)
      toast.success(`Action "${actionType}" completed for task: ${task.title}`)
      console.log(`Action "${actionType}" completed for task:`, task.title)
    }, 1000)
  }

  const renderTaskRow = (task: Task) => {
    const busy = isTaskBusy(task.id)
    const startPending = isTaskActionPending('start', task.id)
    const pausePending = isTaskActionPending('pause', task.id)

    return (
      <TableRow key={task.id} className='hover:bg-muted/50'>
        <TableCell className='h-16 px-4 font-medium'>{task.title}</TableCell>
        <TableCell className='h-16 px-4'>
          {getStatusBadge(task.status)}
        </TableCell>

        <TableCell className='h-16 px-4 text-sm text-muted-foreground'>
          {task.dueDate}
        </TableCell>
        <TableCell className='h-16 px-4 max-w-[300px] text-sm text-muted-foreground'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='block cursor-help truncate'>{task.notes}</span>
              </TooltipTrigger>
              <TooltipContent className='max-w-md'>{task.notes}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className='h-16 px-4'>
          <TooltipProvider>
            <div className='flex items-center gap-1'>
              {(task.status === 'pending' || task.status === 'rejected') && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => handleAction(task, 'start')}
                      disabled={busy}>
                      {startPending ? (
                        <Loader2 className='size-4 animate-spin' />
                      ) : (
                        <PlayIcon className='size-4' />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start</TooltipContent>
                </Tooltip>
              )}
              {task.status === 'in-progress' && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => handleAction(task, 'pause')}
                        disabled={busy}>
                        {pausePending ? (
                          <Loader2 className='size-4 animate-spin' />
                        ) : (
                          <PauseIcon className='size-4' />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pause</TooltipContent>
                  </Tooltip>
                </>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() => handleAction(task, 'view')}
                    disabled={busy}>
                    <FileTextIcon className='size-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='rounded-lg border bg-card w-[98%]'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b'>
            <TableHead className='h-12 px-4 font-medium'>Title</TableHead>
            <TableHead className='h-12 px-4 font-medium w-[120px]'>
              Status
            </TableHead>

            <TableHead className='h-12 px-4 font-medium'>Due Date</TableHead>
            <TableHead className='h-12 px-4 font-medium'>Notes</TableHead>
            <TableHead className='h-12 px-4 font-medium w-[180px]'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tasks.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  )
}
