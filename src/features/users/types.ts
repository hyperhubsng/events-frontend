export type User = {
	accountStatus: string;
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	country: string;
	companyName: string;
	website: string;
	locked: boolean;
	userType: string;
	createdAt: string;
	updatedAt: string;
	organisations: string[];
	totalEvents: number;
	totalRevenue: number;
	totalCommissions: number;
	softDelete: false;
	dob: string;
	gender: string;
	role: {
		title: string;
		permissions: string[];
		organisationId: string;
		description: string;
		softDelete: false;
		roleId: string;
	};
	designation: string;
	profileImageUrl: string;
};

export type UsersData = {
	data: {
		users: User[];
		stats: {
			total: number;
			inactive: number;
			active: number;
		};
	};
	pagination: {
		prevPage: number;
		nextPage: null;
		perPage: number;
		offset: number;
		total: number;
		currentPage: number;
		totalPages: number;
	};
};

export type UsersParams = {
	userType?: string;
	status?: string;
};
