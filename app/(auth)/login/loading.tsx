import { LoaderIcon } from 'lucide-react'

const LoadingLogin = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <LoaderIcon className='animate-spin size-10' />
    </div>
  )
}

export default LoadingLogin
