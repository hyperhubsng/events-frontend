import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { EventSale, EventSalesData } from '@/features/events/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import Search from '@/components/search';

const columns: ColumnDef<EventSale>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => <span>{format(row.original.createdAt, 'MMM dd, yyyy')}</span>,
	},
	{
		accessorKey: '_id',
		header: 'Transaction ID',
	},
	{
		accessorKey: 'firstName',
		header: 'Customer Name',
		cell: ({ row }) => (
			<span className='capitalize'>
				{row.original.firstName} {row.original.lastName}
			</span>
		),
	},
	{
		accessorKey: 'email',
		header: 'Customer Email Address',
	},
	{
		accessorKey: 'title',
		header: 'Ticket Type',
		cell: ({ row }) => <span className='capitalize'>{row.original.title}</span>,
	},
	{
		accessorKey: 'quantity',
		header: 'Qty',
	},
	{
		accessorKey: 'amountPaid',
		header: 'Amount',
		cell: ({ row }) => (
			<span className='capitalize'>
				{`N${row.original.amountPaid.toLocaleString()}`}
			</span>
		),
	},
];

const SalesTable = ({
	limit,
	setLimit,
	salesOverview,
}: {
	limit: string;
	setLimit: (e: string) => void;
	salesOverview: EventSalesData;
}) => {
	const [search, setSearch] = useState('');

	return (
		<div className='bg-white p-4 md:p-6 rounded-[4px] mt-4'>
			<Search
				title='Sales Overview'
				tClass='top-0'
				sClass='mt-12 md:mt-0'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<DataTable
				columns={columns}
				data={salesOverview!.data?.sales}
				totalPages={salesOverview!.pagination.totalPages}
				value={limit}
				onChange={(e) => setLimit(e.target.value)}
			/>
		</div>
	);
};

export default SalesTable;
