import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventSchema } from '@/lib/schemas';
import { z } from 'zod';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { icons } from '@/components/icons';
import { MapPin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

type FormData = z.infer<typeof CreateEventSchema>;

type Props = {
	setActive: (e: number) => void;
	form: UseFormReturn<FormData>;
};
const BasicDetails: React.FC<Props> = ({ form, setActive }) => {
	const router = useRouter();

	return (
		<div className='flex flex-col gap-4 mt-6'>
			<FormField
				control={form.control}
				name='event_name'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							Event Name
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='ex. Detty December 2025'
								className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0
										'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='grid sm:grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='start_date'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
								Start Date
							</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant='outline'
											size='lg'
											className='w-full flex items-center justify-between px-3 border-white-300 h-[44px]
											bg-transparent hover:bg-transparent
											'>
											{field?.value ? (
												format(field.value, 'dd-MM-yyyy')
											) : (
												<span className='text-white-300 text-sm'>DD/MM/YYYY</span>
											)}

											{icons.Calendar}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0 ' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date('1900-01-01')}
										captionLayout='dropdown'
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='start_time'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
								Start Time
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='HH:MM:SS'
									className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0
										'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name='event_address'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							Event Address
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Enter Event Address'
								className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0
										'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='landmark'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							Location Landmark
						</FormLabel>
						<FormControl>
							<div className='relative'>
								<MapPin
									color='var(--black-600)'
									className='absolute top-3 left-4'
									size={16}
								/>
								<Input
									{...field}
									placeholder=''
									className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0 pl-8
										'
								/>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='event_type'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							Event Type
						</FormLabel>
						<FormControl>
							<Select defaultValue={field.value} onValueChange={field.onChange}>
								<SelectTrigger
									className='h-[44px] text-sm font-medium text-black-950
										focus-visible:ring-0 w-full'>
									<SelectValue placeholder='--Select--' className='text-black-950' />
								</SelectTrigger>
								<SelectContent className='w-full'>
									<SelectItem
										value='paid'
										className='w-full cursor-pointer bg-transparent'>
										Paid Event
									</SelectItem>
									<SelectItem
										value='free'
										className='w-full cursor-pointer bg-transparent'>
										Free Event
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='organization'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							Organization
						</FormLabel>
						<FormControl>
							<Select defaultValue={field.value} onValueChange={field.onChange}>
								<SelectTrigger
									className='h-[44px] text-sm font-medium text-black-950
										focus-visible:ring-0 w-full'>
									<SelectValue placeholder='--Select--' className='text-black-950' />
								</SelectTrigger>
								<SelectContent className='w-full'>
									<SelectItem
										value='org1'
										className='w-full cursor-pointer bg-transparent'>
										Organization 1
									</SelectItem>
									<SelectItem
										value='org2'
										className='w-full cursor-pointer bg-transparent'>
										Organization 2
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='about'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
							About Event
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder='Type something...'
								className='text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0 h-[120px]
										'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='grid gap-4 sm:grid-cols-2 w-full'>
				<Button
					variant='primary'
					type='button'
					onClick={() => setActive(1)}
					disabled={!form.formState.isValid}>
					Continue
				</Button>
				<Button variant='outline' type='button' onClick={() => router.back()}>
					Go Back
				</Button>
			</div>
		</div>
	);
};

export default BasicDetails;
