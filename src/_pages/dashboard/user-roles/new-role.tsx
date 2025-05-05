/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import {
	useCreateRoleMutation,
	useGetPermissionsQuery,
} from '@/features/roles-and-permissions/rolesPermissionsApi';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

import LoadingButton from '@/components/loading-button';

const formOneSchema = z.object({
	title: z.string().min(1, { message }),
	description: z.string().min(1, { message }),
});

const formTwoSchema = z.object({
	permissions: z.array(z.string()).min(1, { message }),
});

const NewRole = () => {
	const router = useRouter();
	const params = useSearchParams();
	const pathname = usePathname();
	const tab = params.get('tab') || 1;

	const form = useForm<z.infer<typeof formOneSchema>>({
		resolver: zodResolver(formOneSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});
	const formTwo = useForm<z.infer<typeof formTwoSchema>>({
		resolver: zodResolver(formTwoSchema),
		defaultValues: {
			permissions: [],
		},
	});

	const [createRole, { isLoading }] = useCreateRoleMutation();
	const { data: permissions } = useGetPermissionsQuery({});

	const [checked, setChecked] = useState(false);

	const onFormOneSubmit = () => router.push(`${pathname}?tab=2`);

	const onSubmit = async (data: z.infer<typeof formTwoSchema>) => {
		try {
			await createRole({
				...data,
				description: form.watch('description'),
				title: form.watch('title'),
			}).unwrap();

			toast.success('Role created successfully');

			router.push('/user-roles');
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='max-w-[39.25rem] w-full bg-white p-4 md:p-6 rounded-[8px]'>
				<div className='flex items-center justify-between'>
					<h2 className='text-[1.25rem] md:text-2xl text-black-950 font-bold'>
						{tab === 1 ? 'New Role' : 'Role Permission'}
					</h2>

					<p className='text-sm text-black-950 font-bold'>{tab}/2</p>
				</div>
				{tab === 1 ? (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onFormOneSubmit)}>
							<div className='grid gap-4 mt-6'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className='text-black-950 text-sm md:text-base font-semibold'
												htmlFor='title'>
												Title
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													id='title'
													placeholder='ex. Organizer'
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
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className='text-black-950 text-sm md:text-base font-semibold'
												htmlFor='description'>
												About Role
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
							</div>
							<Button className='w-full mt-8' variant={'primary'}>
								Proceed
							</Button>
						</form>
					</Form>
				) : (
					<Form {...formTwo}>
						<form onSubmit={formTwo.handleSubmit(onSubmit)}>
							<div className='mt-6'>
								<div className='flex items-center justify-between'>
									<h3 className='text-base md:text-[1.25rem] font-bold text-black-950'>
										Assign all permissions
									</h3>

									<Switch
										checked={checked}
										onCheckedChange={() => {
											setChecked(!checked);

											if (!checked) {
												formTwo.setValue(
													'permissions',
													permissions!.data?.map((perm) => perm?.title)
												);
											} else {
												formTwo.setValue('permissions', []);
											}
										}}
									/>
								</div>

								<FormField
									control={formTwo.control}
									name='permissions'
									render={() => (
										<FormItem className='grid gap-4 mt-6'>
											{Array.from(
												new Map(
													permissions?.data?.map((item) => [item.title, item])
												).values()
											)?.map((perm) => (
												<FormField
													key={perm?._id}
													control={formTwo.control}
													name='permissions'
													render={({ field }) => {
														return (
															<FormItem
																key={perm?._id}
																className='flex items-center'>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(perm?.title)}
																		onCheckedChange={(checked) => {
																			if (checked) {
																				field.onChange([
																					...field.value,
																					perm?.title,
																				]);
																			} else {
																				field.onChange(
																					field.value?.filter(
																						(value) => value !== perm?.title
																					)
																				);
																				setChecked(false);
																			}
																		}}
																	/>
																</FormControl>
																<FormLabel className='text-black-950 text-sm md:text-base font-normal'>
																	{perm?.title}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='grid gap-4 md:grid-cols-2 mt-8'>
									<LoadingButton
										loading={isLoading}
										variant='primary'
										className='w-full'>
										Create User Role
									</LoadingButton>

									<Button
										variant={'outline'}
										className='w-full'
										type='button'
										onClick={() => router.back()}>
										Go Back
									</Button>
								</div>
							</div>
						</form>
					</Form>
				)}
			</div>
		</div>
	);
};

export default NewRole;
