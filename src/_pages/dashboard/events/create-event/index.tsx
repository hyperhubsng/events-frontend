/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useCreateEventMutation } from '@/features/events/eventsApi';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema } from '@/lib/schemas';
import { Form } from '@/components/ui/form';
import { selectPreviewEvent, setPreviewEvent } from '@/features/events/eventsSlice';

import BreadcrumbWrapper from '@/components/breadcrumb';
import BasicDetails from './basic-details';
import Media from './media';
import TicketCategory from './ticket-category';

const CreateEvent = ({ edit }: { edit?: boolean }) => {
	const params = useSearchParams();
	const tab = params.get('tab');

	const dispatch = useAppDispatch();
	const router = useRouter();

	const previewEvent = useAppSelector(selectPreviewEvent);

	const form = useForm<z.infer<typeof CreateEventSchema>>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			description: previewEvent?.description ?? '',
			venue: previewEvent?.venue ?? '',
			title: previewEvent?.title ?? '',
			eventType: previewEvent?.eventType ?? '',
			coordinates: previewEvent?.coordinates ?? '',
			ownerId: previewEvent?.ownerId ?? '',
			start_time: previewEvent?.start_time ?? '',
			startDate: previewEvent?.startDate ?? undefined,
			// thumbnail: previewEvent?.thumbnail ?? undefined,
			event_img_1: previewEvent?.event_img_1 ?? undefined,
			event_img_2: previewEvent?.event_img_2 ?? undefined,
			event_img_3: previewEvent?.event_img_3 ?? undefined,
		},
	});

	const [createEvent, { isLoading }] = useCreateEventMutation();

	const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
		dispatch(setPreviewEvent(data));
		try {
			const formData = new FormData();

			const keys: (keyof typeof data)[] = [
				'description',
				'venue',
				'title',
				'eventType',
				'ownerId',
			];

			keys.forEach((key) => {
				formData.append(key, data[key] as string);
			});

			formData.append(
				'startDate',
				`${format(data.startDate, 'yyyy-MM-dd')} ${data.start_time}`
			);

			// formData.append('endDate', `${format(data.startDate, 'yyyy-MM-dd')} 09:02`);

			const files = [data.event_img_1, data.event_img_2, data.event_img_3];

			files.forEach((file) => {
				formData.append('files', file);
			});

			const res = await createEvent(formData).unwrap();
			toast.success('Success! Please proceed to create ticket categories.');

			router.push(`/events/create-event?tab=ticket&eventId=${res?.data?._id}`);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	useEffect(() => {}, [edit, form]);

	return (
		<BreadcrumbWrapper items={['Events', 'Create Event']}>
			<div className='flex items-center justify-center p-4'>
				<div className='bg-white p-4 md:p-6 rounded-[4px] md:rounded-[8px] min-[1200px]:max-w-[39.25rem] w-full'>
					<div className='flex items-center justify-between'>
						<h2 className='text-base md:text-2xl text-black-950 font-bold'>
							{!tab
								? 'Basic Details'
								: tab === 'media'
								? 'Media'
								: tab === 'ticket'
								? 'Ticket Category'
								: ''}
						</h2>
						<h3 className='text-sm md:text-base text-black-950 font-bold'>
							{!tab ? 1 : tab === 'media' ? 2 : 3}/3
						</h3>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className=''>
							{!tab ? (
								<BasicDetails form={form} />
							) : tab === 'media' ? (
								<Media form={form} isLoading={isLoading} />
							) : tab === 'ticket' ? (
								<TicketCategory />
							) : null}
						</form>
					</Form>
				</div>
			</div>
		</BreadcrumbWrapper>
	);
};

export default CreateEvent;
