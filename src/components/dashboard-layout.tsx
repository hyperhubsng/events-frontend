'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { withAuth } from '@/app/withAuth';

import Navbar from './navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='flex flex-col w-full'>
				<Navbar />
				<main>
					<div className='app-container w-full flex-1'>{children}</div>
				</main>
			</div>
		</SidebarProvider>
	);
};

export default withAuth(Layout);
