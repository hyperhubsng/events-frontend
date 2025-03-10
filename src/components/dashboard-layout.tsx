'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { withAuth } from '@/app/withAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>{children}</main>
		</SidebarProvider>
	);
};

export default withAuth(Layout);
