import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type TabsProps = {
	selected: string;
	setSelected: (e: string) => void;
	items: string[];
};

const Tabs: React.FC<TabsProps> = ({ items, selected, setSelected }) => {
	return (
		<ul className='flex items-center gap-3'>
			{items.map((item) => (
				<li
					key={item}
					className={cn(
						`'text-black-700 text-base relative before:absolute before:left-0 before:-bottom-1 before:h-[2px]
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
