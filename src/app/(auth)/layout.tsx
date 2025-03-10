'use client';

import { withoutAuth } from '../withoutAuth';

import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='bg-[url(/images/auth-bg.png)] bg-cover bg-no-repeat'>
			<div className='flex items-center justify-center h-dvh px-6'>
				<div className='bg-white max-w-[38.5rem] w-full rounded-[8px] p-10'>
					<div className='flex items-center justify-center'>
						<Image
							src='/icons/logo.svg'
							width={186}
							height={32}
							alt='hyperhubs logo'
							className='w-[140px] md:w-auto'
						/>
					</div>
					{children}
				</div>
			</div>
		</main>
	);
};

export default withoutAuth(AuthLayout);
