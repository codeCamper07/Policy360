'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addLocation } from '@/server/actions'
import { toast } from 'sonner'
import { Edit2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  locationType: z.string().min(2, 'Please Enter Location Type'),
  code: z.string().min(1, 'Please enter code'),
  parentId: z.number().optional().nullable(),
})

export function EditLocationDialog({
  data,
}: {
  data: {
    name: string
    locationType: string
    code: string
    id: number
    parentId: number | null
  }
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      locationType: data.locationType,
      code: data.code,
      parentId: data.parentId,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, message } = await addLocation(values)
    success ? toast.success(message) : toast.error(message)
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[525px]'>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Location</DialogTitle>
              <DialogDescription className='mb-4'>
                Add Location that we want to extend our services
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Name</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-3'>
                <FormField
                  control={form.control}
                  name='locationType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Type</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-3'>
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-3'>
                <FormField
                  control={form.control}
                  name='parentId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ParentId</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='text'
                          placeholder='Enter a number or leave blank'
                          // Transform the value for the input and back for the form
                          value={
                            field.value !== null ? String(field.value) : ''
                          }
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value === '' ? null : Number(value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='mt-3'>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Add Location</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
