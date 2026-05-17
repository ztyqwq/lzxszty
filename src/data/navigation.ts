export interface NavItem {
	href: string;
	label: string;
	emoji: string;
}

export const navItems: NavItem[] = [
	{ href: '/', label: '首页', emoji: '🏠' },
	{ href: '/post/', label: '日常', emoji: '📝' },
	{ href: '/stat/', label: '数据', emoji: '📊' },
	{ href: '/timeline/', label: '时间线', emoji: '🕰️' },
	{ href: '/whisper/', label: '碎碎念', emoji: '🐾' },
	{ href: '/achievement/', label: '成就', emoji: '🏅' },
	{ href: '/game/', label: '小游戏', emoji: '🎲' },
	{ href: '/about/', label: '关于', emoji: '🌷' },
];
