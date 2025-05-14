export type OnboardOrganizerPayload = {
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
	phoneNumber: string;
	companyName: string;
	website?: string;
	_id?: string;
};

export type OnboardAdminPayload = {
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	userType: string;
	phoneNumber: string;
	password?: string;
	_id?: string;
};
