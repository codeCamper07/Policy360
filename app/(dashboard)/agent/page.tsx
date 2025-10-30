import Table02 from '@/components/table-02'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const change = 'positive'
const AgentPage = () => {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <div className='flex gap-4 max-lg:flex-col'>
        <Card className='flex-1 px-2'>
          <CardHeader>
            <CardTitle>Total Claims</CardTitle>
            <CardAction className='flex gap-2'>
              <div
                className={cn(
                  'text-xs font-medium',
                  change === 'positive'
                    ? 'text-green-800 dark:text-green-400'
                    : 'text-red-800 dark:text-red-400',
                )}>
                +8.32
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>120</p>
            <CardDescription>Claims done by you so far</CardDescription>
          </CardContent>
        </Card>
        <Card className='flex-1 px-2'>
          <CardHeader>
            <CardTitle>Approved Claims</CardTitle>
            <CardAction className='flex gap-2'>
              <div
                className={cn(
                  'text-xs font-medium',
                  change !== 'positive'
                    ? 'text-green-800 dark:text-green-400'
                    : 'text-red-800 dark:text-red-400',
                )}>
                -1.32
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>5</p>
            <CardDescription>Claims Approved this week</CardDescription>
          </CardContent>
        </Card>
        <Card className='flex-1 px-2'>
          <CardHeader>
            <CardTitle>Pending Claims</CardTitle>
            <CardAction className='flex gap-2'>
              <div
                className={cn(
                  'text-xs font-medium',
                  change === 'positive'
                    ? 'text-green-800 dark:text-green-400'
                    : 'text-red-800 dark:text-red-400',
                )}>
                +0.21
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>12</p>
            <CardDescription>Claims waiting for action</CardDescription>
          </CardContent>
        </Card>
      </div>
      <Table02 />
    </div>
  )
}

export default AgentPage
