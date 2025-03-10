import React from 'react';
import Login from '@/_pages/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

const Loginpage = () => {
	return <Login />;
};

export default Loginpage;
