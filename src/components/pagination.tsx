'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Pagination({
	totalPages,
	value,
	onChange,
}: {
	totalPages: number;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const getCurrentPageFromUrl = useCallback(() => {
		const page = searchParams.get('page');
		return page ? parseInt(page, 10) : 1;
	}, [searchParams]);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(getCurrentPageFromUrl());
	}, [getCurrentPageFromUrl]);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === null) {
				params.delete(name);
			} else {
				params.set(name, value);
			}
			return params.toString();
		},
		[searchParams]
	);

	const handlePageChange = useCallback(
		(page: number) => {
			if (page < 1 || page > totalPages) return;

			let queryString;
			if (page === 1) {
				queryString = createQueryString('page', '');
			} else {
				queryString = createQueryString('page', page.toString());
			}

			router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
		},
		[pathname, router, createQueryString, totalPages]
	);

	const renderPageNumbers = () => {
		const pageNumbers = [];

		pageNumbers.push(
			<button
				key={1}
				onClick={() => handlePageChange(1)}
				className={`w-8 h-8 flex items-center justify-center rounded-md ${
					currentPage === 1
						? 'bg-blue-50 text-white'
						: 'bg-white text-blue-50 border border-blue-50 border-solid hover:bg-gray-100'
				}`}>
				1
			</button>
		);

		if (currentPage > 3) {
			pageNumbers.push(
				<span key='ellipsis-1' className='px-2'>
					...
				</span>
			);
		}

		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			if (i === 1 || i === totalPages) continue;

			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`w-8 h-8 flex items-center justify-center rounded-md ${
						currentPage === i
							? 'bg-blue-50 text-white'
							: 'bg-white text-blue-50 border border-blue-50 border-solid hover:bg-gray-100'
					}`}>
					{i}
				</button>
			);
		}

		if (currentPage < totalPages - 2) {
			pageNumbers.push(
				<span key='ellipsis-2' className='px-2'>
					...
				</span>
			);
		}

		if (totalPages > 1) {
			pageNumbers.push(
				<button
					key={totalPages}
					onClick={() => handlePageChange(totalPages)}
					className={`w-8 h-8 flex items-center justify-center rounded-md ${
						currentPage === totalPages
							? 'bg-blue-50 text-white'
							: 'bg-white text-blue-50 border border-blue-50 border-solid hover:bg-gray-100'
					}`}>
					{totalPages}
				</button>
			);
		}

		return pageNumbers;
	};

	return (
		<div className='flex flex-wrap gap-4 justify-center md:justify-between md:grid md:grid-cols-2 lg:grid-cols-3 px-2 py-4'>
			<div className='flex items-center gap-2 w-max'>
				<p className='text-[#4A4A4A] text-xs'>Showing</p>
				<div className='flex items-center justify-center border border-white-300 border-solid rounded-md h-8 w-8 relative'>
					<input
						value={value}
						onChange={onChange}
						className='text-black-950 text-xs text-center outline-none'
					/>
				</div>
				<p className='text-[#4A4A4A] text-xs'>Items</p>
			</div>
			<div className='flex items-center space-x-2 font-medium '>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`md:px-4 py-1 rounded-md flex ${
						currentPage === 1
							? 'text-[#606060] cursor-not-allowed'
							: 'text-blue-50 hover:bg-gray-100'
					}`}>
					Prev <span className='hidden md:block'>ious</span>
				</button>

				{renderPageNumbers()}

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`md:px-4 py-1 rounded-md ${
						currentPage === totalPages
							? 'text-[#606060] cursor-not-allowed'
							: 'text-blue-50 hover:bg-gray-100'
					}`}>
					Next
				</button>
			</div>
		</div>
	);
}
