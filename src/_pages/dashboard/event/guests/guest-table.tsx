import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { EventGuest, EventGuestsData } from '@/features/events/types';
import { DataTable } from '@/components/ui/data-table';
import { Dialog } from '@/components/ui/dialog';

import Search from '@/components/search';
import Link from 'next/link';
import CheckInModal from './check-in-modal';

const GuestTable = ({
	guests,
	limit,
	setLimit,
	refetch,
}: {
	guests: EventGuestsData;
	limit: string;
	setLimit: (e: string) => void;
	refetch: () => void;
}) => {
	const pathname = usePathname();

	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const columns: ColumnDef<EventGuest>[] = [
		{
			accessorKey: 'firstName',
			header: 'Guest Name',
			cell: ({ row }) => (
				<span className='capitalize'>
					{row.original.firstName} {row.original.lastName}
				</span>
			),
		},
		{
			accessorKey: 'email',
			header: 'Guest Email Address',
		},
		{
			accessorKey: 'ticketId',
			header: 'Ticket ID',
		},
		{
			accessorKey: 'isChecked',
			header: 'Status',
			cell: ({ row }) => (
				<span>{row.original.isChecked ? 'Checked-in' : 'Not Checked-in'}</span>
			),
		},
		{
			accessorKey: 'quantity',
			header: 'Check-in',
			cell: ({ row }) => (
				<span>
					{row.original.ticketsChecked ?? 0}/{row.original.quantity} ticket(s)
				</span>
			),
		},
		{
			accessorKey: 'title',
			header: 'Ticket Type',
			cell: ({ row }) => <span className='capitalize'>{row.getValue('title')}</span>,
		},
		{
			accessorKey: '',
			header: 'Action',
			cell: ({ row }) => (
				<Link
					href={`${pathname}/${row.original._id}`}
					className='text-blue-50 font-semibold underline'>
					View Profile
				</Link>
			),
		},
	];

	return (
		<div className='bg-white p-4 md:p-6 rounded-[4px]'>
			<Search
				title='Guest Check-In'
				buttonText='Check-In Guest'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onClick={() => setOpenModal(true)}
			/>
			<DataTable
				columns={columns}
				data={guests!.data.guests}
				totalPages={guests!.pagination.totalPages}
				value={limit}
				onChange={(e) => setLimit(e.target.value)}
			/>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<CheckInModal onClose={() => setOpenModal(false)} refetch={refetch} />
			</Dialog>
		</div>
	);
};

export default GuestTable;
