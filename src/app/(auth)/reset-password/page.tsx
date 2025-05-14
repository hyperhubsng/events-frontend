import ResetPassword from '@/_pages/auth/reset-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Reset Password',
};

const ResetPasswordpage = () => {
	return <ResetPassword />;
};

export default ResetPasswordpage;
