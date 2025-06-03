'use client';

import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logOut, selectUser } from '@/features/auth/authSlice';
import { deleteUserToken } from '@/lib/session';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	useSidebar,
} from '@/components/ui/sidebar';
import { sidebarLinks } from '@/lib/mock';
import { cn } from '@/lib/utils';
import { Fragment, useState } from 'react';
import { Collapsible } from './ui/collapsible';
import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

export function AppSidebar() {
	const [showSub, setShowSub] = useState(false);
	const { toggleSidebar, open, isMobile } = useSidebar();

	const user = useAppSelector(selectUser);

	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await deleteUserToken('access-token');
		dispatch(logOut());
	};

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='flex items-center justify-between flex-row p-4'>
				{open && (
					<Image
						src='/icons/favicon.svg'
						width={32}
						height={32}
						alt='hyperhubs logo'
					/>
				)}
				<button onClick={toggleSidebar}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M17 16L13 12L17 8M11 16L7 12L11 8'
							stroke='#F2F5F7'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{user?.userType.includes('admin')
								? sidebarLinks.admin.map((link) => (
										<Fragment key={link.name}>
											{link.href ? (
												<SidebarMenuItem>
													<SidebarMenuButton
														asChild
														isActive={
															pathname.includes(link.name.toLowerCase()) ||
															pathname === link.href
														}
														onClick={() => {
															if (isMobile) toggleSidebar();
														}}
														className='transition-colors duration-300 ease-in-out mb-1'>
														<Link
															href={link.href}
															className='py-[1.25rem] text-blue-100 data-[active=true]:font-semibold group/trigger'>
															{link.name === 'Events' ? (
																<svg
																	width='24'
																	height='24'
																	viewBox='0 0 24 24'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'
																	className={cn(
																		' group-hover/trigger:fill-none',
																		!(
																			pathname.includes(link.name.toLowerCase()) ||
																			pathname === link.href
																		) && 'fill-current'
																	)}>
																	<path
																		d='M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M12 4.5V19.5'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M3 7.5H21'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M3 16.5H21'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M7.5 4.5V7.5'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M16.5 4.5V7.5'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M7.5 16.5V19.5'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M16.5 16.5V19.5'
																		stroke='#003366'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																</svg>
															) : (
																link.icon && <link.icon />
															)}
															<span className={cn('text-base')}>{link.name}</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											) : (
												<Collapsible className='group/collapsible'>
													<SidebarMenuItem>
														<CollapsibleTrigger
															asChild
															onClick={() => setShowSub(!showSub)}>
															<SidebarMenuButton className='py-[1.25rem] text-blue-100 mb-1 relative'>
																<svg
																	width='24'
																	height='24'
																	viewBox='0 0 24 24'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'
																	className='stroke-current'>
																	<path
																		d='M12.0001 16.137C14.095 16.137 15.7932 14.4388 15.7932 12.3439C15.7932 10.249 14.095 8.55078 12.0001 8.55078C9.90526 8.55078 8.20703 10.249 8.20703 12.3439C8.20703 14.4388 9.90526 16.137 12.0001 16.137Z'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M18.4482 10.0684C19.3318 10.0669 20.2035 10.2719 20.9937 10.667C21.784 11.0622 22.471 11.6365 23 12.3442'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M1 12.3442C1.52895 11.6365 2.21596 11.0622 3.00623 10.667C3.7965 10.2719 4.66817 10.0669 5.55172 10.0684'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M6.53809 19.552C7.03766 18.5289 7.81454 17.6667 8.78023 17.0635C9.74592 16.4604 10.8616 16.1406 12.0002 16.1406C13.1387 16.1406 14.2544 16.4604 15.2201 17.0635C16.1858 17.6667 16.9626 18.5289 17.4622 19.552'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M5.55123 10.069C4.97529 10.0695 4.41108 9.90621 3.92451 9.59805C3.43795 9.28988 3.04913 8.84961 2.8035 8.32867C2.55786 7.80774 2.46555 7.22766 2.53734 6.65621C2.60914 6.08476 2.84208 5.54554 3.20895 5.10156C3.57582 4.65758 4.06146 4.32717 4.60913 4.14895C5.15681 3.97072 5.74389 3.95204 6.30179 4.09507C6.85969 4.23811 7.36536 4.53697 7.75972 4.95672C8.15407 5.37647 8.42083 5.89979 8.52882 6.46552'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																	<path
																		d='M15.4707 6.46552C15.5787 5.89979 15.8455 5.37647 16.2398 4.95672C16.6342 4.53697 17.1398 4.23811 17.6977 4.09507C18.2556 3.95204 18.8427 3.97072 19.3904 4.14895C19.9381 4.32717 20.4237 4.65758 20.7906 5.10156C21.1574 5.54554 21.3904 6.08476 21.4622 6.65621C21.534 7.22766 21.4417 7.80774 21.196 8.32867C20.9504 8.84961 20.5616 9.28988 20.075 9.59805C19.5884 9.90621 19.0242 10.0695 18.4483 10.069'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																</svg>

																<span>{link.name}</span>
																{open && (
																	<ChevronDown
																		className={cn(
																			'absolute right-4 transition-transform duration-300 ease-in-out',

																			showSub ? '-rotate-180' : ''
																		)}
																	/>
																)}
															</SidebarMenuButton>
														</CollapsibleTrigger>
														<CollapsibleContent>
															<SidebarMenuSub className='border-0'>
																{link.subLinks?.map((sublink) => (
																	<SidebarMenuItem key={sublink.name}>
																		<SidebarMenuButton
																			asChild
																			isActive={
																				pathname
																					.toLowerCase()
																					.includes(sublink.href.toLowerCase()) ||
																				pathname === sublink.href
																			}
																			onClick={() => {
																				if (isMobile) toggleSidebar();
																			}}
																			className='transition-colors duration-300 ease-in-out'>
																			<Link
																				href={sublink.href}
																				className='py-[1.25rem] text-blue-100 data-[active=true]:font-semibold'>
																				<span className={cn('text-base')}>
																					{sublink.name}
																				</span>
																			</Link>
																		</SidebarMenuButton>
																	</SidebarMenuItem>
																))}
															</SidebarMenuSub>
														</CollapsibleContent>
													</SidebarMenuItem>
												</Collapsible>
											)}
										</Fragment>
								  ))
								: sidebarLinks.organizer.map((link) => (
										<SidebarMenuItem key={link.name}>
											<SidebarMenuButton
												onClick={() => {
													if (isMobile) toggleSidebar();
												}}
												asChild
												isActive={
													pathname.includes(link.name.toLowerCase()) ||
													pathname === link.href
												}
												className='transition-colors duration-300 ease-in-out mb-1'>
												<Link
													href={link.href}
													className='py-[1.25rem] text-blue-100 data-[active=true]:font-semibold group/trigger'>
													{link.name === 'Events' ? (
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className={cn(
																' group-hover/trigger:fill-none',
																!(
																	pathname.includes(link.name.toLowerCase()) ||
																	pathname === link.href
																) && 'fill-current'
															)}>
															<path
																d='M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M12 4.5V19.5'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M3 7.5H21'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M3 16.5H21'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M7.5 4.5V7.5'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M16.5 4.5V7.5'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M7.5 16.5V19.5'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M16.5 16.5V19.5'
																stroke='#003366'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
														</svg>
													) : link.name === 'User Management' ? (
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className='stroke-current'>
															<path
																d='M12.0001 16.137C14.095 16.137 15.7932 14.4388 15.7932 12.3439C15.7932 10.249 14.095 8.55078 12.0001 8.55078C9.90526 8.55078 8.20703 10.249 8.20703 12.3439C8.20703 14.4388 9.90526 16.137 12.0001 16.137Z'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M18.4482 10.0684C19.3318 10.0669 20.2035 10.2719 20.9937 10.667C21.784 11.0622 22.471 11.6365 23 12.3442'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M1 12.3442C1.52895 11.6365 2.21596 11.0622 3.00623 10.667C3.7965 10.2719 4.66817 10.0669 5.55172 10.0684'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M6.53809 19.552C7.03766 18.5289 7.81454 17.6667 8.78023 17.0635C9.74592 16.4604 10.8616 16.1406 12.0002 16.1406C13.1387 16.1406 14.2544 16.4604 15.2201 17.0635C16.1858 17.6667 16.9626 18.5289 17.4622 19.552'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M5.55123 10.069C4.97529 10.0695 4.41108 9.90621 3.92451 9.59805C3.43795 9.28988 3.04913 8.84961 2.8035 8.32867C2.55786 7.80774 2.46555 7.22766 2.53734 6.65621C2.60914 6.08476 2.84208 5.54554 3.20895 5.10156C3.57582 4.65758 4.06146 4.32717 4.60913 4.14895C5.15681 3.97072 5.74389 3.95204 6.30179 4.09507C6.85969 4.23811 7.36536 4.53697 7.75972 4.95672C8.15407 5.37647 8.42083 5.89979 8.52882 6.46552'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
															<path
																d='M15.4707 6.46552C15.5787 5.89979 15.8455 5.37647 16.2398 4.95672C16.6342 4.53697 17.1398 4.23811 17.6977 4.09507C18.2556 3.95204 18.8427 3.97072 19.3904 4.14895C19.9381 4.32717 20.4237 4.65758 20.7906 5.10156C21.1574 5.54554 21.3904 6.08476 21.4622 6.65621C21.534 7.22766 21.4417 7.80774 21.196 8.32867C20.9504 8.84961 20.5616 9.28988 20.075 9.59805C19.5884 9.90621 19.0242 10.0695 18.4483 10.069'
																strokeWidth='1.5'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
														</svg>
													) : link.name === 'Payouts' ? (
														<svg
															width='25'
															height='24'
															viewBox='0 0 25 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className='stroke-current'>
															<path
																fillRule='evenodd'
																clipRule='evenodd'
																d='M5.75 3.25C4.50736 3.25 3.5 4.25736 3.5 5.5V18.5C3.5 19.7426 4.50736 20.75 5.75 20.75H18.75C19.9926 20.75 21 19.7426 21 18.5V9.5C21 8.25736 19.9926 7.25 18.75 7.25H18.5V5.5C18.5 4.25736 17.4926 3.25 16.25 3.25H5.75ZM17 7.25V5.5C17 5.08579 16.6642 4.75 16.25 4.75H5.75C5.33579 4.75 5 5.08579 5 5.5V7.25H17ZM5 8.75V18.5C5 18.9142 5.33579 19.25 5.75 19.25H18.75C19.1642 19.25 19.5 18.9142 19.5 18.5V9.5C19.5 9.08579 19.1642 8.75 18.75 8.75H5Z'
																fill='#F2F5F7'
															/>
														</svg>
													) : (
														link.icon && <link.icon />
													)}
													<span className={cn('text-base')}>{link.name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
								  ))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu className='pt-6 border-t-[#E8E8E8] border-solid border-t'>
					<SidebarMenuButton
						className='text-blue-100 transition-colors group
           duration-300 ease-in-out py-[1.25rem]'
						onClick={handleLogout}>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='fill-current'>
							<path d='M15.24 22.2705H15.11C10.67 22.2705 8.53002 20.5205 8.16002 16.6005C8.12002 16.1905 8.42002 15.8205 8.84002 15.7805C9.24002 15.7405 9.62002 16.0505 9.66002 16.4605C9.95002 19.6005 11.43 20.7705 15.12 20.7705H15.25C19.32 20.7705 20.76 19.3305 20.76 15.2605V8.74047C20.76 4.67047 19.32 3.23047 15.25 3.23047H15.12C11.41 3.23047 9.93002 4.42047 9.66002 7.62047C9.61002 8.03047 9.26002 8.34047 8.84002 8.30047C8.42002 8.27047 8.12001 7.90047 8.15001 7.49047C8.49001 3.51047 10.64 1.73047 15.11 1.73047H15.24C20.15 1.73047 22.25 3.83047 22.25 8.74047V15.2605C22.25 20.1705 20.15 22.2705 15.24 22.2705Z' />
							<path d='M15.0001 12.75H3.62012C3.21012 12.75 2.87012 12.41 2.87012 12C2.87012 11.59 3.21012 11.25 3.62012 11.25H15.0001C15.4101 11.25 15.7501 11.59 15.7501 12C15.7501 12.41 15.4101 12.75 15.0001 12.75Z' />
							<path d='M5.84994 16.0998C5.65994 16.0998 5.46994 16.0298 5.31994 15.8798L1.96994 12.5298C1.67994 12.2398 1.67994 11.7598 1.96994 11.4698L5.31994 8.11984C5.60994 7.82984 6.08994 7.82984 6.37994 8.11984C6.66994 8.40984 6.66994 8.88984 6.37994 9.17984L3.55994 11.9998L6.37994 14.8198C6.66994 15.1098 6.66994 15.5898 6.37994 15.8798C6.23994 16.0298 6.03994 16.0998 5.84994 16.0998Z' />
						</svg>

						<span>Logout</span>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
