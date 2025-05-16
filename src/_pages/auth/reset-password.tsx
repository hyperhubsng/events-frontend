/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/features/auth/authApi';
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
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import LoadingButton from '@/components/loading-button';
import Link from 'next/link';
import Image from 'next/image';

const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const passwordSchema = z
		.string()
		.min(8, 'Password must be at least 8 characters long');
	// .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	// .regex(/[a-z]/, "Password must contain at least one lowercase letter")
	// .regex(/[0-9]/, "Password must contain at least one number")
	// .regex(/[\W_]/, "Password must contain at least one special character");

	const formSchema = z
		.object({
			password: passwordSchema,
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const [resetPwd, { isLoading, isSuccess }] = useResetPasswordMutation();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await resetPwd({ ...data, resetToken: '' }).unwrap();
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<div>
			{!isSuccess ? (
				<>
					<div className='mt-6 md:mt-8 text-center'>
						<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
							Reset Password
						</h1>
						<p className='text-[#4D4D4D] text-base'>
							Enter a new password and confirm password
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6 mt-8'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
											Password
										</FormLabel>

										<FormControl>
											<div className='relative flex items-center'>
												<Input
													placeholder='xxxxx'
													{...field}
													className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
                              focus-visible:ring-0
                              '
													type={!showPassword ? 'password' : 'text'}
												/>
												<button
													type='button'
													className='absolute right-3'
													onClick={() => setShowPassword(!showPassword)}>
													{!showPassword ? (
														<Eye color='#606060' />
													) : (
														<EyeOff color='#606060' />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
											Confirm Password
										</FormLabel>

										<FormControl>
											<div className='relative flex items-center'>
												<Input
													placeholder='xxxxx'
													{...field}
													className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
                              focus-visible:ring-0
                              '
													type={!showConfirmPassword ? 'password' : 'text'}
												/>
												<button
													type='button'
													className='absolute right-3'
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}>
													{!showConfirmPassword ? (
														<Eye color='#606060' />
													) : (
														<EyeOff color='#606060' />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<LoadingButton
								className='mt-4 w-full'
								variant='primary'
								loading={isLoading}>
								Reset password
							</LoadingButton>
						</form>
					</Form>
				</>
			) : (
				<Success />
			)}
		</div>
	);
};

export default ResetPassword;

const Success = () => {
	return (
		<div className='flex flex-col items-center justify-center text-center mt-4 gap-2'>
			<Image
				src='/icons/reset-success.svg'
				width={165}
				height={165}
				alt='reset success icon'
				className='max-[600px]:h-[120px]'
			/>

			<div>
				<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
					Reset Password Successful
				</h1>
				<p className='text-[#4D4D4D] text-base max-w-[26.813rem]'>
					You have successfully reset your password
				</p>
			</div>

			<Link href='/login' className='w-full mt-4'>
				<Button variant={'primary'} className='w-full'>
					Sign in
				</Button>
			</Link>
		</div>
	);
};
