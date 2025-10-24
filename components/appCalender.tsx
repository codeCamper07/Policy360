'use client'
import { useState } from 'react'
import { Calendar } from './ui/calendar'

const AppCalender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className='bg-background p-2 rounded-lg flex flex-col gap-3'>
      <Calendar
        animate
        mode='single'
        selected={date}
        onSelect={setDate}
        buttonVariant='secondary'
        className='w-full rounded-md'
        footer={
          date ? `Selected: ${date.toLocaleDateString('en-IN')}` : 'Pick a day.'
        }
      />
      <h1>Claims</h1>
      <div className='p-4 rounded-md border border-t-4 even:border-t-sky-300 odd:border-t-red-300'>
        <div className='flex justify-between items-center'>
          <p className='text-sm text-secondary-foreground'>
            Vehicle Claim Request by Rama
          </p>
          <span className='text-xs'>24/10/2025</span>
        </div>
      </div>
      <div className='p-4 rounded-md border border-t-4 even:border-t-sky-300 odd:border-t-red-300'>
        <div className='flex justify-between items-center'>
          <p className='text-sm text-secondary-foreground'>
            Health Claim Request by Sumanth
          </p>
          <span className='text-xs'>24/10/2025</span>
        </div>
      </div>
      <div className='p-4 rounded-md border border-t-4 even:border-t-sky-300 odd:border-t-red-300'>
        <div className='flex justify-between items-center'>
          <p className='text-sm text-secondary-foreground'>
            Vehicle Claim Request by Krishna
          </p>
          <span className='text-xs'>24/10/2025</span>
        </div>
      </div>
    </div>
  )
}

export default AppCalender
