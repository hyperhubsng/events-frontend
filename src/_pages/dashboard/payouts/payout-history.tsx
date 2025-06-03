'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

import Image from 'next/image';
import BankDetailsForm from './bank-details-form';

const PayoutHistory = () => {
	const bank_details = false;
	const bank_verification = null;
	const payout_history = [];

	const [openBankDetailsModal, setOpenBankDetailsModal] = useState(false);

	return (
		<div className='mt-4 flex-1 bg-white'>
			{/* empty states */}
			<div className='flex flex-col items-center justify-center h-full'>
				{!bank_details ? (
					<div className='flex flex-col items-center'>
						<Image
							src='/icons/bank.svg'
							width={136}
							height={136}
							alt='Bank Icon'
							className='max-md:h-[90px]'
						/>
						<h2 className='text-[#101010] text-[1.25rem] md:text-2xl lg:text-[1.75rem] text-center font-semibold mt-4'>
							No Bank Details{' '}
						</h2>

						<p className='text-[#4D4D4D] text-base mt-2'>
							To be able to withdraw money, add your bank details
						</p>

						<Button
							variant={'primary'}
							className='max-w-[16.625rem] w-full mt-4'
							onClick={() => setOpenBankDetailsModal(true)}>
							Add bank details
						</Button>
					</div>
				) : bank_verification === 'pending' && bank_details ? (
					<div></div>
				) : (
					payout_history.length === 0 && bank_details && <div></div>
				)}
			</div>

			<Dialog open={openBankDetailsModal} onOpenChange={setOpenBankDetailsModal}>
				<BankDetailsForm
					isOpen={openBankDetailsModal}
					onClose={() => setOpenBankDetailsModal(false)}
				/>
			</Dialog>
		</div>
	);
};

export default PayoutHistory;
