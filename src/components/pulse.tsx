import { cn } from '@/lib/utils';

const Pulse = ({ height }: { height?: string }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center bg-white',
				height ?? 'h-full'
			)}>
			<div className='pulse' />
		</div>
	);
};

export default Pulse;
