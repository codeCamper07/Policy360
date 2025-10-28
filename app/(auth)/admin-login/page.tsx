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
import { authClient } from '@/lib/auth-client'
import { adminSignIn } from '@/server/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(5, 'Username should be at least 5 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const Login04Page = () => {
  const { data: session, isPending } = authClient.useSession()
  if (session) {
    redirect('/admin')
  }
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const { success, message } = await adminSignIn(data.username, data.password)
    if (success) {
      toast.success(message)
      setLoading(false)
      form.reset({
        username: '',
        password: '',
      })
      router.push('/admin')
    } else {
      toast.error(message)
      setLoading(false)
    }
  }
  if (isPending) {
    return (
      <div className='mx-auto h-screen flex flex-col justify-center items-center'>
        <h1>Loading...!</h1>
      </div>
    )
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full h-full grid lg:grid-cols-2 p-4'>
        <div className='max-w-xs m-auto w-full flex flex-col items-center'>
          <Logo />
          <p className='mt-4 text-xl font-semibold tracking-tight'>
            Log in to Shadcn UI Blocks
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
                {loading ? (
                  <Loader2 className='animate-spin size-4' />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-5 space-y-5'>
            <Link
              href='#'
              className='text-sm block underline text-muted-foreground text-center'>
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className='hidden lg:block rounded-lg border bg-linear-to-br from-blue-400 via-white to-blue-400 dark:from-blue-950 dark:via-slate-900 dark:to-blue-900' />
      </div>
    </div>
  )
}

export default Login04Page
