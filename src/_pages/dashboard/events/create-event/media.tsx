/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRemoveEventImageMutation } from '@/features/events/eventsApi';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectPreviewEvent, setPreviewEvent } from '@/features/events/eventsSlice';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventSchema } from '@/lib/schemas';
import { z } from 'zod';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import Image from 'next/image';
import LoadingButton from '@/components/loading-button';

type FormData = z.infer<typeof CreateEventSchema>;

type Props = {
	form: UseFormReturn<FormData>;
	isLoading: boolean;
};

const Media = ({ form, isLoading }: Props) => {
	const router = useRouter();

	const images: {
		name:
			| 'title'
			| 'startDate'
			| 'start_time'
			| 'venue'
			| 'coordinates'
			| 'eventType'
			| 'ownerId'
			| 'description'
			// | 'thumbnail'
			| 'event_img_1'
			| 'event_img_2'
			| 'event_img_3';
		label: string;
	}[] = [
		// {
		// 	label: 'Event Thumbnail',
		// 	name: 'thumbnail',
		// },
		{
			label: 'Event Img 01',
			name: 'event_img_1',
		},
		{
			label: 'Event Img 02',
			name: 'event_img_2',
		},
		{
			label: 'Event Img 03',
			name: 'event_img_3',
		},
	];

	return (
		<div className='flex flex-col gap-4 mt-6'>
			{images.map((img) => (
				<Preview key={img.name} form={form} {...img} />
			))}

			<div className='grid gap-4 sm:grid-cols-2 w-full'>
				<LoadingButton
					loading={isLoading}
					variant='primary'
					disabled={
						!form.getValues('event_img_1') ||
						!form.getValues('event_img_2') ||
						!form.getValues('event_img_3')
					}
					className='w-full'>
					Continue
				</LoadingButton>

				<Button variant='outline' type='button' onClick={() => router.back()}>
					Go Back
				</Button>
			</div>
		</div>
	);
};

export default Media;

type PreviewProps = {
	form: UseFormReturn<FormData>;
	name:
		| 'title'
		| 'startDate'
		| 'start_time'
		| 'venue'
		| 'coordinates'
		| 'eventType'
		| 'ownerId'
		| 'description'
		// | 'thumbnail'
		| 'event_img_1'
		| 'event_img_2'
		| 'event_img_3';
	label: string;
};

const Preview = ({ form, name, label }: PreviewProps) => {
	const params = useParams();
	const [preview, setPreview] = useState('');

	const dispatch = useAppDispatch();
	const previewEvent = useAppSelector(selectPreviewEvent);

	const [removeImage, { isLoading }] = useRemoveEventImageMutation();

	const handleRemoveImage = async () => {
		try {
			const res = await removeImage({
				images: [preview],
				id: typeof params?.id === 'string' ? params.id : '',
			}).unwrap();

			toast.success(res?.message);
			setPreview('');
			form.setValue(name, undefined);
			dispatch(
				setPreviewEvent({
					...previewEvent,
					images: previewEvent?.images.filter((img) => img !== preview),
				})
			);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		const file = form.watch(name);
		if (file instanceof File) {
			const imageUrl = URL.createObjectURL(file);
			setPreview(imageUrl);
		}

		if (typeof form.getValues(name) === 'string') {
			setPreview(form.getValues(name) as string);
		}
	}, [form, name]);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field: { onChange } }) => (
				<FormItem>
					<FormLabel className='text-black-950 text-sm md:text-base font-semibold'>
						{label}
					</FormLabel>
					<div
						className='relative h-[150px] rounded-[6px] 
					border border-white-300 border-dotted flex items-center justify-center flex-col'>
						<Input
							type='file'
							accept='image/*'
							className='absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer'
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file instanceof File) {
									const imageUrl = URL.createObjectURL(file);
									setPreview(imageUrl);
									onChange(file);
								}
							}}
						/>
						{!preview ? (
							<>
								<svg
									width='30'
									height='29'
									viewBox='0 0 30 29'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M2 21L9.4519 13.5481C10.7211 12.2789 12.7789 12.2789 14.0481 13.5481L21.5 21M18.25 17.75L20.8269 15.1731C22.0961 13.9039 24.1539 13.9039 25.4231 15.1731L28 17.75M18.25 8H18.2663M5.25 27.5H24.75C26.5449 27.5 28 26.0449 28 24.25V4.75C28 2.95507 26.5449 1.5 24.75 1.5H5.25C3.45507 1.5 2 2.95507 2 4.75V24.25C2 26.0449 3.45507 27.5 5.25 27.5Z'
										stroke='#003366'
										strokeWidth='2.67'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<h3 className='text-blue-50 text-sm sm:text-base font-medium mt-4'>
									Upload a file
								</h3>
								<p className='text-sm text-white-400 mt-1'>PNG, JPG, GIF upto 5MB</p>
							</>
						) : (
							<Image
								src={preview}
								width={580}
								height={150}
								alt={label}
								className='absolute top-0 left-0 w-full h-full pointer-events-none rounded-[inherit] object-cover'
							/>
						)}

						{preview && (
							<button
								className='absolute top-4 right-4'
								type='button'
								onClick={() => {
									if (!preview.includes('https://hyperhubsevents.s3')) {
										setPreview('');
									} else {
										handleRemoveImage();
									}
								}}>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<rect width='24' height='24' rx='12' fill='#FBF4F4' />
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M16.5079 7.78363C16.7219 7.78363 16.9 7.96128 16.9 8.18733V8.39633C16.9 8.61687 16.7219 8.80002 16.5079 8.80002H7.39262C7.17812 8.80002 7 8.61687 7 8.39633V8.18733C7 7.96128 7.17812 7.78363 7.39262 7.78363H8.99626C9.32202 7.78363 9.60552 7.55208 9.6788 7.22539L9.76278 6.85029C9.89329 6.33935 10.3228 6 10.8144 6H13.0856C13.5718 6 14.0062 6.33935 14.1319 6.82334L14.2217 7.22484C14.2945 7.55208 14.578 7.78363 14.9043 7.78363H16.5079ZM15.6932 15.4236C15.8606 13.8633 16.1537 10.1563 16.1537 10.1189C16.1644 10.0056 16.1275 9.89838 16.0542 9.81203C15.9756 9.73118 15.8761 9.68333 15.7664 9.68333H8.13765C8.02746 9.68333 7.92262 9.73118 7.84987 9.81203C7.77606 9.89838 7.73968 10.0056 7.74503 10.1189C7.74601 10.1258 7.75653 10.2564 7.77412 10.4747C7.85224 11.4445 8.06981 14.1455 8.2104 15.4236C8.30989 16.3652 8.9277 16.957 9.8226 16.9785C10.5132 16.9944 11.2246 16.9999 11.9521 16.9999C12.6373 16.9999 13.3332 16.9944 14.0451 16.9785C14.971 16.9625 15.5883 16.3812 15.6932 15.4236Z'
										fill='#B91C1C'
									/>
								</svg>
							</button>
						)}

						{isLoading && (
							<div className='absolute flex items-center justify-center bg-[rgba(0,0,0,0.5)] h-full w-full rounded-[inherit]'>
								<Loader2 className='animate-spin' color='#fff' />
							</div>
						)}
					</div>
				</FormItem>
			)}
		/>
	);
};
