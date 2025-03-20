'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema } from '@/lib/schemas';
import { Form } from '@/components/ui/form';
import {
	selectPreviewEvent,
	setPreviewEvent,
} from '@/features/tickets/ticketsSlice';

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

	const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
		dispatch(setPreviewEvent(data));
		router.push('/events/create-event/preview');
	};

	useEffect(() => {
		// 		const mounted = true;
		// 		if (edit && mounted) {
		// 			form.setValue('event_name', 'Detty December 2025');
		// 			form.setValue('startDate', new Date());
		// 			form.setValue('start_time', '07:00PM');
		// 			form.setValue('venue', '123, Lorem Ispum street, VI, Lagos State.');
		// 			form.setValue('coordinates', 'Opposite, Pizza Hut');
		// 			form.setValue('eventType', 'paid');
		// 			form.setValue('ownerId', 'XYZ Corp');
		// 			form.setValue(
		// 				'about',
		// 				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra nisi vel enim eleifend, at sagittis libero tincidunt. Integer bibendum mauris et justo tristique, sit amet porttitor lorem aliquam.
		// Cras feugiat vehicula justo, ut vestibulum purus consectetur vel.
		// Pellentesque euismod dapibus sem, sit amet faucibus felis convallis et. Aliquam et tellus eu felis sagittis vulputate vel id justo. Nam viverra ligula nec sapien fringilla, vel volutpat ipsum interdum. Suspendisse potenti.
		// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra nisi vel enim eleifend, at sagittis libero tincidunt. Integer bibendum mauris et justo tristique, sit amet porttitor lorem aliquam.`
		// 			);
		// 		}
	}, [edit, form]);

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
								<Media form={form} />
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
