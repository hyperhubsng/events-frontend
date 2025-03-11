import UserRoles from '@/_pages/dashboard/user-roles';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'User Roles',
};

const UserRolespage = () => {
	return <UserRoles />;
};

export default UserRolespage;
