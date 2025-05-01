/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import {
	useEditOrganizerMutation,
	useOnboardOrganizerMutation,
} from '@/features/auth/authApi';
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
import { User } from '@/features/users/types';
import { toast } from 'sonner';

import LoadingButton from '@/components/loading-button';

const OrganizerSchema = z.object({
	firstName: z.string().min(1, { message }),
	lastName: z.string().min(1, { message }),
	phoneNumber: z
		.string()
		.min(11, { message })
		.max(11, { message: 'Cannot be more than 11 digits' }),
	companyName: z.string().min(1, { message }),
	email: z.string().email(),
	website: z.string().optional(),
});

const OrganizerForm = ({
	setOpenModal,
	user,
}: {
	setOpenModal: (e: boolean) => void;
	user?: User;
}) => {
	const form = useForm<z.infer<typeof OrganizerSchema>>({
		resolver: zodResolver(OrganizerSchema),
		defaultValues: {
			firstName: user?.firstName ?? '',
			lastName: user?.lastName ?? '',
			email: user?.email ?? '',
			phoneNumber: user?.phoneNumber ?? '',
			companyName: user?.companyName ?? '',
			website: user?.website ?? '',
		},
	});

	const [onboard, { isLoading }] = useOnboardOrganizerMutation();
	const [edit, { isLoading: isEditing }] = useEditOrganizerMutation();

	const onSubmit = async (data: z.infer<typeof OrganizerSchema>) => {
		try {
			if (!user) {
				await onboard({ ...data, password: '12345678' }).unwrap();
				toast.success('Organizer invited successfully');
			} else {
				await edit({ ...data, _id: user?._id }).unwrap();
				toast.success('Organizer edited successfully');
			}
			setOpenModal(false);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

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
					<FormField
						control={form.control}
						name='companyName'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='companyName'>
									Company Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='companyName'
										placeholder='Enter company name'
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
						name='email'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
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
							<FormItem>
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
						name='website'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className='text-black-950 text-sm md:text-base font-semibold'
									htmlFor='website'>
									Website (Optional)
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='website'
										placeholder='https://'
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

export default OrganizerForm;
