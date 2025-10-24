import { Banknote, FileCheck, FileUser } from 'lucide-react'

export default function ContentSection() {
  return (
    <section className='py-16 md:py-32'>
      <div className='mx-auto max-w-5xl space-y-8 px-6 md:space-y-12'>
        <div className='mx-auto max-w-xl space-y-6 text-center md:space-y-12'>
          <h2 className='text-balance text-4xl font-medium lg:text-5xl'>
            About Our Insurance Claims Guidance
          </h2>
          <p>
            Policy 360 is dedicated to simplifying the insurance claim process
            for damages involving third parties. Our team of experts is here to
            guide you through every step, ensuring a smooth and hassle-free
            experience.
          </p>
        </div>
        <img
          className='rounded-(--radius) grayscale'
          src='https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='team image'
          height=''
          width=''
          loading='lazy'
        />

        <div className='relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-3'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <FileUser className='size-4' />
              <h3 className='text-sm font-medium'>Claim Request</h3>
            </div>
            <p className='text-muted-foreground text-sm'>
              We ease insurance claiming process.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileCheck className='size-4' />
              <h3 className='text-sm font-medium'>Documents Verification</h3>
            </div>
            <p className='text-muted-foreground text-sm'>
              Just upload required documents and rest will be taken care.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Banknote className='size-4' />
              <h3 className='text-sm font-medium'>Money</h3>
            </div>
            <p className='text-muted-foreground text-sm'>
              Money depoists directly to your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
