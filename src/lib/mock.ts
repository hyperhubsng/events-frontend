import { LayoutGrid, Settings } from 'lucide-react';

export const sidebarLinks = [
	{
		name: 'Dashboard',
		href: '/',
		icon: LayoutGrid,
	},
	{
		name: 'Events',
		href: '/events',
	},
	{
		name: 'Admin Tools',
		subLinks: [
			{
				name: 'User Management',
				href: '/user-management',
			},
			{
				name: 'Organizer Management',
				href: '/organizer-management',
			},
			{
				name: 'User Roles',
				href: '/user-roles',
			},
		],
	},
	{
		name: 'Settings',
		href: '/settings',
		icon: Settings,
	},
];
