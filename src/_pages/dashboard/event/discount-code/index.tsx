'use client';

import { icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';

import BreadcrumbWrapper from '@/components/breadcrumb';
import DiscountForm from './discount-code-form';
import Link from 'next/link';

const DiscountCode = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	return (
		<BreadcrumbWrapper items={['Events', 'Discount Code']}>
			<div className='h-full p-4'>
				{!searchParams.get('tab') ? (
					<div className='h-full rounded-[8px] md:rounded-[16px] bg-white'>
						<div className='flex flex-col items-center justify-center h-full text-center gap-3 max-w-[28.25rem] mx-auto'>
							{icons.Discount}

							<div>
								<h2 className='text-2xl md:text-[2rem] text-black-950 font-bold'>
									No Discount Code Created Yet
								</h2>
								<p className='text-sm md:text-base text-black-700'>
									Discount codes created will appear here
								</p>
							</div>

							<Link href={`${pathname}?tab=form`} className='w-full'>
								<Button variant={'primary'} className='w-full mt-6'>
									+ Create Code
								</Button>
							</Link>
						</div>
					</div>
				) : (
					<DiscountForm />
				)}
			</div>
		</BreadcrumbWrapper>
	);
};

export default DiscountCode;
