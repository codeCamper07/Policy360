import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { SidebarSeparator } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { AccountDialog } from './dialog'
import DisplayPicture from './displayPicture'

const Account = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  const editData = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || '',
  }

  return (
    <div className='p-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>Profile Page</h1>
      <div className='bg-card p-4 rounded-xl'>
        <div className='flex gap-2 items-center'>
          {user && (
            <div className='relative inline-block'>
              <Avatar className='h-28 w-30 rounded-full'>
                <AvatarImage src={`${user.image}`} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <DisplayPicture className='absolute bottom-0 right-0 size-6  rounded-full p-1 shadow-md cursor-pointer' />
            </div>
          )}
          <div>
            <h1 className='text-2xl font-bold'>{user?.name}</h1>
            <Badge variant='default'>{user?.role}</Badge>
          </div>
        </div>
      </div>
      <div className='bg-card p-4 rounded-xl'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Personal Information</h2>
          <AccountDialog editData={editData} />
        </div>
        <SidebarSeparator className='w-full' />
        <div className='grid grid-cols-3 gap-4 max-md:grid-cols-1 mt-2 p-2'>
          <div>
            <h1 className='font-semibold text-lg'>Email Address</h1>
            <p>{user?.email}</p>
          </div>
          <div>
            <h1 className='font-semibold text-lg'>Phone</h1>
            <p>{user?.phone}</p>
          </div>
          <div>
            <h1 className='font-semibold text-lg'>Username</h1>
            <p>{user?.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
