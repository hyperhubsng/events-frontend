import { cn } from '@/lib/utils';

type TabsProps = {
	selected: string;
	setSelected: (e: string) => void;
	items: string[];
	className?: string;
};

const Tabs: React.FC<TabsProps> = ({ items, selected, setSelected, className }) => {
	return (
		<ul className={cn('flex items-center gap-3', className)}>
			{items.map((item) => (
				<li
					key={item}
					className={cn(
						`text-black-700 text-xs md:text-base relative before:absolute before:left-0 before:-bottom-1 before:h-[2px]
            before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-blue-50`,
						selected === item && 'text-blue-50 font-medium before:w-full'
					)}>
					<button className='w-full' onClick={() => setSelected(item)}>
						{item}
					</button>
				</li>
			))}
		</ul>
	);
};

export default Tabs;
