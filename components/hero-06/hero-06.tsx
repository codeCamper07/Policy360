'use client'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { BackgroundPattern } from './background-pattern'
import { useRouter } from 'next/navigation'

const Hero06 = () => {
  const router = useRouter()
  const handleGetStarted = () => {
    router.push('/login')
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <BackgroundPattern />

      <div className='relative z-10 text-center max-w-3xl'>
        <h1 className='mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter'>
          Claim your Insurance with Ease
        </h1>
        <p className='mt-6 md:text-lg'>
          Simplify your third-party insurance claim process with our expert
          guidance. We handle all the paperwork and coordination, ensuring a
          smooth and hassle-free experience when dealing with damages involving
          third parties.
        </p>
        <div className='mt-12 flex items-center justify-center gap-4'>
          <Button
            onClick={handleGetStarted}
            size='lg'
            variant='link'
            className='rounded-full text-base'>
            Get Started <ArrowUpRight className='h-5! w-5!' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero06
