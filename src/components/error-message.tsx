/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

import Image from 'next/image';

const ErrorMessage = ({ error }: { error: any }) => {
	const router = useRouter();

	return (
		<div className='h-full flex items-center justify-center flex-col'>
			<Image
				src='/icons/error.svg'
				width={150}
				height={150}
				alt='sent icon'
				className='max-[600px]:h-[120px]'
			/>
			<h1 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold mt-4'>
				{'data' in (error as any) && (error as any).data?.message
					? (error as any).data.message
					: 'An unexpected error occurred.'}
			</h1>

			<Button
				onClick={() => router.back()}
				variant={'primary'}
				className='mt-4 w-64'>
				Go back
			</Button>
		</div>
	);
};

export default ErrorMessage;
