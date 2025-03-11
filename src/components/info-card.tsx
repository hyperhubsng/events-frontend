type CardProps = {
	icon: React.ReactNode;
	title: string;
	info: string;
};

const InfoCard: React.FC<CardProps> = ({ icon, title, info }) => {
	return (
		<div
			className='bg-white h-[53px] rounded-[4px] 
    md:h-[93px] md:rounded-[8px] flex items-center px-3 md:px-6'>
			<div className='flex items-center gap-4'>
				{icon}
				<div className='flex flex-col'>
					<h2 className='text-xs md:text-sm text-black-950 font-medium'>{title}</h2>
					<h3 className='text-base md:text-[1.25rem] text-black-950 font-bold'>
						{info}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default InfoCard;
