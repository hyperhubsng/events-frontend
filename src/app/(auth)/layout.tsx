import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='bg-[url(/images/auth-bg.png)] bg-cover bg-no-repeat'>
			{children}
		</main>
	);
};

export default AuthLayout;
