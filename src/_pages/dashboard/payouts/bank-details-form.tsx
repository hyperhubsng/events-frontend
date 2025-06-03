import { useForm } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import LoadingButton from '@/components/loading-button';

const formSchema = z.object({
	bank: z.string().min(1, { message }),
	accountName: z.string().min(1, { message }),
	accountNumber: z.string().min(1, { message }),
	bvn: z.string().min(1, { message }),
});

const BankDetailsForm = ({ onClose }: { onClose: () => void }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bank: '',
			accountName: '',
			accountNumber: '',
			bvn: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};

	return (
		<DialogContent>
			<div className='flex justify-end'>
				<button
					onClick={() => {
						onClose();
						form.reset();
					}}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M20 5.61143L18.3886 4L12 10.3886L5.61143 4L4 5.61143L10.3886 12L4 18.3886L5.61143 20L12 13.6114L18.3886 20L20 18.3886L13.6114 12L20 5.61143Z'
							fill='#202020'
						/>
					</svg>
				</button>
			</div>
			<DialogHeader className='flex flex-col items-center justify-center'>
				<DialogTitle className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
					Bank Details Form
				</DialogTitle>
				<DialogDescription className='text-[#4D4D4D] text-base'>
					Enter banking details
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='bank'
						render={({ field }) => (
							<FormItem id='bank' className='mt-4'>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='bank'>
									Choose bank
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										// disabled={isLoading}
									>
										<SelectTrigger
											className='h-[44px] text-sm font-medium text-black-950
                            focus-visible:ring-0 w-full'>
											<SelectValue
												placeholder='Select bank'
												className='text-black-950'
											/>
										</SelectTrigger>
										<SelectContent className='w-full'>
											<SelectItem
												value={'access_bank'}
												className='w-full cursor-pointer bg-transparent'>
												Access Bank
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
						name='accountNumber'
						render={({ field }) => (
							<FormItem className='md:col-span-2 mt-4'>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='accountNumber'>
									Enter account number
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='accountNumber'
										placeholder='1234567890'
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
						name='bvn'
						render={({ field }) => (
							<FormItem className='md:col-span-2 mt-4'>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='bvn'>
									Enter BVN
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='bvn'
										placeholder='1234567890'
										className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
                focus-visible:ring-0
                '
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<LoadingButton variant='primary' loading={false} className='w-full mt-4'>
						Continue
					</LoadingButton>
				</form>
			</Form>
		</DialogContent>
	);
};

export default BankDetailsForm;
