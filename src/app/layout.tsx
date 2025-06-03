import type { Metadata } from 'next';
import { Figtree, Modak } from 'next/font/google';
import { metaDataOptions } from '@/lib/metadata';
import { Toaster } from '@/components/ui/sonner';

import StoreProvider from './store-provider';

import './globals.css';

const figtree = Figtree({
	variable: '--font-figtree',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

const modak = Modak({
	variable: '--font-modak',
	weight: ['400'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Crowdcync Hive Admin Dashboard',
		template: '%s | Crowdsync',
	},
	description:
		'This is the Crowdsync admin dashboard, where you can manage your events, view analytics, and more.',
	metadataBase: new URL('https://main.d1hpcnrwcj0f1c.amplifyapp.com'),
	...metaDataOptions,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${figtree.variable} ${modak.variable} antialiased`}>
				<StoreProvider>{children}</StoreProvider>
				<Toaster position='top-right' richColors />
			</body>
		</html>
	);
}
