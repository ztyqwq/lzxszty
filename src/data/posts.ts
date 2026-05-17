export interface PostEntry {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	content: string[];
}

export const posts: PostEntry[] = [
	{
		slug: 'first-note',
		title: '第一条占位日常',
		date: '2026-05-18',
		summary: '这里以后可以写今天发生了什么、去了哪里、想留下什么。',
		tags: ['daily', 'placeholder'],
		content: [
			'这是一篇占位笔记，用来确定日常区的阅读节奏。',
			'后续每一篇日常都可以用 Markdown 或数据文件维护，再接入图片、地点、心情和关联时间线。',
		],
	},
	{
		slug: 'trip-placeholder',
		title: '一次出门记录的占位',
		date: '2026-05-18',
		summary: '旅游、吃饭、散步、电影，都可以先放在日常区，再从时间线链接回来。',
		tags: ['trip', 'memory'],
		content: [
			'这篇用来模拟一条更完整的外出记录。',
			'时间线上的事件卡片可以链接到这里，详情页里再写照片、路线、对话和小结。',
		],
	},
];

export function getPost(slug: string) {
	return posts.find((post) => post.slug === slug);
}
