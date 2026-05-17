export interface HeroMaterial {
	id: string;
	src: string;
	alt: string;
	title: string;
}

export const heroMaterials: HeroMaterial[] = [
	{
		id: 'heart-placeholder',
		src: 'materials/heart.svg',
		alt: '浅粉色爱心占位图',
		title: 'Heart Placeholder',
	},
];
