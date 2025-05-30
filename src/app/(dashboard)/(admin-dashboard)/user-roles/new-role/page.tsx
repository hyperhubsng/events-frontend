import NewRole from '@/_pages/dashboard/user-roles/new-role';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Role',
};

const Newrolepage = () => {
	return <NewRole />;
};

export default Newrolepage;
