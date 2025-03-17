import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const TicketCategory = () => {
	const router = useRouter();

	return (
		<div className='mt-6 relative -mx-6'>
			<div
				className='flex flex-col items-center justify-center 
										max-w-[19.125rem] mx-auto text-center gap-5'>
				<svg
					width='120'
					height='120'
					viewBox='0 0 120 120'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='h-[64px] md:h-[120px]'>
					<rect width='120' height='120' rx='16' fill='#F2F5F7' />
					<path
						d='M43.75 52.5H76.25'
						stroke='#003366'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M43.75 62.5H76.25'
						stroke='#003366'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M35.7889 82.1056C33.1293 83.4354 30 81.5014 30 78.5279V37.5C30 36.837 30.2634 36.2011 30.7322 35.7322C31.2011 35.2634 31.837 35 32.5 35H87.5C88.163 35 88.7989 35.2634 89.2678 35.7322C89.7366 36.2011 90 36.837 90 37.5V78.5279C90 81.5014 86.8708 83.4354 84.2111 82.1056L81.7889 80.8944C80.6627 80.3314 79.3373 80.3314 78.2111 80.8944L71.7889 84.1056C70.6627 84.6686 69.3373 84.6686 68.2111 84.1056L61.7889 80.8944C60.6627 80.3314 59.3373 80.3314 58.2111 80.8944L51.7889 84.1056C50.6627 84.6686 49.3373 84.6686 48.2111 84.1056L41.7889 80.8944C40.6627 80.3314 39.3373 80.3314 38.2111 80.8944L35.7889 82.1056Z'
						stroke='#003366'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>

				<div>
					<h3 className='text-[1.25rem] text-black-950 font-bold'>
						No Ticket Category Created Yet
					</h3>
					<p className='text-sm sm:text-base text-black-700'>
						Categories created will appear here
					</p>
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant={'outline'} className='w-full mt-3'>
							+ Add Ticket
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Ticket Category 1</DialogTitle>
						<TicketsModal />
					</DialogContent>
				</Dialog>
			</div>
			<div className='absolute -bottom-[9rem] md:-bottom-[7rem] grid gap-4 sm:grid-cols-2 w-full'>
				<Button variant='primary' type='button' className='w-full'>
					Continue
				</Button>

				<Button variant='outline' type='button' onClick={() => router.back()}>
					Go Back
				</Button>
			</div>
		</div>
	);
};

export default TicketCategory;

const TicketsModal = () => {
	return (
		<div className='mt-2'>
			<FormItem>
				<FormLabel
					className='text-black-950 text-sm md:text-base font-semibold'
					htmlFor='ticket_category'>
					Ticket Category Name
				</FormLabel>
				<Input
					id='ticket_category'
					placeholder='ex. Early Bird'
					className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
				/>
			</FormItem>

			<div className='grid sm:grid-cols-2 gap-4 mt-4'>
				<FormItem>
					<FormLabel
						className='text-black-950 text-sm md:text-base font-semibold'
						htmlFor='qty'>
						Qty
					</FormLabel>
					<Input
						id='qty'
						placeholder='Quantity'
						className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
					/>
				</FormItem>
				<FormItem>
					<FormLabel
						className='text-black-950 text-sm md:text-base font-semibold'
						htmlFor='limit'>
						Purchase Limit
					</FormLabel>
					<Input
						id='limit'
						placeholder='Limit'
						className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
					/>
				</FormItem>
			</div>
			<div className='flex items-center justify-center'>
				<Button variant={'primary'} className='mt-8 w-[19.15rem]'>
					Create Ticket Category
				</Button>
			</div>
		</div>
	);
};
