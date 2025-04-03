'use client';

import { selectUser } from '@/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { useSidebar } from './ui/sidebar';

import Image from 'next/image';

const Navbar = () => {
	const user = useAppSelector(selectUser);

	const { toggleSidebar } = useSidebar();

	function getTimeBasedGreeting() {
		const currentHour = new Date().getHours();

		if (currentHour >= 5 && currentHour < 12) {
			return 'Good morning';
		} else if (currentHour >= 12 && currentHour < 18) {
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
	}

	return (
		<header
			className='bg-white sticky top-0 z-20 before:bg-white before:absolute before:top-0
     before:h-full before:w-20 before:left-0 before:-z-[1] py-3 px-4 md:py-4'>
			<div className='app-container'>
				<nav className='flex items-center justify-between'>
					<h1 className='text-black-900 text-base lg:text-[1.25rem] font-medium hidden lg:block'>
						{getTimeBasedGreeting()},{' '}
						<span className='capitalize'>{user?.firstName}</span> 👋🏼
					</h1>

					<button
						aria-describedby='click to open sidebar on mobile'
						className='lg:hidden'
						onClick={toggleSidebar}>
						<Image
							src='/icons/hamburger.svg'
							width={32}
							height={32}
							alt='hamburger icon'
						/>
					</button>

					<Image
						src='/icons/blue-logo.svg'
						width={32}
						height={32}
						alt='hyperhubs logo'
						className='lg:hidden'
					/>

					<div className='flex items-center gap-3'>
						<h2 className='text-black-950 text-base capitalize hidden lg:block'>{`${user?.firstName} ${user?.lastName}`}</h2>
						<svg
							width='32'
							height='32'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
								fill='#E8E8E8'
								stroke='#C7C7C7'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M12.1197 12.78C12.0497 12.77 11.9597 12.77 11.8797 12.78C10.1197 12.72 8.71973 11.28 8.71973 9.50998C8.71973 7.69998 10.1797 6.22998 11.9997 6.22998C13.8097 6.22998 15.2797 7.69998 15.2797 9.50998C15.2697 11.28 13.8797 12.72 12.1197 12.78Z'
								stroke='#C7C7C7'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z'
								stroke='#C7C7C7'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
