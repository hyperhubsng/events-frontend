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
	accountType?: string;
	status?: string;
};
