import AppCalender from '@/components/appCalender'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const AdminPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (user?.role !== 'admin') {
    return (
      <div className='h-screen mx-auto flex flex-col items-center justify-center'>
        <h1>Unauthorized</h1>
      </div>
    )
  }
  return (
    <div className='p-4 flex gap-2 max-md:flex-col'>
      {/* Left Side of the Page */}
      <div className='w-full lg:w-2/3 md:w-1/2 p-2'>
        <div className='flex justify-between gap-2 flex-wrap mb-2'>
          <Card className='flex-1'>
            <CardHeader>
              <h3 className='text-sm font-bold max-md:text-xs'>
                Claims Approved
              </h3>
              <CardAction>...</CardAction>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>120</p>
              <CardDescription>Tagline</CardDescription>
            </CardContent>
          </Card>
          <Card className='flex-1'>
            <CardHeader>
              <h3 className='text-sm font-bold max-md:text-xs'>
                Claims Rejected
              </h3>
              <CardAction>...</CardAction>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>11</p>
              <CardDescription>Tagline</CardDescription>
            </CardContent>
          </Card>
          <Card className='flex-1'>
            <CardHeader>
              <h3 className='text-sm font-bold max-md:text-xs'>
                Claims Pending
              </h3>
              <CardAction>...</CardAction>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>50</p>
              <CardDescription>Tagline</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Right Side of the Page */}
      <div className='w-full lg:w-1/3 md:w-1/2 p-2'>
        <AppCalender />
      </div>
    </div>
  )
}

export default AdminPage
