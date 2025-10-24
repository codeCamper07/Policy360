'use client'

import { Logo } from '@/components/navbar-02/logo'
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
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  userId: z.string().min(10, 'UseId should be atleast 10 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const Login05Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      userId: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full h-full grid lg:grid-cols-2 p-4'>
        <div className='max-w-xs m-auto w-full flex flex-col items-center'>
          <Logo />
          <p className='mt-4 text-xl font-semibold tracking-tight'>
            Log in to Policy360
          </p>
          <Form {...form}>
            <form
              className='w-full space-y-4'
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='userId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Id</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='TG/AP/XXXXXXXX'
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
                Login
              </Button>
            </form>
          </Form>

          <div className='mt-5 space-y-5'>
            <Link
              href='#'
              className='text-sm block underline text-muted-foreground text-center'>
              Forgot your password?
            </Link>
            <p className='text-sm text-center'>
              Don&apos;t have an account?
              <Link href='#' className='ml-1 underline text-muted-foreground'>
                Create account
              </Link>
            </p>
          </div>
        </div>
        <div className='bg-muted hidden lg:block rounded-lg border'>
          <img
            src='/login-image.jpg'
            alt='login Style image'
            className='w-fill h-full aspect-auto object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Login05Page
