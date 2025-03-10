/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { selectUser } from '@/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export const withoutAuth = (WrappedComponent: any) => {
	return function WithoutAuth(props: any) {
		const user = useAppSelector(selectUser);

		if (user) {
			redirect('/');
		}

		return <WrappedComponent {...props} />;
	};
};
