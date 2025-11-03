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
import { toast } from 'sonner'
import { createCustomer } from '@/server/user'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2, 'Please Enter Location Type'),
  email: z.email({ error: 'Please Enter correct email' }),
  phone: z.e164({ error: 'Please Enter correct phone' }),
  address: z.string().min(8, 'Plase Give a Proper Address'),
})

export function UserDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      address: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, message } = await createCustomer(
      values.name,
      values.username,
      values.email,
      values.phone,
    )
    success ? toast.success(message) : toast.error(message)
    if (success) {
      form.reset()
    }
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant='outline'>Add User</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[525px]'>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription className='mb-4'>
                Add Customer details
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
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
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
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
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='text'
                          placeholder='Enter Address'
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
                <Button
                  onClick={() => {
                    form.reset()
                  }}
                  variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit'>Create User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
