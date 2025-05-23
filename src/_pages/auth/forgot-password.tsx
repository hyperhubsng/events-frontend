/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import {
	useForgotPasswordMutation,
	useVerifyForgotPasswordMutation,
} from '@/features/auth/authApi';
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
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setResetToken } from '@/features/auth/authSlice';

import LoadingButton from '@/components/loading-button';
import Image from 'next/image';

const ForgotPassword = ({ onSubmitComplete }: { onSubmitComplete?: () => void }) => {
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
					<div className='mt-6 md:mt-8 text-center'>
						{!onSubmitComplete ? (
							<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
								Reset Password
							</h1>
						) : (
							<DialogTitle className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
								Reset Password
							</DialogTitle>
						)}
						{!onSubmitComplete ? (
							<p className='text-[#4D4D4D] text-base'>
								Enter your email to continue with your password reset
							</p>
						) : (
							<DialogDescription className='text-[#4D4D4D] text-base'>
								Enter your email to continue with your password reset
							</DialogDescription>
						)}
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
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
				<Success
					email={form.getValues('email')}
					onSubmitComplete={onSubmitComplete}
				/>
			)}
		</div>
	);
};

export default ForgotPassword;

const Success = ({
	email,
	onSubmitComplete,
}: {
	email: string;
	onSubmitComplete?: () => void;
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [timer, setTimer] = useState(59);
	const [showOtp, setShowOtp] = useState(false);
	const [otp, setOtp] = useState('');

	const [forgotPwd, { isLoading }] = useForgotPasswordMutation();
	const [verifyPwd, { isLoading: isVerifying, isError, reset }] =
		useVerifyForgotPasswordMutation();

	const onSubmit = async () => {
		try {
			const res = await forgotPwd({ email }).unwrap();
			toast.success(res?.message);
			setTimer(59);
			reset();
			setShowOtp(false);
			setOtp('');
		} catch (error: any) {
			// toast.error(error?.data?.message);
		}
	};

	const onVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (otp.length < 5) return;

		try {
			const res = await verifyPwd({ otpEmail: email, otp }).unwrap();
			dispatch(setResetToken(res?.data?.resetToken));
			toast.success('Successful. Proceed to reset your password');
			if (!onSubmitComplete) {
				router.push('/reset-password');
			} else {
				onSubmitComplete();
			}
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
			{!isError && !showOtp ? (
				<>
					<Image
						src='/icons/sent.svg'
						width={175}
						height={175}
						alt='sent icon'
						className='max-[600px]:h-[120px]'
					/>

					<div className='mt-4 text-center'>
						{!onSubmitComplete ? (
							<>
								<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
									Reset Password
								</h1>
								<p className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
									We just popped a quick email to{' '}
									<span className='font-bold'>{email} </span>
									to reset your password.
								</p>
							</>
						) : (
							<>
								<DialogTitle className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
									Reset Password
								</DialogTitle>
								<DialogDescription className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
									We just popped a quick email to{' '}
									<span className='font-bold'>{email} </span>
									to reset your password.
								</DialogDescription>
							</>
						)}
					</div>

					{/* <p className='text-[#4D4D4D] text-base mt-6'>
							Resend otp in{' '}
							<span className='font-bold'>
								00:{timer < 10 ? 0 : ''}
								{timer}
							</span>
						</p> */}

					<div className='mt-4 grid gap-4 w-full'>
						<Button
							variant={'primary'}
							className='w-full'
							onClick={() => setShowOtp(true)}>
							Verify account
						</Button>
						<LoadingButton
							loading={isLoading}
							variant='outline'
							className='w-full'
							onClick={onSubmit}
							disabled={timer > 0}>
							Resend otp {timer > 0 && `in 00:${timer < 10 ? 0 : ''}${timer}`}
						</LoadingButton>
					</div>
				</>
			) : showOtp && !isError ? (
				<form onSubmit={onVerifySubmit}>
					<div className='mt-4 text-center'>
						<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
							Verify Account
						</h1>
						<p className='text-[#4D4D4D] text-base'>
							Enter the OTP code that was sent to{' '}
							<span className='font-bold'>{email} </span>
						</p>
					</div>

					<InputOTP
						maxLength={6}
						value={otp}
						onChange={(value) => setOtp(value)}
						pattern={REGEXP_ONLY_DIGITS}>
						<InputOTPGroup className='mt-8 gap-6 justify-between w-full'>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>

					<LoadingButton
						variant='primary'
						loading={isVerifying}
						className='w-full mt-8'
						disabled={otp.length < 6}>
						Verify
					</LoadingButton>
				</form>
			) : (
				isError && (
					<>
						<Image
							src='/icons/error.svg'
							width={150}
							height={150}
							alt='sent icon'
							className='max-[600px]:h-[120px]'
						/>

						<div className='mt-4 text-center'>
							<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
								Verification failed
							</h1>
							<p className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
								We&apos;ve failed to verify your account because the otp expired or
								is invalid
							</p>
						</div>

						<LoadingButton
							loading={isLoading}
							variant='primary'
							className='w-full mt-4'
							onClick={onSubmit}>
							Resend otp
						</LoadingButton>
					</>
				)
			)}
		</div>
	);
};
