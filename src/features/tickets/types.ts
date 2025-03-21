export type Ticket = {
	_id: string;
	eventId: string;
	ownerId: string;
	title: string;
	isAvailable: false;
	hasDiscount: false;
	quantity: number;
	orderLimit: number;
	price: number;
	createdAt: string;
	updatedAt: string;
	attendees: [];
	ticketId: string;
	discountValue: string;
	discountType: string;
	availableTickets: number;
	soldTickets: number;
};

export type TicketsData = {
	data: Ticket[];
	pagination: Pagination;
};

export type CreateTicketPayload = {
	title: string;
	quantity: number;
	price: number;
	orderLimit: number;
	eventId: string;
};
