/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	useDeleteRoleMutation,
	useGetRolesQuery,
} from '@/features/roles-and-permissions/rolesPermissionsApi';
import { Button } from '@/components/ui/button';
import { icons } from '@/components/icons';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { Role } from '@/features/roles-and-permissions/types';
import { DataTable } from '@/components/ui/data-table';
import { toast } from 'sonner';

import Pulse from '@/components/pulse';
import Search from '@/components/search';
import Link from 'next/link';
import LoadingButton from '@/components/loading-button';

const UserRoles = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [limit, setLimit] = useState('10');
	const [search, setSearch] = useState('');

	const [roleId, setRoleId] = useState<null | string>(null);

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
					<button onClick={() => setRoleId(row.original._id)}>{icons.Delete}</button>
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

			<Dialog open={roleId !== null} onOpenChange={() => setRoleId(null)}>
				<DialogContent>
					<DialogHeader className='flex items-end'>
						<button onClick={() => setRoleId(null)}>{icons.Close}</button>
					</DialogHeader>
					<DeleteModal id={roleId} onClose={() => setRoleId(null)} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UserRoles;

const DeleteModal = ({
	id,
	onClose,
}: {
	id: string | null;
	onClose: () => void;
}) => {
	const [deleteRole, { isLoading }] = useDeleteRoleMutation();

	const handleDeactivation = async () => {
		try {
			await deleteRole(id!).unwrap();
			toast.success('Role deleted successfully');
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
					Delete Role
				</DialogTitle>
				<DialogDescription className='text-black-700'>
					Proceeding would delete the role.
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
