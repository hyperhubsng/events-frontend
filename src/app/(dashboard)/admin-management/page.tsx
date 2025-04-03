import AdminMgt from '@/_pages/dashboard/admin-mgt';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin Management',
};

const AdminMgtpage = () => {
	return <AdminMgt />;
};

export default AdminMgtpage;
