export type Role = {
	_id: string;
	title: string;
	permissions: string[];
	organisationId: string;
	description: string;
	tag: string;
	softDelete: false;
	createdAt: string;
	updatedAt: string;
};

export type Permission = {
	_id: string;
	title: string;
	resource: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

export type RolesData = {
	data: Role[];
	pagination: Pagination;
};

export type PermissionsData = {
	data: Permission[];
	pagination: Pagination;
};

export type CreateRolePayload = {
	title: string;
	permissions: string[];
	description: string;
	action?: string;
};
