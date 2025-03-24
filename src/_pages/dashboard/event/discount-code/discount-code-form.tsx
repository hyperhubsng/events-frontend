import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { message } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { icons } from '@/components/icons';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const DiscountSchema = z.object({
	code: z.string().min(7, {
		message,
	}),
	category: z.string().min(2, {
		message,
	}),
	type: z.enum(['percentage_discount', 'fixed_amount'], {
		required_error: message,
	}),
	usage: z.enum(['duration', 'quantity'], {
		required_error: message,
	}),
	startDate: z.date({}).optional(),
	endDate: z.date({}).optional(),
	quantity: z.string().optional(),
});

const DiscountForm = ({
	handleSubmit,
}: {
	handleSubmit: (e: DiscountTableProps) => void;
}) => {
	const form = useForm<z.infer<typeof DiscountSchema>>({
		resolver: zodResolver(DiscountSchema),
		defaultValues: {
			code: '',
			category: '',
			usage: 'duration',
		},
	});

	const onSubmit = async (data: z.infer<typeof DiscountSchema>) => {
		const tData = {
			code: data.code!,
			start_date: data.startDate!,
			end_date: data.endDate!,
			status: 'active',
		};

		handleSubmit(tData);
		toast.success('Code created successfully');
	};

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='max-w-[39.25rem] bg-white w-full rounded-[4px] md:rounded-[8px] p-4 md:p-6'>
				<div className='bg-[#FDFDFD]'>
					<h2 className='text-base md:text-2xl text-black-950 font-bold'>
						New Discount Code
					</h2>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-8 mt-6'>
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center justify-between'>
										<FormLabel
											className='text-black-950 text-sm md:text-base font-semibold'
											htmlFor='code'>
											Discount Code
										</FormLabel>
										<button className='text-blue-50 text-sm font-semibold underline'>
											+ Auto-generate Code
										</button>
									</div>
									<FormControl>
										<Input
											{...field}
											id='code'
											placeholder='ex. EVENTEEDEC2025PARTY'
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
							name='category'
							render={({ field }) => (
								<FormItem id='category'>
									<FormLabel
										className='text-black-950 text-sm md:text-base font-semibold'
										htmlFor='category'>
										Ticket Category
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}>
											<SelectTrigger
												className='h-[44px] text-sm font-medium text-black-950
                                focus-visible:ring-0 w-full'>
												<SelectValue
													placeholder='--Select--'
													className='text-black-950'
												/>
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
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className='text-black-950 text-sm md:text-base font-semibold'
										htmlFor='type'>
										Discount Code Type
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-4 mt-4'>
											<FormItem className='flex items-center space-x-0 space-y-0'>
												<FormControl>
													<RadioGroupItem
														value='percentage_discount'
														className='radio'
													/>
												</FormControl>
												<FormLabel className='text-base text-black-950 font-normal'>
													Percentage Discount
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-0 space-y-0'>
												<FormControl>
													<RadioGroupItem value='fixed_amount' className='radio' />
												</FormControl>
												<FormLabel className='text-base text-black-950 font-normal'>
													Fixed Amount
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='usage'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className='text-black-950 text-sm md:text-base font-semibold'
										htmlFor='usage'>
										Usage Limit
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-4 mt-4'>
											<FormItem className='flex items-center space-x-0 space-y-0'>
												<FormControl>
													<RadioGroupItem value='duration' className='radio' />
												</FormControl>
												<FormLabel className='text-base text-black-950 font-normal'>
													Duration
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-0 space-y-0'>
												<FormControl>
													<RadioGroupItem value='quantity' className='radio' />
												</FormControl>
												<FormLabel className='text-base text-black-950 font-normal'>
													Quantity
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Label className='text-black-950 text-sm md:text-base font-semibold capitalize -mb-4'>
							{form.watch('usage')}
						</Label>
						{form.watch('usage') === 'duration' ? (
							<div>
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
												<Popover>
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
																	<span className='text-white-300 text-sm'>
																		DD/MM/YYYY
																	</span>
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
										name='endDate'
										render={({ field }) => (
											<FormItem>
												<FormLabel
													className='text-black-950 text-sm md:text-base font-semibold'
													htmlFor='endDate'>
													End Date
												</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl id='endDate'>
															<Button
																variant='outline'
																size='lg'
																className='w-full flex items-center justify-between px-3 border-white-300
                                  bg-transparent hover:bg-transparent text-black-950 !h-[44px]
                                  '>
																{field?.value ? (
																	format(field.value, 'dd-MM-yyyy')
																) : (
																	<span className='text-white-300 text-sm'>
																		DD/MM/YYYY
																	</span>
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
								</div>
							</div>
						) : (
							<FormField
								control={form.control}
								name='quantity'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className='text-black-950 text-sm md:text-base font-semibold'
											htmlFor='quantity'>
											Quantity Of Tickets
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='quantity'
												placeholder='Enter the number of tickets'
												className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
								focus-visible:ring-0
								'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<Button variant={'primary'} className='w-full mt-4'>
							Create Discount Code
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default DiscountForm;
