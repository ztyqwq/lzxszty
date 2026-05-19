# lzxszty

独立的私密静态站。GitHub Pages 只放登录壳、路由壳和前端交互，真实内容放在 Supabase。

## Commands

```sh
npm ci
npm run dev
npm run build
npm run preview
```

如果在 WSL 里开发：

```sh
cd /mnt/d/ztyqwqSite/lzxszty
. ~/.nvm/nvm.sh
nvm use 22
npm ci
npm run dev
```

## Routes

```text
/
/post/
/stat/
/timeline/
/meow/
/about/
/achievement/
/game/
```

## Supabase

前端需要这些环境变量：

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=
PUBLIC_AUTH_BLACK_EMAIL=
PUBLIC_AUTH_WHITE_EMAIL=
PUBLIC_AUTH_BLACK_LABEL=
PUBLIC_AUTH_WHITE_LABEL=
```

本地开发可以复制 `.env.example` 为 `.env` 后填入。GitHub Pages 构建时，在仓库的 Actions Variables 或 Secrets 里放同名变量。

私密内容不放进 GitHub 仓库。先在 Supabase SQL Editor 里运行 `supabase/private-content.sql`，运行前把脚本顶部的两个邮箱占位改成实际的两个 Auth 用户邮箱。

当前内容表：

```text
love_home
love_posts
love_cats
love_meow_messages
love_stats
love_timeline_events
love_about_sections
love_achievements
love_games
```

私密图片放 Supabase Storage 的 `love-private` bucket，不放 `public/`。表里的 `hero_image_path`、`image_path` 保存 bucket 内路径，前端登录后会创建 signed URL。

`supabase/content-examples.sql` 只是一份占位插入模板；真实文字不要提交到仓库，在 Supabase SQL Editor 里临时替换后运行。

`/meow/` 会读取 `love_cats` 和 `love_meow_messages`。投食和喵喵叫通过 `love_perform_cat_action(action_name text)` 更新小猫状态；留言通过 `love_add_meow_message(message_body text)` 写入。页面会订阅这两张表的 Realtime 更新。

全站入口使用 Supabase Auth 的邮箱密码登录。网站前端只显示两个固定账号按钮，不提供注册入口；两个用户需要在 Supabase Dashboard 的 `Authentication -> Users` 里手动创建。建议在 `Authentication -> Providers -> Email` 里关闭公开注册，只保留后台手动创建用户。

## Deployment

这个仓库使用 GitHub Pages 和自定义域名：

```text
https://lzxszty.love/
```

Astro 以自定义域名根路径发布，因此不配置 `base`。

## Privacy

真正私密的文字和图片不要以明文放进 `public/` 或最终构建产物。它们应保存在 Supabase Database 或私有 Storage，并通过 Auth + RLS 控制读取。
