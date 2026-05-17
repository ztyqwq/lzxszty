export interface TimelineEvent {
	date: string;
	title: string;
	text: string;
	postSlug: string;
	importance: 'small' | 'medium' | 'large';
	image: string;
}

export const timelineEvents: TimelineEvent[] = [
	{
		date: '2026-05-18',
		title: '网站开始记录',
		text: '先把时间线的样子搭起来。',
		postSlug: 'first-note',
		importance: 'large',
		image: 'materials/heart.svg',
	},
	{
		date: '2026-05-18',
		title: '一次出门记录',
		text: '之后可以换成真实事件和真实图片。',
		postSlug: 'trip-placeholder',
		importance: 'medium',
		image: 'materials/heart.svg',
	},
];
