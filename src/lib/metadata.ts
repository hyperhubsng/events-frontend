import { Metadata } from 'next';

const title = 'Crowdsync';
const description =
	'This is the Crowdsync admin dashboard, where you can manage your events, view analytics, and more.';
const url = '';

export const metaDataOptions: Metadata = {
	generator: 'Next.js',
	applicationName: 'Crowdsync',
	referrer: 'origin-when-cross-origin',
	keywords: [],
	authors: [{ name: 'Kelvin Ochubili', url: 'https://twitter.com/iykekelvins' }],
	creator: 'Kelvin Ochubili',
	publisher: 'Kelvin Ochubili',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title,
		description,
		url,
		siteName: 'Crowdsync',
		images: [
			{
				url: `/opengraph-image.png`,
				width: 800,
				height: 600,
				alt: 'Crowdsync',
			},
			{
				url: `/opengraph-image.png`,
				width: 1800,
				height: 1600,
				alt: 'Crowdsync',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	icons: {
		icon: '/icons/favicon.svg',
		shortcut: '/icons/favicon.svg',
		apple: '/icons/favicon.svg',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/icons/favicon.svg',
		},
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		creator: '@iykekelvins',
		images: {
			url: `/opengraph-image.png`,
			alt: 'Crowdsync',
		},
	},
};
