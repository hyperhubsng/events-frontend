import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { icons } from '@/components/icons';
import { format } from 'date-fns';

import Search from '@/components/search';
import Status from '@/components/status';

const columns: ColumnDef<DiscountTableProps>[] = [
	{
		accessorKey: 'code',
		header: 'Discount Code',
	},
	{
		accessorKey: 'start_date',
		header: 'Start Date',
		cell: ({ row }) => (
			<span>{format(row.getValue('start_date'), 'dd/MM/yyyy')}</span>
		),
	},
	{
		accessorKey: 'end_date',
		header: 'End Date',
		cell: ({ row }) => <span>{format(row.getValue('end_date'), 'dd/MM/yyyy')}</span>,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <Status status={row.getValue('status')} />,
	},
	{
		accessorKey: '',
		header: 'Actions',
		cell: ({}) => (
			<div className='flex items-center gap-4'>
				<button>{icons.Edit}</button>
				<button>{icons.Delete}</button>
			</div>
		),
	},
];

const DiscountCodeTable = ({ codes }: { codes: DiscountTableProps[] }) => {
	const [search, setSearch] = useState('');
	const [limit, setLimit] = useState('10');

	const pathname = usePathname();
	const match = useMediaQuery('(max-width:601px)');

	return (
		<div className='bg-white p-4 md:p-6 rounded-[4px]'>
			<Search
				title={!match ? 'Discount Code Overview' : 'Discount'}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				buttonText='+ Create Code'
				link={`${pathname}?tab=form`}
			/>

			<DataTable
				columns={columns}
				data={codes}
				totalPages={5}
				value={limit}
				onChange={(e) => setLimit(e.target.value)}
			/>
		</div>
	);
};

export default DiscountCodeTable;
