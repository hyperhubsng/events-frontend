/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '@/features/auth/authApi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import LoadingButton from '@/components/loading-button';
import Image from 'next/image';

const ForgotPassword = () => {
	const formSchema = z.object({
		email: z.string().email(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	const [forgotPwd, { isLoading, isSuccess }] = useForgotPasswordMutation();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await forgotPwd(data).unwrap();
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<div>
			{!isSuccess ? (
				<>
					<div className='py-2 mt-4 text-center'>
						<h1 className='text-[#101010] text-2xl md:text-[1.75rem] text-center font-semibold'>
							Reset Password
						</h1>
						<p className='text-[#4D4D4D] text-base'>
							Enter your email to continue with your password reset
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='mt-6'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												placeholder='username@hyperhubs.com'
												{...field}
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
								loading={isLoading}
								variant='primary'
								className='mt-10 w-full'>
								Continue
							</LoadingButton>
						</form>
					</Form>
				</>
			) : (
				<Success email={form.getValues('email')} />
			)}
		</div>
	);
};

export default ForgotPassword;

const Success = ({ email }: { email: string }) => {
	const [timer, setTimer] = useState(59);

	const [forgotPwd, { isLoading }] = useForgotPasswordMutation();

	const onSubmit = async () => {
		try {
			const res = await forgotPwd({ email }).unwrap();
			toast.success(res?.message);
			setTimer(59);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		if (timer !== 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [timer]);

	return (
		<div className='flex flex-col items-center justify-center mt-4'>
			<Image
				src='/icons/sent.svg'
				width={175}
				height={175}
				alt='sent icon'
				className='max-[600px]:h-[120px]'
			/>

			<div className='mt-4 text-center'>
				<h1 className='text-[#101010] text-2xl md:text-[1.75rem] text-center font-semibold'>
					Reset Password
				</h1>
				<p className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
					We just popped a quick email to <span className='font-bold'>{email} </span>
					to reset your password just tap the link to get things started
				</p>
			</div>

			{timer > 0 ? (
				<p className='text-[#4D4D4D] text-base mt-6'>
					Resend link in{' '}
					<span className='font-bold'>
						00:{timer < 10 ? 0 : ''}
						{timer}
					</span>
				</p>
			) : (
				<LoadingButton
					loading={isLoading}
					variant='primary'
					className='mt-4 w-full'
					onClick={onSubmit}>
					Resend link
				</LoadingButton>
			)}
		</div>
	);
};
