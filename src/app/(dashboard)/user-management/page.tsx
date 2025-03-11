import UserMgt from '@/_pages/dashboard/user-mgt';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'User Management',
};

const UserMgtpage = () => {
	return <UserMgt />;
};

export default UserMgtpage;
