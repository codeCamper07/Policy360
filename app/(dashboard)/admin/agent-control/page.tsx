'use client'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2, ViewIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { getLocations } from '@/server/location'
import { createAgent } from '@/server/user'
import { agentData } from '@/server/actions'

const formSchema = z.object({
  state: z.string().min(1, 'Please Select a State'),
  district: z.string().min(1, 'Please Select a District'),
  mandal: z.string().min(1, 'Please Select a Mandal'),
  village: z.string().min(1, 'Please Select a Village'),
  name: z.string().min(2, { message: 'Please Enter Name' }),
  email: z.email({ error: 'Please Enter Valid Email' }),
  phone: z.e164({ error: 'Enter valid Phone Number' }),
})

type Location = {
  id: number
  code: string
  name: string
  locationType: string
  parentId: number | null
}
type Agent = {
  id: string
  name: string
  phone: string | null
  email: string
  displayUsername: string | null
}

const AdminAgentPage = () => {
  const [location, setLocation] = useState<Location[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null)
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null,
  )
  const [selectedMandalId, setSelectedMandalId] = useState<number | null>(null)
  const [loading, setLoading] = useState<Boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: '',
      district: '',
      mandal: '',
      village: '',
      name: '',
      email: '',
      phone: '',
    },
  })
  const fetchLocations = async () => {
    const response = await getLocations()
    if (response) {
      setLocation(response.data)
    }
  }
  const fetchAgents = async () => {
    const response = await agentData()
    if (response) {
      setAgents(response.data)
    }
  }

  useEffect(() => {
    fetchLocations()
    fetchAgents()
  }, [loading])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const username = `${values.state}${values.district}${values.mandal}${values.village}`
      const { success, message } = await createAgent(
        username,
        values.name,
        values.email,
        values.phone,
      )
      if (success) {
        setLoading(false)
        toast.success(message)
        form.reset()
      }
      // console.log(values)
    } catch (error) {
      setLoading(false)
      toast.error('Failed to add agent')
      console.error(error)
    }
  }

  return (
    <div className='p-4'>
      <Dialog>
        <Form {...form}>
          <DialogTrigger className='mb-4' asChild>
            <Button variant='default'>Add Agent</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className='mb-4'>
                <DialogTitle>Add new Agent</DialogTitle>
                <DialogDescription>
                  Add Agent profile here. Click Add Agent when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            const selectedState = location.find(
                              (loc) => loc.code === value,
                            )
                            setSelectedStateId(selectedState?.id ?? null)
                            form.setValue('district', '')
                            form.setValue('mandal', '')
                            form.setValue('village', '')
                            setSelectedDistrictId(null)
                            setSelectedMandalId(null)
                            // Reset all dependent fields when state changes
                          }}
                          value={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select State' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {location
                              .filter((type) => type.locationType === 'STATE')
                              .map((type) => (
                                <SelectItem key={type.id} value={type.code}>
                                  {type.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='district'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            const selectDistrict = location.find(
                              (loc) => loc.code === value,
                            )
                            setSelectedDistrictId(selectDistrict?.id ?? null)
                            // Reset dependent fields when district changes
                          }}
                          value={field.value}
                          disabled={!selectedStateId}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select District' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {location
                              .filter(
                                (type) =>
                                  type.locationType === 'DISTRICT' &&
                                  type.parentId === selectedStateId,
                              )
                              .map((type) => (
                                <SelectItem key={type.id} value={type.code}>
                                  {type.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='mandal'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mandal</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            const selectedMandal = location.find(
                              (loc) => loc.code === value,
                            )
                            if (selectedMandal) {
                              const newMandalId = selectedMandal.id
                              setSelectedMandalId(newMandalId)
                              // Reset village when mandal changes
                            }
                          }}
                          value={field.value}
                          disabled={!selectedDistrictId}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select Mandal' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {location
                              .filter(
                                (type) =>
                                  type.locationType === 'MANDAL' &&
                                  type.parentId === selectedDistrictId,
                              )
                              .map((type) => (
                                <SelectItem key={type.id} value={type.code}>
                                  {type.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='village'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Village / Area</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedMandalId}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select Village/Area' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {location
                              .filter(
                                (type) =>
                                  type.locationType === 'VILLAGE' &&
                                  type.parentId === selectedMandalId,
                              )
                              .map((type) => (
                                <SelectItem key={type.id} value={type.code}>
                                  {type.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' type='text' {...field} />
                        </FormControl>
                        <FormDescription />
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
                          <Input
                            placeholder='email@example.com'
                            type='email'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
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
                          <Input
                            placeholder='phone number'
                            type='phone'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      form.reset()
                      setSelectedStateId(null)
                      setSelectedDistrictId(null)
                    }}
                    type='button'
                    variant='outline'
                    className='mr-2'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type='submit' className='hover:cursor-pointer'>
                  {loading ? (
                    <Loader2 className='animate-spin' size='4' />
                  ) : (
                    'Add Agent'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>
      <Table className='bg-card rounded-lg'>
        <TableCaption>A list of Agents in Policy360.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Agent ID</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className='text-right'>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='rounded-xl'>
          {agents.length > 0 ? (
            agents.map((agent) => {
              return (
                <TableRow key={agent.id}>
                  <TableCell>{agent.displayUsername}</TableCell>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.phone}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell className='flex justify-end'>
                    <ViewIcon />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow className='flex justify-center items-center'>
              <TableCell>Nothing to see here!</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminAgentPage
