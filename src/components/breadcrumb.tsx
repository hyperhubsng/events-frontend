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
			<div className='w-full bg-white py-2 px-4'>
				<ul className='flex items-center gap-2'>
					{items.map((item, i) => (
						<Fragment key={item}>
							<li
								className={cn(
									'text-xs',
									i === 0 ? 'text-blue-50 font-medium' : 'text-black-600'
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
