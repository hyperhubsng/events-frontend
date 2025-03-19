import { format } from 'date-fns';

const Details: React.FC<PreviewEventProps> = ({ ...event }) => {
	// console.log(event);

	return (
		<article className='flex flex-col gap-8 md:gap-10'>
			<h2 className='text-[2rem] sm:text-4xl lg:text-[4rem] text-[#1F1F1F] font-modak max-w-658'>
				{event?.event_name}
			</h2>

			<div>
				<div className='flex items-center gap-4 md:gap-6'>
					<div
						className='border border-[#E0E0E0] border-solid rounded-[4px] md:rounded-[8px] 
					h-[48px] md:h-[80px] w-[48px] md:w-[80px]'>
						<div
							className='flex items-center justify-center bg-[#F2F2F2] rounded-t-[4px] 
						md:rounded-t-[8px] h-[40%]'>
							<span className='text-[12px] md:text-base text-black-950 uppercase'>
								{format(event.start_date, 'LLL')}
							</span>
						</div>
						<div className='flex items-center justify-center h-[60%]'>
							<span className='text-[10px] md:text-[1.25rem] text-black-950 font-bold'>
								{format(event.start_date, 'MM')}
							</span>
						</div>
					</div>

					<div>
						<h3 className='text-black-950 text-base md:text-2xl font-medium'>
							{format(event.start_date, 'EEEE, LLLL dd, yyyy')}
						</h3>
						<p className='text-[#4D4D4D] text-sm md:text-[1.25rem] '>
							{event.start_time}
						</p>
					</div>
				</div>
			</div>

			<div>
				<div className='flex items-center gap-4 md:gap-6'>
					<div
						className='border border-[#E0E0E0] border-solid rounded-[4px] md:rounded-[8px] 
          flex items-center justify-center 	h-[48px] md:h-[80px] w-[48px] md:w-[80px]'>
						<svg
							width='38'
							height='44'
							viewBox='0 0 38 44'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='h-[24px] md:h-[44px]'>
							<path
								d='M35.8422 18.6667C35.8422 30.0937 22.3685 42.0001 19.0001 42.0001C15.6317 42.0001 2.15796 30.0937 2.15796 18.6667C2.15796 9.46194 9.69844 2 19.0001 2C28.3018 2 35.8422 9.46194 35.8422 18.6667Z'
								stroke='#040404'
								strokeWidth='4'
							/>
							<ellipse
								cx='6.3158'
								cy='6.3158'
								rx='6.3158'
								ry='6.3158'
								transform='matrix(-1 0 0 1 25.3159 11.4738)'
								stroke='#040404'
								strokeWidth='4'
							/>
						</svg>
					</div>

					<div>
						<h3 className='text-black-950 text-base md:text-2xl font-medium'>
							{event.event_address}
						</h3>
						<p className='text-[#4D4D4D] text-sm md:text-[1.25rem]'>City, State.</p>
					</div>
				</div>
			</div>

			<div>
				<div className='pb-[12px] border-b border-b-[#E0E0E0] border-solid'>
					<h4 className='text-base sm:text-2xl text-black-950 font-bold'>
						About event
					</h4>
				</div>

				<div className='flex flex-col gap-4 mt-[1.125rem] pr-4'>
					<p className='text-base text-black-950 leading-[1.25]'>{event.about}</p>
				</div>
			</div>
		</article>
	);
};

export default Details;
