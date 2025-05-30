import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLazyGetUsersQuery } from '@/features/users/usersApi';
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
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/features/auth/authSlice';

type FormData = z.infer<typeof CreateEventSchema>;

type Props = {
	form: UseFormReturn<FormData>;
};
const BasicDetails: React.FC<Props> = ({ form }) => {
	const router = useRouter();
	const pathname = usePathname();

	const user = useAppSelector(selectUser);

	const [err, setErr] = useState(false);
	const [showdate, setShowDate] = useState(false);

	const formValues = form.watch();

	const [getUsers, { data: vendors, isLoading }] = useLazyGetUsersQuery();

	useEffect(() => {
		for (const key in form.getValues()) {
			const value = form.getValues()[key as keyof FormData];
			if (key !== 'coordinates') {
				if (value === '' || value === null) {
					setErr(true);
					break;
				} else {
					setErr(false);
				}
			}
		}
	}, [formValues, form]);

	useEffect(() => {
		if (user?.userType !== 'vendor') {
			getUsers({
				userType: 'vendor',
			});
		}
	}, [getUsers, user?.userType]);

	return (
		<div className='flex flex-col gap-4 mt-6'>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel
							className='text-black-950 text-sm md:text-base font-semibold'
							htmlFor='title'>
							Event Name
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								id='title'
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
					name='startDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='startDate'>
								Start Date
							</FormLabel>
							<Popover open={showdate} onOpenChange={setShowDate}>
								<PopoverTrigger asChild>
									<FormControl id='startDate'>
										<Button
											variant='outline'
											size='lg'
											className='w-full flex items-center justify-between px-3 border-white-300
											bg-transparent hover:bg-transparent text-black-950 !h-[44px]
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
										disabled={(date) => {
											const today = new Date();
											today.setHours(0, 0, 0, 0);
											return date < today;
										}}
										captionLayout='dropdown'
										initialFocus
										onDayClick={() => setShowDate(false)}
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
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='start_time'>
								Start Time
							</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										{...field}
										id='start_time'
										placeholder='HH:MM'
										className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0
										'
									/>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='absolute right-4 top-2'>
										<path
											d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
											stroke='#808080'
											strokeWidth='1.5'
											strokeMiterlimit='10'
										/>
										<path
											d='M12 6.75V12H17.25'
											stroke='#808080'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name='venue'
				render={({ field }) => (
					<FormItem>
						<FormLabel
							className='text-black-950 text-sm md:text-base font-semibold'
							htmlFor='venue'>
							Event Address
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								id='venue'
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
				name='coordinates'
				render={({ field }) => (
					<FormItem>
						<FormLabel
							className='text-black-950 text-sm md:text-base font-semibold'
							htmlFor='coordinates'>
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
									id='coordinates'
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
				name='eventType'
				render={({ field }) => (
					<FormItem id='eventType'>
						<FormLabel
							className='text-black-950 text-sm md:text-base font-semibold'
							htmlFor='eventType'>
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

			{user?.userType !== 'vendor' && (
				<FormField
					control={form.control}
					name='ownerId'
					render={({ field }) => (
						<FormItem id='ownerId'>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='ownerId'>
								Organization
							</FormLabel>
							<FormControl>
								<Select
									defaultValue={field.value}
									onValueChange={field.onChange}
									disabled={isLoading}>
									<SelectTrigger
										className='h-[44px] text-sm font-medium text-black-950
										focus-visible:ring-0 w-full'>
										<SelectValue
											placeholder='--Select--'
											className='text-black-950'
										/>
									</SelectTrigger>
									<SelectContent className='w-full'>
										{vendors?.data?.users?.map((vendor) => (
											<SelectItem
												key={vendor?._id}
												value={vendor?._id}
												className='w-full cursor-pointer bg-transparent'>
												{vendor?.companyName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			<FormField
				control={form.control}
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel
							className='text-black-950 text-sm md:text-base font-semibold'
							htmlFor='description'>
							About Event <span className='text-xs'>(Mininum 20 characters)</span>
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder='Type something...'
								className='text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
										focus-visible:ring-0 h-[120px]
										'
								id='description'
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
					disabled={err || form.getValues('description').length < 20}
					className='w-full'
					onClick={() => {
						router.push(`${pathname}?tab=media`);
						if (user?.userType === 'vendor') {
							form.setValue('ownerId', user!.userId || user!._id);
						}
					}}>
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
