import { LoaderIcon } from 'lucide-react'

const LoadingAccount = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <LoaderIcon className='animate-spin size-10' />
    </div>
  )
}

export default LoadingAccount
