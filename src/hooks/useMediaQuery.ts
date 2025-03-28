/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export function useMediaQuery(query: any) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => {
			setMatches(media.matches);
		};
		media.addListener(listener);
		return () => media.removeListener(listener);
	}, [matches, query]);

	return matches;
}
