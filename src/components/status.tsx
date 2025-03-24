import { cn } from '@/lib/utils';

const Status = ({ status }: { status: string }) => {
	const getColor = () => {
		switch (status) {
			case 'active':
				return 'bg-[#F3F9F5] text-[#15803D]';

			default:
				break;
		}
	};
	return (
		<span
			className={cn(
				'flex items-center justify-center capitalize h-[25px] rounded-[4px] px-2 text-sm w-max',
				getColor()
			)}>
			{status}
		</span>
	);
};

export default Status;
