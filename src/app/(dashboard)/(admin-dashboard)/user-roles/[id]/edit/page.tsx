import NewRole from '@/_pages/dashboard/user-roles/new-role';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit Role',
};

const Editrolepage = () => {
	return <NewRole />;
};

export default Editrolepage;
