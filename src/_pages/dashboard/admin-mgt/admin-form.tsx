/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import {
	useEditAdminMutation,
	useOnboardAdminMutation,
} from '@/features/auth/authApi';
import { useGetRolesQuery } from '@/features/roles-and-permissions/rolesPermissionsApi';
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
import { DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { User } from '@/features/users/types';
import { toast } from 'sonner';

import LoadingButton from '@/components/loading-button';

const AdminSchema = z.object({
	firstName: z.string().min(1, { message }),
	lastName: z.string().min(1, { message }),
	phoneNumber: z
		.string()
		.min(11, { message })
		.max(11, { message: 'Cannot be more than 11 digits' }),
	role: z.string().min(1, { message }),
	email: z.string().email(),
});

const AdminForm = ({
	setOpenModal,
	user,
}: {
	setOpenModal: (e: boolean) => void;
	user?: User;
}) => {
	const form = useForm<z.infer<typeof AdminSchema>>({
		resolver: zodResolver(AdminSchema),
		defaultValues: {
			firstName: user?.firstName ?? '',
			lastName: user?.lastName ?? '',
			email: user?.email ?? '',
			role: user?.role?.title ?? '',
			phoneNumber: user?.phoneNumber ?? '',
		},
	});

	const [onboard, { isLoading }] = useOnboardAdminMutation();
	const [edit, { isLoading: isEditing }] = useEditAdminMutation();

	const onSubmit = async (data: z.infer<typeof AdminSchema>) => {
		try {
			if (!user) {
				const res = await onboard({
					...data,
					password: '12345678',
					userType: 'adminuser',
				}).unwrap();
				toast.success(res?.data?.message);
			} else {
				await edit({ ...data, _id: user?._id, userType: 'adminuser' }).unwrap();
				toast.success('Admin edited successfully');
			}
			setOpenModal(false);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	const { data: roles } = useGetRolesQuery({});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='firstName'>
									First Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='firstName'
										placeholder='John'
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
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='lastName'>
									Last Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='lastName'
										placeholder='Doe'
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
					name='email'
					render={({ field }) => (
						<FormItem className='md:col-span-2 mt-4'>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='email'>
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									id='email'
									placeholder='username@domainprovider.com'
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
					name='phoneNumber'
					render={({ field }) => (
						<FormItem className='mt-4'>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='phoneNumber'>
								Phone Number
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									id='phoneNumber'
									placeholder='Enter phone number'
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
					name='role'
					render={({ field }) => (
						<FormItem id='role' className='mt-4'>
							<FormLabel
								className='text-black-950 text-sm md:text-base font-semibold'
								htmlFor='role'>
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
										{roles?.data?.map((role) => (
											<SelectItem
												key={role?._id}
												value={role?._id}
												className='w-full cursor-pointer bg-transparent'>
												{role?.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex items-center justify-center'>
					<LoadingButton
						loading={isLoading || isEditing}
						variant='primary'
						className='max-w-[19.125rem] w-full  mt-8'>
						<DialogDescription className='text-white'>
							{!user ? 'Send Invitation' : 'Continue'}
						</DialogDescription>
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
};

export default AdminForm;
