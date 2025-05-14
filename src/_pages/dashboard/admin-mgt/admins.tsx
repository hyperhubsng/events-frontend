/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDeactivateOrganizerMutation } from '@/features/auth/authApi';
import { toast } from 'sonner';
import { icons } from '@/components/icons';
import { User, UsersData } from '@/features/users/types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import InfoCard from '@/components/info-card';
import Tabs from '@/components/tabs';
import Search from '@/components/search';
import Status from '@/components/status';
import LoadingButton from '@/components/loading-button';

const Admins = ({
	admins,
	setOpenModal,
	limit,
	setLimit,
	selected,
	setSelected,
	setUser,
}: {
	admins: UsersData | undefined;
	setOpenModal: (e: boolean) => void;
	limit: string;
	setLimit: (e: string) => void;
	selected: string;
	setSelected: (e: string) => void;
	setUser: (e: User) => void;
}) => {
	const [search, setSearch] = useState('');
	const [vendorId, setVendorId] = useState<null | string>(null);

	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Admins',
			info: admins?.data?.stats?.total,
		},
		{
			icon: icons.TRev,
			title: 'Active Admins',
			info: admins?.data?.stats?.active,
		},
		{
			icon: icons.TRev,
			title: 'Inactive Admins',
			info: admins?.data?.stats?.inactive,
		},
	];

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'firstName',
			header: 'Name',
			cell: ({ row }) => (
				<span className='capitalize'>
					{row.original.firstName} {row.original.lastName}
				</span>
			),
		},

		{
			accessorKey: 'email',
			header: 'Email Address',
		},
		{
			accessorKey: 'role',
			header: 'Role Assigned',
			cell: ({ row }) => `${row.original.role.title}`,
		},
		{
			accessorKey: 'accountStatus',
			header: 'Status',
			cell: ({ row }) => <Status status={row.getValue('accountStatus')} />,
		},
		{
			accessorKey: '',
			header: 'Actions',
			cell: ({ row }) => (
				<div className='flex items-center gap-4'>
					<button
						onClick={() => {
							setOpenModal(true);
							setUser(row.original);
						}}>
						{icons.Edit}
					</button>
					<button onClick={() => setVendorId(row.original._id)}>
						{icons.Suspend}
					</button>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4'>
				{card_info.map((card) => (
					<InfoCard key={card.title} {...card} />
				))}
			</div>

			<div className='bg-white p-4 md:p-6 rounded-[4px] mt-4'>
				<Search
					title='Admin Overview'
					value={search}
					buttonText='+Invite Admin'
					tClass='max-w-[90px] md:max-w-full top-0'
					sClass='mt-8 md:mt-0'
					onChange={(e) => setSearch(e.target.value)}
					onClick={() => setOpenModal(true)}
				/>
				<Tabs
					items={['All', 'Active', 'Inactive']}
					selected={selected}
					setSelected={setSelected}
					className='mt-4'
				/>

				<DataTable
					columns={columns}
					data={admins!.data.users}
					totalPages={admins!.pagination.totalPages}
					value={limit}
					onChange={(e) => setLimit(e.target.value)}
				/>
			</div>

			<Dialog open={vendorId !== null} onOpenChange={() => setVendorId(null)}>
				<DialogContent>
					<DialogHeader className='flex items-end'>
						<button onClick={() => setVendorId(null)}>{icons.Close}</button>
					</DialogHeader>
					<DeactivateModal id={vendorId} onClose={() => setVendorId(null)} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Admins;

const DeactivateModal = ({
	id,
	onClose,
}: {
	id: string | null;
	onClose: () => void;
}) => {
	const [deactivateOrg, { isLoading }] = useDeactivateOrganizerMutation();

	const handleDeactivation = async () => {
		try {
			await deactivateOrg(id!).unwrap();
			toast.success('Admin deactivated successfully');
			onClose();
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center text-center'>
			<svg
				width='65'
				height='65'
				viewBox='0 0 65 65'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='2.5' y='2.5' width='60' height='60' rx='30' fill='#FEEDB8' />
				<rect
					x='2.5'
					y='2.5'
					width='60'
					height='60'
					rx='30'
					stroke='#FEF6DB'
					strokeWidth='4'
				/>
				<path
					d='M33.4009 33.399H30.4676V24.599H33.4009V33.399ZM33.4009 39.2656H30.4676V36.3323H33.4009V39.2656ZM31.9342 17.2656C30.0082 17.2656 28.101 17.645 26.3216 18.3821C24.5421 19.1191 22.9253 20.1995 21.5633 21.5614C18.8128 24.3119 17.2676 28.0424 17.2676 31.9323C17.2676 35.8221 18.8128 39.5527 21.5633 42.3032C22.9253 43.6651 24.5421 44.7455 26.3216 45.4825C28.101 46.2196 30.0082 46.599 31.9342 46.599C35.8241 46.599 39.5546 45.0537 42.3051 42.3032C45.0557 39.5527 46.6009 35.8221 46.6009 31.9323C46.6009 30.0062 46.2215 28.099 45.4845 26.3196C44.7474 24.5402 43.6671 22.9233 42.3051 21.5614C40.9432 20.1995 39.3264 19.1191 37.5469 18.3821C35.7675 17.645 33.8603 17.2656 31.9342 17.2656Z'
					fill='#CAA93E'
				/>
			</svg>
			<div className='mt-2'>
				<DialogTitle className='text-[1.25rem] text-black-950 font-bold'>
					Deactivate Admin
				</DialogTitle>
				<DialogDescription className='text-black-700'>
					Proceeding would deactivate the admin.
				</DialogDescription>
			</div>

			<LoadingButton
				loading={isLoading}
				variant={'destructive'}
				className='w-full mt-10'
				onClick={handleDeactivation}>
				Continue
			</LoadingButton>
		</div>
	);
};
