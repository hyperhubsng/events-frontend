/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { icons } from '@/components/icons';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
import { useLazyCheckInGuestQuery } from '@/features/events/eventsApi';

import LoadingButton from '@/components/loading-button';

const FormSchema = z.object({
	code: z.string().min(2, {
		message: 'Required',
	}),
});

const CheckInModal = ({
	onClose,
	refetch,
}: {
	onClose: () => void;
	refetch: () => void;
}) => {
	const [selected, setSelected] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const options = [
		{
			icon: icons.QR,
			title: 'Scan QR Code',
		},
		{
			icon: icons.Keyboard,
			title: 'Manual Input',
		},
	];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			code: '',
		},
	});

	const [checkInGuest] = useLazyCheckInGuestQuery();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			setIsLoading(true);

			const res = await checkInGuest({
				action: 'checkin',
				actionType: 'code',
				code: data.code,
			}).unwrap();

			if (res?.message === 'Already checked') {
				toast.error('Guest already checked-in');
			} else {
				toast.success('Guest Checked-in successfully');
			}
		} catch (error: any) {
			toast.error(error.data?.message);
		} finally {
			setIsLoading(false);
		}
		refetch();
		onClose();
		setSelected('');
		form.reset();
	}

	return (
		<DialogContent className='min-w-max'>
			<DialogHeader className='flex items-center justify-between flex-row'>
				<DialogTitle className='text-[1.25rem md:text-2xl text-black-950 font-bold'>
					Check-in Guest
				</DialogTitle>

				<button onClick={onClose}>{icons.Close}</button>
			</DialogHeader>

			<div className='grid md:grid-cols-2 gap-6 mt-6'>
				{options.map((option) => (
					<button
						key={option.title}
						onClick={() => setSelected(option.title)}
						className={cn(
							`flex flex-col items-center gap-6 justify-center border border-solid border-white-200 
                rounded-[8px] h-[158px] md:h-[240px] w-full md:w-[240px] text-black-950
                transition-all duration-300 ease-in-out
                `,
							selected === option.title && 'bg-blue-50 text-white  s-check'
						)}>
						{option.icon}
						<p className='text-base md:text-[1.25rem] font-medium '>
							{option.title}
						</p>
					</button>
				))}
			</div>

			{selected === 'Manual Input' && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className='text-black-950 text-sm md:text-base font-semibold'
										htmlFor='code'>
										Event Code
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='code'
											placeholder='Enter the code'
											className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
                        focus-visible:ring-0
                        '
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			)}

			<LoadingButton
				loading={isLoading}
				variant={'primary'}
				className='mt-10 w-full md:w-[19.125rem] mx-auto'
				disabled={!selected}
				onClick={
					selected === 'Manual Input' ? form.handleSubmit(onSubmit) : undefined
				}>
				Continue
			</LoadingButton>
		</DialogContent>
	);
};

export default CheckInModal;
