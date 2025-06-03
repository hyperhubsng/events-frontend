import { useEffect, useState } from 'react';
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
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import LoadingButton from '@/components/loading-button';
import Image from 'next/image';

const formOneSchema = z.object({
	otp: z.string().min(1, { message }),
});

const formSchema = z.object({
	amount: z.string().min(1, { message }),
});

const WithdrawalForm = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [activeTab, setActiveTab] = useState(0);

	const formOne = useForm<z.infer<typeof formOneSchema>>({
		resolver: zodResolver(formOneSchema),
		defaultValues: {
			otp: '',
		},
	});

	const tabs = ['Generate OTP', 'Details', 'All set to go'];

	const onFormOneSubmit = async (data: z.infer<typeof formOneSchema>) => {
		console.log(data);
		setActiveTab(1);
		// formOne.reset();
	};

	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				formOne.reset();
				setActiveTab(0);
			}, 1000);
		}
	}, [formOne, isOpen]);

	return (
		<DialogContent>
			<div className='flex justify-end'>
				<button
					onClick={() => {
						onClose();

						setTimeout(() => {
							formOne.reset();
							setActiveTab(0);
						}, 1000);
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
			<DialogHeader>
				<DialogTitle className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
					Withdrawal Request Form
				</DialogTitle>
			</DialogHeader>

			<ul className='flex items-center justify-between gap-5'>
				{tabs.map((tab, index) => (
					<li key={tab} className='flex flex-col w-full'>
						<DialogDescription
							className={`text-xs transition-colors duration-300 ease-in-out ${
								activeTab === index ? 'text-blue-50' : 'text-[#BFCCD9]'
							}`}>
							{index + 1}. {tab}
						</DialogDescription>
						<span className='relative w-full h-[4.5px] rounded-full bg-[#BFCCD9]'>
							<span
								className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-in-out ${
									activeTab === index ? 'bg-blue-50 w-full' : 'w-0'
								}`}
							/>
						</span>
					</li>
				))}
			</ul>

			{activeTab === 0 ? (
				<Form {...formOne}>
					<form
						onSubmit={formOne.handleSubmit(onFormOneSubmit)}
						className='space-y-4'>
						<FormField
							control={formOne.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='md:col-span-2 mt-4'>
									<FormLabel
										className='text-black-950 text-sm md:text-base font-semibold'
										htmlFor='otp'>
										Enter OTP
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='otp'
											placeholder='123456'
											className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
															focus-visible:ring-0
															'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<LoadingButton
							variant='primary'
							loading={formOne.formState.isSubmitting}
							className='w-full mt-2'>
							Continue
						</LoadingButton>
						<Button className='w-full mt-1' variant={'outline'} type='button'>
							Request OTP
						</Button>
					</form>
				</Form>
			) : activeTab === 1 ? (
				<FormTwo setActiveTab={setActiveTab} />
			) : (
				<div className='flex flex-col items-center justify-center'>
					<Image
						src='/icons/reset-success.svg'
						width={165}
						height={165}
						alt='reset success icon'
						className='max-[600px]:h-[120px]'
					/>
					<DialogTitle className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
						Transaction Successful
					</DialogTitle>
					<DialogDescription className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
						The request will take 1-2 working days to reflect
					</DialogDescription>

					<Button variant={'primary'} className='mt-4 w-full' onClick={onClose}>
						Close
					</Button>
				</div>
			)}
		</DialogContent>
	);
};

export default WithdrawalForm;

const FormTwo = ({ setActiveTab }: { setActiveTab: (e: number) => void }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
		},
	});

	const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
		console.log(data);
		setActiveTab(2);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem className='md:col-span-2 mt-4'>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='amount'>
								Enter Amount
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									id='amount'
									placeholder='N 89999000'
									className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
															focus-visible:ring-0
															'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<p className='-mt-2 text-[#4D4D4D] text-sm'>
					Minimum Limit: N30,000 - Maximum Limit: N 20,000,00
				</p>

				<LoadingButton
					variant='primary'
					loading={form.formState.isSubmitting}
					className='w-full mt-2'>
					Withdraw
				</LoadingButton>
			</form>
		</Form>
	);
};
