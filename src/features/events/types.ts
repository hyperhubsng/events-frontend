export type Event = {
	_id: string;
	ownerId: string;
	createdBy: string;
	description: string;
	title: string;
	eventType: string;
	venue: string;
	bannerUrl: string;
	status: string;
	images: string[];
	startDate: string;
	endDate: string;
	availableSlots: number;
	location: {
		type: string;
	};
	createdAt: string;
	updatedAt: string;
	ownerIdData: {
		_id: string;
		email: string;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		country: string;
		companyName: string;
	};
	tickets: Ticket[];
};

export type Ticket = {
	_id: string;
	eventId: string;
	ownerId: string;
	title: string;
	isAvailable: true;
	hasDiscount: false;
	price: number;
	quantity: number;
	orderLimit: number;
	createdAt: string;
	updatedAt: string;
	quantityAvailable: number;
	quantitySold: number;
	totalAmountReceived: number;
	totalAmountSold: number;
};

export type EventsData = {
	data: Event[];
	status: string;
	pagination: {
		prevPage: number;
		nextPage: number | null;
		perPage: number;
		offset: number;
		total: number;
		currentPage: number;
		totalPages: number;
	};
};

export type EventsParams = {
	status?: string;
	page?: number;
	q?: string;
	owner?: string;
};

export type CreateEventPayload = {
	title: string;
	description: string;
	venue: string;
	startDate: string;
	endDate: string;
	eventType: string;
	ownerId: string;
	files: File[];
};
