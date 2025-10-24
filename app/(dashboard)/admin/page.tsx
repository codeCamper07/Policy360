import AppCalender from '@/components/appCalender'
import { Card, CardDescription } from '@/components/ui/card'

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-2 max-md:flex-col'>
      {/* Left Side of the Page */}
      <div className='w-full lg:w-2/3 md:w-1/2 p-2'>
        <div className='flex justify-between gap-2 flex-wrap'>
          <Card className='px-3 py-2 flex-1'>
            <h3 className='text-sm font-bold max-md:text-xs'>
              Claims Initiated
            </h3>
            <p>0</p>
            <CardDescription>Tagline</CardDescription>
          </Card>
          <Card className='px-3 py-2 flex-1'>
            <h3 className='text-sm font-bold max-md:text-xs'>
              Claims Rejected
            </h3>
            <p>0</p>
            <CardDescription>Tagline</CardDescription>
          </Card>
          <Card className='px-3 py-2 flex-1'>
            <h3 className='text-sm font-bold max-md:text-xs'>Claims Pending</h3>
            <p>0</p>
            <CardDescription>Tagline</CardDescription>
          </Card>
          <Card className='px-3 py-2 flex-1'>
            <h3 className='text-sm font-bold max-md:text-xs'>
              Claims Approved
            </h3>
            <p>0</p>
            <CardDescription>Tagline</CardDescription>
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
