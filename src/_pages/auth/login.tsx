/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/lib/hooks';
import { useLoginMutation } from '@/features/auth/authApi';
import { setUser } from '@/features/auth/authSlice';
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
import { setAuthCookie } from '@/lib/auth';

import Link from 'next/link';
import LoadingButton from '@/components/loading-button';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useAppDispatch();

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(4, {
			message: 'This field is required',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [loginUser, { isLoading }] = useLoginMutation();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			const res = await loginUser({
				email: data.email,
				password: data.password,
			}).unwrap();

			await setAuthCookie('access-token', res?.data?.token);

			const userClone = { ...res?.data };
			delete userClone?.token;
			dispatch(setUser(userClone));
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<div>
			<div className='border-b border-solid border-b-[#E8E8E8] py-2 mt-4'>
				<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold'>
					Welcome
				</h1>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-8 mt-6'>
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
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center justify-between'>
									<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
										Password
									</FormLabel>
									<Link
										href='/forgot-password'
										className='
                        text-blue-50 text-sm md:text-base font-semibold 
                        relative
                        before:absolute before:bottom-0 before:w-full before:h-[1.5px] before:bg-blue-50'>
										Forgot Password?
									</Link>
								</div>
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

					<LoadingButton loading={isLoading} variant='primary' className='mt-6'>
						Sign In
					</LoadingButton>
				</form>
			</Form>
		</div>
	);
};

export default Login;
