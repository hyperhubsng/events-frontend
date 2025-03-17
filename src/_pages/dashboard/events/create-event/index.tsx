'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema } from '@/lib/schemas';
import { Form } from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';

import BreadcrumbWrapper from '@/components/breadcrumb';
import BasicDetails from './basic-details';
import Media from './media';
import TicketCategory from './ticket-category';

const CreateEvent = () => {
	const params = useSearchParams();
	const tab = params.get('tab');

	const form = useForm<z.infer<typeof CreateEventSchema>>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			about: '',
			event_address: '',
			event_name: '',
			event_type: '',
			landmark: '',
			organization: '',
			start_time: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
		console.log(data);
	};

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
								: 'Ticket Category'}
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
							) : (
								<TicketCategory />
							)}
						</form>
					</Form>
				</div>
			</div>
		</BreadcrumbWrapper>
	);
};

export default CreateEvent;
