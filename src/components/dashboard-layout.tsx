'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { withAuth } from '@/app/withAuth';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<main>
				<AppSidebar />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default withAuth(Layout);
