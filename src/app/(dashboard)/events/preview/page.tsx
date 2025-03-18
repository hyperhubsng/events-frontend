import PreviewEvent from '@/_pages/dashboard/events/preview';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Preview Event',
};

const Previewpage = () => {
	return <PreviewEvent />;
};

export default Previewpage;
