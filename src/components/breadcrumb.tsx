'use client';

import { cn } from '@/lib/utils';
import { Fragment } from 'react';

const BreadcrumbWrapper = ({
	items,
	children,
}: {
	items: string[];
	children: React.ReactNode;
}) => {
	return (
		<>
			<div className='w-full bg-white py-2 px-4 sticky top-[3.5rem] md:top-16 z-10'>
				<ul className='flex items-center gap-2'>
					{items.map((item, i) => (
						<Fragment key={item}>
							<li
								className={cn(
									'text-xs',
									i !== items.length - 1
										? 'text-blue-50 font-medium'
										: 'text-black-600'
								)}>
								{item}
							</li>
							{i !== items.length - 1 && (
								<span className='text-xs text-black-600'>/</span>
							)}
						</Fragment>
					))}
				</ul>
			</div>
			{children}
		</>
	);
};

export default BreadcrumbWrapper;
