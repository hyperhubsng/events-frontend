/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useDeleteEventMutation } from '@/features/events/eventsApi';
import { useAppDispatch } from '@/lib/hooks';
import { setPreviewEvent } from '@/features/events/eventsSlice';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Event as EventProps } from '@/features/events/types';
import { format } from 'date-fns';
import { toast } from 'sonner';

import LoadingButton from '@/components/loading-button';
import Image from 'next/image';
import Link from 'next/link';

const Event: React.FC<EventProps> = ({ ...props }) => {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useAppDispatch();

	const [deleteEvent, { isLoading }] = useDeleteEventMutation();

	const links = [
		{
			name: 'Edit Event',
			link: `/events/${props?._id}/edit`,
		},
		{
			name: 'Discount Code',
			link: `/events/${props?._id}/discount-code`,
		},
		{
			name: 'Sales',
			link: `/events/${props?._id}/sales`,
		},
		{
			name: 'Guest Check-in',
			link: `/events/${props?._id}/guests`,
		},
	];

	const handleDelete = async () => {
		try {
			const res = await deleteEvent(props?._id).unwrap();
			toast.success(res?.message);
			setOpenModal(false);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<li
			className='border border-white-200 border-solid list-none
                 rounded-[4px] md:rounded-[8px] relative'>
			<figure>
				<Image
					src={props?.images ? props?.images[0] : '/images/event-img.png'}
					width={264}
					height={160}
					alt={`thumbnail image for ${props?.title}`}
					className='rounded-t-[4px] md:rounded-t-[8px] w-full h-[10rem] object-cover'
				/>
			</figure>

			<div className='p-3'>
				<h3 className='text-[1.125rem] text-black-950 font-bold leading-[1]'>
					{props?.title}
				</h3>
				<div className='mt-3'>
					<p className='text-sm text-black-700'>
						{format(props?.startDate, 'dd/MM/yyyy')}
					</p>
					<p className='text-sm text-black-700'>
						{format(props?.startDate, 'K:mmaa')}
					</p>
					<p className='text-sm text-black-700'>{props?.venue}</p>
				</div>
			</div>

			<Popover>
				<PopoverTrigger asChild className='absolute top-3 right-3'>
					<button>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<rect width='24' height='24' rx='12' fill='white' />
							<path
								d='M12 12.0413C12.2876 12.0413 12.5207 11.8082 12.5207 11.5207C12.5207 11.2331 12.2876 11 12 11C11.7124 11 11.4793 11.2331 11.4793 11.5207C11.4793 11.8082 11.7124 12.0413 12 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M18.4793 12.0413C18.7669 12.0413 19 11.8082 19 11.5207C19 11.2331 18.7669 11 18.4793 11C18.1918 11 17.9587 11.2331 17.9587 11.5207C17.9587 11.8082 18.1918 12.0413 18.4793 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M5.52066 12.0413C5.80821 12.0413 6.04132 11.8082 6.04132 11.5207C6.04132 11.2331 5.80821 11 5.52066 11C5.23311 11 5 11.2331 5 11.5207C5 11.8082 5.23311 12.0413 5.52066 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M12 12.0413C12.2876 12.0413 12.5207 11.8082 12.5207 11.5207C12.5207 11.2331 12.2876 11 12 11C11.7124 11 11.4793 11.2331 11.4793 11.5207C11.4793 11.8082 11.7124 12.0413 12 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18.4793 12.0413C18.7669 12.0413 19 11.8082 19 11.5207C19 11.2331 18.7669 11 18.4793 11C18.1918 11 17.9587 11.2331 17.9587 11.5207C17.9587 11.8082 18.1918 12.0413 18.4793 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M5.52066 12.0413C5.80821 12.0413 6.04132 11.8082 6.04132 11.5207C6.04132 11.2331 5.80821 11 5.52066 11C5.23311 11 5 11.2331 5 11.5207C5 11.8082 5.23311 12.0413 5.52066 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</PopoverTrigger>
				<PopoverContent
					className='bg-white rounded-[4px] w-[6.688rem] p-0'
					align='start'>
					{links.map((link, i) => (
						<Link
							href={link.link}
							key={link.name}
							className='text-black-950 text-xs p-2 whitespace-nowrap block'
							onClick={() => (i == 0 ? dispatch(setPreviewEvent(props)) : null)}>
							{link.name}
						</Link>
					))}
					<Dialog open={openModal} onOpenChange={setOpenModal}>
						<DialogTrigger asChild>
							<button className='text-black-950 text-xs p-2 whitespace-nowrap'>
								Delete Event
							</button>
						</DialogTrigger>
						<DialogContent>
							<div className='flex flex-col items-center'>
								<svg
									width='65'
									height='65'
									viewBox='0 0 65 65'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<rect
										x='2.5'
										y='2.5'
										width='60'
										height='60'
										rx='30'
										fill='#FEEDB8'
									/>
									<rect
										x='2.5'
										y='2.5'
										width='60'
										height='60'
										rx='30'
										stroke='#FEF6DB'
										strokeWidth='4'
									/>
									<path
										d='M33.4009 33.4002H30.4676V24.6002H33.4009V33.4002ZM33.4009 39.2668H30.4676V36.3335H33.4009V39.2668ZM31.9342 17.2668C30.0082 17.2668 28.101 17.6462 26.3216 18.3833C24.5421 19.1203 22.9253 20.2007 21.5633 21.5626C18.8128 24.3131 17.2676 28.0437 17.2676 31.9335C17.2676 35.8234 18.8128 39.5539 21.5633 42.3044C22.9253 43.6663 24.5421 44.7467 26.3216 45.4837C28.101 46.2208 30.0082 46.6002 31.9342 46.6002C35.8241 46.6002 39.5546 45.0549 42.3051 42.3044C45.0557 39.5539 46.6009 35.8234 46.6009 31.9335C46.6009 30.0075 46.2215 28.1003 45.4845 26.3208C44.7474 24.5414 43.6671 22.9245 42.3051 21.5626C40.9432 20.2007 39.3264 19.1203 37.5469 18.3833C35.7675 17.6462 33.8603 17.2668 31.9342 17.2668Z'
										fill='#CAA93E'
									/>
								</svg>
								<DialogHeader className='mt-4 !text-center'>
									<DialogTitle className='text-base sm:text-[1.25rem] text-black-950 font-bold'>
										Delete Event
									</DialogTitle>
									<DialogDescription className='text-sm text-black-700 max-w-[20rem]'>
										Proceeding would delete the event and tickets wouldn&apos;t be
										available for sale.
									</DialogDescription>
								</DialogHeader>

								<LoadingButton
									loading={isLoading}
									variant={'destructive'}
									className='mt-10 w-full'
									onClick={handleDelete}>
									Delete
								</LoadingButton>
							</div>
						</DialogContent>
					</Dialog>
				</PopoverContent>
			</Popover>
		</li>
	);
};

export default Event;
