import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Image from 'next/image';
import Link from 'next/link';

type EventProps = {
	id: string;
	img: string;
	name: string;
	start_date: string;
	start_time: string;
	location: string;
};

const Event: React.FC<EventProps> = ({
	img,
	id,
	name,
	start_date,
	start_time,
	location,
}) => {
	const links = [
		{
			name: 'Edit Event',
			link: `/events/${id}/edit`,
		},
		{
			name: 'Discount Code',
			link: `/events/${id}/discount-code`,
		},
		{
			name: 'Sales',
			link: `/events/${id}/sales`,
		},
		{
			name: 'Guest Check-in',
			link: `/events/${id}/check-in`,
		},
	];

	return (
		<li
			className='border border-white-200 border-solid list-none
                 rounded-[4px] md:rounded-[8px] relative'>
			<figure>
				<Image
					src={img}
					width={264}
					height={160}
					alt={`thumbnail image for ${name}`}
					className='rounded-t-[4px] md:rounded-t-[8px] w-full'
				/>
			</figure>

			<div className='p-3'>
				<h3 className='text-[1.125rem] text-black-950 font-bold leading-[1]'>
					{name}
				</h3>
				<div className='mt-3'>
					<p className='text-sm text-black-700'>{start_date}</p>
					<p className='text-sm text-black-700'>{start_time}</p>
					<p className='text-sm text-black-700'>{location}</p>
				</div>
			</div>

			<Popover>
				<PopoverTrigger asChild className='absolute top-3 right-3'>
					<button>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<rect width='24' height='24' rx='12' fill='white' />
							<path
								d='M12 12.0413C12.2876 12.0413 12.5207 11.8082 12.5207 11.5207C12.5207 11.2331 12.2876 11 12 11C11.7124 11 11.4793 11.2331 11.4793 11.5207C11.4793 11.8082 11.7124 12.0413 12 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M18.4793 12.0413C18.7669 12.0413 19 11.8082 19 11.5207C19 11.2331 18.7669 11 18.4793 11C18.1918 11 17.9587 11.2331 17.9587 11.5207C17.9587 11.8082 18.1918 12.0413 18.4793 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M5.52066 12.0413C5.80821 12.0413 6.04132 11.8082 6.04132 11.5207C6.04132 11.2331 5.80821 11 5.52066 11C5.23311 11 5 11.2331 5 11.5207C5 11.8082 5.23311 12.0413 5.52066 12.0413Z'
								fill='#040404'
							/>
							<path
								d='M12 12.0413C12.2876 12.0413 12.5207 11.8082 12.5207 11.5207C12.5207 11.2331 12.2876 11 12 11C11.7124 11 11.4793 11.2331 11.4793 11.5207C11.4793 11.8082 11.7124 12.0413 12 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18.4793 12.0413C18.7669 12.0413 19 11.8082 19 11.5207C19 11.2331 18.7669 11 18.4793 11C18.1918 11 17.9587 11.2331 17.9587 11.5207C17.9587 11.8082 18.1918 12.0413 18.4793 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M5.52066 12.0413C5.80821 12.0413 6.04132 11.8082 6.04132 11.5207C6.04132 11.2331 5.80821 11 5.52066 11C5.23311 11 5 11.2331 5 11.5207C5 11.8082 5.23311 12.0413 5.52066 12.0413Z'
								stroke='#040404'
								strokeWidth='1.3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</PopoverTrigger>
				<PopoverContent
					className='bg-white rounded-[4px] w-[6.688rem] p-0'
					align='start'>
					{links.map((link) => (
						<Link
							href={link.link}
							key={link.name}
							className='text-black-950 text-xs p-2 whitespace-nowrap block'>
							{link.name}
						</Link>
					))}
				</PopoverContent>
			</Popover>
		</li>
	);
};

export default Event;
