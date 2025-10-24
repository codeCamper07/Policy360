'use client'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { NavMenu } from './nav-menu'
import { NavigationSheet } from './navigation-sheet'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const Navbar02Page = () => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const handleSignIn = () => {
    router.push('/login')
  }
  return (
    <nav className='sticky top-0 z-50 h-16 bg-background border-b'>
      <div className='h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-8'>
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className='hidden md:block' />
        </div>

        <div className='flex items-center gap-3'>
          <Button
            onClick={handleSignIn}
            variant='secondary'
            className='hidden sm:inline-flex hover:cursor-pointer'>
            Sign In
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar02Page
