import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	deleteTicketCategory,
	editTicketCategory,
	selectTicketCategories,
	setTicketCategories,
} from '@/features/tickets/ticketsSlice';
import { icons } from '@/components/icons';
import { toast } from 'sonner';

const TicketCategory = () => {
	const router = useRouter();

	const ticketCategories = useAppSelector(selectTicketCategories);

	const [openModal, setOpenModal] = useState(false);
	const [ticket, setTicket] = useState<TicketProps | null>(null);

	return (
		<div className='mt-6 relative -mx-6'>
			<div className='flex flex-col items-center justify-center'>
				{ticketCategories.length === 0 ? (
					<div
						className='flex flex-col items-center justify-center  gap-5
					 max-w-[19.125rem] mx-auto text-center'>
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
					</div>
				) : (
					<ul className='w-full px-6 grid gap-4 mb-4'>
						{ticketCategories.map((ticket, i) => (
							<Ticket
								ticket={ticket}
								key={ticket.id}
								category={`Category ${i + 1}`}
								setTicket={setTicket}
								setOpenModal={setOpenModal}
							/>
						))}
					</ul>
				)}

				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogTrigger asChild className='max-w-[19.125rem] mx-auto text-center'>
						<Button variant={'outline'} className='w-full mt-4'>
							+ Add Ticket
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Ticket Category 1</DialogTitle>
						</DialogHeader>
						<TicketModal
							setOpenModal={setOpenModal}
							ticket={ticket}
							setTicket={setTicket}
						/>
					</DialogContent>
				</Dialog>
			</div>
			<div className='absolute -bottom-[9rem] md:-bottom-[7rem] grid gap-4 sm:grid-cols-2 w-full'>
				<Button
					variant='primary'
					type='button'
					className='w-full'
					disabled={ticketCategories.length === 0}>
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

type TicketProps = {
	id: string;
	name: string;
	quantity: string;
	limit: string;
};

const TicketModal = ({
	ticket,
	setTicket,
	setOpenModal,
}: {
	ticket?: TicketProps | null;
	setTicket: (e: null) => void;
	setOpenModal: (e: boolean) => void;
}) => {
	const dispatch = useAppDispatch();
	const ticketCategories = useAppSelector(selectTicketCategories);

	const [formData, setFormData] = useState({
		name: ticket?.name ?? '',
		quantity: ticket?.quantity ?? '',
		limit: ticket?.limit ?? '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!ticket) {
			const findTicket = ticketCategories.find(
				(_ticket) => _ticket.name.toLowerCase() === formData?.name?.toLowerCase()
			);

			if (findTicket) {
				toast.error('Ticket category already exists!');
				return;
			}

			dispatch(
				setTicketCategories({
					...formData,
					id: new Date().toISOString(),
				})
			);
		} else {
			dispatch(editTicketCategory({ ...formData, id: ticket.id }));
			setTicket(null);
		}

		setOpenModal(false);
	};

	return (
		<form className='mt-2' onSubmit={handleSubmit}>
			<FormItem>
				<FormLabel
					className='text-black-950 text-sm md:text-base font-semibold'
					htmlFor='name'>
					Ticket Category Name
				</FormLabel>
				<Input
					id='name'
					name='name'
					placeholder='ex. Early Bird'
					className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</FormItem>

			<div className='grid sm:grid-cols-2 gap-4 mt-4'>
				<FormItem>
					<FormLabel
						className='text-black-950 text-sm md:text-base font-semibold'
						htmlFor='quantity'>
						Qty
					</FormLabel>
					<Input
						id='quantity'
						name='quantity'
						placeholder='Quantity'
						className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
						value={formData.quantity}
						onChange={handleChange}
						required
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
						name='limit'
						placeholder='Limit'
						className='h-[44px] text-sm font-medium placeholder:text-white-300 placeholder:font-normal text-black-950
														focus-visible:ring-0
														'
						value={formData.limit}
						onChange={handleChange}
						required
					/>
				</FormItem>
			</div>
			<div className='flex items-center justify-center'>
				<Button variant={'primary'} className='mt-8 w-[19.15rem]'>
					Create Ticket Category
				</Button>
			</div>
		</form>
	);
};

const Ticket = ({
	ticket,
	category,
	setTicket,
	setOpenModal,
}: {
	ticket: TicketProps;
	category: string;
	setTicket: (e: TicketProps) => void;
	setOpenModal: (e: boolean) => void;
}) => {
	const dispatch = useAppDispatch();

	const openModal = () => {
		setOpenModal(true);
		setTicket(ticket);
	};

	return (
		<li className='border border-solid border-[#EAEAEACC] rounded-[4px]'>
			<div className='bg-[#F5F5F5] px-4 py-3'>
				<h3 className='text-black-950 text-sm font-semibold'>{category}</h3>
			</div>

			<div className='flex items-center justify-between px-4 py-3'>
				<div>
					<h4 className='text-sm sm:text-base text-black-950 font-bold'>
						{ticket.name}
					</h4>
					<h5 className='mt-3 text-black-950 text-sm'>
						{ticket.quantity} | {ticket.limit} per person
					</h5>
				</div>
				<div className='flex items-center gap-6'>
					<button onClick={openModal}>{icons.Edit}</button>
					<button onClick={() => dispatch(deleteTicketCategory(ticket.id))}>
						{icons.Delete}
					</button>
				</div>
			</div>
		</li>
	);
};
