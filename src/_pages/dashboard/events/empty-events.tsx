import { icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

const EmptyEvents = () => {
	return (
		<div
			className='h-full bg-white flex flex-col justify-center 
    items-center rounded-[8px] md:rounded-2xl'>
			<div className='max-w-[20rem] w-full flex flex-col items-center text-center'>
				{icons.Events}
				<h2 className='text-base md:text-[2rem] text-black-950 font-bold pt-2'>
					No Event Created Yet
				</h2>
				<p className='text-black-700 text-sm md:text-base'>
					Events created will appear here
				</p>
				<Button variant='primary' className='w-full mt-[1.25rem]'>
					+ Create Event
				</Button>
			</div>
		</div>
	);
};

export default EmptyEvents;
