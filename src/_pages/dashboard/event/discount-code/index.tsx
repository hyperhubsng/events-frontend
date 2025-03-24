'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

import BreadcrumbWrapper from '@/components/breadcrumb';
import DiscountForm from './discount-code-form';
import DiscountCodeTable from './discount-code-table';
import Link from 'next/link';

const DiscountCode = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [codes, setCodes] = useState<DiscountTableProps[]>([]);

	const handleSubmit = (data: DiscountTableProps) => {
		setCodes((prev) => [...prev, data]);
		router.back();
	};

	return (
		<BreadcrumbWrapper
			items={
				!searchParams.get('tab')
					? ['Events', 'Discount Code']
					: ['Events', 'Discount Code', 'New Discount']
			}>
			<div className='h-[95%] p-4'>
				{!searchParams.get('tab') ? (
					<>
						{codes.length === 0 ? (
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
							<DiscountCodeTable codes={codes} />
						)}
					</>
				) : (
					<DiscountForm handleSubmit={handleSubmit} />
				)}
			</div>
		</BreadcrumbWrapper>
	);
};

export default DiscountCode;
