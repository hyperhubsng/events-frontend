'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetUsersQuery } from '@/features/users/usersApi';
import { icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { User } from '@/features/users/types';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import OrganizerForm from './organizer-form';
import Pulse from '@/components/pulse';
import Organizers from './organizers';

const OrganizerMgt = () => {
	const searchParams = useSearchParams();

	const [openModal, setOpenModal] = useState(false);
	const [limit, setLimit] = useState('10');
	const [user, setUser] = useState<User | null>(null);
	const [selected, setSelected] = useState('All');

	const { data: vendors, isLoading } = useGetUsersQuery({
		userType: 'vendor',
		page: +searchParams.get('page')! || 1,
		limit: +limit,
		...(selected !== 'All' && { status: selected.toLowerCase() }),
	});

	return (
		<div className='h-full p-4'>
			{isLoading ? (
				<Pulse />
			) : vendors?.data?.stats?.total === 0 ? (
				<div className='h-full rounded-[8px] md:rounded-[16px] bg-white'>
					<div className='flex flex-col items-center justify-center h-full text-center gap-3 max-w-[23.75rem] mx-auto px-4'>
						{icons.Discount}

						<div>
							<h2 className='text-[1.25rem] md:text-2xl text-black-950 font-bold'>
								No Organizer Created Yet
							</h2>
							<p className='text-sm md:text-base text-black-700'>
								Organizers created will appear here
							</p>
						</div>

						<Button
							variant={'primary'}
							className='w-full mt-6'
							onClick={() => setOpenModal(true)}>
							+ Invite Organizer
						</Button>
					</div>
				</div>
			) : (
				<Organizers
					vendors={vendors}
					setOpenModal={setOpenModal}
					limit={limit}
					setLimit={setLimit}
					selected={selected}
					setSelected={setSelected}
					setUser={setUser}
				/>
			)}
			<Dialog
				open={openModal}
				onOpenChange={() => {
					setOpenModal(false);
					setUser(null);
				}}>
				<DialogContent className='lg:min-w-[628px]'>
					<DialogHeader className='flex flex-row items-center justify-between'>
						<DialogTitle className='text-black-950 font-bold text-2xl'>
							{!user ? 'New' : 'Edit'} Organizer
						</DialogTitle>
						<DialogTrigger asChild>
							<button className='w-max' onClick={() => setOpenModal(false)}>
								<svg
									width='16'
									height='16'
									viewBox='0 0 16 16'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z'
										fill='#202020'
									/>
								</svg>
							</button>
						</DialogTrigger>
					</DialogHeader>

					<OrganizerForm setOpenModal={setOpenModal} user={user!} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default OrganizerMgt;
