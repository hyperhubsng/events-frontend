import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventSchema } from '@/lib/schemas';
import { z } from 'zod';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Image from 'next/image';

type FormData = z.infer<typeof CreateEventSchema>;

type Props = {
	form: UseFormReturn<FormData>;
};

const Media = ({ form }: Props) => {
	const router = useRouter();

	const images: {
		name:
			| 'event_name'
			| 'start_date'
			| 'start_time'
			| 'event_address'
			| 'landmark'
			| 'event_type'
			| 'organization'
			| 'about'
			| 'thumbnail'
			| 'event_img_1'
			| 'event_img_2'
			| 'event_img_3';
		label: string;
	}[] = [
		{
			label: 'Event Thumbnail',
			name: 'thumbnail',
		},
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
				<Button
					variant='primary'
					type='button'
					disabled={!form.formState.isValid}
					className='w-full'
					onClick={() => router.push('/events/create-event?tab=ticket')}>
					Continue
				</Button>

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
		| 'event_name'
		| 'start_date'
		| 'start_time'
		| 'event_address'
		| 'landmark'
		| 'event_type'
		| 'organization'
		| 'about'
		| 'thumbnail'
		| 'event_img_1'
		| 'event_img_2'
		| 'event_img_3';
	label: string;
};

const Preview = ({ form, name, label }: PreviewProps) => {
	const [preview, setPreview] = useState('');

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field: { onChange } }) => (
				<FormItem>
					<FormLabel
						className='text-black-950 text-sm md:text-base font-semibold'
						htmlFor='start_date'>
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
								if (file) {
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
					</div>
				</FormItem>
			)}
		/>
	);
};
