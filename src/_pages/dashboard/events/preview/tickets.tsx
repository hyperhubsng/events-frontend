'use client';

import { useRef, useState } from 'react';
import { UseOutsideClick } from '@/hooks/useOutsideClick';
import { Ticket as TicketProps } from '@/features/events/types';

const Tickets = ({ tickets }: { tickets: TicketProps[] }) => {
	return (
		<aside className='bg-[#F7F7F7] rounded-[12px] md:rounded-[24px] p-6 h-max'>
			<div className='flex flex-col gap-4'>
				{tickets?.map((ticket) => (
					<Ticket {...ticket} key={ticket._id} />
				))}
			</div>

			<button
				className='bg-orange-500 h-[3rem] rounded-full text-base font-medium mt-8 flex items-center justify-center
			 text-white w-full transition-colors duration-300 ease-in-out hover:bg-[#CC4A00]'>
				Proceed to checkout
			</button>

			<button
				className='text-orange-500 text-base font-medium mt-8
			 w-full transition-colors duration-300 ease-in-out hover:text-[#CC4A00]'>
				Share this event
			</button>
		</aside>
	);
};

export default Tickets;

const Ticket: React.FC<TicketProps> = ({ orderLimit, title, price }) => {
	const [showOptions, setShowOptions] = useState(false);

	const selectedRef = useRef<number>(0);
	const optionsRef = useRef<HTMLUListElement | null>(null);

	const handleTicket = (index: number) => {
		selectedRef.current = index + 1;

		setShowOptions(false);
	};

	return (
		<div
			className='border border-[#E0E0E0] border-solid rounded-[8px] 
    py-2 md:py-4 px-3  bg-white'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<h3 className='text-[#4D4D4D] text-base'>
						<span className={`${title === 'vip' ? 'uppercase' : 'capitalize'}`}>
							{title}
						</span>
						<span> tickets</span>
					</h3>

					<h4 className='text-black-950 text-base md:text-2xl font-bold'>
						N{price.toLocaleString()}
					</h4>
					{/* {!early_bird_price ? (
					) : (
						<div className='flex items-center gap-8'>
							<h4 className='text-black-950 text-16 md:text-24 font-bold'>
								N{Number(early_bird_price).toLocaleString()}
							</h4>
							<span className='text-[#808080] text-14 md:text-16 font-bold line-through'>
								N{Number(price).toLocaleString()}
							</span>
						</div>
					)}  */}
				</div>

				<div className='flex items-center gap-4'>
					<span className='bg-[#E0E0E0] h-[60px] w-[1px]' />

					<UseOutsideClick callback={() => setShowOptions(false)}>
						<div className='relative'>
							<button
								className='border border-[#C4C4C4] border-solid w-[122px] h-[2rem] md:h-[44px]
						rounded-[4px] py-2 px-3 flex items-center justify-between'
								onClick={() => setShowOptions(!showOptions)}>
								<span
									className={`text-16 ${
										selectedRef.current === 0 ? 'text-[#C4C4C4]' : 'text-black-950'
									}`}>
									{selectedRef.current === 0
										? 'Select'
										: `${selectedRef.current} ticket${
												selectedRef.current > 1 ? 's' : ''
										  }`}
								</span>
								<svg
									width='14'
									height='7'
									viewBox='0 0 14 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M1 0.857142L6.60953 5.66531C6.83422 5.8579 7.16578 5.8579 7.39047 5.66531L13 0.857142'
										stroke='#606060'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</button>

							<ul
								className={`absolute top-[44px] left-0 w-full
							 bg-white z-[4] rounded-[4px] max-h-0 overflow-hidden transition-all duration-300 ease-in-out`}
								ref={optionsRef}
								style={{
									maxHeight: showOptions ? optionsRef.current?.scrollHeight : '',
								}}>
								{Array(+orderLimit)
									.fill({})
									.map((_, i) => (
										<li
											key={i}
											className='transition-colors duration-300 ease-in-out hover:bg-[#F2F2F2] text-base'>
											<button
												className='w-full text-left px-4 py-2  h-full'
												onClick={() => handleTicket(i)}>
												{i + 1}
											</button>
										</li>
									))}
							</ul>
						</div>
					</UseOutsideClick>
				</div>
			</div>
		</div>
	);
};
