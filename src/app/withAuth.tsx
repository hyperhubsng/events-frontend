/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { selectUser } from '@/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export const withAuth = (WrappedComponent: any) => {
	return function WithAuth(props: any) {
		const user = useAppSelector(selectUser);

		if (!user) {
			redirect('/login');
		}

		return <WrappedComponent {...props} />;
	};
};
