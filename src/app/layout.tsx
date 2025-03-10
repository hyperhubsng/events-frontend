import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
	variable: '--font-figtree',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
	title: {
		default: 'HyperHubs Admin App',
		template: '%s| HyperHubs Admin',
	},
	description: 'This is the hyperhubs events admin app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${figtree.variable} antialiased`}>
				<main>{children}</main>
			</body>
		</html>
	);
}
