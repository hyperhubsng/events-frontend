'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/features/auth/authSlice';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import ForgotPassword from '@/_pages/auth/forgot-password';
import ResetPassword from '@/_pages/auth/reset-password';

const Settings = () => {
	const user = useAppSelector(selectUser);
	const [openForgotModal, setOpenForgotModal] = useState(false);
	const [openResetModal, setOpenResetModal] = useState(false);

	return (
		<div className='p-4'>
			<div className=' flex justify-center items-center'>
				<div className='max-w-[39.25rem] w-full bg-white rounded-[24px] p-6'>
					<h2 className='text-2xl text-primary font-bold'>Profile Details</h2>

					<div className='mt-6 grid gap-6'>
						<div className='grid gap-2'>
							<h3 className='text-primary text-base'>Name</h3>
							<p className='text-primary text-base font-semibold capitalize'>
								{user?.firstName} {user?.lastName}
							</p>
						</div>

						<div className='grid gap-2'>
							<h3 className='text-primary text-base'>Email Address</h3>
							<p className='text-primary text-base font-semibold'>{user?.email}</p>
						</div>

						<div className='grid gap-2'>
							<h3 className='text-primary text-base'>User Role</h3>
							<p className='text-primary text-base font-semibold capitalize'>
								{user?.userType}
							</p>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center justify-between'>
								<h3 className='text-primary text-base'>Password</h3>
								<button
									className='text-base text-[#003366] font-semibold underline'
									onClick={() => setOpenForgotModal((prev) => !prev)}>
									Change Password
								</button>
							</div>
							<p className='text-primary text-base font-semibold'>xxxxxxx</p>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={openForgotModal} onOpenChange={setOpenForgotModal}>
				<DialogContent>
					<ForgotPassword
						onSubmitComplete={() => {
							setOpenForgotModal(false);
							setOpenResetModal(true);
						}}
					/>
				</DialogContent>
			</Dialog>

			<Dialog open={openResetModal} onOpenChange={setOpenResetModal}>
				<DialogContent>
					<ResetPassword fromSettings />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Settings;
