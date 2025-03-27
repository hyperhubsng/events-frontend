import { useState } from 'react';
import { icons } from '@/components/icons';
import { UsersData } from '@/features/users/types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

import InfoCard from '@/components/info-card';
import Tabs from '@/components/tabs';
import Search from '@/components/search';
import Status from '@/components/status';

const columns: ColumnDef<OrganizerTableProps>[] = [
	{
		accessorKey: 'firstName',
		header: 'name',
		cell: ({ row }) => (
			<span className='capitalize'>
				{row.original.firstName} {row.original.lastName}
			</span>
		),
	},

	{
		accessorKey: 'companyName',
		header: 'Company Name',
	},
	{
		accessorKey: 'email',
		header: 'Email Address',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Phone Number',
	},
	{
		accessorKey: 'website',
		header: 'Website',
	},
	{
		accessorKey: 'accountStatus',
		header: 'Status',
		cell: ({ row }) => <Status status={row.getValue('accountStatus')} />,
	},
	{
		accessorKey: '',
		header: 'Actions',
		cell: ({}) => (
			<div className='flex items-center gap-4'>
				<button>{icons.Edit}</button>
				<button>{icons.Suspend}</button>
			</div>
		),
	},
];

const Organizers = ({
	vendors,
	setOpenModal,
}: {
	vendors: UsersData | undefined;
	setOpenModal: (e: boolean) => void;
}) => {
	const [selected, setSelected] = useState('All');
	const [search, setSearch] = useState('');
	const [limit, setLimit] = useState('10');

	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Organizers',
			info: vendors?.data?.stats?.total,
		},
		{
			icon: icons.TRev,
			title: 'Active Organizers',
			info: vendors?.data?.stats?.active,
		},
		{
			icon: icons.TRev,
			title: 'Inactive Organizers',
			info: vendors?.data?.stats?.inactive,
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
					title='Organizer Overview'
					value={search}
					buttonText='+Invite Organizer'
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
					data={vendors!.data.users}
					totalPages={vendors!.pagination.totalPages}
					value={limit}
					onChange={(e) => setLimit(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Organizers;
