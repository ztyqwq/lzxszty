-- Optional insert examples. Replace placeholder text with real private content
-- in Supabase SQL Editor, not in this repository.

insert into public.love_home (id, eyebrow, title, lead, hero_image_path)
values ('main', 'Private', '首页标题', '首页说明文字', null)
on conflict (id) do update
set eyebrow = excluded.eyebrow,
	title = excluded.title,
	lead = excluded.lead,
	hero_image_path = excluded.hero_image_path,
	updated_at = now();

insert into public.love_posts (slug, title, summary, body, tags, author, hero_image_path, published_at)
values (
	'example-post',
	'文章标题',
	null,
	'# 文章标题

第一段正文。

第二段正文。',
	array['tag'],
	'black',
	null,
	current_date
)
on conflict (slug) do update
set title = excluded.title,
	summary = excluded.summary,
	body = excluded.body,
	tags = excluded.tags,
	author = excluded.author,
	hero_image_path = excluded.hero_image_path,
	published_at = excluded.published_at,
	updated_at = now();

insert into public.love_posts (
	slug,
	title,
	summary,
	body,
	tags,
	author,
	hero_image_path,
	published_at
)
select
	'test-post-' || lpad(item_no::text, 2, '0'),
	'分页测试文章 ' || lpad(item_no::text, 2, '0'),
	null,
	'# 分页测试文章 ' || lpad(item_no::text, 2, '0') || E'\n\n'
		|| '这是第 ' || item_no || E' 篇用于测试 post 分页的正文。列表页应该只显示这一段的一行预览。\n\n'
		|| '第二段内容用于测试详情页的 Markdown 渲染。',
	array['test', 'pagination'],
	case when item_no % 2 = 0 then 'white' else 'black' end,
	null,
	current_date - (item_no - 1)
from generate_series(1, 21) as item_no
on conflict (slug) do update
set title = excluded.title,
	summary = excluded.summary,
	body = excluded.body,
	tags = excluded.tags,
	author = excluded.author,
	hero_image_path = excluded.hero_image_path,
	published_at = excluded.published_at,
	updated_at = now();

insert into public.love_meow_messages (author, body)
values ('black', '一句小猫留言');

insert into public.love_stats (id, label, value, suffix, size, mode, target_date, sort_order)
values ('days-together', '在一起', null, '天', 'large', 'since', current_date, 10)
on conflict (id) do update
set label = excluded.label,
	value = excluded.value,
	suffix = excluded.suffix,
	size = excluded.size,
	mode = excluded.mode,
	target_date = excluded.target_date,
	sort_order = excluded.sort_order,
	updated_at = now();

insert into public.love_timeline_events (
	event_date,
	title,
	body,
	post_slug,
	importance,
	image_path,
	sort_order
)
values (current_date, '事件标题', '事件简述', 'example-post', 'medium', null, 10);

insert into public.love_gallery_items (slug, title, body, image_path, captured_at, size, sort_order)
values
	('example-large', '画廊占位图', '把图片上传到 love-private bucket 后，在 image_path 填入文件路径。', null, current_date, 'large', 10),
	('example-medium', '普通图片位', '这里可以放照片说明。', null, current_date, 'medium', 20)
on conflict (slug) do update
set title = excluded.title,
	body = excluded.body,
	image_path = excluded.image_path,
	captured_at = excluded.captured_at,
	size = excluded.size,
	sort_order = excluded.sort_order,
	updated_at = now();

insert into public.love_about_sections (id, title, body, section_type, sort_order)
values ('intro', '基本信息', '关于内容', 'text', 10)
on conflict (id) do update
set title = excluded.title,
	body = excluded.body,
	section_type = excluded.section_type,
	sort_order = excluded.sort_order,
	updated_at = now();

insert into public.love_achievements (id, title, body, state, sort_order)
values ('first', '成就标题', '成就说明', '状态', 10)
on conflict (id) do update
set title = excluded.title,
	body = excluded.body,
	state = excluded.state,
	sort_order = excluded.sort_order,
	updated_at = now();

insert into public.love_games (id, title, body, sort_order)
values ('first-game', '小游戏标题', '小游戏说明', 10)
on conflict (id) do update
set title = excluded.title,
	body = excluded.body,
	sort_order = excluded.sort_order,
	updated_at = now();
