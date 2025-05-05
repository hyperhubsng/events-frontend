'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetRolesQuery } from '@/features/roles-and-permissions/rolesPermissionsApi';
import { Button } from '@/components/ui/button';
import { icons } from '@/components/icons';

import Pulse from '@/components/pulse';
import Search from '@/components/search';
import { ColumnDef } from '@tanstack/react-table';
import { Role } from '@/features/roles-and-permissions/types';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';

const UserRoles = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [limit, setLimit] = useState('10');
	const [search, setSearch] = useState('');

	const { data: roles, isLoading } = useGetRolesQuery({
		page: +searchParams.get('page')! || 1,
		limit: +limit,
	});

	const columns: ColumnDef<Role>[] = [
		{
			accessorKey: 'title',
			header: 'Title',
		},
		{
			accessorKey: 'description',
			header: 'Description',
		},
		{
			accessorKey: 'permissions',
			header: 'Permissions',
			cell: ({ row }) => {
				const permissions = row.getValue('permissions') as string[];
				return (
					<div className='flex flex-col gap-1'>
						{permissions.map((permission, index) => (
							<span key={index} className='text-sm text-black-950'>
								{permission}
								{index < permissions.length - 1 && ','}
							</span>
						))}
					</div>
				);
			},
		},
		{
			accessorKey: '',
			header: 'Actions',
			cell: ({ row }) => (
				<div className='flex items-center gap-4'>
					<Link href={`/user-roles/${row.original._id}/edit`}>{icons.Edit}</Link>
					<button>{icons.Delete}</button>
				</div>
			),
		},
	];

	return (
		<div className='h-full p-4'>
			{isLoading ? (
				<Pulse />
			) : roles?.pagination?.total === -0 ? (
				<div className='h-full rounded-[8px] md:rounded-[16px] bg-white'>
					<div className='flex flex-col items-center justify-center h-full text-center gap-3 max-w-[23.75rem] mx-auto px-4'>
						{icons.Discount}

						<div>
							<h2 className='text-[1.25rem] md:text-2xl text-black-950 font-bold'>
								No Role Created Yet
							</h2>
							<p className='text-sm md:text-base text-black-700'>
								User roles created will appear here
							</p>
						</div>

						<Button variant={'primary'} className='w-full mt-6'>
							+ Create Role
						</Button>
					</div>
				</div>
			) : (
				<div className='bg-white p-4 md:p-6 rounded-[4px]'>
					<Search
						title='Roles Overview'
						value={search}
						buttonText='+Create Role'
						tClass='md:max-w-full top-0'
						sClass='mt-8 md:mt-0'
						onChange={(e) => setSearch(e.target.value)}
						onClick={() => router.push('/user-roles/new-role')}
					/>

					<DataTable
						columns={columns}
						data={roles!.data}
						totalPages={roles!.pagination.totalPages}
						value={limit}
						onChange={(e) => setLimit(e.target.value)}
					/>
				</div>
			)}
		</div>
	);
};

export default UserRoles;
