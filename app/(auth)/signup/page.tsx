'use client'
import { Logo } from '../../../components/navbar-02/logo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/server/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(5, 'Username should be atleast 5 characters long'),
  displayUsername: z
    .string()
    .min(5, 'Display Username should be 5 characters long'),
  name: z.string().min(3, 'Please Enter Name'),
  email: z.string().email('Please Enter proper Email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const SignUp02Page = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: '',
      displayUsername: '',
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const { success, message } = await signUp(
        data.username,
        data.displayUsername,
        data.name,
        data.email,
        data.password,
        '+919876543210',
      )
      if (success) {
        toast.success(message)
        form.reset({
          username: '',
          displayUsername: '',
          name: '',
          email: '',
          password: '',
        })
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error('An error occurred during sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted'>
      <div className='max-w-sm w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card'>
        <Logo />
        <p className='mt-4 text-xl font-semibold tracking-tight mb-2'>
          Sign up for Policy360
        </p>

        <Form {...form}>
          <form
            className='w-full space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Username'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='displayUsername'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Username</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='displayUsername'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Name'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Email'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-4 w-full'>
              {loading ? <Loader2 className='animate-spin size-4' /> : 'Create'}
            </Button>
          </form>
        </Form>

        <p className='mt-5 text-sm text-center'>
          Already have an account?
          <Link href='#' className='ml-1 underline text-muted-foreground'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp02Page
