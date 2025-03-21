type PreviewEventProps = {
	about: string;
	venue: string;
	event_img_1: File;
	event_img_2: File;
	event_img_3: File;
	event_name: string;
	eventType: string;
	coordinates: string;
	ownerId: string;
	startDate: Date;
	start_time: string;
	thumbnail: File;
};

type Pagination = {
	prevPage: number;
	nextPage: number | null;
	perPage: number;
	offset: number;
	total: number;
	currentPage: number;
	totalPages: number;
};
