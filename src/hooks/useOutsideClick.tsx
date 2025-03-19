/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export const UseOutsideClick = ({
	callback,
	children,
	hideOnXl,
}: {
	callback: () => void;
	children: React.ReactNode;
	hideOnXl?: boolean;
}) => {
	const newRef = useRef<any>(null);

	const handleOutsideClick = (e: any) => {
		if (newRef.current && !newRef.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	});

	return (
		<div ref={newRef} className={hideOnXl ? 'lg:hidden' : ''}>
			{children}
		</div>
	);
};
