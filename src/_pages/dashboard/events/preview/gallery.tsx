'use client';

import { useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type GalleryProps = {
	images: string[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	const [active, setActive] = useState<number | undefined>(0);

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

	emblaApi?.on('select', () => {
		setActive(emblaApi?.selectedScrollSnap());
	});

	return (
		<section className='mt-6'>
			<div className='embla'>
				<div
					className='embla__viewport relative rounded-[12px] md:rounded-[24px] overflow-hidden'
					ref={emblaRef}>
					<div className='embla__container'>
						{images?.map((img, i) => (
							<figure key={i} className='embla__slide'>
								<Image
									src={img}
									// src='/images/event-img.png'
									width={1120}
									height={510}
									alt='gallery image'
									className='w-full h-[180px] md:h-[610px] object-cover object-top'
								/>
							</figure>
						))}
					</div>

					<div className=' flex items-center justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%]'>
						<button onClick={() => emblaApi?.scrollPrev()}>
							<svg
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-[32px] md:h-full'>
								<rect
									x='0.5'
									y='0.5'
									width='47'
									height='47'
									rx='23.5'
									fill='#E65100'
								/>
								<rect
									x='0.5'
									y='0.5'
									width='47'
									height='47'
									rx='23.5'
									stroke='white'
								/>
								<path
									d='M32 23H19.83L25.42 17.41L24 16L16 24L24 32L25.41 30.59L19.83 25H32V23Z'
									fill='white'
								/>
							</svg>
						</button>
						<button onClick={() => emblaApi?.scrollNext()}>
							<svg
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-[32px] md:h-full'>
								<rect
									x='-0.5'
									y='0.5'
									width='47'
									height='47'
									rx='23.5'
									transform='matrix(-1 0 0 1 47 0)'
									fill='#E65100'
								/>
								<rect
									x='-0.5'
									y='0.5'
									width='47'
									height='47'
									rx='23.5'
									transform='matrix(-1 0 0 1 47 0)'
									stroke='white'
								/>
								<path
									d='M16 23H28.17L22.58 17.41L24 16L32 24L24 32L22.59 30.59L28.17 25H16V23Z'
									fill='white'
								/>
							</svg>
						</button>
					</div>

					<div
						className='flex items-center gap-[5px] md:gap-[12px] absolute 
          bottom-[20px] md:bottom-[40px] left-1/2 -translate-x-1/2'>
						{images?.map((_, i) => (
							<span
								key={i}
								className={`h-[5px] w-[5px] md:h-[12px] md:w-[12px] rounded-full transition-colors duration-300 ease-in-out ${
									active !== i ? 'bg-[#8D8D8D]' : 'bg-black-700'
								}`}></span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
