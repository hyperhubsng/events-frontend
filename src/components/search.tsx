import { ChangeEventHandler } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

import Link from 'next/link';

type SearchProps = {
	title: string;
	value: string;
	buttonText: string;
	link?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
};

const Search: React.FC<SearchProps> = ({
	title,
	value,
	buttonText,
	link,
	onChange,
}) => {
	return (
		<div className='flex items-start sm:items-center justify-between relative'>
			<h2 className='text-[1.25rem] sm:text-2xl text-black-950 font-bold absolute top-2 sm:relative sm:top-0'>
				{title}
			</h2>
			<div className='flex items-center justify-end gap-4 flex-wrap-reverse w-full md:w-auto'>
				<div className='relative w-full sm:w-auto'>
					<svg
						width='13'
						height='15'
						viewBox='0 0 13 15'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='absolute left-4 top-3'>
						<path
							d='M12.0273 6.36295C12.0273 9.49045 9.49165 12.0259 6.36364 12.0259C3.23563 12.0259 0.7 9.49045 0.7 6.36295C0.7 3.23546 3.23563 0.7 6.36364 0.7C9.49165 0.7 12.0273 3.23546 12.0273 6.36295Z'
							stroke='#C4C4D0'
							strokeWidth='1.4'
						/>
						<line
							x1='0.7'
							y1='-0.7'
							x2='4.69944'
							y2='-0.7'
							transform='matrix(-0.707145 -0.707069 0.707145 -0.707069 12.7261 14)'
							stroke='#C4C4D0'
							strokeWidth='1.4'
							strokeLinecap='round'
						/>
					</svg>

					<Input
						className='h-[40px] text-sm font-medium placeholder:text-white-300 
														placeholder:font-normal text-black-950 focus-visible:ring-0
														w-full sm:w-[15rem] pl-10'
						placeholder='Search'
						id='search'
						value={value}
						onChange={onChange}
					/>
				</div>

				{link ? (
					<Link href={link}>
						<Button variant={'primary'} className='!h-[40px] md:h-[48px]'>
							{buttonText}
						</Button>
					</Link>
				) : (
					<Button variant={'primary'} className='!h-[40px] md:h-[48px]'>
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	);
};

export default Search;
